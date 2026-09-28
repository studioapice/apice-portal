import Image from "next/image";
import { BRAND_ASSETS } from "@/config/brand";
import { cn } from "@/lib/cn";

/**
 * Official horizontal NAVI logo. The source is a JPG on black, so it is
 * framed to its visible bounds and blended with `screen` (black → transparent
 * on dark surfaces). The file itself is untouched.
 */
export function NaviWordmark({ className }: { className?: string }) {
  const { src, width, height, bounds } = BRAND_ASSETS.naviLogo;
  const [l, t, r, b] = bounds;
  const boxW = ((r - l) / 100) * width;
  const boxH = ((b - t) / 100) * height;
  return (
    <span
      className={cn("relative inline-block h-9 overflow-hidden", className)}
      style={{ aspectRatio: `${boxW} / ${boxH}` }}
    >
      <Image
        src={src}
        alt="NAVI Centro Creativo"
        width={width}
        height={height}
        sizes="200px"
        className="absolute max-w-none mix-blend-screen"
        style={{
          width: `${(100 / (r - l)) * 100}%`,
          height: `${(100 / (b - t)) * 100}%`,
          left: `${(-l / (r - l)) * 100}%`,
          top: `${(-t / (b - t)) * 100}%`,
        }}
      />
    </span>
  );
}

/** NAVI tree mark (transparent PNG), original proportions. */
export function NaviTree({ className, preload }: { className?: string; preload?: boolean }) {
  const { src, width, height } = BRAND_ASSETS.naviMark;
  return (
    <Image
      src={src}
      alt="NAVI"
      width={width}
      height={height}
      sizes="64px"
      preload={preload}
      className={cn("h-6 w-auto", className)}
    />
  );
}

/** "NAVI OS" product lockup (typographic), optionally led by the NAVI tree. */
export function NaviOSMark({
  className,
  osClassName,
  tree,
  treeClassName,
}: {
  className?: string;
  osClassName?: string;
  tree?: boolean;
  treeClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[0.45em] font-display tracking-[-0.04em]", className)}>
      {tree && <NaviTree className={cn("h-[1.35em]", treeClassName)} />}
      <span className="inline-flex items-baseline">
        <span className="font-semibold">NAVI</span>
        <span className={cn("ml-[0.18em] font-light text-fg-3", osClassName)}>OS</span>
      </span>
    </span>
  );
}
