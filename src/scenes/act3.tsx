"use client";

import { motion } from "motion/react";
import { Check, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";
import { HUMAN_TARGET_MINUTES } from "@/config/presentation";
import { CLIPS, THUMBNAILS } from "@/data/demo";
import { cn } from "@/lib/cn";
import { Scene, useSceneActive } from "@/components/presentation/Scene";
import { BigStatement } from "@/components/ui/BigStatement";
import { ClaimTag } from "@/components/ui/ClaimTag";
import { Reveal } from "@/components/ui/Reveal";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { ThumbnailArt } from "@/components/demo/ThumbnailArt";
import { StudioFrame } from "@/components/visuals/StudioFrame";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { NaviOSReveal } from "@/components/visuals/NaviOSReveal";

/* ================================================================== */
/* 09 · Reveal                                                         */
/* ================================================================== */

export function RevealScene() {
  return (
    <Scene id="reveal" className="bg-ink-950">
      <RevealContent />
    </Scene>
  );
}

function RevealContent() {
  const active = useSceneActive();
  return <NaviOSReveal active={active} />;
}

/* ================================================================== */
/* 10 · Architecture                                                   */
/* ================================================================== */

const NOT_LIST = [
  "una automatización suelta",
  "un Zap",
  "un escenario de Make",
  "una colección de bots",
  "un reemplazo de Dropbox, OpusClip, Metricool o YouTube",
];

export function ArchitectureScene() {
  return (
    <Scene id="architecture">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SceneHeader
            title={
              <>
                No es una automatización.{" "}
                <span className="text-fg-3">Es el sistema que orquesta todas.</span>
              </>
            }
          />
          <Reveal delay={0.15} className="flex flex-col gap-3">
            <span className="eyebrow">NAVI OS no es</span>
            <ul className="flex flex-col gap-2">
              {NOT_LIST.map((t, i) => (
                <li key={t} className="relative w-fit text-[15px] text-fg-3">
                  {t}
                  <motion.span
                    aria-hidden
                    className="absolute top-1/2 left-0 h-px w-full origin-left bg-fg-3"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.18 }}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4} className="border-l-2 border-gold pl-5">
            <p className="text-[clamp(1.05rem,1.4vw,1.3rem)] leading-snug text-fg">
              Las herramientas dejan de ser lugares donde las personas trabajan.{" "}
              <span className="text-fg-2">Pasan a ser servicios que NAVI OS utiliza.</span>
            </p>
          </Reveal>
        </div>
        <ArchitectureDiagram />
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 11 · Software working, humans deciding                              */
/* ================================================================== */

export function PrincipleScene() {
  return (
    <Scene id="principle">
      <PrincipleContent />
    </Scene>
  );
}

function PrincipleContent() {
  const active = useSceneActive();
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
      <div className="flex flex-col gap-10">
        <SceneHeader />
        <BigStatement size="lg" lines={["El software trabaja.", { text: "El humano decide.", tone: "gold" }]} />
        <Reveal delay={0.3}>
          <p className="max-w-md text-[15px] leading-relaxed text-fg-2">
            La intervención humana se reserva para las decisiones con criterio editorial. Todo lo demás, NAVI OS lo
            prepara, lo ejecuta y lo comprueba.
          </p>
        </Reveal>
        <Reveal delay={0.4} className="flex flex-col gap-3 border-t border-line pt-6">
          <ClaimTag kind="target" />
          <div className="flex items-baseline gap-3">
            <span className="display text-[clamp(3rem,5vw,4.6rem)] leading-none text-fg">
              &lt; {HUMAN_TARGET_MINUTES} min
            </span>
            <span className="text-sm text-fg-2">por episodio</span>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-fg-3">
            Objetivo de diseño: reducir la intervención operativa humana a menos de {HUMAN_TARGET_MINUTES} minutos por
            episodio en los puntos de aprobación.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-5">
        <DecisionCard index="A" title="Elegir la miniatura" caption="NAVI OS presenta A · B · C. Una pulsación.">
          <ThumbPick active={active} />
        </DecisionCard>
        <DecisionCard index="B" title="Elegir los 3 clips" caption="NAVI OS presenta todos los clips. Marcas 1 · 2 · 3 y confirmas.">
          <ClipPick active={active} />
        </DecisionCard>
      </div>
    </div>
  );
}

function DecisionCard({
  index,
  title,
  caption,
  children,
}: {
  index: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-2xl border border-line bg-ink-850 p-5">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-gold">{index}</span>
          <span className="text-[15px] text-fg">{title}</span>
        </div>
        <span className="hidden text-xs text-fg-3 sm:inline">{caption}</span>
      </div>
      {children}
    </Reveal>
  );
}

function ThumbPick({ active }: { active: boolean }) {
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setPicked((p) => !p), 2200);
    return () => window.clearInterval(id);
  }, [active]);
  return (
    <div className="grid grid-cols-3 gap-3">
      {THUMBNAILS.map((t) => {
        const on = picked && t.id === "B";
        return (
          <div key={t.id} className="relative">
            <div
              className={cn(
                "overflow-hidden rounded-lg border transition-all duration-500",
                on ? "border-gold ring-1 ring-gold" : picked ? "border-line opacity-40" : "border-line",
              )}
            >
              <ThumbnailArt id={t.id} />
            </div>
            <span className="mt-1.5 block font-mono text-[10px] text-fg-3">{t.id}</span>
            {t.id === "B" && (
              <motion.span
                className="absolute top-1/2 left-1/2 text-fg"
                animate={{ x: picked ? 0 : 40, y: picked ? 0 : 30, scale: picked ? 0.9 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden
              >
                <MousePointer2 className="size-5 fill-fg drop-shadow" />
              </motion.span>
            )}
            {on && (
              <span className="absolute top-2 right-2 inline-flex size-5 items-center justify-center rounded-full bg-gold text-ink-950">
                <Check className="size-3" />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ClipPick({ active }: { active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setN((v) => (v + 1) % 6), 900);
    return () => window.clearInterval(id);
  }, [active]);
  const order = ["c01", "c02", "c03"];
  const clips = CLIPS.slice(0, 6);
  return (
    <div className="flex items-end gap-3">
      <div className="grid flex-1 grid-cols-6 gap-2">
        {clips.map((c) => {
          const rank = order.indexOf(c.id) + 1;
          const on = rank > 0 && n >= rank;
          return (
            <div key={c.id} className="relative">
              <div
                className={cn(
                  "aspect-[9/16] overflow-hidden rounded-md border transition-all duration-300",
                  on ? "border-gold" : "border-line",
                )}
              >
                <StudioFrame
                  vertical
                  variant={c.speaker === "Ambos" ? "wide" : c.speaker === "Lilly" ? "right" : "left"}
                  tone={["#22303a", "#d8c8b2"]}
                />
              </div>
              {on && (
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 inline-flex size-6 items-center justify-center rounded-full bg-gold font-mono text-[11px] font-semibold text-ink-950"
                >
                  {rank}
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      <span
        className={cn(
          "mb-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300",
          n >= 4 ? "bg-fg text-ink-950" : "bg-ink-700 text-fg-4",
        )}
      >
        Confirmar
      </span>
    </div>
  );
}
