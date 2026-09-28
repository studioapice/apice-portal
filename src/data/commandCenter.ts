/**
 * Command Center — SIMULATION overlay on real NAVI programs.
 * Pipeline totals are derived from `programs.ts`; weekly figures are invented.
 */
import { CLIP_RULES } from "@/config/presentation";
import { CLIP_SLOTS } from "./demo";
import { PROGRAMS, programBySlug, type NetworkSlug } from "./programs";

export const WEEK_METRICS = [
  { id: "views", label: "Visualizaciones", value: 412000, format: "compact", delta: 0.12, trend: [288, 301, 296, 322, 340, 356, 368, 412] },
  { id: "ctr", label: "CTR medio", value: 0.068, format: "percent", delta: 0.004, trend: [6.1, 6.2, 6.0, 6.3, 6.4, 6.4, 6.6, 6.8] },
  { id: "watch", label: "Watch time", value: 18400, format: "hours", delta: 0.09, trend: [13.2, 13.9, 14.1, 15.0, 15.6, 16.2, 17.1, 18.4] },
  { id: "shorts", label: "Shorts views", value: 1240000, format: "compact", delta: 0.21, trend: [0.71, 0.76, 0.82, 0.88, 0.94, 1.02, 1.1, 1.24] },
  { id: "subs", label: "Suscriptores", value: 2140, format: "signed", delta: 0.16, trend: [1.4, 1.5, 1.45, 1.6, 1.72, 1.8, 1.95, 2.14] },
] as const;

/** In-flight work (SIMULATION), referencing real programs by slug. */
export const PIPELINE = [
  { program: "the-show", stage: "Processing", detail: "OpusClip · 72 %", tone: "sys" },
  { program: "kom2life", stage: "Processing", detail: "SEO Engine", tone: "sys" },
  { program: "mindset-evolution", stage: "Processing", detail: "Subiendo a YouTube", tone: "sys" },
  { program: "y-si-fueras-tu", stage: "Awaiting review", detail: "Miniatura · 3 opciones", tone: "gold" },
  { program: "la-sobremesa", stage: "Awaiting review", detail: "Clips · 11 detectados", tone: "gold" },
] as const;

/** Operational alerts (SIMULATION). */
export const ALERTS = [
  { level: "warn", title: "Metricool: reautorizar conexión", detail: "El token caduca en 5 días" },
  { level: "info", title: "Hacemos Que Pase · Brand Kit", detail: "Falta la plantilla de Opus del programa" },
  { level: "info", title: "YouTube Data API", detail: "Cuota diaria al 38 % · sin incidencias" },
] as const;

export const CALENDAR_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;

export interface CalendarItem {
  day: number;
  time: string;
  program: string;
  networkSlug: NetworkSlug;
  kind: "episode" | "clip";
  rank?: number;
  platforms?: ReadonlyArray<"instagram" | "tiktok" | "shorts">;
}

/**
 * Week view. Episode slots come from the audited schedules (real);
 * clip slots are the demo's simulated NAVI 3-Clip schedule for YSFT.
 */
export const CALENDAR_ITEMS: CalendarItem[] = [
  ...PROGRAMS.flatMap((p) =>
    p.slots.map((s) => ({ day: s.day, time: s.time, program: p.name, networkSlug: p.networkSlug, kind: "episode" as const })),
  ),
  ...CLIP_SLOTS.map((c) => {
    const ysft = programBySlug("y-si-fueras-tu");
    return {
      day: c.day,
      time: c.time,
      program: ysft.name,
      networkSlug: ysft.networkSlug,
      kind: "clip" as const,
      rank: c.rank,
      platforms: CLIP_RULES.find((r) => r.rank === c.rank)?.platforms ?? [],
    };
  }),
].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));

export const INTEGRATIONS = [
  { name: "Dropbox", status: "ok", detail: "Webhook activo · 120 ms" },
  { name: "OpusClip", status: "ok", detail: "Cola: 1 trabajo" },
  { name: "AI Editorial Engine", status: "ok", detail: "Prompts v2.3 por programa" },
  { name: "YouTube Data API", status: "ok", detail: "Cuota diaria usada: 38 %" },
  { name: "Metricool", status: "warn", detail: "Reautorizar en 5 días" },
  { name: "Airtable", status: "ok", detail: "Sincronizado hace 2 min" },
] as const;

export const WORKFLOW_RUNS_24H = { ok: 46, retried: 1, failed: 0 };
