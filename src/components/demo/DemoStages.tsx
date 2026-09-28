"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "motion/react";
import { ArrowRight, Check, FileVideo, FolderSearch } from "lucide-react";
import { DEMO_EPISODE, DETECTION_CHECKS, ENGINES, PROGRAM_CONTEXT } from "@/data/demo";
import { cn } from "@/lib/cn";
import { formatFixed } from "@/lib/format";
import { EASE_OUT } from "@/components/ui/Reveal";
import { DETECT_TOTAL, engineProgress } from "./demoMachine";
import { ProcessingNode } from "./ProcessingNode";

/* ------------------------------------------------------------------ */
/* Idle                                                                */
/* ------------------------------------------------------------------ */

export function IdleStage({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
      <div className="relative flex size-36 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-sys/30"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.25, opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }}
          />
        ))}
        <span className="relative flex size-16 items-center justify-center rounded-2xl border border-line-2 bg-ink-800">
          <FolderSearch className="size-7 text-sys" aria-hidden />
        </span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.16em] text-fg-3 uppercase">Escuchando nuevos renders</span>
        <p className="max-w-md font-mono text-xs leading-relaxed text-fg-2">{DEMO_EPISODE.file.path}</p>
        <p className="mt-2 text-sm text-fg-3">
          {DEMO_EPISODE.program} · “{DEMO_EPISODE.label}” · grabación finalizada en {DEMO_EPISODE.studio}
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="group inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-[15px] font-medium text-ink-950 shadow-[0_0_60px_-10px_rgba(242,181,42,0.6)] transition-transform hover:scale-[1.02]"
      >
        Simular nuevo render
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Render detected                                                     */
/* ------------------------------------------------------------------ */

export function DetectStage({ step }: { step: number }) {
  const contextLoaded = step >= DETECT_TOTAL;
  return (
    <div className="grid h-full content-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
      <div className="flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-xl border border-gold/40 bg-ink-850 p-4"
        >
          <span className="absolute inset-0 animate-scan bg-gradient-to-r from-transparent via-gold/[0.06] to-transparent" aria-hidden />
          <div className="relative flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/15">
              <FileVideo className="size-5 text-gold" aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.16em] text-gold uppercase">New render detected</span>
              <span className="truncate font-mono text-sm text-fg">{DEMO_EPISODE.file.name}</span>
              <span className="font-mono text-[11px] text-fg-3">
                {DEMO_EPISODE.file.resolution} · {DEMO_EPISODE.file.duration} · {DEMO_EPISODE.file.size}
              </span>
            </div>
          </div>
        </motion.div>

        <ul className="flex flex-col divide-y divide-line rounded-xl border border-line">
          {DETECTION_CHECKS.map((c, i) => {
            const done = step > i;
            return (
              <li key={c.label} className="flex items-center gap-3 px-4 py-3">
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    done ? "border-ok bg-ok text-ink-950" : "border-line-2",
                  )}
                >
                  {done && <Check className="size-3" aria-hidden />}
                </span>
                <span className="w-20 font-mono text-[11px] tracking-[0.1em] text-fg-3 uppercase">{c.label}</span>
                <motion.span
                  initial={false}
                  animate={{ opacity: done ? 1 : 0.25 }}
                  className="flex min-w-0 flex-1 items-baseline justify-between gap-3"
                >
                  <span className="text-[13px] text-fg">{c.result}</span>
                  <span className="truncate text-xs text-fg-3">{done ? c.detail : "…"}</span>
                </motion.span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img src="/brand/programs/ysft-sello.png" alt="" className="size-11 rounded-full bg-ysft-paper object-contain p-0.5" />
          <div className="flex flex-col">
            <span className="text-sm text-fg">{DEMO_EPISODE.program}</span>
            <span className="text-xs text-fg-3">
              {DEMO_EPISODE.hosts.join(" · ")} · {DEMO_EPISODE.network}
            </span>
          </div>
          <span
            className={cn(
              "ml-auto font-mono text-[10px] tracking-[0.14em] uppercase transition-colors",
              contextLoaded ? "text-ok" : "text-fg-4",
            )}
          >
            {contextLoaded ? "Contexto cargado" : "Cargando contexto"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PROGRAM_CONTEXT.map((item, i) => (
            <motion.div
              key={item.label}
              initial={false}
              animate={{ opacity: contextLoaded ? 1 : 0.18, y: contextLoaded ? 0 : 6 }}
              transition={{ delay: contextLoaded ? i * 0.06 : 0, duration: 0.45 }}
              className="flex flex-col gap-0.5 rounded-lg border border-line bg-ink-900 px-3 py-2.5"
            >
              <span className="font-mono text-[9.5px] tracking-[0.12em] text-fg-4 uppercase">{item.label}</span>
              <span className="truncate text-[12px] text-fg-2">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Processing                                                          */
/* ------------------------------------------------------------------ */

export function ProcessingStage({ elapsed }: { elapsed: number }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-ink-850 px-3 py-1 text-xs text-fg">
          <img src="/brand/programs/ysft-sello.png" alt="" className="size-5 rounded-full bg-ysft-paper object-contain" />
          {DEMO_EPISODE.programShort} · {DEMO_EPISODE.label}
        </span>
        {/* Fan-out connectors */}
        <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="hidden h-8 w-full xl:block" aria-hidden>
          {[50, 150, 250, 350, 450].map((x, i) => (
            <path
              key={x}
              d={`M250 0 C 250 22, ${x} 18, ${x} 40`}
              fill="none"
              stroke={engineProgress(ENGINES[i].duration, elapsed) >= 1 ? "var(--color-ok)" : "var(--color-sys)"}
              strokeOpacity="0.55"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="dash-flow"
            />
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {ENGINES.map((e) => (
          <ProcessingNode
            key={e.id}
            id={e.id}
            name={e.name}
            verb={e.verb}
            done={e.done}
            progress={engineProgress(e.duration, elapsed)}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-fg-3">
        <span>Procesos en paralelo. Nadie tiene que vigilar esta pantalla: NAVI OS avisa cuando necesita una decisión.</span>
        <span className="font-mono tabular">Tiempo simulado ≈ {formatFixed(elapsed, 0)} min</span>
      </div>
    </div>
  );
}
