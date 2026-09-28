"use client";

import { motion } from "motion/react";
import { PRESENTATION } from "@/config/presentation";
import { EASE_OUT } from "@/components/ui/Reveal";
import { NaviTree } from "@/components/ui/Wordmark";

/**
 * The reveal. Plays every time the scene becomes active so it can be
 * rehearsed; stays still (fully visible) with reduced motion.
 */
export function NaviOSReveal({ active }: { active: boolean }) {
  const state = active ? "shown" : "hidden";
  return (
    <div className="relative flex w-full flex-col items-center text-center">
      {/* Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[140vh] w-[140vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(244,242,238,0.085),transparent_70%)]"
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0, scale: 0.85 }, shown: { opacity: 1, scale: 1, transition: { duration: 2.4, ease: EASE_OUT } } }}
      />
      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/[0.06]"
          style={{ width: `${48 + i * 22}vmin` }}
          initial="hidden"
          animate={state}
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            shown: { opacity: 1, scale: 1, transition: { duration: 2.2, delay: 0.3 + i * 0.25, ease: EASE_OUT } },
          }}
        />
      ))}

      <motion.div
        className="relative mb-6"
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0, transition: { duration: 1.4, delay: 0.1, ease: EASE_OUT } } }}
      >
        <NaviTree className="h-14 sm:h-16" preload />
      </motion.div>

      <motion.span
        className="eyebrow relative mb-8"
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 1, delay: 0.2 } } }}
      >
        Presentamos
      </motion.span>

      <motion.h2
        className="relative font-display text-[clamp(4.5rem,15vw,15rem)] leading-[0.85] font-semibold tracking-[-0.05em]"
        initial="hidden"
        animate={state}
        variants={{
          hidden: { opacity: 0, letterSpacing: "0.12em", filter: "blur(18px)" },
          shown: {
            opacity: 1,
            letterSpacing: "-0.05em",
            filter: "blur(0px)",
            transition: { duration: 2, delay: 0.5, ease: EASE_OUT },
          },
        }}
      >
        NAVI <span className="font-light text-fg-3">OS</span>
      </motion.h2>

      <motion.p
        className="relative mt-10 max-w-2xl text-[clamp(1.1rem,1.8vw,1.7rem)] text-fg-2"
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 1.7, ease: EASE_OUT } } }}
      >
        {PRESENTATION.subtitle}
      </motion.p>

      <motion.p
        className="relative mt-14 font-mono text-[11px] tracking-[0.22em] text-fg-3 uppercase"
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 1.2, delay: 2.6 } } }}
      >
        El creador pone la voz <span className="mx-3 text-gold">·</span> NAVI pone el sistema
      </motion.p>
    </div>
  );
}
