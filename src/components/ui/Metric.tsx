"use client";

import type { ReactNode } from "react";
import type { ClaimKind } from "@/lib/claims";
import { cn } from "@/lib/cn";
import { AnimatedNumber } from "./AnimatedNumber";
import { ClaimTag } from "./ClaimTag";
import { Reveal } from "./Reveal";

interface MetricProps {
  value: number;
  digits?: number;
  format?: (n: number) => string;
  prefix?: ReactNode;
  unit?: ReactNode;
  label: ReactNode;
  sub?: ReactNode;
  claim?: ClaimKind;
  size?: "sm" | "md" | "lg" | "xl";
  accent?: boolean;
  className?: string;
  delay?: number;
}

const VALUE_SIZE = {
  sm: "text-3xl",
  md: "text-[clamp(2.4rem,3.6vw,3.4rem)]",
  lg: "text-[clamp(3rem,5.2vw,5.2rem)]",
  xl: "text-[clamp(4rem,9vw,9rem)]",
} as const;

/** A single figure with label, unit and claim tag. */
export function Metric({
  value,
  digits,
  format,
  prefix,
  unit,
  label,
  sub,
  claim,
  size = "md",
  accent,
  className,
  delay = 0,
}: MetricProps) {
  return (
    <Reveal delay={delay} className={cn("flex flex-col gap-3", className)}>
      {claim && <ClaimTag kind={claim} />}
      <div
        className={cn(
          "display flex items-baseline gap-1 leading-none",
          VALUE_SIZE[size],
          accent ? "text-gold" : "text-fg",
        )}
      >
        {prefix && <span className="text-[0.6em] text-fg-3">{prefix}</span>}
        <AnimatedNumber value={value} digits={digits} format={format} />
        {unit && <span className="ml-1 text-[0.42em] font-normal tracking-normal text-fg-2">{unit}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-fg">{label}</span>
        {sub && <span className="text-xs leading-relaxed text-fg-3">{sub}</span>}
      </div>
    </Reveal>
  );
}

/** Responsive grid of metrics separated by hairlines. */
export function MetricGrid({
  children,
  columns = 3,
  className,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-x-10 gap-y-10",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
