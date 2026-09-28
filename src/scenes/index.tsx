import type { ComponentType } from "react";
import type { SceneId } from "@/data/scenes";
import { AfterScene, IslandsScene, LoadScene, MachineScene, OpeningScene } from "./act1";
import { ElevenScene, QuestionScene, ScalingScene } from "./act2";
import { ArchitectureScene, PrincipleScene, RevealScene } from "./act3";
import { DemoScene } from "./act4";
import { IntelligenceScene, LaterScene, LearningScene } from "./act5";
import { CommandScene, ImpactScene, ScaleScene } from "./act6to8";
import {
  FinaleScene,
  FoundationsScene,
  InvestmentScene,
  OwnershipScene,
  RoadmapScene,
  RoiScene,
  SystemsScene,
} from "./act9to15";

/** Scene id → component. Order is defined in `src/data/scenes.ts`. */
export const SCENE_COMPONENTS: Record<SceneId, ComponentType> = {
  opening: OpeningScene,
  machine: MachineScene,
  after: AfterScene,
  islands: IslandsScene,
  load: LoadScene,
  eleven: ElevenScene,
  scaling: ScalingScene,
  question: QuestionScene,
  reveal: RevealScene,
  architecture: ArchitectureScene,
  principle: PrincipleScene,
  demo: DemoScene,
  later: LaterScene,
  intelligence: IntelligenceScene,
  learning: LearningScene,
  command: CommandScene,
  scale: ScaleScene,
  impact: ImpactScene,
  roi: RoiScene,
  systems: SystemsScene,
  roadmap: RoadmapScene,
  foundations: FoundationsScene,
  ownership: OwnershipScene,
  investment: InvestmentScene,
  finale: FinaleScene,
};
