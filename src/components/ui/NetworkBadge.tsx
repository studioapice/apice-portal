import { CHANNELS, type NetworkSlug } from "@/data/programs";
import { cn } from "@/lib/cn";

/**
 * NAVI Channel network. Color is a secondary signal (dot only); the label
 * stays in text tokens.
 */
export function NetworkBadge({
  network,
  className,
  size = "sm",
}: {
  network: NetworkSlug;
  className?: string;
  size?: "xs" | "sm";
}) {
  const channel = CHANNELS[network];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line whitespace-nowrap text-fg-2",
        size === "xs" ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-[11px]",
        className,
      )}
    >
      <span className="size-1.5 rounded-full" style={{ background: channel.accent }} aria-hidden />
      {channel.network.replace("NAVI ", "")}
      <span className="sr-only"> (red {channel.network})</span>
    </span>
  );
}
