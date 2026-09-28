"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, UserRound } from "lucide-react";
import { SEO_OUTPUT, THUMBNAILS, type ThumbnailId } from "@/data/demo";
import { cn } from "@/lib/cn";
import { ThumbnailArt } from "./ThumbnailArt";

interface ThumbnailSelectorProps {
  selected: ThumbnailId | null;
  approved: boolean;
  nudge: number;
  onSelect: (id: ThumbnailId) => void;
  onApprove: () => void;
}

export function ThumbnailSelector({ selected, approved, nudge, onSelect, onApprove }: ThumbnailSelectorProps) {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <HumanBadge />
          <h3 className="text-xl text-fg">Elige la miniatura del episodio</h3>
          <p className="text-[13px] text-fg-3">
            Tres propuestas generadas con la plantilla del programa. El resto ya está preparado.
          </p>
        </div>
        <div className="max-w-sm rounded-lg border border-line bg-ink-900 px-3 py-2">
          <span className="font-mono text-[10px] tracking-[0.14em] text-fg-4 uppercase">Título propuesto · SEO</span>
          <p className="mt-0.5 text-[13px] leading-snug text-fg-2">{SEO_OUTPUT.titles[0]}</p>
        </div>
      </div>

      <motion.div
        key={nudge}
        role="radiogroup"
        aria-label="Miniaturas"
        initial={nudge > 0 ? { x: 0 } : false}
        animate={nudge > 0 ? { x: [0, -6, 6, -3, 0] } : undefined}
        transition={{ duration: 0.45 }}
        className="grid flex-1 content-center gap-4 sm:grid-cols-3"
      >
        {THUMBNAILS.map((t) => {
          const isSel = selected === t.id;
          const dim = selected !== null && !isSel;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={isSel}
              disabled={approved}
              onClick={() => onSelect(t.id)}
              className={cn(
                "group flex flex-col gap-2.5 text-left transition-opacity duration-300",
                dim && "opacity-45 hover:opacity-80",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-xl border-2 transition-all duration-300",
                  isSel ? "border-gold shadow-[0_0_0_4px_rgba(242,181,42,0.15)]" : "border-line group-hover:border-line-2",
                )}
              >
                <ThumbnailArt id={t.id} />
                <span className="absolute top-2 right-2 inline-flex size-7 items-center justify-center rounded-full bg-black/60 font-mono text-xs text-fg backdrop-blur">
                  {isSel ? <Check className="size-4 text-gold" /> : t.id}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-fg">
                  {t.id} · {t.concept}
                </span>
                <span className="text-[11px] text-fg-3">{t.note}</span>
              </div>
            </button>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
        <AnimatePresence mode="wait">
          {approved ? (
            <motion.span
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-ok uppercase"
            >
              <Check className="size-4" /> Thumbnail approved
            </motion.span>
          ) : (
            <motion.span key="wait" className="text-xs text-fg-3">
              {selected ? `Miniatura ${selected} seleccionada` : "Selecciona una opción"}
            </motion.span>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={onApprove}
          disabled={!selected || approved}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all",
            selected && !approved ? "bg-gold text-ink-950 hover:brightness-110" : "cursor-not-allowed bg-ink-700 text-fg-4",
          )}
        >
          {selected ? `Aprobar miniatura ${selected}` : "Aprobar miniatura"}
        </button>
      </div>
    </div>
  );
}

export function HumanBadge({ label = "Decisión humana" }: { label?: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-gold uppercase">
      <UserRound className="size-3" aria-hidden />
      {label}
    </span>
  );
}
