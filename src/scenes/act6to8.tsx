"use client";

import { motion } from "motion/react";
import {
  ArrowLeftRight,
  Check,
  Cpu,
  Database,
  Layers,
  Send,
  UserRound,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  CURRENT_EPISODES_PER_WEEK,
  CURRENT_PROGRAMS,
  EPISODES_PER_SEASON,
  KNOWN_HOURS_WEEK,
  PEOPLE,
  SEO_THUMBNAIL_HOURS_WEEK,
  SOCIAL_HOURS_WEEK,
} from "@/config/presentation";
import { cn } from "@/lib/cn";
import { Scene, useSceneActive } from "@/components/presentation/Scene";
import { BigStatement } from "@/components/ui/BigStatement";
import { ClaimTag } from "@/components/ui/ClaimTag";
import { Metric } from "@/components/ui/Metric";
import { Reveal } from "@/components/ui/Reveal";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { CommandCenter } from "@/components/command/CommandCenter";

/* ================================================================== */
/* 16 · Command Center                                                 */
/* ================================================================== */

export function CommandScene() {
  return (
    <Scene id="command" bleed className="px-3 pt-16 pb-6 sm:px-6 lg:h-svh lg:px-10 lg:pt-8 lg:pb-14">
      <div className="flex h-full min-h-0 w-full flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">
              <span className="text-gold">Acto VI</span>
              <span className="mx-2 text-fg-4">/</span>El centro de mando
            </span>
            <h2 className="display text-[clamp(1.6rem,2.4vw,2.4rem)] text-fg">
              Toda la operación de NAVI. <span className="text-fg-3">Una pantalla.</span>
            </h2>
          </div>
          <ClaimTag kind="concept" label="Interfaz propuesta · datos simulados" />
        </div>
        <div className="min-h-0 flex-1">
          <CommandCenter />
        </div>
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 17 · Scale without multiplying complexity                           */
/* ================================================================== */

const ENTITIES = [
  { name: "Program", icon: Layers, detail: "Brand Kit, destinos, reglas, assets" },
  { name: "Season", icon: Database, detail: `${EPISODES_PER_SEASON} episodios, calendario, playlist` },
  { name: "Episode", icon: Cpu, detail: "Render, metadata, miniatura, clips" },
  { name: "Workflow", icon: Workflow, detail: "El mismo motor para todos" },
];

const ONBOARDING = ["Configurar Brand Kit", "Configurar destinos", "Configurar reglas", "Configurar assets"];
const TARGET_PROGRAMS = 30;

/** Ring positions, rounded so server and client render identical styles. */
const RING = Array.from({ length: TARGET_PROGRAMS }, (_, i) => {
  const angle = (i / TARGET_PROGRAMS) * Math.PI * 2 - Math.PI / 2;
  return {
    left: `${(50 + Math.cos(angle) * 46).toFixed(2)}%`,
    top: `${(50 + Math.sin(angle) * 46).toFixed(2)}%`,
  };
});

export function ScaleScene() {
  return (
    <Scene id="scale">
      <ScaleContent />
    </Scene>
  );
}

function ScaleContent() {
  const active = useSceneActive();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active || phase > ONBOARDING.length) return;
    const id = window.setTimeout(() => setPhase((p) => p + 1), phase === 0 ? 900 : 650);
    return () => window.clearTimeout(id);
  }, [active, phase]);

  const onboarded = phase > ONBOARDING.length;
  const programs = onboarded ? TARGET_PROGRAMS : CURRENT_PROGRAMS;

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <div className="flex flex-col gap-10">
        <SceneHeader />
        <BigStatement size="lg" lines={["Nuevo programa", { text: "≠ nuevo sistema.", tone: "gold" }]} />
        <Reveal delay={0.3}>
          <p className="max-w-md text-[15px] leading-relaxed text-fg-2">
            NAVI OS se diseña alrededor de entidades —programa, temporada, episodio, workflow—, no de automatizaciones
            sueltas. Un programa nuevo se configura; la infraestructura ya existe.
          </p>
        </Reveal>
        <Reveal delay={0.4} className="border-l-2 border-gold pl-5">
          <p className="display text-[clamp(1.3rem,2vw,1.9rem)] leading-tight text-fg">
            Escalar deja de significar reconstruir el proceso.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-5">
        {/* Entity chain */}
        <Reveal className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ENTITIES.map((e, i) => {
            const Icon = e.icon;
            return (
              <div key={e.name} className="relative flex flex-col gap-2 rounded-xl border border-line-2 bg-ink-850 p-3.5">
                <Icon className="size-4 text-sys" aria-hidden />
                <span className="font-mono text-[12px] text-fg">{e.name}</span>
                <span className="text-[11px] leading-snug text-fg-3">{e.detail}</span>
                {i < ENTITIES.length - 1 && (
                  <span className="absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 font-mono text-[10px] text-fg-4 sm:block">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Onboarding */}
          <Reveal delay={0.15} className="flex flex-col gap-3 rounded-2xl border border-line bg-ink-850 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-fg">Alta de un programa nuevo</span>
              <span className="font-mono text-[10px] text-fg-4">Programa nº {CURRENT_PROGRAMS + 1}</span>
            </div>
            <ul className="flex flex-col gap-2">
              {ONBOARDING.map((item, i) => {
                const done = phase > i;
                return (
                  <li key={item} className="flex items-center gap-2.5 text-[13px]">
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full border transition-colors duration-300",
                        done ? "border-ok bg-ok text-ink-950" : "border-line-2",
                      )}
                    >
                      {done && <Check className="size-2.5" aria-hidden />}
                    </span>
                    <span className={done ? "text-fg-2" : "text-fg-4"}>{item}</span>
                  </li>
                );
              })}
            </ul>
            <motion.span
              initial={false}
              animate={{ opacity: phase >= ONBOARDING.length ? 1 : 0.2 }}
              className="mt-1 border-t border-line pt-3 text-xs text-ok"
            >
              NAVI OS aplica su infraestructura
            </motion.span>
          </Reveal>

          {/* One system, many programs */}
          <Reveal delay={0.25} className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-ink-850 p-5">
            <div className="relative flex size-40 items-center justify-center">
              {RING.map((pos, i) => {
                const lit = i < programs;
                return (
                  <motion.span
                    key={i}
                    className={cn("absolute size-2 rounded-full", i < CURRENT_PROGRAMS ? "bg-gold" : "bg-fg-2")}
                    style={{ ...pos, translate: "-50% -50%" }}
                    initial={false}
                    animate={{ opacity: lit ? 1 : 0.1, scale: lit ? 1 : 0.6 }}
                    transition={{ duration: 0.4, delay: lit ? Math.max(0, i - CURRENT_PROGRAMS) * 0.05 : 0 }}
                  />
                );
              })}
              <span className="flex size-20 items-center justify-center rounded-full border border-gold/40 bg-gold/[0.06] font-display text-sm font-semibold text-fg">
                NAVI OS
              </span>
            </div>
            <span className="text-center text-sm text-fg-2">
              <span className="display text-2xl text-fg tabular">{programs}</span> programas ·{" "}
              <span className="display text-2xl text-fg">1</span> sistema
            </span>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* 18 · Operational impact                                             */
/* ================================================================== */

const FUTURE = [
  { icon: Cpu, text: "Automatización de tareas repetitivas" },
  { icon: Layers, text: "Procesamiento en paralelo" },
  { icon: ArrowLeftRight, text: "Menos cambios entre herramientas" },
  { icon: UserRound, text: "Decisiones humanas concentradas" },
  { icon: Send, text: "Distribución automática" },
  { icon: Database, text: "Información centralizada" },
];

export function ImpactScene() {
  return (
    <Scene id="impact">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <SceneHeader
          title={
            <>
              Lo que sabemos hoy. <span className="text-fg-3">Y lo que cambia.</span>
            </>
          }
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-7 rounded-2xl border border-line bg-ink-850 p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.16em] text-fg-2 uppercase">Hoy</span>
              <ClaimTag kind="actual" />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-7">
              <Metric value={CURRENT_EPISODES_PER_WEEK} label="episodios / semana" size="sm" />
              <Metric value={KNOWN_HOURS_WEEK} prefix=">" unit="h / semana" label="carga identificada" size="sm" accent />
              <Metric value={SEO_THUMBNAIL_HOURS_WEEK} prefix="~" unit="h" label="SEO + miniaturas" size="sm" />
              <Metric value={SOCIAL_HOURS_WEEK} prefix="~" unit="h" label="programación y distribución" size="sm" />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col gap-7 rounded-2xl border border-gold/25 bg-gold/[0.03] p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Con NAVI OS</span>
              <ClaimTag kind="concept" label="Diseño del sistema" />
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {FUTURE.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.li
                    key={f.text}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 text-[14px] text-fg"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    {f.text}
                  </motion.li>
                );
              })}
            </ul>
            <p className="mt-auto text-xs leading-relaxed text-fg-3">
              No fijamos un ahorro absoluto: la magnitud real se medirá con el sistema en uso.
            </p>
          </Reveal>
        </div>

        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Reveal delay={0.2}>
            <p className="display text-[clamp(1.4rem,2.2vw,2.2rem)] leading-tight text-balance text-fg">
              Recuperar capacidad no significa eliminar personas.{" "}
              <span className="text-fg-3">Significa devolverles tiempo para el trabajo donde su criterio importa.</span>
            </p>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-col divide-y divide-line border-y border-line">
            {[
              [PEOPLE.editorial, "recupera capacidad editorial."],
              [PEOPLE.founder, "recupera capacidad directiva."],
              ["NAVI", "recupera capacidad productiva."],
            ].map(([who, what]) => (
              <p key={who} className="py-2.5 text-[15px] text-fg-2">
                <span className="text-fg">{who}</span> {what}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </Scene>
  );
}
