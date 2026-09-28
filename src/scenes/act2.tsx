"use client";

import { AnimatePresence, motion } from "motion/react";
import { CURRENT_PROGRAMS } from "@/config/presentation";
import { Scene, useSceneSteps } from "@/components/presentation/Scene";
import { BigStatement } from "@/components/ui/BigStatement";
import { Build, EASE_OUT } from "@/components/ui/Reveal";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { StepHint } from "@/components/ui/StepHint";
import { ScalingVisualization } from "@/components/visuals/ScalingVisualization";
import { SCALING_STEPS } from "@/config/presentation";

/* ================================================================== */
/* 06 · 11 works                                                       */
/* ================================================================== */

export function ElevenScene() {
  return (
    <Scene id="eleven">
      <ElevenContent />
    </Scene>
  );
}

function ElevenContent() {
  const { step, advance, done } = useSceneSteps(1);
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
      <SceneHeader />
      <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-end lg:gap-10">
        <motion.span
          className="display block text-[clamp(9rem,26vw,24rem)] leading-[0.8] tracking-[-0.06em]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        >
          {CURRENT_PROGRAMS}
        </motion.span>
        <div className="flex flex-col gap-6 pb-[2vw]">
          <BigStatement size="lg" lines={["funciona."]} delay={0.4} />
          <Build show={step >= 1} y={12}>
            <p className="display max-w-md text-[clamp(1.5rem,2.6vw,2.6rem)] leading-tight text-fg-3">
              Pero NAVI no quiere quedarse en {CURRENT_PROGRAMS}.
            </p>
          </Build>
        </div>
      </div>
      <StepHint visible={!done} onAdvance={advance} />
    </div>
  );
}

/* ================================================================== */
/* 07 · If NAVI wins                                                   */
/* ================================================================== */

export function ScalingScene() {
  return (
    <Scene id="scaling">
      <ScalingContent />
    </Scene>
  );
}

function ScalingContent() {
  const { step, setStep, advance, done } = useSceneSteps(SCALING_STEPS.length - 1);
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
      <SceneHeader
        title={
          <>
            El problema no aparece con {CURRENT_PROGRAMS}.{" "}
            <span className="text-fg-3">Aparece cuando NAVI gana.</span>
          </>
        }
      />
      <ScalingVisualization step={step} onSelect={setStep} />
      <StepHint visible={!done} onAdvance={advance} label="Siguiente escenario" />
    </div>
  );
}

/* ================================================================== */
/* 08 · The question                                                   */
/* ================================================================== */

export function QuestionScene() {
  return (
    <Scene id="question" className="bg-ink-950">
      <QuestionContent />
    </Scene>
  );
}

function QuestionContent() {
  const { step, advance, done } = useSceneSteps(1);
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="q"
            exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 0.6 } }}
            className="flex flex-col items-center"
          >
            <BigStatement
              align="center"
              size="lg"
              lines={[
                "¿Tiene que crecer",
                "el equipo operativo",
                { text: "al mismo ritmo que crece NAVI?", tone: "muted" },
              ]}
            />
          </motion.div>
        ) : (
          <motion.div
            key="a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.9, duration: 1.4 } }}
            className="flex flex-col items-center"
          >
            <p className="display text-center text-[clamp(3rem,8vw,8.5rem)] text-fg">No necesariamente.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <StepHint visible={!done} onAdvance={advance} label="Respuesta" />
    </div>
  );
}
