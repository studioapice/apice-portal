"use client";

import type { ReactNode } from "react";
import { ACTS } from "@/data/scenes";
import { useSceneContext } from "@/components/presentation/Scene";
import { SCENES } from "@/data/scenes";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SceneHeaderProps {
  /** Override the eyebrow (defaults to "Acto N · Title"). */
  eyebrow?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  className?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
}

/** Eyebrow (act) + optional title and lead. */
export function SceneHeader({
  eyebrow,
  title,
  lead,
  aside,
  className,
  align = "left",
  size = "md",
}: SceneHeaderProps) {
  const { index } = useSceneContext();
  const act = ACTS[SCENES[index].act];
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal className={cn("flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>
        <span className="eyebrow">
          {eyebrow ?? (
            <>
              <span className="text-gold">Acto {act.numeral}</span>
              <span className="mx-2 text-fg-4">/</span>
              {act.title}
            </>
          )}
        </span>
        {aside}
      </Reveal>
      {title && (
        <Reveal delay={0.08}>
          <h2
            className={cn(
              "display text-balance text-fg",
              size === "lg"
                ? "text-[clamp(2.4rem,5vw,5rem)]"
                : "text-[clamp(2rem,3.6vw,3.6rem)]",
            )}
          >
            {title}
          </h2>
        </Reveal>
      )}
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-[clamp(1rem,1.25vw,1.2rem)] leading-relaxed text-fg-2",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </header>
  );
}
