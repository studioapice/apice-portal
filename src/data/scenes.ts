/**
 * Scene registry — narrative order of the presentation.
 * Each scene maps to a component in `src/scenes/index.tsx`.
 * ~1 min of conversation per scene; the demo (scene 12) takes 4–7 min.
 */

export type SceneId =
  | "opening"
  | "machine"
  | "after"
  | "islands"
  | "load"
  | "eleven"
  | "scaling"
  | "question"
  | "reveal"
  | "architecture"
  | "principle"
  | "demo"
  | "later"
  | "intelligence"
  | "learning"
  | "command"
  | "scale"
  | "impact"
  | "roi"
  | "systems"
  | "roadmap"
  | "foundations"
  | "ownership"
  | "investment"
  | "finale";

export interface Act {
  numeral: string;
  title: string;
}

export const ACTS = {
  I: { numeral: "I", title: "La máquina que ya funciona" },
  II: { numeral: "II", title: "11 no es el problema" },
  III: { numeral: "III", title: "NAVI OS" },
  IV: { numeral: "IV", title: "Vivir NAVI OS" },
  V: { numeral: "V", title: "El episodio no termina al publicarse" },
  VI: { numeral: "VI", title: "El centro de mando" },
  VII: { numeral: "VII", title: "Escalar sin multiplicar la complejidad" },
  VIII: { numeral: "VIII", title: "Impacto operativo" },
  IX: { numeral: "IX", title: "Escenarios" },
  X: { numeral: "X", title: "Qué estamos construyendo" },
  XI: { numeral: "XI", title: "Cómo lo construiremos" },
  XII: { numeral: "XII", title: "Los cimientos" },
  XIII: { numeral: "XIII", title: "Propiedad" },
  XIV: { numeral: "XIV", title: "Inversión" },
  XV: { numeral: "XV", title: "Cierre" },
} as const satisfies Record<string, Act>;

export type ActKey = keyof typeof ACTS;

export interface SceneMeta {
  id: SceneId;
  act: ActKey;
  title: string;
}

export const SCENES: readonly SceneMeta[] = [
  { id: "opening", act: "I", title: "Apertura" },
  { id: "machine", act: "I", title: "La máquina que ya funciona" },
  { id: "after", act: "I", title: "Cuando termina la grabación" },
  { id: "islands", act: "I", title: "Herramientas como islas" },
  { id: "load", act: "I", title: "Carga identificada" },
  { id: "eleven", act: "II", title: "11 funciona" },
  { id: "scaling", act: "II", title: "Si NAVI crece" },
  { id: "question", act: "II", title: "La pregunta" },
  { id: "reveal", act: "III", title: "NAVI OS" },
  { id: "architecture", act: "III", title: "Arquitectura" },
  { id: "principle", act: "III", title: "El software trabaja. El humano decide." },
  { id: "demo", act: "IV", title: "Simulación: nuevo render" },
  { id: "later", act: "V", title: "7 días después" },
  { id: "intelligence", act: "V", title: "NAVI Intelligence" },
  { id: "learning", act: "V", title: "Patrones y aprendizaje" },
  { id: "command", act: "VI", title: "Centro de mando" },
  { id: "scale", act: "VII", title: "Nuevo programa ≠ nuevo sistema" },
  { id: "impact", act: "VIII", title: "Impacto operativo" },
  { id: "roi", act: "IX", title: "Calculadora de escenarios" },
  { id: "systems", act: "X", title: "Los sistemas de NAVI OS" },
  { id: "roadmap", act: "XI", title: "Roadmap" },
  { id: "foundations", act: "XII", title: "Los cimientos" },
  { id: "ownership", act: "XIII", title: "Propiedad" },
  { id: "investment", act: "XIV", title: "Inversión" },
  { id: "finale", act: "XV", title: "Cierre" },
];

export function sceneIndexOf(id: SceneId): number {
  return SCENES.findIndex((s) => s.id === id);
}
