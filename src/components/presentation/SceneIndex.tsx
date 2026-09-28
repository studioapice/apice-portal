"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { ACTS, SCENES } from "@/data/scenes";
import { cn } from "@/lib/cn";
import { pad2 } from "@/lib/format";
import { usePresentationApi, usePresentationState } from "./PresentationProvider";

/** ⌘K / Ctrl+K scene index. */
export function SceneIndex() {
  const { indexOpen } = usePresentationState();
  return <AnimatePresence>{indexOpen && <SceneIndexDialog />}</AnimatePresence>;
}

function SceneIndexDialog() {
  const { activeIndex } = usePresentationState();
  const api = usePresentationApi();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(activeIndex);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCENES.map((s, i) => ({ scene: s, index: i })).filter(({ scene }) => {
      if (!q) return true;
      const act = ACTS[scene.act];
      return (
        scene.title.toLowerCase().includes(q) ||
        act.title.toLowerCase().includes(q) ||
        `acto ${act.numeral}`.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const safeCursor = results.some((r) => r.index === cursor)
    ? cursor
    : (results[0]?.index ?? -1);

  const close = () => api.setIndexOpen(false);
  const go = (index: number) => {
    close();
    api.goTo(index);
  };

  const move = (delta: number) => {
    const pos = results.findIndex((r) => r.index === safeCursor);
    const nextPos = Math.max(0, Math.min(results.length - 1, pos + delta));
    const nextIndex = results[nextPos]?.index;
    if (nextIndex === undefined) return;
    setCursor(nextIndex);
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${nextIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Índice de escenas"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-2 bg-ink-850 shadow-[0_40px_120px_-30px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 text-fg-3" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                move(1);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                move(-1);
              } else if (e.key === "Enter" && safeCursor >= 0) {
                e.preventDefault();
                go(safeCursor);
              } else if (e.key === "Escape") {
                e.preventDefault();
                close();
              }
            }}
            placeholder="Ir a escena…"
            aria-label="Buscar escena"
            className="h-12 flex-1 bg-transparent text-sm text-fg placeholder:text-fg-4 focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-4">esc</kbd>
        </div>
        <ul ref={listRef} className="max-h-[56vh] overflow-y-auto p-2" role="listbox" aria-label="Escenas">
          {results.map(({ scene, index }, i) => {
            const act = ACTS[scene.act];
            const showAct = i === 0 || results[i - 1].scene.act !== scene.act;
            return (
              <li key={scene.id} role="presentation">
                {showAct && (
                  <div className="eyebrow px-3 pt-3 pb-1.5 text-[10px]">
                    Acto {act.numeral} · {act.title}
                  </div>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={index === safeCursor}
                  data-index={index}
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => go(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    index === safeCursor ? "bg-ink-700 text-fg" : "text-fg-2",
                  )}
                >
                  <span className="font-mono text-[11px] text-fg-4 tabular">{pad2(index + 1)}</span>
                  <span className="flex-1">{scene.title}</span>
                  {index === activeIndex && (
                    <span className="text-[10px] tracking-[0.14em] text-gold uppercase">Actual</span>
                  )}
                </button>
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-fg-3">Sin resultados</li>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
}
