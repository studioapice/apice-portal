"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Minimal SVG/HTML charts. Conventions (dataviz skill): thin marks, 4px
 * rounded data-ends, 2px lines, hairline grids, selective labels, hover
 * tooltips, text in text tokens (never in the series color).
 */

function Tooltip({ children, x, y, align = "center" }: { children: ReactNode; x: string; y: string; align?: "center" | "left" | "right" }) {
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-none absolute z-10 rounded-md border border-line-2 bg-ink-800/95 px-2 py-1 text-[11px] whitespace-nowrap text-fg shadow-lg",
        align === "center" && "-translate-x-1/2",
        align === "right" && "-translate-x-full",
      )}
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Column chart                                                         */
/* ------------------------------------------------------------------ */

interface ColumnChartProps {
  data: Array<{ label: string; value: number }>;
  format: (v: number) => string;
  height?: number;
  /** Index of the column the story is about (accent). */
  highlight?: number;
  ticks?: number[];
  ariaLabel: string;
}

export function ColumnChart({ data, format, height = 160, highlight, ticks, ariaLabel }: ColumnChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const max = ticks ? ticks[ticks.length - 1] : Math.max(...data.map((d) => d.value)) * 1.15;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative" style={{ height }} role="img" aria-label={ariaLabel}>
        {ticks?.map((t) => (
          <div key={t} className="absolute right-0 left-9 border-t border-line" style={{ bottom: `${(t / max) * 100}%` }}>
            <span className="absolute -top-2 -left-9 w-7 text-right font-mono text-[9.5px] text-fg-4 tabular">{format(t)}</span>
          </div>
        ))}
        <div className={cn("absolute inset-y-0 right-0 flex items-end justify-around", ticks ? "left-9" : "left-0")}>
          {data.map((d, i) => {
            const pct = (d.value / max) * 100;
            const accent = i === highlight;
            return (
              <div
                key={d.label}
                className="relative flex h-full flex-1 items-end justify-center"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
              >
                <motion.span
                  className={cn("block w-full max-w-6 rounded-t-[4px]", accent ? "bg-gold" : hover === i ? "bg-fg-2" : "bg-fg-3/70")}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                />
                {(accent || hover === i) && (
                  <span
                    className="absolute -translate-y-1.5 font-mono text-[10.5px] text-fg tabular"
                    style={{ bottom: `${pct}%` }}
                  >
                    {format(d.value)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={cn("flex justify-around font-mono text-[10px] text-fg-3", ticks && "ml-9")}>
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Line chart with area wash + crosshair                               */
/* ------------------------------------------------------------------ */

interface LineChartProps {
  points: Array<[number, number]>;
  xMin?: number;
  xMax: number;
  yMax: number;
  height?: number;
  formatX: (x: number) => string;
  formatY: (y: number) => string;
  yTicks: number[];
  xTicks: number[];
  /** Shaded x-range (e.g. first 90 seconds). */
  band?: [number, number];
  bandLabel?: string;
  /** Optional marked point. */
  marker?: { x: number; y: number; label: string };
  color?: string;
  ariaLabel: string;
}

function interpolate(points: Array<[number, number]>, x: number): number {
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return points[points.length - 1][1];
}

export function LineChart({
  points,
  xMin = 0,
  xMax,
  yMax,
  height = 170,
  formatX,
  formatY,
  yTicks,
  xTicks,
  band,
  bandLabel,
  marker,
  color = "var(--color-gold)",
  ariaLabel,
}: LineChartProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [hoverX, setHoverX] = useState<number | null>(null);
  const W = 100;
  const H = 100;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const sy = (y: number) => H - (y / yMax) * H;
  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`).join(" ");
  const area = `${d} L${W} ${H} L0 ${H} Z`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative ml-9" style={{ height }}>
        {yTicks.map((t) => (
          <div key={t} className="absolute inset-x-0 border-t border-line" style={{ top: `${(sy(t) / H) * 100}%` }}>
            <span className="absolute -top-2 -left-9 w-7 text-right font-mono text-[9.5px] text-fg-4 tabular">{formatY(t)}</span>
          </div>
        ))}
        {band && (
          <div
            className="absolute inset-y-0 bg-fg/[0.05]"
            style={{ left: `${sx(band[0])}%`, width: `${sx(band[1]) - sx(band[0])}%` }}
          >
            {bandLabel && (
              <span className="absolute bottom-1 left-1.5 font-mono text-[9.5px] whitespace-nowrap text-fg-3">{bandLabel}</span>
            )}
          </div>
        )}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="img"
          aria-label={ariaLabel}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = xMin + ((e.clientX - r.left) / r.width) * (xMax - xMin);
            setHoverX(Math.max(xMin, Math.min(xMax, x)));
          }}
          onPointerLeave={() => setHoverX(null)}
        >
          <defs>
            <clipPath id={`clip${uid}`}>
              <motion.rect
                x="0"
                y="-5"
                height="110"
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </clipPath>
          </defs>
          <g clipPath={`url(#clip${uid})`}>
            <path d={area} fill={color} opacity="0.1" />
            <path d={d} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
          </g>
          {hoverX !== null && (
            <line x1={sx(hoverX)} x2={sx(hoverX)} y1="0" y2={H} stroke="var(--color-fg-3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          )}
        </svg>
        {marker && (
          <span
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-ink-850"
            style={{ left: `${sx(marker.x)}%`, top: `${(sy(marker.y) / H) * 100}%`, background: color }}
          />
        )}
        {hoverX !== null && (
          <>
            <span
              className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-ink-850"
              style={{ left: `${sx(hoverX)}%`, top: `${(sy(interpolate(points, hoverX)) / H) * 100}%`, background: color }}
            />
            <Tooltip
              x={`${sx(hoverX)}%`}
              y="-30px"
              align={sx(hoverX) > 80 ? "right" : sx(hoverX) < 20 ? "left" : "center"}
            >
              {formatX(hoverX)} · <span className="font-mono">{formatY(interpolate(points, hoverX))}</span>
            </Tooltip>
          </>
        )}
      </div>
      <div className="relative ml-9 h-3 font-mono text-[10px] text-fg-3">
        {xTicks.map((t) => (
          <span key={t} className="absolute -translate-x-1/2" style={{ left: `${sx(t)}%` }}>
            {formatX(t)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal stacked bars                                             */
/* ------------------------------------------------------------------ */

interface StackedBarsProps {
  rows: Array<{ label: ReactNode; key: string; segments: Record<string, number | undefined> }>;
  series: Array<{ id: string; label: string; color: string }>;
  format: (v: number) => string;
  max: number;
  ariaLabel: string;
}

export function StackedBars({ rows, series, format, max, ariaLabel }: StackedBarsProps) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3" role="img" aria-label={ariaLabel}>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-fg-2" aria-label="Leyenda">
        {series.map((s) => (
          <li key={s.id} className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-[3px]" style={{ background: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>
      {rows.map((row, ri) => {
        const total = series.reduce((a, s) => a + (row.segments[s.id] ?? 0), 0);
        return (
          <div key={row.key} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3 text-[12px]">
              <span className="min-w-0 truncate text-fg-2">{row.label}</span>
              <span className="font-mono text-fg tabular">{format(total)}</span>
            </div>
            <div className="relative flex h-3 w-full gap-[2px]">
              {series.map((s, si) => {
                const v = row.segments[s.id];
                if (!v) return null;
                const id = `${row.key}-${s.id}`;
                return (
                  <motion.span
                    key={s.id}
                    className={cn(
                      "relative h-full first:rounded-l-[4px] last:rounded-r-[4px]",
                      hover && hover !== id && "opacity-50",
                    )}
                    style={{ background: s.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(v / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.15 + ri * 0.12 + si * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    onPointerEnter={() => setHover(id)}
                    onPointerLeave={() => setHover(null)}
                  >
                    {hover === id && (
                      <Tooltip x="50%" y="-28px">
                        {s.label} · <span className="font-mono">{format(v)}</span>
                      </Tooltip>
                    )}
                  </motion.span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sparkline                                                           */
/* ------------------------------------------------------------------ */

export function Sparkline({ values, className }: { values: readonly number[]; className?: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 100, 100 - ((v - min) / range) * 80 - 10] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <div className={cn("relative h-8 w-full", className)} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={d} fill="none" stroke="var(--color-fg-3)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      <span
        className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-2 ring-ink-850"
        style={{ left: `${last[0]}%`, top: `${last[1]}%` }}
      />
    </div>
  );
}
