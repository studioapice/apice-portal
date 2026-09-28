"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Hand, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TOOLS, type ToolId } from "@/components/ui/Glyphs";
import { CURRENT_WORKFLOW, TOOL_ISLANDS } from "@/data/workflow";
import { cn } from "@/lib/cn";
import { pad2 } from "@/lib/format";

const W = 1000;
const H = 560;
const STEP_MS = 1150;
const LOOP_PAUSE_MS = 2600;

interface Edge {
  from: ToolId;
  to: ToolId;
  at: number;
}

/** Tool changes along the journey (consecutive steps on different tools). */
const EDGES: Edge[] = CURRENT_WORKFLOW.slice(1).flatMap((step, i) => {
  const prev = CURRENT_WORKFLOW[i];
  return prev.tool === step.tool ? [] : [{ from: prev.tool, to: step.tool, at: i + 1 }];
});

export const TOOL_SWITCHES = EDGES.length;

export function CurrentWorkflow({ active }: { active: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    const last = tick >= CURRENT_WORKFLOW.length - 1;
    const id = window.setTimeout(() => setTick(last ? 0 : tick + 1), last ? LOOP_PAUSE_MS : STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, tick]);

  const step = CURRENT_WORKFLOW[tick];
  const pos = TOOL_ISLANDS[step.tool];

  const visits = useMemo(() => {
    const map = new Map<ToolId, number>();
    CURRENT_WORKFLOW.slice(0, tick + 1).forEach((s) => map.set(s.tool, (map.get(s.tool) ?? 0) + 1));
    return map;
  }, [tick]);

  const switchesSoFar = EDGES.filter((e) => e.at <= tick).length;

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
      {/* Map */}
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="packetGlow">
              <stop offset="0" stopColor="var(--color-gold)" stopOpacity="0.55" />
              <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Faint possible routes */}
          {EDGES.map((e, i) => {
            const a = TOOL_ISLANDS[e.from];
            const b = TOOL_ISLANDS[e.to];
            const visited = e.at <= tick;
            const current = e.at === tick;
            return (
              <g key={i}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={current ? "var(--color-gold)" : "rgba(255,255,255,0.9)"}
                  strokeOpacity={current ? 0.9 : visited ? 0.22 : 0.05}
                  strokeWidth={current ? 1.6 : 1}
                  strokeDasharray={visited ? "0" : "3 6"}
                  style={{ transition: "stroke-opacity 400ms, stroke 400ms" }}
                />
              </g>
            );
          })}
          {/* Packet */}
          <motion.g
            initial={false}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
          >
            <circle r="46" fill="url(#packetGlow)" />
            <circle r="6" fill="var(--color-gold)" />
          </motion.g>
        </svg>

        {/* Islands */}
        {(Object.keys(TOOL_ISLANDS) as ToolId[]).map((id) => {
          const p = TOOL_ISLANDS[id];
          const tool = TOOLS[id];
          const Icon = tool.icon;
          const isHere = step.tool === id;
          const count = visits.get(id) ?? 0;
          return (
            <div
              key={id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
            >
              <div
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-2.5 py-2 whitespace-nowrap transition-all duration-500 sm:px-3",
                  isHere
                    ? "border-gold/60 bg-ink-750 shadow-[0_0_40px_-8px_rgba(242,181,42,0.45)]"
                    : count > 0
                      ? "border-line-2 bg-ink-850"
                      : "border-line bg-ink-900",
                )}
              >
                <Icon className={cn("size-3.5 sm:size-4", isHere ? "text-gold" : "text-fg-3")} aria-hidden />
                <span className={cn("text-[10px] sm:text-xs", isHere ? "text-fg" : "text-fg-2")}>{tool.name}</span>
                {count > 1 && (
                  <span className="rounded-full bg-ink-600 px-1.5 font-mono text-[9px] text-fg-2">×{count}</span>
                )}
              </div>
              {/* Action chip */}
              <AnimatePresence>
                {isHere && (
                  <motion.div
                    key={tick}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="absolute -top-8 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-medium whitespace-nowrap text-ink-950 sm:text-[11px]"
                  >
                    {step.mode === "manual" ? (
                      <Hand className="size-3" aria-hidden />
                    ) : (
                      <Zap className="size-3" aria-hidden />
                    )}
                    {step.verb}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Counters */}
        <div className="absolute bottom-0 left-0 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-fg-3 uppercase sm:text-[11px]">
          <span>
            Paso <span className="tabular text-fg">{pad2(step.id)}</span> / {CURRENT_WORKFLOW.length}
          </span>
          <span>
            Cambios de herramienta <span className="tabular text-fg">{pad2(switchesSoFar)}</span>
          </span>
        </div>
      </div>

      {/* Step list */}
      <ol className="hidden flex-col gap-0.5 self-center lg:flex" aria-label="Recorrido actual del episodio">
        {CURRENT_WORKFLOW.map((s, i) => {
          const done = i < tick;
          const now = i === tick;
          return (
            <li
              key={s.id}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-[3px] text-[12px] transition-colors duration-300",
                now ? "bg-ink-750 text-fg" : done ? "text-fg-3" : "text-fg-4",
              )}
            >
              <span className="w-5 font-mono text-[10px] tabular">{pad2(s.id)}</span>
              <span className="flex-1 truncate">{s.label}</span>
              {done ? (
                <Check className="size-3 text-fg-3" aria-hidden />
              ) : (
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[0.1em] uppercase",
                    s.mode === "manual" ? (now ? "text-gold" : "text-fg-4") : "text-sys",
                  )}
                >
                  {s.mode === "manual" ? "manual" : "auto"}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
