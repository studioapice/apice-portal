/**
 * NAVI Intelligence — SIMULATION.
 * Invented figures to visualise the experience 7 days after publishing.
 * The retention curve integrates to the stated average view duration
 * (37 % of the real 45:19 episode length).
 */
import type { PlatformId } from "@/components/ui/Glyphs";

export const EPISODE_PERFORMANCE = {
  views: 86200,
  ctr: 0.079,
  channelCtr: 0.061,
  avgViewDuration: "16:54",
  subscribers: 427,
  episodeDuration: "45:19",
};

/** Daily views, day 1 = publish day (Tue 21:00, real YSFT slot). Sums to `views`. */
export const DAILY_VIEWS = [
  { day: "Mar", views: 9800 },
  { day: "Mié", views: 21400 },
  { day: "Jue", views: 16100 },
  { day: "Vie", views: 12300 },
  { day: "Sáb", views: 10200 },
  { day: "Dom", views: 8900 },
  { day: "Lun", views: 7500 },
];

/** Audience retention, minute → share of viewers still watching. */
export const RETENTION: Array<[number, number]> = [
  [0, 1],
  [0.19, 0.9],
  [0.58, 0.78],
  [1.17, 0.71],
  [2.34, 0.63],
  [4.67, 0.55],
  [7.79, 0.49],
  [11.68, 0.44],
  [15.57, 0.4],
  [19.47, 0.365],
  [23.36, 0.34],
  [27.25, 0.315],
  [31.15, 0.29],
  [35.04, 0.27],
  [38.93, 0.245],
  [42.05, 0.22],
  [44.39, 0.18],
  [45.32, 0.11],
];

export const EPISODE_MINUTES = 45.32;

/** Shorts performance per selected clip and platform. */
export const SHORTS_PERFORMANCE: Array<{
  rank: 1 | 2 | 3;
  title: string;
  byPlatform: Partial<Record<PlatformId, number>>;
}> = [
  { rank: 1, title: "Reaccionar no es lo mismo que responder", byPlatform: { instagram: 38000, tiktok: 57000, shorts: 26000 } },
  { rank: 2, title: "El segundo antes de contestar", byPlatform: { tiktok: 21000, shorts: 11000 } },
  { rank: 3, title: "¿Tener razón o estar en paz?", byPlatform: { shorts: 18000 } },
];

export function shortTotal(byPlatform: Partial<Record<PlatformId, number>>): number {
  return Object.values(byPlatform).reduce<number>((a, b) => a + (b ?? 0), 0);
}

/** Fixed series order — color follows the platform, never its rank. */
export const PLATFORM_SERIES: Array<{ id: PlatformId; color: string }> = [
  { id: "instagram", color: "var(--color-chart-3)" },
  { id: "tiktok", color: "var(--color-chart-2)" },
  { id: "shorts", color: "var(--color-chart-1)" },
];

/** Patterns detected over historical data. */
export const INSIGHTS = [
  {
    id: "timing",
    title: "Los clips publicados entre 19:00 y 20:00 están superando la media.",
    evidence: "+34 % de visualizaciones frente a la media del canal",
    basis: "14 clips · últimas 6 semanas",
    suggestion: "Programar los Social Clips en la franja 19:00–20:00.",
  },
  {
    id: "thumbnail",
    title: "Las miniaturas con primer plano están obteniendo un CTR superior.",
    evidence: "8,4 % frente a 6,1 % de media",
    basis: "8 publicaciones",
    suggestion: "Incluir siempre una variante de primer plano en las propuestas.",
  },
  {
    id: "hook",
    title: "Los primeros 90 segundos retienen mejor cuando el episodio empieza con una pregunta.",
    evidence: "71 % frente a 63 % de retención al 1:30",
    basis: "12 episodios analizados",
    suggestion: "Proponer al equipo abrir con una pregunta directa.",
  },
] as const;
