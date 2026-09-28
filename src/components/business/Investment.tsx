"use client";

import { motion } from "motion/react";
import { PROJECT_PRICE } from "@/config/presentation";
import { INVESTMENT_SCOPE } from "@/data/build";
import { formatNumber } from "@/lib/format";
import { EASE_OUT } from "@/components/ui/Reveal";
import { NaviOSMark } from "@/components/ui/Wordmark";

/** The price moment: one number, no tiers, no instalments. */
export function Investment() {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 1.1, delay, ease: EASE_OUT },
  });

  return (
    <div className="flex w-full flex-col items-center gap-10 text-center">
      <motion.div {...fade(0)}>
        <NaviOSMark className="text-3xl text-fg" />
      </motion.div>

      <motion.p {...fade(0.2)} className="max-w-2xl text-[15px] leading-relaxed text-balance text-fg-2">
        {INVESTMENT_SCOPE.join("  ·  ")}
      </motion.p>

      <motion.span
        className="h-px w-24 bg-line-2"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-hidden
      />

      <div className="flex flex-col items-center gap-4">
        <motion.span {...fade(0.7)} className="eyebrow">
          Inversión
        </motion.span>
        <motion.p
          className="display text-[clamp(5rem,15vw,13rem)] leading-[0.85] tracking-[-0.05em] text-fg"
          initial={{ opacity: 0, letterSpacing: "0.04em", filter: "blur(14px)" }}
          whileInView={{ opacity: 1, letterSpacing: "-0.05em", filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, delay: 0.9, ease: EASE_OUT }}
        >
          {formatNumber(PROJECT_PRICE)}&nbsp;€
        </motion.p>
        <motion.span {...fade(1.8)} className="font-mono text-sm tracking-[0.3em] text-gold uppercase">
          Pago único
        </motion.span>
      </div>

      <motion.div {...fade(2.3)} className="flex max-w-xl flex-col gap-2 text-sm text-fg-3">
        <p>Incluye el diseño, la arquitectura, el desarrollo y la implementación del sistema definido en esta propuesta.</p>
        <p className="text-xs text-fg-4">Condiciones de pago flexibles pueden acordarse de forma privada.</p>
      </motion.div>
    </div>
  );
}
