"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface StepHintProps {
  visible: boolean;
  onAdvance: () => void;
  label?: string;
  className?: string;
}

/**
 * Discreet "continue" affordance for scenes with builds, so people scrolling
 * (instead of using the keyboard) can reveal the next beat.
 */
export function StepHint({ visible, onAdvance, label = "Continuar", className }: StepHintProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={onAdvance}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className={cn(
            "group absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs text-fg-3 transition-colors hover:border-line-2 hover:text-fg",
            className,
          )}
        >
          {label}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          <kbd className="ml-1 hidden rounded border border-line px-1 font-mono text-[10px] text-fg-4 sm:inline">→</kbd>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
