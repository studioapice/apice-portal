"use client";

import Image from "next/image";
import { useState } from "react";
import { CHANNELS, type NetworkSlug } from "@/data/programs";
import { cn } from "@/lib/cn";

interface ProgramThumbProps {
  src: string;
  name: string;
  network: NetworkSlug;
  sizes: string;
  className?: string;
  objectPosition?: string;
  preload?: boolean;
}

/**
 * Real 16:9 YouTube thumbnail with a quiet fallback (name + network) if the
 * file ever fails to load — never a broken image.
 */
export function ProgramThumb({ src, name, network, sizes, className, objectPosition, preload }: ProgramThumbProps) {
  const [failed, setFailed] = useState(false);
  const accent = CHANNELS[network].accent;
  return (
    <div className={cn("relative aspect-video overflow-hidden bg-ink-800", className)}>
      {failed ? (
        <div
          className="absolute inset-0 flex items-end p-2"
          style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 18%, #0a0a0a), #0a0a0a 70%)` }}
        >
          <span className="line-clamp-2 text-[11px] leading-tight text-fg-2">{name}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={`Miniatura de ${name}`}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
