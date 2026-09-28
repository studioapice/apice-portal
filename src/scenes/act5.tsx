"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { DAILY_VIEWS } from "@/data/performance";
import { cn } from "@/lib/cn";
import { Scene, useSceneActive } from "@/components/presentation/Scene";
import { BigStatement } from "@/components/ui/BigStatement";
import { ClaimTag } from "@/components/ui/ClaimTag";
import { Reveal } from "@/components/ui/Reveal";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { EpisodeChip, PerformanceDashboard } from "@/components/intelligence/PerformanceDashboard";
import { InsightPanel, LearningLoop } from "@/components/intelligence/InsightPanel";

/* ================================================================== */
/* 13 · 7 days later                                                   */
/* ================================================================== */

export function LaterScene() {
  return (
    <Scene id="later" className="bg-ink-950">
      <LaterContent />
    </Scene>
  );
}

function LaterContent() {
  const active = useSceneActive();
  const [day, setDay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (day >= DAILY_VIEWS.length) return;
    const id = window.setTimeout(() => setDay((d) => d + 1), day === 0 ? 900 : 380);
    return () => window.clearTimeout(id);
  }, [active, day]);

  const ready = day >= DAILY_VIEWS.length;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-14 text-center">
      <BigStatement align="center" size="2xl" lines={["7 días después"]} />
      <div className="flex items-center gap-3" aria-hidden>
        {DAILY_VIEWS.map((d, i) => (
          <div key={d.day} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "h-1 w-10 rounded-full transition-colors duration-300 sm:w-14",
                i < day ? "bg-fg" : "bg-ink-600",
              )}
            />
            <span className={cn("font-mono text-[10px] uppercase transition-colors", i < day ? "text-fg-2" : "text-fg-4")}>
              {d.day}
            </span>
          </div>
        ))}
      </div>
      <motion.span
        initial={false}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 6 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-ok/40 bg-ok/10 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-ok uppercase"
      >
        <span className="size-1.5 rounded-full bg-ok" />
        Performance data available
      </motion.span>
    </div>
  );
}

/* ================================================================== */
/* 14 · NAVI Intelligence                                              */
/* ================================================================== */

export function IntelligenceScene() {
  return (
    <Scene id="intelligence">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SceneHeader
            title={
              <>
                NAVI Intelligence.{" "}
                <span className="text-fg-3">El episodio no termina al publicarse.</span>
              </>
            }
          />
          <Reveal delay={0.2} className="flex flex-col items-start gap-2 lg:items-end">
            <EpisodeChip />
            <ClaimTag kind="simulation" withNote />
          </Reveal>
        </div>
        <PerformanceDashboard />
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 15 · Patterns & learning                                            */
/* ================================================================== */

export function LearningScene() {
  return (
    <Scene id="learning">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SceneHeader />
          <BigStatement
            size="md"
            lines={["NAVI OS encontró", { text: "3 patrones relevantes", tone: "gold" }, "para el próximo episodio."]}
          />
          <Reveal delay={0.3} className="flex flex-col gap-5">
            <p className="max-w-md text-[15px] leading-relaxed text-fg-2">
              No es una IA que lo sabe todo. Es análisis sobre datos históricos y patrones: sugerencias para el equipo,
              no decisiones automáticas.
            </p>
            <LearningLoop />
          </Reveal>
          <Reveal delay={0.4} className="flex items-center gap-4 border-t border-line pt-6">
            <span className="text-sm text-fg-3 line-through decoration-fg-4">Automatización</span>
            <span className="text-fg-4">→</span>
            <span className="text-sm text-fg">Inteligencia operativa</span>
          </Reveal>
        </div>
        <div className="flex flex-col gap-3">
          <ClaimTag kind="simulation" withNote="Patrones y cifras de ejemplo." />
          <InsightPanel />
        </div>
      </div>
    </Scene>
  );
}
