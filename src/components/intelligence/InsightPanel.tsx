"use client";

import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";
import { INSIGHTS } from "@/data/performance";
import { pad2 } from "@/lib/format";
import { EASE_OUT } from "@/components/ui/Reveal";

/** The three patterns NAVI OS surfaces for the next episode. */
export function InsightPanel() {
  return (
    <ol className="flex flex-col gap-3">
      {INSIGHTS.map((ins, i) => (
        <motion.li
          key={ins.id}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.25, ease: EASE_OUT }}
          className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 rounded-2xl border border-line bg-ink-850 p-5"
        >
          <span className="font-mono text-xs text-gold">{pad2(i + 1)}</span>
          <div className="flex flex-col gap-2">
            <p className="text-[15px] leading-snug text-fg">{ins.title}</p>
            <p className="text-xs text-fg-2">
              <span className="font-mono">{ins.evidence}</span>
              <span className="mx-2 text-fg-4">·</span>
              <span className="text-fg-3">{ins.basis}</span>
            </p>
          </div>
          <span />
          <p className="flex items-start gap-2 border-t border-line pt-3 text-xs text-fg-2">
            <Lightbulb className="mt-px size-3.5 shrink-0 text-gold" aria-hidden />
            <span>
              <span className="text-fg-3">Para el próximo episodio · </span>
              {ins.suggestion}
            </span>
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

const LOOP = ["Publicado", "Datos", "Aprendizaje", "Mejor próximo episodio"];

/** PUBLISHED → DATA → LEARNING → BETTER NEXT EPISODE */
export function LearningLoop() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Ciclo: publicado, datos, aprendizaje, mejor próximo episodio">
      {LOOP.map((step, i) => (
        <motion.span
          key={step}
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
        >
          <span
            className={
              i === LOOP.length - 1
                ? "rounded-full border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs text-gold"
                : "rounded-full border border-line-2 px-3 py-1.5 text-xs text-fg-2"
            }
          >
            {step}
          </span>
          {i < LOOP.length - 1 && <span className="text-fg-4">→</span>}
        </motion.span>
      ))}
      <motion.span
        className="text-xs text-fg-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        ↺
      </motion.span>
    </div>
  );
}
