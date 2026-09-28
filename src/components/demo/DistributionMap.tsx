"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, FolderOpen, Package, Play, Table2 } from "lucide-react";
import { CLIP_RULES } from "@/config/presentation";
import { CLIPS, CLIP_SCHEDULE, DISTRIBUTION_TASKS, EPISODE_SCHEDULE } from "@/data/demo";
import { cn } from "@/lib/cn";
import { PLATFORM_LABEL, PlatformIcon, type PlatformId } from "@/components/ui/Glyphs";
import { StudioFrame } from "@/components/visuals/StudioFrame";
import { CLIP_TONES, clipVariant } from "./ClipSelector";

const PLATFORMS: PlatformId[] = ["instagram", "tiktok", "shorts"];

/** Index of the task that schedules each platform. */
const PLATFORM_TASK: Record<string, number> = {
  instagram: DISTRIBUTION_TASKS.indexOf("Programando Instagram"),
  tiktok: DISTRIBUTION_TASKS.indexOf("Programando TikTok"),
  shorts: DISTRIBUTION_TASKS.indexOf("Programando YouTube Shorts"),
};

const DESTINATIONS = [
  { id: "youtube", icon: Play, label: "YouTube", detail: `Episodio · ${EPISODE_SCHEDULE}`, tasks: ["Actualizando YouTube", "Asignando thumbnail"] },
  { id: "dropbox", icon: FolderOpen, label: "Dropbox", detail: "Social Clips NAVI + Programa", tasks: ["Organizando Dropbox", "Guardando Social Clips NAVI"] },
  { id: "host", icon: Package, label: "Host Package", detail: "Entrega preparada para el programa", tasks: ["Creando Host Package", "Preparando entrega"] },
  { id: "airtable", icon: Table2, label: "Airtable", detail: "Registro actualizado", tasks: ["Actualizando Airtable"] },
] as const;

interface DistributionMapProps {
  selection: string[];
  /** Number of tasks completed. */
  step: number;
}

export function DistributionMap({ selection, step }: DistributionMapProps) {
  const taskDone = (name: string) => DISTRIBUTION_TASKS.indexOf(name as (typeof DISTRIBUTION_TASKS)[number]) < step;
  const clips = selection.map((id) => CLIPS.find((c) => c.id === id)!).filter(Boolean);
  const rowY = (i: number) => ((i * 2 + 1) / 6) * 100;

  return (
    <div className="grid h-full gap-5 lg:grid-cols-[minmax(0,1fr)_230px]">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-sys/40 bg-sys/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-sys uppercase">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-sys" />
            NAVI OS trabajando
          </span>
          <h3 className="text-xl text-fg">Distribución automática</h3>
          <p className="text-[13px] text-fg-3">Cada clip va donde dicta la regla. Sin descargar, subir ni copiar a mano.</p>
        </div>

        {/* Map */}
        <div className="grid grid-cols-[150px_minmax(0,1fr)_170px] items-stretch sm:grid-cols-[170px_minmax(0,1fr)_190px]">
          <ul className="flex flex-col justify-around gap-2">
            {clips.map((c, i) => (
              <li key={c.id} className="flex items-center gap-2.5">
                <div className="relative aspect-[9/16] w-10 shrink-0 overflow-hidden rounded-md border border-gold/50">
                  <StudioFrame vertical variant={clipVariant(c)} tone={CLIP_TONES[c.frame]} />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-[11px] font-semibold text-gold">NAVI #{i + 1}</span>
                  <span className="line-clamp-2 text-[11px] leading-tight text-fg-2">{c.title}</span>
                </div>
              </li>
            ))}
          </ul>

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[260px] w-full xl:h-[320px]" aria-hidden>
            {CLIP_RULES.flatMap((rule) =>
              rule.platforms.map((p) => {
                const from = rowY(rule.rank - 1);
                const to = rowY(PLATFORMS.indexOf(p));
                const live = PLATFORM_TASK[p] < step;
                const d = `M0 ${from} C 50 ${from}, 50 ${to}, 100 ${to}`;
                return (
                  <g key={`${rule.rank}-${p}`}>
                    <path d={d} fill="none" stroke="var(--color-fg-4)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
                    {live && (
                      <>
                        <motion.path
                          d={d}
                          fill="none"
                          stroke="var(--color-gold)"
                          strokeWidth="1.5"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                        />
                        <path d={d} fill="none" stroke="var(--color-fg)" strokeOpacity="0.6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="dash-flow" />
                      </>
                    )}
                  </g>
                );
              }),
            )}
          </svg>

          <ul className="flex flex-col justify-around gap-2">
            {PLATFORMS.map((p) => {
              const live = PLATFORM_TASK[p] < step;
              const ranks = CLIP_RULES.filter((r) => (r.platforms as readonly string[]).includes(p)).map((r) => r.rank);
              return (
                <li
                  key={p}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-lg border px-3 py-2 transition-colors duration-500",
                    live ? "border-ok/40 bg-ok/[0.05]" : "border-line bg-ink-900",
                  )}
                >
                  <span className="flex items-center justify-between gap-2 text-xs text-fg">
                    <span className="inline-flex items-center gap-2">
                      <PlatformIcon platform={p} className="size-3.5" />
                      {PLATFORM_LABEL[p]}
                    </span>
                    {live && <Check className="size-3.5 text-ok" aria-label="Programado" />}
                  </span>
                  <span className="flex flex-wrap gap-x-2 font-mono text-[10px] text-fg-3">
                    {ranks.map((r) => (
                      <span key={r} className={live ? "text-fg-2" : "text-fg-4"}>
                        #{r} · {CLIP_SCHEDULE[r]}
                      </span>
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Other destinations */}
        <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
          {DESTINATIONS.map((d) => {
            const done = d.tasks.every((t) => taskDone(t));
            const Icon = d.icon;
            return (
              <div
                key={d.id}
                className={cn(
                  "flex items-start gap-2.5 rounded-lg border px-3 py-2.5 transition-colors duration-500",
                  done ? "border-ok/30" : "border-line",
                )}
              >
                <Icon className={cn("mt-0.5 size-3.5 shrink-0", done ? "text-ok" : "text-fg-4")} aria-hidden />
                <div className="flex min-w-0 flex-col">
                  <span className="text-xs text-fg">{d.label}</span>
                  <span className="truncate text-[10.5px] text-fg-3">{d.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task list */}
      <ol className="flex flex-col gap-1 rounded-xl border border-line bg-ink-900 p-3" aria-label="Tareas automáticas" aria-live="polite">
        {DISTRIBUTION_TASKS.map((t, i) => {
          const done = i < step;
          const now = i === step;
          return (
            <li key={t} className={cn("flex items-center justify-between gap-2 rounded px-1.5 py-[5px] text-[12px]", now && "bg-ink-750")}>
              <span className={done ? "text-fg-2" : now ? "text-fg" : "text-fg-4"}>{t}</span>
              <AnimatePresence>
                {done ? (
                  <motion.span key="ok" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <Check className="size-3.5 text-ok" aria-label="Hecho" />
                  </motion.span>
                ) : now ? (
                  <span className="size-1.5 animate-pulse-soft rounded-full bg-sys" />
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
