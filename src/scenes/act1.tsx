"use client";

import { motion } from "motion/react";
import { MonitorPlay } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CURRENT_PROGRAMS,
  EPISODES_PER_SEASON,
  KNOWN_HOURS_WEEK,
  MAX_CAMERAS,
  PEOPLE,
  PRESENTATION,
  SEO_THUMBNAIL_HOURS_WEEK,
  SOCIAL_HOURS_WEEK,
  STUDIOS,
  WORKDAY_HOURS,
} from "@/config/presentation";
import { HOURS_PER_EPISODE, toWorkdays } from "@/lib/metrics";
import { formatFixed, formatHoursMinutes } from "@/lib/format";
import { cn } from "@/lib/cn";
import { C } from "@/lib/colors";
import { Scene, useSceneActive, useSceneSteps } from "@/components/presentation/Scene";
import { usePresentationApi, usePresentationState } from "@/components/presentation/PresentationProvider";
import { BigStatement } from "@/components/ui/BigStatement";
import { ClaimTag } from "@/components/ui/ClaimTag";
import { Metric, MetricGrid } from "@/components/ui/Metric";
import { Build, Reveal, EASE_OUT } from "@/components/ui/Reveal";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { StepHint } from "@/components/ui/StepHint";
import { NaviWordmark } from "@/components/ui/Wordmark";
import { MulticamStage } from "@/components/visuals/MulticamStage";
import { CurrentWorkflow, TOOL_SWITCHES } from "@/components/visuals/CurrentWorkflow";
import { CURRENT_WORKFLOW, WORKFLOW_MANUAL_STEPS, WORKFLOW_TOOL_COUNT } from "@/data/workflow";

/* ================================================================== */
/* 01 · Opening                                                        */
/* ================================================================== */

export function OpeningScene() {
  return (
    <Scene id="opening" className="bg-[radial-gradient(ellipse_at_50%_120%,rgba(242,181,42,0.07),transparent_60%)]">
      <OpeningContent />
    </Scene>
  );
}

function OpeningContent() {
  const { step, advance } = useSceneSteps(1);
  const api = usePresentationApi();
  const { presenting } = usePresentationState();
  const focus = step >= 1;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
      <Reveal className="flex items-center gap-4">
        <NaviWordmark />
        <span className="h-3 w-px bg-line-2" />
        <span className="eyebrow">{PRESENTATION.client} · {PRESENTATION.dateLabel}</span>
      </Reveal>

      <div className="flex flex-col gap-8">
        <h1 className="display text-[clamp(2.8rem,6.4vw,6.8rem)] text-balance">
          {[
            { text: "Tú pones la voz.", dim: true },
            { text: "NAVI pone la producción,", dim: true },
            { text: "los Studios", dim: true },
          ].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%", color: focus ? C.fg4 : C.fg }}
                transition={{ y: { duration: 1.1, delay: 0.2 + i * 0.14, ease: EASE_OUT }, color: { duration: 0.9 } }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.62, ease: EASE_OUT }}
            >
              <motion.span
                animate={{ color: focus ? C.fg4 : C.fg }}
                transition={{ duration: 0.9 }}
              >
                y{" "}
              </motion.span>
              <motion.span
                className="relative inline-block"
                animate={{ color: focus ? C.gold : C.fg }}
                transition={{ duration: 0.9 }}
              >
                el sistema.
                <motion.span
                  aria-hidden
                  className="absolute -bottom-[0.04em] left-0 h-[3px] w-full origin-left bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focus ? 1 : 0 }}
                  transition={{ duration: 0.9, delay: focus ? 0.3 : 0, ease: EASE_OUT }}
                />
              </motion.span>
            </motion.span>
          </span>
        </h1>

        <div className="min-h-16">
          <Build show={!focus}>
            <p className="text-sm text-fg-3">— La promesa pública de NAVI Channel</p>
          </Build>
          <Build show={focus} delay={0.5} className="-mt-5">
            <p className="max-w-xl text-[clamp(1.1rem,1.6vw,1.5rem)] leading-snug text-fg-2">
              Esta propuesta trata sobre esa última palabra.
            </p>
          </Build>
        </div>
      </div>

      <Reveal delay={1.2} className="flex flex-wrap items-center gap-4">
        {!presenting && (
          <button
            type="button"
            onClick={() => api.setPresenting(true)}
            className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.02]"
          >
            <MonitorPlay className="size-4" aria-hidden />
            Iniciar presentación
          </button>
        )}
        <span className="inline-flex items-center gap-2 text-xs text-fg-3">
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px]">→</kbd>
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px]">espacio</kbd>
          para avanzar ·
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          índice
        </span>
      </Reveal>

      <StepHint visible={!focus} onAdvance={advance} />
    </div>
  );
}

