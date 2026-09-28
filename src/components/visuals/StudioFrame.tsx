import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Stylised studio shot (no real footage): silhouettes, key light, acoustic
 * panels and a warm practical lamp. Placeholder art — swap for real stills in
 * /public/brand/thumbnails/.
 *
 * Drawn on a 100 × 100 canvas; each variant frames a 16:9 window of it and
 * `preserveAspectRatio="slice"` handles any other container ratio (e.g. 9:16).
 */

export type FrameVariant = "wide" | "left" | "right" | "detail";

interface StudioFrameProps {
  variant: FrameVariant;
  /** Background tint pair [deep, light]. */
  tone?: [string, string];
  className?: string;
  /** Centre subjects for vertical (9:16) crops. */
  vertical?: boolean;
}

const VIEWBOX: Record<FrameVariant, string> = {
  wide: "0 40 100 56.25",
  left: "0 30 100 56.25",
  right: "0 30 100 56.25",
  detail: "0 22 100 56.25",
};

/** Taller windows for vertical (9:16) crops so subjects keep human scale. */
const VIEWBOX_VERTICAL: Record<FrameVariant, string> = {
  wide: "14 36 72 64",
  left: "18 12 64 88",
  right: "18 12 64 88",
  detail: "18 8 64 88",
};

const SLATS = Array.from({ length: 14 }, (_, i) => i * 7.4 + 1);

function Figure({
  cx,
  scale = 1,
  gradId,
  rimId,
}: {
  cx: number;
  scale?: number;
  gradId: string;
  rimId: string;
}) {
  return (
    <g transform={`translate(${cx} 100) scale(${scale}) translate(-50 -100)`}>
      <path d="M10 100 C 12 76, 30 66, 50 66 C 70 66, 88 76, 90 100 Z" fill={`url(#${gradId})`} />
      <path d="M43.5 52 L 56.5 52 L 58 68 L 42 68 Z" fill={`url(#${gradId})`} />
      <ellipse cx="50" cy="41" rx="12" ry="15" fill={`url(#${gradId})`} />
      <ellipse cx="50" cy="41" rx="12" ry="15" fill="none" stroke={`url(#${rimId})`} strokeWidth="0.45" />
      <path d="M10 100 C 12 76, 30 66, 50 66 C 70 66, 88 76, 90 100" fill="none" stroke={`url(#${rimId})`} strokeWidth="0.35" />
    </g>
  );
}

function Mic({ x, y, flip = false, light, scale = 1 }: { x: number; y: number; flip?: boolean; light: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * scale} ${scale}) rotate(-18)`}>
      <path d="M0 4 L 0 12 L -10 20" stroke="#040404" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="-3.2" y="-8" width="6.4" height="12" rx="3.2" fill="#101010" stroke={light} strokeOpacity="0.22" strokeWidth="0.3" />
    </g>
  );
}

export function StudioFrame({
  variant,
  tone = ["#1c2630", "#d8c8b2"],
  className,
  vertical,
}: StudioFrameProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const bg = `bg${uid}`;
  const key = `key${uid}`;
  const lamp = `lamp${uid}`;
  const fig = `fig${uid}`;
  const rim = `rim${uid}`;
  const [deep, light] = tone;
  const keyLeft = variant === "right";
  const lampX = keyLeft ? 16 : 84;

  return (
    <svg
      viewBox={vertical ? VIEWBOX_VERTICAL[variant] : VIEWBOX[variant]}
      preserveAspectRatio="xMidYMid slice"
      className={cn("block h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={deep} />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <radialGradient id={key} cx={keyLeft ? 0.3 : 0.7} cy="0.35" r="0.7">
          <stop offset="0" stopColor={light} stopOpacity="0.22" />
          <stop offset="1" stopColor={light} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={lamp}>
          <stop offset="0" stopColor="#ffcf8a" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#ffb45c" stopOpacity="0.18" />
          <stop offset="1" stopColor="#ffb45c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={fig} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#222" />
          <stop offset="1" stopColor="#080808" />
        </linearGradient>
        <linearGradient id={rim} x1={keyLeft ? "0" : "1"} y1="0" x2={keyLeft ? "1" : "0"} y2="0.6">
          <stop offset="0" stopColor={light} stopOpacity="0.95" />
          <stop offset="0.4" stopColor={light} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="100" height="100" fill={`url(#${bg})`} />
      {/* Acoustic slats */}
      {SLATS.map((x) => (
        <rect key={x} x={x} y="0" width="4.6" height="100" fill={light} opacity="0.025" />
      ))}
      <rect x="0" y="0" width="100" height="100" fill={`url(#${key})`} />
      {/* Practical lamp */}
      <circle cx={lampX} cy={variant === "wide" ? 62 : 48} r="22" fill={`url(#${lamp})`} />
      <circle cx={lampX} cy={variant === "wide" ? 62 : 48} r="1.4" fill="#ffe2b0" opacity="0.9" />

      {variant === "wide" && (
        <g>
          <Figure cx={vertical ? 38 : 31} scale={0.5} gradId={fig} rimId={rim} />
          <Figure cx={vertical ? 62 : 69} scale={0.5} gradId={fig} rimId={rim} />
          <rect x="0" y="88" width="100" height="12" fill="#090909" />
          <rect x="0" y="88" width="100" height="0.3" fill={light} opacity="0.35" />
          <Mic x={vertical ? 45 : 39} y={80} light={light} scale={0.7} />
          <Mic x={vertical ? 55 : 61} y={80} flip light={light} scale={0.7} />
        </g>
      )}
      {variant === "left" && (
        <g>
          <Figure cx={vertical ? 50 : 38} scale={0.82} gradId={fig} rimId={rim} />
          <Mic x={vertical ? 64 : 54} y={66} flip light={light} scale={0.85} />
        </g>
      )}
      {variant === "right" && (
        <g>
          <Figure cx={vertical ? 50 : 62} scale={0.82} gradId={fig} rimId={rim} />
          <Mic x={vertical ? 36 : 46} y={66} light={light} scale={0.85} />
        </g>
      )}
      {variant === "detail" && (
        <g>
          <rect x="0" y="58" width="100" height="42" fill="#080808" />
          <rect x="0" y="58" width="100" height="0.3" fill={light} opacity="0.35" />
          <g transform="translate(50 46) scale(2.1)">
            <rect x="-3.6" y="-9" width="7.2" height="12.5" rx="3.6" fill="#131313" stroke={light} strokeOpacity="0.28" strokeWidth="0.2" />
            {[-6.5, -4.5, -2.5, -0.5].map((y) => (
              <line key={y} x1="-2.8" x2="2.8" y1={y} y2={y} stroke={light} strokeOpacity="0.16" strokeWidth="0.18" />
            ))}
            <path d="M0 3.5 L 0 6" stroke="#0e0e0e" strokeWidth="1.4" />
          </g>
        </g>
      )}
    </svg>
  );
}
