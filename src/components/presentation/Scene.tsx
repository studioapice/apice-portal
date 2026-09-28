"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SCENES, type SceneId } from "@/data/scenes";
import { cn } from "@/lib/cn";
import {
  usePresentationApi,
  usePresentationState,
  type SceneController,
} from "./PresentationProvider";

interface SceneContextValue {
  id: SceneId;
  index: number;
}

const SceneContext = createContext<SceneContextValue | null>(null);

interface SceneProps {
  id: SceneId;
  children: ReactNode;
  className?: string;
  /** Vertical layout: centered (default) or stretched from top. */
  align?: "center" | "top";
  /** Remove default horizontal padding (full-bleed scenes). */
  bleed?: boolean;
}

/**
 * Full-viewport narrative unit. Registers itself for keyboard navigation,
 * progress and the scene index.
 */
export function Scene({ id, children, className, align = "center", bleed }: SceneProps) {
  const index = SCENES.findIndex((s) => s.id === id);
  const meta = SCENES[index];
  const value = useMemo(() => ({ id, index }), [id, index]);

  return (
    <SceneContext.Provider value={value}>
      <section
        id={`scene-${id}`}
        data-scene-index={index}
        aria-label={meta?.title}
        className={cn(
          "relative flex min-h-svh w-full flex-col overflow-hidden",
          align === "center" ? "justify-center" : "justify-start",
          !bleed && "px-5 py-20 sm:px-10 lg:px-16 lg:py-16",
          className,
        )}
      >
        {children}
      </section>
    </SceneContext.Provider>
  );
}

export function useSceneContext(): SceneContextValue {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useSceneContext must be used inside <Scene>");
  return ctx;
}

/** True while this scene is the one crossing the viewport center. */
export function useSceneActive(): boolean {
  const { index } = useSceneContext();
  const { activeIndex } = usePresentationState();
  return activeIndex === index;
}

/** Register next/prev/enter handlers for the current scene. */
export function useSceneController(controller: SceneController): void {
  const { id } = useSceneContext();
  const { registerController } = usePresentationApi();
  useEffect(() => registerController(id, controller), [id, controller, registerController]);
}

/**
 * Keynote-style builds. `step` goes from 0 to `total`.
 * → / Space advances builds before moving to the next scene;
 * ← rewinds them. Entering backwards shows the fully built scene.
 */
export function useSceneSteps(total: number) {
  const [step, setStepState] = useState(0);
  const stepRef = useRef(0);

  const setStep = useCallback(
    (value: number) => {
      const clamped = Math.max(0, Math.min(total, value));
      stepRef.current = clamped;
      setStepState(clamped);
    },
    [total],
  );

  const controller = useMemo<SceneController>(
    () => ({
      next: () => {
        if (stepRef.current < total) {
          setStep(stepRef.current + 1);
          return true;
        }
        return false;
      },
      prev: () => {
        if (stepRef.current > 0) {
          setStep(stepRef.current - 1);
          return true;
        }
        return false;
      },
      enter: (direction) => setStep(direction === "forward" ? 0 : total),
    }),
    [setStep, total],
  );

  useSceneController(controller);

  const advance = useCallback(() => setStep(stepRef.current + 1), [setStep]);

  return { step, setStep, advance, total, done: step >= total };
}
