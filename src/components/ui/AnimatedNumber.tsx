"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/format";

interface AnimatedNumberProps {
  value: number;
  /** Decimal digits. */
  digits?: number;
  /** Custom formatter (overrides digits). */
  format?: (n: number) => string;
  duration?: number;
  from?: number;
  className?: string;
  /** Re-animate from the previous value whenever `value` changes. */
  live?: boolean;
}

/**
 * Counts up when entering the viewport. Writes to the DOM directly to avoid
 * re-rendering on every frame.
 */
export function AnimatedNumber({
  value,
  digits = 0,
  format,
  duration = 1.4,
  from = 0,
  className,
  live = false,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const lastRef = useRef(live ? value : from);
  const fmt = format ?? ((n: number) => formatNumber(n, digits));
  const fmtRef = useRef(fmt);
  // Text rendered by React never changes after mount: the DOM is driven by
  // the animation below, so React never fights it.
  const [initialText] = useState(() => fmt(live ? value : from));

  useEffect(() => {
    fmtRef.current = fmt;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    const start = live ? lastRef.current : from;
    if (reduced) {
      node.textContent = fmtRef.current(value);
      lastRef.current = value;
      return;
    }
    const controls = animate(start, value, {
      duration: live ? Math.min(duration, 0.6) : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = fmtRef.current(v);
      },
      onComplete: () => {
        lastRef.current = value;
      },
    });
    return () => {
      controls.stop();
      lastRef.current = value;
    };
  }, [inView, value, from, duration, reduced, live]);

  return (
    <span ref={ref} className={className}>
      {initialText}
    </span>
  );
}
