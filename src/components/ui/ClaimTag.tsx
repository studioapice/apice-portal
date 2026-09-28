import { CLAIM_DESCRIPTIONS, CLAIM_LABELS, type ClaimKind } from "@/lib/claims";
import { cn } from "@/lib/cn";

const COLOR_VAR: Record<ClaimKind, string> = {
  actual: "var(--color-claim-actual)",
  projection: "var(--color-claim-projection)",
  estimate: "var(--color-claim-estimate)",
  target: "var(--color-claim-target)",
  simulation: "var(--color-claim-simulation)",
  concept: "var(--color-claim-concept)",
};

interface ClaimTagProps {
  kind: ClaimKind;
  /** Override label text. */
  label?: string;
  className?: string;
  /** Show the long description next to the tag. */
  withNote?: boolean | string;
}

/**
 * Marks what kind of claim a figure is: real data, projection, estimate,
 * design target or simulation. Never color-only: always carries text.
 */
export function ClaimTag({ kind, label, className, withNote }: ClaimTagProps) {
  const color = COLOR_VAR[kind];
  const note = typeof withNote === "string" ? withNote : CLAIM_DESCRIPTIONS[kind];
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        title={CLAIM_DESCRIPTIONS[kind]}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-[3px] font-mono text-[10px] leading-none tracking-[0.14em] uppercase"
        style={{
          color,
          borderColor: `color-mix(in srgb, ${color} 32%, transparent)`,
          background: `color-mix(in srgb, ${color} 7%, transparent)`,
        }}
      >
        <span className="size-1.5 rounded-full" style={{ background: color }} aria-hidden />
        {label ?? CLAIM_LABELS[kind]}
      </span>
      {withNote && <span className="text-xs text-fg-3">{note}</span>}
    </span>
  );
}
