"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, FolderOpen, Image as ImageIcon, Lock, Play, Scissors, Sparkles } from "lucide-react";
import { ASSET_TREE, CLIPS, SEO_OUTPUT, THUMBNAILS, type EngineId } from "@/data/demo";
import { cn } from "@/lib/cn";
import { formatFixed } from "@/lib/format";
import { ThumbnailArt } from "./ThumbnailArt";

const ICONS: Record<EngineId, typeof Scissors> = {
  opus: Scissors,
  seo: Sparkles,
  thumbnails: ImageIcon,
  youtube: Play,
  assets: FolderOpen,
};

/** Deterministic waveform (no randomness at render time). */
const WAVE = Array.from({ length: 56 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.9) * 0.6 + Math.sin(i * 0.23 + 1) * 0.4);
  return 0.18 + v * 0.82;
});

interface ProcessingNodeProps {
  id: EngineId;
  name: string;
  verb: string;
  done: string;
  progress: number;
  className?: string;
}

export function ProcessingNode({ id, name, verb, done, progress, className }: ProcessingNodeProps) {
  const Icon = ICONS[id];
  const finished = progress >= 1;
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-ink-850 p-3.5 transition-colors duration-500",
        finished ? "border-ok/30" : "border-line-2",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex min-w-0 items-center gap-2 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-fg uppercase">
          <Icon className={cn("size-3.5 shrink-0", finished ? "text-ok" : "text-sys")} aria-hidden />
          <span className="truncate">{name}</span>
        </span>
        {finished ? (
          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-ok">
            <Check className="size-3" aria-hidden /> Listo
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center" aria-label="En curso">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-sys" />
          </span>
        )}
      </div>

      <div className="h-[104px] overflow-hidden xl:h-[150px]">
        {id === "opus" && <OpusVisual progress={progress} />}
        {id === "seo" && <SeoVisual progress={progress} />}
        {id === "thumbnails" && <ThumbVisual progress={progress} />}
        {id === "youtube" && <YouTubeVisual progress={progress} />}
        {id === "assets" && <AssetsVisual progress={progress} />}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="h-px w-full bg-line">
          <div
            className={cn("h-px transition-[width] duration-100", finished ? "bg-ok" : "bg-sys")}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className={finished ? "text-fg-2" : "text-fg-3"}>{finished ? done : `${verb}…`}</span>
          <span className="font-mono text-fg-4 tabular">{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

function OpusVisual({ progress }: { progress: number }) {
  const found = Math.floor(progress * CLIPS.length);
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="relative flex h-12 items-center gap-[2px]">
        {WAVE.map((h, i) => {
          const scanned = i / WAVE.length <= progress;
          return (
            <span
              key={i}
              className={cn("w-full rounded-full", scanned ? "bg-fg-3" : "bg-ink-600")}
              style={{ height: `${h * 100}%` }}
            />
          );
        })}
        <span className="absolute inset-y-0 w-px bg-gold" style={{ left: `${Math.min(progress, 1) * 100}%` }} />
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-1">
          {CLIPS.map((c, i) => (
            <motion.span
              key={c.id}
              initial={false}
              animate={{ opacity: i < found ? 1 : 0.15, y: i < found ? 0 : 4 }}
              className="block h-7 w-4 rounded-[3px] border border-line-2 bg-ink-600"
            />
          ))}
        </div>
        <span className="font-mono text-[11px] text-fg-2 tabular">{found} clips</span>
      </div>
    </div>
  );
}

function SeoVisual({ progress }: { progress: number }) {
  const title = SEO_OUTPUT.titles[0];
  const chars = Math.floor(Math.min(1, progress / 0.55) * title.length);
  const chapters = Math.floor(Math.max(0, (progress - 0.5) / 0.4) * SEO_OUTPUT.chapters.length);
  return (
    <div className="flex h-full flex-col gap-2">
      <p className="text-[12px] leading-snug text-fg">
        {title.slice(0, chars)}
        {chars < title.length && <span className="ml-px inline-block h-3 w-[2px] translate-y-0.5 animate-pulse-soft bg-gold" />}
      </p>
      <ul className="flex flex-col gap-0.5">
        {SEO_OUTPUT.chapters.slice(0, Math.min(chapters, 4)).map((c) => (
          <li key={c.t} className="flex gap-2 font-mono text-[10px] text-fg-3">
            <span className="text-fg-4">{c.t}</span>
            <span className="truncate font-sans">{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThumbVisual({ progress }: { progress: number }) {
  return (
    <div className="grid h-full grid-cols-3 items-center gap-1.5">
      {THUMBNAILS.map((t, i) => {
        const ready = progress >= (i + 1) / THUMBNAILS.length - 0.02;
        return (
          <div key={t.id} className="relative overflow-hidden rounded-md border border-line">
            <div className="aspect-video bg-ink-700">
              <span className="absolute inset-0 animate-scan bg-gradient-to-r from-transparent via-fg/[0.07] to-transparent" />
            </div>
            <AnimatePresence>
              {ready && (
                <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <ThumbnailArt id={t.id} />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="absolute bottom-0.5 left-1 font-mono text-[9px] text-fg/80">{t.id}</span>
          </div>
        );
      })}
    </div>
  );
}

function YouTubeVisual({ progress }: { progress: number }) {
  const total = 9.8;
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-baseline gap-2">
        <span className="display text-4xl leading-none text-fg tabular">{Math.round(progress * 100)}</span>
        <span className="text-sm text-fg-3">%</span>
      </div>
      <div className="flex flex-col gap-1.5 text-[11px] text-fg-3">
        <span className="font-mono tabular">
          {formatFixed(progress * total, 1)} / {formatFixed(total, 1)} GB
        </span>
        <span className="inline-flex w-fit items-center gap-1.5 rounded border border-line px-1.5 py-0.5 text-[10px] text-fg-2">
          <Lock className="size-3" aria-hidden /> Privado · YouTube
        </span>
      </div>
    </div>
  );
}

function AssetsVisual({ progress }: { progress: number }) {
  const shown = Math.ceil(progress * ASSET_TREE.length);
  return (
    <ul className="flex h-full flex-col gap-1 font-mono text-[10.5px]">
      {ASSET_TREE.map((n, i) => (
        <motion.li
          key={n.name}
          initial={false}
          animate={{ opacity: i < shown ? 1 : 0.12, x: i < shown ? 0 : -4 }}
          className="flex items-center gap-1.5 truncate text-fg-2"
          style={{ paddingLeft: n.depth * 12 }}
        >
          <FolderOpen className="size-3 shrink-0 text-fg-4" aria-hidden />
          <span className="truncate">{n.name}</span>
        </motion.li>
      ))}
    </ul>
  );
}
