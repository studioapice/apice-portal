"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Euro,
  LayoutGrid,
  Maximize,
  Minimize,
  MonitorPlay,
  Play,
  RotateCcw,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ACTS, SCENES } from "@/data/scenes";
import { cn } from "@/lib/cn";
import { pad2 } from "@/lib/format";
import { NaviOSMark } from "@/components/ui/Wordmark";
import {
  RESET_DEMO_EVENT,
  usePresentationApi,
  usePresentationState,
} from "./PresentationProvider";

/** Hook: true for a while after the pointer moves. */
function usePointerActivity(timeout = 2600) {
  const [active, setActive] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const onMove = () => {
      setActive(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setActive(false), timeout);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearTimeout(timer.current);
    };
  }, [timeout]);
  return active;
}

export function PresenterChrome() {
  const { activeIndex, presenting, fullscreen } = usePresentationState();
  const api = usePresentationApi();
  const pointerActive = usePointerActivity();
  const [hoverDock, setHoverDock] = useState(false);
  const dockVisible = pointerActive || hoverDock;
  const scene = SCENES[activeIndex];
  const act = ACTS[scene.act];

  /* Hide the cursor while presenting and idle. */
  useEffect(() => {
    document.body.classList.toggle("cursor-idle", presenting && !pointerActive);
    return () => document.body.classList.remove("cursor-idle");
  }, [presenting, pointerActive]);

  const resetDemo = useCallback(() => {
    window.dispatchEvent(new CustomEvent(RESET_DEMO_EVENT));
    api.goToId("demo");
  }, [api]);

  return (
    <>
      {/* Top-left product mark */}
      <div
        className={cn(
          "pointer-events-none fixed top-5 left-5 z-40 flex items-center gap-3 transition-opacity duration-700 sm:top-6 sm:left-8",
          presenting || activeIndex === 0 || scene.id === "demo" || scene.id === "command"
            ? "opacity-0"
            : "opacity-100",
        )}
      >
        <NaviOSMark tree className="text-[15px] text-fg" />
        <span className="hidden text-[11px] text-fg-4 sm:inline">Propuesta para NAVI Centro Creativo</span>
      </div>

      {/* Right progress rail */}
      <nav
        aria-label="Progreso de la presentación"
        className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-end gap-[7px] lg:flex"
      >
        {SCENES.map((s, i) => {
          const isActive = i === activeIndex;
          const actStart = i === 0 || SCENES[i - 1].act !== s.act;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => api.goTo(i)}
              aria-label={`${pad2(i + 1)} · ${s.title}`}
              aria-current={isActive ? "step" : undefined}
              className={cn("group relative flex h-[6px] items-center justify-end", actStart && i > 0 && "mt-2")}
            >
              <span
                className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-line bg-ink-800/95 px-2 py-1 text-[11px] text-fg-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span className="mr-1.5 font-mono text-fg-4">{pad2(i + 1)}</span>
                {s.title}
              </span>
              <span
                className={cn(
                  "block h-[2px] rounded-full transition-all duration-500",
                  isActive
                    ? "w-5 bg-gold"
                    : i < activeIndex
                      ? "w-2.5 bg-fg-3 group-hover:bg-fg-2"
                      : "w-2.5 bg-ink-500 group-hover:bg-fg-3",
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* Bottom-right counter */}
      <div className="pointer-events-none fixed right-5 bottom-5 z-40 flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-fg-3 sm:right-8 sm:bottom-6">
        <span className="hidden text-fg-4 uppercase md:inline">
          Acto {act.numeral} · {act.title}
        </span>
        <span className="tabular text-fg-2">
          {pad2(activeIndex + 1)}
          <span className="text-fg-4"> / {pad2(SCENES.length)}</span>
        </span>
      </div>

      {/* Presenter dock */}
      <AnimatePresence>
        {dockVisible && (
          <motion.div
            role="toolbar"
            aria-label="Controles del presentador"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onPointerEnter={() => setHoverDock(true)}
            onPointerLeave={() => setHoverDock(false)}
            className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-line-2 bg-ink-800/90 p-1 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
          >
            <DockButton label="Anterior (←)" onClick={api.prev}>
              <ChevronLeft className="size-4" />
            </DockButton>
            <DockButton label="Siguiente (→ / Espacio)" onClick={api.next}>
              <ChevronRight className="size-4" />
            </DockButton>
            <Divider />
            <DockButton label="Índice de escenas (⌘K)" onClick={() => api.setIndexOpen(true)}>
              <LayoutGrid className="size-4" />
            </DockButton>
            <DockButton label="Ir a la demo" onClick={() => api.goToId("demo")}>
              <Play className="size-4" />
            </DockButton>
            <DockButton label="Reiniciar demo" onClick={resetDemo}>
              <RotateCcw className="size-4" />
            </DockButton>
            <DockButton label="Ir a la inversión" onClick={() => api.goToId("investment")}>
              <Euro className="size-4" />
            </DockButton>
            <Divider />
            <DockButton
              label={presenting ? "Salir del modo presentación (Esc)" : "Modo presentación (P)"}
              onClick={() => api.setPresenting(!presenting)}
              active={presenting}
            >
              <MonitorPlay className="size-4" />
            </DockButton>
            <DockButton label={fullscreen ? "Salir de pantalla completa (F)" : "Pantalla completa (F)"} onClick={api.toggleFullscreen}>
              {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
            </DockButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Divider() {
  return <span className="mx-1 h-4 w-px bg-line-2" aria-hidden />;
}

function DockButton({
  label,
  onClick,
  children,
  active,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-ink-600 hover:text-fg",
        active && "bg-ink-600 text-gold",
      )}
    >
      {children}
    </button>
  );
}
