"use client";

import { Scene } from "@/components/presentation/Scene";
import { RenderSimulation } from "@/components/demo/RenderSimulation";

/* ================================================================== */
/* 12 · Live the experience                                            */
/* ================================================================== */

export function DemoScene() {
  return (
    <Scene id="demo" bleed className="px-3 pt-16 pb-6 sm:px-6 lg:h-svh lg:px-10 lg:pt-8 lg:pb-14">
      <RenderSimulation />
    </Scene>
  );
}
