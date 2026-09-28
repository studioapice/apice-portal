"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { CLIP_RULES, DEMO_HUMAN_TIME } from "@/config/presentation";
import { CLIPS, CLIP_SCHEDULE, COMPLETION_ITEMS, DEMO_EPISODE, EPISODE_SCHEDULE, type ThumbnailId } from "@/data/demo";
import { ClaimTag } from "@/components/ui/ClaimTag";
import { PLATFORM_LABEL, PlatformIcon } from "@/components/ui/Glyphs";
import { EASE_OUT } from "@/components/ui/Reveal";
import { ThumbnailArt } from "./ThumbnailArt";

interface EpisodeStatusProps {
  thumbnail: ThumbnailId | null;
  selection: string[];
  onReset: () => void;
  onContinue: () => void;
}

export function EpisodeStatus({ thumbnail, selection, onReset, onContinue }: EpisodeStatusProps) {
  return (
    <div className="grid h-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="flex flex-col gap-2"
        >
          <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-ok uppercase">
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-ok text-ink-950">
              <Check className="size-3.5" />
            </span>
            Production complete
          </span>
          <h3 className="display text-[clamp(2rem,3.4vw,3.2rem)] text-fg">{DEMO_EPISODE.program}</h3>
          <span className="text-[15px] text-fg-2">“{DEMO_EPISODE.title}”</span>
        </motion.div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-5">
          {COMPLETION_ITEMS.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
              className="flex items-center justify-between border-b border-line pb-2 text-[13px] text-fg-2"
            >
              {item}
              <Check className="size-3.5 text-ok" aria-label="Completado" />
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-wrap items-end gap-x-6 gap-y-3"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs text-fg-3">Intervención humana</span>
            <span className="display text-5xl leading-none text-gold tabular">{DEMO_HUMAN_TIME}</span>
          </div>
          <ClaimTag kind="target" label="Objetivo ilustrativo de diseño" />
        </motion.div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.02]"
          >
            ¿Y después de publicar?
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 text-sm text-fg-2 transition-colors hover:text-fg"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Reset demo
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: EASE_OUT }}
        className="flex flex-col gap-4 rounded-2xl border border-line bg-ink-900 p-4"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.14em] text-fg-4 uppercase">Publicación programada</span>
          <ClaimTag kind="simulation" />
        </div>
        {thumbnail && (
          <div className="flex items-center gap-3">
            <div className="w-40 shrink-0 overflow-hidden rounded-md border border-line">
              <ThumbnailArt id={thumbnail} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs text-fg">
                <PlatformIcon platform="youtube" className="size-3.5" /> Episodio completo
              </span>
              <span className="font-mono text-[11px] text-fg-3">{EPISODE_SCHEDULE} · Miniatura {thumbnail}</span>
            </div>
          </div>
        )}
        <ul className="flex flex-col divide-y divide-line">
          {CLIP_RULES.map((rule) => {
            const clip = CLIPS.find((c) => c.id === selection[rule.rank - 1]);
            return (
              <li key={rule.rank} className="flex items-center justify-between gap-3 py-2.5">
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-[11px] text-gold">NAVI #{rule.rank} · {CLIP_SCHEDULE[rule.rank]}</span>
                  <span className="truncate text-[12px] text-fg-2">{clip?.title}</span>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 text-fg-3">
                  {rule.platforms.map((p) => (
                    <PlatformIcon key={p} platform={p} className="size-3.5" title={PLATFORM_LABEL[p]} />
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
