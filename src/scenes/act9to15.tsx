"use client";

import { motion } from "motion/react";
import { FileText } from "lucide-react";
import {
  BETA_WEEKS_MAX,
  BETA_WEEKS_MIN,
  EXPECTED_DEV_HOURS_MAX,
  EXPECTED_DEV_HOURS_MIN,
} from "@/config/presentation";
import { ESTIMATE_DRIVERS, FOUNDATION_DOCS, FUTURE_MODULES, SYSTEMS, V1_MODULES } from "@/data/build";
import { pad2 } from "@/lib/format";
import { Scene, useSceneSteps } from "@/components/presentation/Scene";
import { BigStatement } from "@/components/ui/BigStatement";
import { ClaimTag } from "@/components/ui/ClaimTag";
import { Reveal, EASE_OUT } from "@/components/ui/Reveal";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { StepHint } from "@/components/ui/StepHint";
import { ROICalculator } from "@/components/business/ROICalculator";
import { Roadmap } from "@/components/business/Roadmap";
import { Investment } from "@/components/business/Investment";
import { Finale } from "@/components/business/Finale";

/* ================================================================== */
/* 19 · ROI scenarios                                                  */
/* ================================================================== */

export function RoiScene() {
  return (
    <Scene id="roi">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <SceneHeader
          title={
            <>
              A medida que NAVI crece, <span className="text-fg-3">la ecuación cambia.</span>
            </>
          }
        />
        <ROICalculator />
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 20 · What we are building                                           */
/* ================================================================== */

export function SystemsScene() {
  return (
    <Scene id="systems">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <SceneHeader
          title={
            <>
              15 sistemas. <span className="text-fg-3">Una sola plataforma.</span>
            </>
          }
        />
        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {SYSTEMS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.04 }}
              className="flex min-h-32 flex-col gap-2 bg-ink-900 p-4"
            >
              <span className="font-mono text-[11px] text-gold">{s.n}</span>
              <span className="text-[14px] leading-snug text-fg">{s.name}</span>
              <span className="text-[11.5px] leading-snug text-fg-3">{s.desc}</span>
            </motion.li>
          ))}
        </ol>

        <Reveal delay={0.2} className="grid gap-4 border-t border-line pt-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-fg">Arquitectura preparada para crecer</span>
            <span className="text-xs text-fg-4">Los módulos futuros no forman parte de esta inversión.</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">V1</span>
              {V1_MODULES.map((m) => (
                <span key={m} className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold">
                  {m}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-[10px] tracking-[0.14em] text-fg-4 uppercase">Futuro</span>
              {FUTURE_MODULES.map((m) => (
                <span key={m} className="rounded-full border border-dashed border-line-2 px-3 py-1 text-xs text-fg-4">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 21 · How we will build it                                           */
/* ================================================================== */

export function RoadmapScene() {
  return (
    <Scene id="roadmap">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
        <SceneHeader
          title={
            <>
              Construiremos mientras NAVI prueba.{" "}
              <span className="text-fg-3">El sistema recibirá uso real antes de declararse terminado.</span>
            </>
          }
        />
        <Roadmap />
        <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-start lg:gap-14">
          <Reveal className="flex flex-col gap-2">
            <ClaimTag kind="estimate" />
            <span className="display text-[clamp(2.6rem,4.4vw,4rem)] leading-none text-fg">
              {EXPECTED_DEV_HOURS_MIN}–{EXPECTED_DEV_HOURS_MAX} h
            </span>
            <span className="text-xs text-fg-3">Desarrollo integral estimado del proyecto completo</span>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3">
            <span className="text-xs text-fg-3">El rango depende de:</span>
            <ul className="flex flex-wrap gap-2">
              {ESTIMATE_DRIVERS.map((d) => (
                <li key={d} className="rounded-full border border-line px-3 py-1 text-xs text-fg-2">
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col gap-2">
            <ClaimTag kind="target" />
            <span className="display text-[clamp(2.6rem,4.4vw,4rem)] leading-none text-fg">
              {BETA_WEEKS_MIN}–{BETA_WEEKS_MAX} sem.
            </span>
            <span className="max-w-60 text-xs text-fg-3">Beta operativa estimada. Se usa antes del cierre total del proyecto; sin fecha absoluta todavía.</span>
          </Reveal>
        </div>
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 22 · Foundations                                                    */
/* ================================================================== */

export function FoundationsScene() {
  return (
    <Scene id="foundations">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SceneHeader />
          <BigStatement
            size="lg"
            lines={["No empezaremos", "escribiendo código.", { text: "Empezaremos eliminando improvisación.", tone: "gold" }]}
          />
          <Reveal delay={0.3}>
            <p className="max-w-md text-[15px] leading-relaxed text-fg-2">
              El proyecto anterior del desarrollador —un motor de sincronización— se construyó sobre Roadmaps, Blueprints y
              reglas permanentes. NAVI OS seguirá una disciplina todavía más estricta.
            </p>
          </Reveal>
        </div>

        <div
          className="relative rounded-2xl border border-line bg-ink-850 p-2"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <ol className="flex flex-col">
            {FOUNDATION_DOCS.map((d, i) => (
              <motion.li
                key={d.code}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: EASE_OUT }}
                className="flex items-center gap-4 border-b border-line px-4 py-3 last:border-b-0"
              >
                <span className="w-6 font-mono text-[11px] text-fg-4">{pad2(i + 1)}</span>
                <FileText className="size-4 shrink-0 text-fg-3" aria-hidden />
                <span className="flex-1 text-[14px] text-fg">{d.name}</span>
                <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-3">{d.code}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 23 · Ownership                                                      */
/* ================================================================== */

export function OwnershipScene() {
  return (
    <Scene id="ownership" className="bg-ink-950">
      <div className="mx-auto grid w-full max-w-7xl items-end gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="flex flex-col gap-10">
          <SceneHeader />
          <BigStatement
            size="xl"
            stagger={0.18}
            lines={["Tu sistema.", "Tus datos.", "Tu infraestructura.", { text: "Tu tecnología.", tone: "gold" }]}
          />
        </div>
        <Reveal delay={0.9} className="flex flex-col gap-4 pb-4">
          <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] leading-snug text-fg">
            NAVI OS se construye como infraestructura propia de NAVI.
          </p>
          <p className="text-sm leading-relaxed text-fg-3">
            No es una suscripción ni una plataforma de terceros: es la tecnología de la próxima etapa de NAVI.
          </p>
          <p className="text-xs text-fg-4">Los términos concretos se recogerán por escrito en el acuerdo.</p>
        </Reveal>
      </div>
    </Scene>
  );
}

/* ================================================================== */
/* 24 · Investment                                                     */
/* ================================================================== */

export function InvestmentScene() {
  return (
    <Scene id="investment" className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(244,242,238,0.06),transparent_60%)]">
      <Investment />
    </Scene>
  );
}

/* ================================================================== */
/* 25 · Finale                                                         */
/* ================================================================== */

export function FinaleScene() {
  return (
    <Scene id="finale" className="bg-ink-950">
      <FinaleContent />
    </Scene>
  );
}

function FinaleContent() {
  const { step, advance, done } = useSceneSteps(1);
  return (
    <>
      <Finale step={step} />
      <StepHint visible={!done} onAdvance={advance} />
    </>
  );
}
