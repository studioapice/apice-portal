"use client";

import { MotionConfig } from "motion/react";
import { SCENE_COMPONENTS } from "@/scenes";
import { SCENES } from "@/data/scenes";
import { PresentationProvider } from "./PresentationProvider";
import { PresenterChrome } from "./PresenterChrome";
import { SceneIndex } from "./SceneIndex";

export function Presentation() {
  return (
    <MotionConfig reducedMotion="user">
      <PresentationProvider>
        <main id="presentation" className="relative">
          {SCENES.map((scene) => {
            const Component = SCENE_COMPONENTS[scene.id];
            return <Component key={scene.id} />;
          })}
        </main>
        <PresenterChrome />
        <SceneIndex />
      </PresentationProvider>
    </MotionConfig>
  );
}
