import {
  CalendarClock,
  FolderOpen,
  ImageIcon,
  MessageCircle,
  Play,
  Scissors,
  Sparkles,
  Table2,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Platforms — simplified monochrome glyphs                            */
/* ------------------------------------------------------------------ */

export type PlatformId = "instagram" | "tiktok" | "shorts" | "youtube";

export const PLATFORM_LABEL: Record<PlatformId, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  shorts: "YouTube Shorts",
  youtube: "YouTube",
};

type GlyphProps = SVGProps<SVGSVGElement>;

function InstagramGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.6 2.2 4.4 5 4.6" />
    </svg>
  );
}

function ShortsGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="3.5" />
      <path d="M10.5 9.3v5.4l4.3-2.7z" fill="currentColor" />
    </svg>
  );
}

function YouTubeGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
    </svg>
  );
}

const PLATFORM_GLYPH: Record<PlatformId, (p: GlyphProps) => React.JSX.Element> = {
  instagram: InstagramGlyph,
  tiktok: TikTokGlyph,
  shorts: ShortsGlyph,
  youtube: YouTubeGlyph,
};

export function PlatformIcon({
  platform,
  className,
  title,
}: {
  platform: PlatformId;
  className?: string;
  title?: string;
}) {
  const Glyph = PLATFORM_GLYPH[platform];
  return (
    <Glyph
      className={cn("size-4", className)}
      role="img"
      aria-label={title ?? PLATFORM_LABEL[platform]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Tools — neutral icon + name (no third-party logos)                   */
/* ------------------------------------------------------------------ */

export type ToolId =
  | "dropbox"
  | "airtable"
  | "youtube"
  | "ai"
  | "design"
  | "opus"
  | "metricool"
  | "whatsapp"
  | "review";

export const TOOLS: Record<ToolId, { name: string; icon: LucideIcon; role: string }> = {
  dropbox: { name: "Dropbox", icon: FolderOpen, role: "Archivos y entregas" },
  airtable: { name: "Airtable", icon: Table2, role: "Registro y calendario" },
  youtube: { name: "YouTube", icon: Play, role: "Publicación" },
  ai: { name: "ChatGPT / IA", icon: Sparkles, role: "Copy y SEO" },
  design: { name: "Miniatura", icon: ImageIcon, role: "Diseño" },
  opus: { name: "OpusClip", icon: Scissors, role: "Clips verticales" },
  metricool: { name: "Metricool", icon: CalendarClock, role: "Programación social" },
  whatsapp: { name: "WhatsApp", icon: MessageCircle, role: "Avisos a programas" },
  review: { name: "Revisión", icon: UserCheck, role: "Criterio humano" },
};
