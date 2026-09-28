"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { CURRENT_PROGRAMS, KNOWN_HOURS_WEEK, SCALING_STEPS, WORKDAY_HOURS } from "@/config/presentation";
import { projectWeeklyHours, toWorkdays } from "@/lib/metrics";
import { cn } from "@/lib/cn";
import { formatFixed, formatNumber } from "@/lib/format";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ClaimTag } from "@/components/ui/ClaimTag";

const MAX_TILES = SCALING_STEPS[SCALING_STEPS.length - 1];
const CHART_MAX = Math.ceil(projectWeeklyHours(MAX_TILES) / 20) * 20;
const TICKS = Array.from({ length: CHART_MAX / 20 + 1 }, (_, i) => i * 20);

interface ScalingVisualizationProps {
  step: number;
  onSelect: (step: number) => void;
}

export function ScalingVisualization({ step, onSelect }: ScalingVisualizationProps) {
  const programs = SCALING_STEPS[step];
  const hours = projectWeeklyHours(programs);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
      {/* Program tiles */}
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2" role="img" aria-label={`${programs} programas`}>
          {Array.from({ length: MAX_TILES }, (_, i) => {
            const lit = i < programs;
            const today = i < CURRENT_PROGRAMS;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: lit ? 1 : 0.45,
                  scale: lit ? 1 : 0.86,
                }}
                transition={{ duration: 0.5, delay: lit ? Math.max(0, i - CURRENT_PROGRAMS) * 0.012 : 0 }}
                className={cn(
                  "aspect-square rounded-[5px] border",
                  today
                    ? "border-gold/50 bg-gold/15"
                    : lit
                      ? "border-line-2 bg-ink-600"
                      : "border-line bg-transparent",
                )}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-5 text-xs text-fg-3">
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-[3px] border border-gold/50 bg-gold/15" /> Programas hoy
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-[3px] border border-line-2 bg-ink-600" /> Crecimiento
          </span>
        </div>
      </div>

      {/* Numbers + chart */}
      <div className="flex flex-col gap-7">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Número de programas">
          <span className="mr-2 text-xs text-fg-3">Programas activos</span>
          {SCALING_STEPS.map((n, i) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={i === step}
              aria-label={`${n} programas`}
              onClick={() => onSelect(i)}
              className={cn(
                "min-w-11 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
                i === step ? "border-gold/60 bg-gold/10 text-gold" : "border-line text-fg-3 hover:text-fg",
              )}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <ClaimTag kind={step === 0 ? "actual" : "projection"} />
          <div className="display flex items-baseline gap-2 text-[clamp(3.4rem,6.5vw,6.5rem)] leading-none">
            <span className="text-[0.5em] text-fg-3">~</span>
            <AnimatedNumber value={hours} live format={(v) => formatNumber(v, 0)} />
            <span className="text-[0.32em] font-normal tracking-normal text-fg-2">h / semana</span>
          </div>
          <p className="text-sm text-fg-2">
            ≈ {formatFixed(toWorkdays(hours), 1)} jornadas de {WORKDAY_HOURS} h cada semana, solo en las capas medidas.
          </p>
        </div>

        {/* Column chart — single series, selective labels */}
        <figure className="flex flex-col gap-2">
          <figcaption className="text-xs text-fg-3">Horas semanales identificadas por nº de programas</figcaption>
          <div className="relative h-44 w-full">
            {/* Grid */}
            {TICKS.map((t) => (
              <div
                key={t}
                className="absolute right-0 left-8 border-t border-line"
                style={{ bottom: `${(t / CHART_MAX) * 100}%` }}
              >
                <span className="absolute -top-2 -left-8 w-6 text-right font-mono text-[10px] text-fg-4 tabular">{t}</span>
              </div>
            ))}
            <div className="absolute inset-y-0 right-0 left-8 flex items-end justify-around">
              {SCALING_STEPS.map((n, i) => {
                const v = projectWeeklyHours(n);
                const on = i <= step;
                const isCurrent = i === step;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onSelect(i)}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    aria-label={`${n} programas: ${formatFixed(v, 1)} horas por semana`}
                    className="relative flex h-full w-14 items-end justify-center"
                  >
                    <motion.span
                      initial={false}
                      animate={{ height: `${(v / CHART_MAX) * 100}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "block w-6 rounded-t-[4px] transition-colors duration-500",
                        isCurrent ? "bg-gold" : on ? "bg-fg-3" : "bg-ink-600",
                      )}
                    />
                    {(isCurrent || hover === i) && (
                      <span className="absolute -translate-y-1 font-mono text-[11px] text-fg tabular" style={{ bottom: `${(v / CHART_MAX) * 100}%` }}>
                        {formatFixed(v, 1)} h
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="ml-8 flex justify-around font-mono text-[10px] text-fg-3">
            {SCALING_STEPS.map((n) => (
              <span key={n} className="w-14 text-center">
                {n}
              </span>
            ))}
          </div>
        </figure>

        <p className="text-xs leading-relaxed text-fg-3">
          Proyección ilustrativa si la carga actual creciera proporcionalmente. Base: {KNOWN_HOURS_WEEK} h / semana con{" "}
          {CURRENT_PROGRAMS} programas (dato actual). No representa una previsión exacta.
        </p>
      </div>
    </div>
  );
}