/* ================================================================== */
/* 02 · The machine that already works                                 */
/* ================================================================== */

export function MachineScene() {
  return (
    <Scene id="machine">
      <MachineContent />
    </Scene>
  );
}

function MachineContent() {
  const active = useSceneActive();
  const facts = [
    { v: String(CURRENT_PROGRAMS), l: "programas activos" },
    { v: String(EPISODES_PER_SEASON), l: "episodios por temporada" },
    { v: String(STUDIOS), l: "Studios" },
    { v: `${MAX_CAMERAS}`, l: "cámaras por realización" },
  ];
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <div className="flex flex-col gap-10">
        <SceneHeader />
        <BigStatement
          size="md"
          lines={[
            { text: "NAVI ya resolvió uno de los problemas más difíciles:", tone: "muted" },
            "crear contenido de calidad de forma recurrente.",
          ]}
        />
        <Reveal delay={0.3}>
          <p className="max-w-lg text-[15px] leading-relaxed text-fg-2">
            Varias cámaras. Realización en directo. Tapas dinámicas y llamadas a la acción durante la grabación.
            Cuando termina, el render es prácticamente definitivo.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.l} className="flex flex-col gap-1">
                <dt className="display text-3xl text-fg">{f.v}</dt>
                <dd className="text-xs text-fg-3">{f.l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <Reveal delay={0.2} y={24}>
        <MulticamStage active={active} />
      </Reveal>
    </div>
  );
}

/* ================================================================== */
/* 03 · When the recording ends                                        */
/* ================================================================== */

export function AfterScene() {
  return (
    <Scene id="after" className="bg-ink-950">
      <AfterContent />
    </Scene>
  );
}

function AfterContent() {
  const active = useSceneActive();
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => setStopped(true), 1600);
    return () => window.clearTimeout(id);
  }, [active]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 text-center">
      <div className="relative h-9">
        <motion.div
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-live/40 bg-live/10 px-4 py-1.5 font-mono text-xs tracking-[0.16em] whitespace-nowrap text-live uppercase"
          animate={{ opacity: stopped ? 0 : 1, scale: stopped ? 0.96 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="size-2 animate-pulse-soft rounded-full bg-live" />
          REC · Studio 2 · 00:58:11
        </motion.div>
        <motion.div
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-line-2 bg-ink-800 px-4 py-1.5 font-mono text-xs tracking-[0.16em] whitespace-nowrap text-fg uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: stopped ? 1 : 0, scale: stopped ? 1 : 1.04 }}
          transition={{ duration: 0.5, delay: stopped ? 0.25 : 0 }}
        >
          <span className="size-2 rounded-[2px] bg-fg" />
          Render final · 58:12
        </motion.div>
      </div>

      <BigStatement
        show={stopped}
        delay={0.5}
        align="center"
        size="xl"
        lines={["Pero cuando termina la grabación,", { text: "empieza otra producción.", tone: "gold" }]}
      />
    </div>
  );
}

/* ================================================================== */
/* 04 · Tools as islands                                               */
/* ================================================================== */

export function IslandsScene() {
  return (
    <Scene id="islands">
      <IslandsContent />
    </Scene>
  );
}

