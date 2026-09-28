/**
 * Claim taxonomy — every figure on screen belongs to exactly one kind.
 */
export type ClaimKind =
  | "actual"
  | "projection"
  | "estimate"
  | "target"
  | "simulation"
  | "concept";

export const CLAIM_LABELS: Record<ClaimKind, string> = {
  actual: "Dato actual",
  projection: "Proyección",
  estimate: "Estimación",
  target: "Objetivo",
  simulation: "Simulación",
  concept: "Concepto",
};

export const CLAIM_DESCRIPTIONS: Record<ClaimKind, string> = {
  actual: "Dato identificado en la operación actual de NAVI.",
  projection:
    "Proyección ilustrativa si la carga actual creciera proporcionalmente.",
  estimate: "Estimación de desarrollo sujeta a validación.",
  target: "Objetivo de diseño. No es una medición.",
  simulation: "Datos simulados para visualizar la experiencia.",
  concept: "Interfaz propuesta. No es software en producción.",
};
