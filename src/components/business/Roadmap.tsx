"use client";

import { motion } from "motion/react";
import { BETA_WEEKS_MAX, BETA_WEEKS_MIN } from "@/config/presentation";
import { BETA_AFTER_PHASE, ROADMAP } from "@/data/build";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/components/ui/Reveal";

/** Macro roadmap: 8 phases, beta marker, no absolute dates. */
export function Roadmap() {
  return (
    <div className="relative flex w-full flex-col gap-6 lg:pt-10">
      {/* Track */}
      <div className="relative hidden h-px w-full bg-line-2 lg:block" aria-hidden>
        <motion.div
          className="absolute inset-y-0 left-0 bg-gold"
          initial={{ width: 0 }}
          whileInView={{ width: `${((BETA_AFTER_PHASE + 1) / ROADMAP.length) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE_OUT }}
        />
        <div
          className="absolute -top-9 flex -translate-x-1/2 flex-col items-center gap-1"
          style={{ left: `${((BETA_AFTER_PHASE + 1) / ROADMAP.length) * 100}%` }}
        >
          <span className="rounded-full bg-gold px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] whitespace-nowrap text-ink-950 uppercase">
            Beta operativa estimada · {BETA_WEEKS_MIN}–{BETA_WEEKS_MAX} semanas
          </span>
          <span className="h-5 w-px bg-gold" />
        </div>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-8">
        {ROADMAP.map((p, i) => {
          const beforeBeta = p.phase <= BETA_AFTER_PHASE;
          return (
            <motion.li
              key={p.phase}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: EASE_OUT }}
              className={cn(
                "flex flex-col gap-3 rounded-xl border p-4",
                beforeBeta ? "border-gold/25 bg-gold/[0.03]" : "border-line bg-ink-850",
              )}
            >
              <span className={cn("font-mono text-[11px]", beforeBeta ? "text-gold" : "text-fg-3")}>Fase {p.phase}</span>
              <span className="text-[14px] leading-snug text-fg">{p.name}</span>
              <span className="text-[11.5px] leading-snug text-fg-3">{p.out}</span>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
