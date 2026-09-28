"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { StudioFrame, type FrameVariant } from "./StudioFrame";

/**
 * Live multicam direction as it happens in NAVI's studios today:
 * 4 cameras, a program output, dynamic lower-thirds and CTAs inserted live.
 */

const CAMERAS: Array<{ id: number; label: string; variant: FrameVariant }> = [
  { id: 1, label: "CAM 1 · General", variant: "wide" },
  { id: 2, label: "CAM 2 · Host A", variant: "left" },
  { id: 3, label: "CAM 3 · Host B", variant: "right" },
  { id: 4, label: "CAM 4 · Detalle", variant: "detail" },
];

/** Cut list (camera ids) and what is overlaid on each cut. */
const CUTS: Array<{ cam: number; overlay?: "tapa" | "cta" }> = [
  { cam: 1 },
  { cam: 2, overlay: "tapa" },
  { cam: 3 },
  { cam: 1 },
  { cam: 3, overlay: "cta" },
  { cam: 2 },
  { cam: 4 },
  { cam: 1, overlay: "tapa" },
];

const TONE: [string, string] = ["#1d2a33", "#d8c8b2"];
const START_SECONDS = 23 * 60 + 41;

function timecode(totalFrames: number): string {
  const fps = 25;
  const f = totalFrames % fps;
  const s = Math.floor(totalFrames / fps);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return [hh, mm, ss, f].map((n) => String(n).padStart(2, "0")).join(":");
}

/** Isolated so the per-frame tick only re-renders this span. */
function Timecode({ active }: { active: boolean }) {
  const [frames, setFrames] = useState(START_SECONDS * 25);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setFrames((f) => f + 2), 80);
    return () => window.clearInterval(id);
  }, [active]);
  return <span className="tabular rounded bg-black/50 px-2 py-1">{timecode(frames)}</span>;
}

export function MulticamStage({ active }: { active: boolean }) {
  const [cut, setCut] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setCut((c) => (c + 1) % CUTS.length), 1900);
    return () => window.clearInterval(id);
  }, [active]);

  const current = CUTS[cut];
  const cam = CAMERAS.find((c) => c.id === current.cam)!;

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Program output */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-ink-900">
        <AnimatePresence initial={false}>
          <motion.div
            key={cut}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <StudioFrame variant={cam.variant} tone={TONE} />
          </motion.div>
        </AnimatePresence>

        {/* HUD */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-fg/80 uppercase">
            <span className="inline-flex items-center gap-2 rounded bg-black/50 px-2 py-1">
              <span className={cn("size-1.5 rounded-full bg-live", active && "animate-pulse-soft")} />
              PGM · {cam.label}
            </span>
            <Timecode active={active} />
          </div>

          <div className="flex items-end justify-between gap-3">
            <AnimatePresence mode="wait">
              {current.overlay === "tapa" && (
                <motion.div
                  key={`tapa-${cut}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-stretch overflow-hidden rounded-md"
                >
                  <span className="w-1 bg-ysft-clay" />
                  <span className="bg-ysft-paper px-3 py-1.5 font-serif text-[13px] text-[#2f3d44] sm:text-sm">
                    ¿Y si fueras tú? <span className="text-ysft-clay">· Coherencia</span>
                  </span>
                </motion.div>
              )}
              {current.overlay === "cta" && (
                <motion.div
                  key={`cta-${cut}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-md bg-black/70 px-3 py-1.5 text-[12px] text-fg"
                >
                  Suscríbete a <span className="font-semibold">NAVI Bienestar</span>
                </motion.div>
              )}
            </AnimatePresence>
            <span className="ml-auto hidden rounded bg-black/50 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-fg/70 uppercase sm:inline">
              Realización en directo
            </span>
          </div>
        </div>
      </div>

      {/* Camera bank */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {CAMERAS.map((c) => {
          const onAir = c.id === cam.id;
          return (
            <div key={c.id} className="flex flex-col gap-1.5">
              <div
                className={cn(
                  "relative aspect-video overflow-hidden rounded-md border transition-colors duration-150",
                  onAir ? "border-live" : "border-line",
                )}
              >
                <StudioFrame variant={c.variant} tone={TONE} />
                {onAir && <span className="absolute inset-0 ring-1 ring-live/60 ring-inset" />}
              </div>
              <span
                className={cn(
                  "truncate font-mono text-[9px] tracking-[0.12em] uppercase sm:text-[10px]",
                  onAir ? "text-fg" : "text-fg-4",
                )}
              >
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