function IslandsContent() {
  const active = useSceneActive();
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-6">
          <SceneHeader />
          <BigStatement
            size="md"
            lines={["Cada herramienta funciona.", { text: "El problema aparece entre una y la siguiente.", tone: "muted" }]}
          />
        </div>
        <Reveal delay={0.2} className="flex gap-8 lg:pb-2">
          {[
            { v: CURRENT_WORKFLOW.length, l: "pasos por episodio" },
            { v: WORKFLOW_TOOL_COUNT, l: "herramientas y puntos de control" },
            { v: WORKFLOW_MANUAL_STEPS, l: "pasos manuales" },
            { v: TOOL_SWITCHES, l: "cambios de herramienta" },
          ].map((m) => (
            <div key={m.l} className="flex flex-col gap-1">
              <span className="display text-3xl text-fg tabular">{m.v}</span>
              <span className="max-w-24 text-[11px] leading-tight text-fg-3">{m.l}</span>
            </div>
          ))}
        </Reveal>
      </div>
      <Reveal delay={0.1} y={24}>
        <CurrentWorkflow active={active} />
      </Reveal>
    </div>
  );
}

/* ================================================================== */
/* 05 · Identified load                                                */
/* ================================================================== */

export function LoadScene() {
  const cells = Array.from({ length: KNOWN_HOURS_WEEK }, (_, i) => (i < SEO_THUMBNAIL_HOURS_WEEK ? "seo" : "social"));
  return (
    <Scene id="load">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SceneHeader
            title={
              <>
                Más de {KNOWN_HOURS_WEEK} horas semanales{" "}
                <span className="text-fg-3">identificadas entre determinadas tareas editoriales y de distribución.</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="max-w-lg text-sm leading-relaxed text-fg-3">
              Es una primera fotografía operativa, con {CURRENT_PROGRAMS} episodios semanales. No incluye el resto de la
              operación de NAVI: solo las capas que ya hemos podido medir.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10">
          <MetricGrid columns={2}>
            <Metric
              claim="actual"
              prefix="~"
              value={SEO_THUMBNAIL_HOURS_WEEK}
              unit="h / semana"
              label="SEO, optimización editorial y miniaturas"
              sub={`${PEOPLE.editorial} · ~${formatFixed(toWorkdays(SEO_THUMBNAIL_HOURS_WEEK), 0)} jornadas semanales`}
              size="lg"
            />
            <Metric
              claim="actual"
              prefix="~"
              value={SOCIAL_HOURS_WEEK}
              unit="h / semana"
              label="Programación de Social Clips NAVI y entrega a programas"
              sub="Incluye compartir carpetas y enlaces"
              size="lg"
              delay={0.1}
            />
          </MetricGrid>

          <Reveal delay={0.2} className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-fg-3">
              <span>Cada bloque = 1 hora identificada / semana</span>
              <span className="font-mono tabular">{KNOWN_HOURS_WEEK} h</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5" role="img" aria-label={`${KNOWN_HOURS_WEEK} horas semanales`}>
              {cells.map((kind, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.035, duration: 0.4 }}
                  className={cn("h-7 rounded-[4px]", kind === "seo" ? "bg-gold" : "bg-gold/35")}
                />
              ))}
            </div>
            <div className="flex gap-5 text-xs text-fg-3">
              <span className="inline-flex items-center gap-2">
                <span className="size-2.5 rounded-[3px] bg-gold" />
                SEO + miniaturas
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2.5 rounded-[3px] bg-gold/35" />
                Programación + entrega
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-line pt-6">
            <div className="flex flex-col gap-1">
              <span className="display text-3xl">~{formatFixed(HOURS_PER_EPISODE, 1)} h</span>
              <span className="text-xs text-fg-3">
                de carga identificada por episodio ({formatHoursMinutes(HOURS_PER_EPISODE)})
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="display text-3xl">≈ {formatFixed(toWorkdays(KNOWN_HOURS_WEEK), 1)}</span>
              <span className="text-xs text-fg-3">jornadas de {WORKDAY_HOURS} h cada semana</span>
            </div>
            <ClaimTag kind="actual" withNote="Aproximación basada en el proceso actual." />
          </Reveal>
        </div>
      </div>
    </Scene>
  );
}
