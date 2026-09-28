"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, FolderOpen } from "lucide-react";
import { CLIP_RULES, NAVI_CLIPS_PER_EPISODE } from "@/config/presentation";
import { CLIPS, type DemoClip } from "@/data/demo";
import { cn } from "@/lib/cn";
import { PLATFORM_LABEL, PlatformIcon } from "@/components/ui/Glyphs";
import { StudioFrame } from "@/components/visuals/StudioFrame";
import { HumanBadge } from "./ThumbnailSelector";

export const CLIP_TONES: Array<[string, string]> = [
  ["#22303a", "#d8c8b2"],
  ["#2d2620", "#e6c9a8"],
  ["#1f2b2a", "#9fd3b8"],
  ["#2b2233", "#c9b8e8"],
];

export function clipVariant(c: DemoClip) {
  return c.speaker === "Ambos" ? "wide" : c.speaker === "Lilly" ? "right" : "left";
}

interface ClipSelectorProps {
  selection: string[];
  nudge: number;
  onToggle: (id: string) => void;
  onApprove: () => void;
}

export function ClipSelector({ selection, nudge, onToggle, onApprove }: ClipSelectorProps) {
  const complete = selection.length === NAVI_CLIPS_PER_EPISODE;
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[minmax(0,1fr)_236px]">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <HumanBadge />
            <h3 className="text-xl text-fg">Clip Review</h3>
            <p className="text-[13px] text-fg-3">
              {CLIPS.length} clips detectados con la plantilla del programa. Marca el orden: 1 · 2 · 3.
            </p>
          </div>
          <span className="font-mono text-[10px] tracking-[0.12em] text-fg-4 uppercase">
            Puntuación: relevancia ilustrativa
          </span>
        </div>

        <motion.div
          key={nudge}
          initial={nudge > 0 ? { x: 0 } : false}
          animate={nudge > 0 ? { x: [0, -6, 6, -3, 0] } : undefined}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5"
        >
          {CLIPS.map((c) => {
            const rank = selection.indexOf(c.id) + 1;
            return (
              <ClipCard
                key={c.id}
                clip={c}
                rank={rank}
                disabled={rank === 0 && complete}
                onToggle={() => onToggle(c.id)}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Rules panel */}
      <aside className="flex flex-col gap-3 rounded-xl border border-line bg-ink-900 p-3.5" aria-label="Reglas de distribución">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] tracking-[0.14em] text-fg-4 uppercase">Reglas de distribución</span>
          <span className="text-xs text-fg-2">NAVI 3-Clip Rule</span>
        </div>
        <ol className="flex flex-col gap-2">
          {CLIP_RULES.map((rule) => {
            const clip = CLIPS.find((c) => c.id === selection[rule.rank - 1]);
            return (
              <li
                key={rule.rank}
                className={cn(
                  "flex flex-col gap-2 rounded-lg border p-2.5 transition-colors duration-300",
                  clip ? "border-gold/40 bg-gold/[0.05]" : "border-dashed border-line-2",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("font-mono text-[11px] font-semibold", clip ? "text-gold" : "text-fg-3")}>
                    NAVI #{rule.rank}
                  </span>
                  <span className="flex items-center gap-1.5 text-fg-3">
                    {rule.platforms.map((p) => (
                      <PlatformIcon key={p} platform={p} className="size-3.5" title={PLATFORM_LABEL[p]} />
                    ))}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={clip?.id ?? "empty"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn("line-clamp-2 text-[12px] leading-snug", clip ? "text-fg" : "text-fg-4")}
                  >
                    {clip ? clip.title : rule.rank === 1 ? "El mejor clip" : "Selecciona un clip"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] text-fg-4">
                  {rule.platforms.map((p) => PLATFORM_LABEL[p]).join(" · ")}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-2 text-[11px] text-fg-3">
          <FolderOpen className="size-3.5 shrink-0" aria-hidden />
          Resto ({CLIPS.length - NAVI_CLIPS_PER_EPISODE}) → Social Clips Programa
        </div>
        <button
          type="button"
          onClick={onApprove}
          disabled={!complete}
          className={cn(
            "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
            complete ? "bg-gold text-ink-950 hover:brightness-110" : "cursor-not-allowed bg-ink-700 text-fg-4",
          )}
        >
          Approve selection
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <span className="text-center text-[10px] text-fg-4">
          {selection.length} / {NAVI_CLIPS_PER_EPISODE} seleccionados
        </span>
      </aside>
    </div>
  );
}

function ClipCard({
  clip,
  rank,
  disabled,
  onToggle,
}: {
  clip: DemoClip;
  rank: number;
  disabled: boolean;
  onToggle: () => void;
}) {
  const selected = rank > 0;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={`${clip.title}, ${clip.duration}${selected ? `, NAVI número ${rank}` : ""}`}
      title={clip.copy}
      className={cn(
        "group relative flex flex-col text-left transition-opacity duration-300",
        disabled && "opacity-40 hover:opacity-70",
      )}
    >
      <div
        className={cn(
          "relative aspect-[9/16] w-full overflow-hidden rounded-lg border-2 transition-all duration-300 lg:aspect-[9/14]",
          selected ? "border-gold" : "border-transparent group-hover:border-line-2",
        )}
      >
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
          <StudioFrame vertical variant={clipVariant(clip)} tone={CLIP_TONES[clip.frame]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

        <div className="absolute inset-x-1.5 top-1.5 flex items-center justify-between font-mono text-[9.5px]">
          <span className="rounded bg-black/55 px-1 py-0.5 text-fg/90 tabular">{clip.duration}</span>
          <span className="rounded bg-black/55 px-1 py-0.5 text-fg/70 tabular">{clip.score}</span>
        </div>

        <div className="absolute inset-x-2 bottom-2 flex flex-col gap-0.5">
          <span className="line-clamp-3 text-[11px] leading-tight font-medium text-fg">{clip.title}</span>
          <span className="text-[9.5px] text-fg/55">{clip.speaker} · {clip.start}</span>
        </div>

        <span className="clip-preview absolute inset-x-0 bottom-0 h-[2px] bg-fg/80" aria-hidden />

        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-gold px-2.5 py-1 font-mono text-[11px] font-bold whitespace-nowrap text-ink-950 shadow-lg"
            >
              NAVI #{rank}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
