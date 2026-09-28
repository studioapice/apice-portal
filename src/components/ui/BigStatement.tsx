"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "./Reveal";

export type StatementTone = "default" | "muted" | "gold" | "faint";

export interface StatementLine {
  text: ReactNode;
  tone?: StatementTone;
}

interface BigStatementProps {
  lines: Array<ReactNode | StatementLine>;
  size?: "md" | "lg" | "xl" | "2xl";
  align?: "left" | "center";
  className?: string;
  /** Stagger between lines, seconds. */
  stagger?: number;
  delay?: number;
  /** When provided, lines animate on this flag instead of on view. */
  show?: boolean;
  as?: "h1" | "h2" | "p";
}

const SIZE: Record<NonNullable<BigStatementProps["size"]>, string> = {
  md: "text-[clamp(1.9rem,3.4vw,3.4rem)]",
  lg: "text-[clamp(2.3rem,4.6vw,4.8rem)]",
  xl: "text-[clamp(2.8rem,6.2vw,6.6rem)]",
  "2xl": "text-[clamp(3.4rem,9vw,10rem)]",
};

const TONE: Record<StatementTone, string> = {
  default: "text-fg",
  muted: "text-fg-3",
  faint: "text-fg-4",
  gold: "text-gold",
};

const MOTION_TAG = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
} as const;

function isLine(value: unknown): value is StatementLine {
  return typeof value === "object" && value !== null && "text" in value;
}

/**
 * Large cinematic statement with a line-by-line mask reveal. The trigger
 * lives on the parent: masked children have no visible intersection, so an
 * in-view observer on them would never fire.
 */
export function BigStatement({
  lines,
  size = "xl",
  align = "left",
  className,
  stagger = 0.12,
  delay = 0,
  show,
  as = "h2",
}: BigStatementProps) {
  const Tag = MOTION_TAG[as];
  const controlled = show !== undefined;

  const lineVariants: Variants = {
    hidden: { y: "105%", opacity: 0, transition: { duration: 0.4 } },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 1.05, delay: delay + i * stagger, ease: EASE_OUT },
    }),
  };

  return (
    <Tag
      className={cn("display text-balance", SIZE[size], align === "center" && "text-center", className)}
      initial="hidden"
      {...(controlled
        ? { animate: show ? "visible" : "hidden" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.3 } })}
    >
      {lines.map((raw, i) => {
        const line = isLine(raw) ? raw : { text: raw };
        return (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span className={cn("block", TONE[line.tone ?? "default"])} variants={lineVariants} custom={i}>
              {line.text}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
