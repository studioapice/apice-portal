"use client";

import { AnimatePresence, motion } from "motion/react";
import { PRESENTATION } from "@/config/presentation";
import { BigStatement } from "@/components/ui/BigStatement";
import { EASE_OUT } from "@/components/ui/Reveal";

/** Closing: the callback to "el sistema", then the keynote lockup. */
export function Finale({ step }: { step: number }) {
  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div key="line" exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.7 } }} className="w-full">
            <BigStatement
              align="center"
              size="lg"
              lines={[
                "NAVI ya sabe producir historias.",
                { text: "Ahora toca construir el sistema", tone: "muted" },
                { text: "capaz de llevarlas más lejos.", tone: "muted" },
              ]}
            />
          </motion.div>
        ) : (
          <motion.div
            key="lockup"
            className="flex flex-col items-center gap-10 text-center"
            initial="hidden"
            animate="shown"
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.35, delayChildren: 0.6 } } }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, filter: "blur(16px)", letterSpacing: "0.1em" },
                shown: { opacity: 1, filter: "blur(0px)", letterSpacing: "-0.05em", transition: { duration: 1.8, ease: EASE_OUT } },
              }}
              className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.85] font-semibold"
            >
              NAVI <span className="font-light text-fg-3">OS</span>
            </motion.h2>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_OUT } } }}
              className="display flex flex-col gap-1 text-[clamp(1.4rem,2.6vw,2.4rem)] leading-tight"
            >
              <span className="text-fg">Del estudio a la audiencia.</span>
              <span className="text-fg-3">De la audiencia a la inteligencia.</span>
            </motion.div>
            <motion.p
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 1.4 } } }}
              className="font-mono text-[11px] tracking-[0.22em] text-fg-3 uppercase"
            >
              El creador pone la voz <span className="mx-3 text-gold">·</span> NAVI pone el sistema
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 1.4 } } }}
              className="text-xs text-fg-4"
            >
              {PRESENTATION.client} · {PRESENTATION.dateLabel}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
