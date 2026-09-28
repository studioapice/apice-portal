/**
 * Demo scenario.
 *
 * REAL (audited, see ASSET_AUDIT.md): program, network, hosts, playlist,
 * weekly slot, and the episode itself — "La diferencia entre REACCIONAR y
 * RESPONDER que cambiará tu vida" (YouTube pV5sC9v2yrY, 45:19) and its
 * published thumbnail. No season/episode number is shown: it isn't public.
 *
 * SIMULATION: file name/size, program configuration values, SEO proposals,
 * chapters, clips, scores, clip schedule and everything the system "does".
 */
import { CLIP_RULES } from "@/config/presentation";
import type { PlatformId } from "@/components/ui/Glyphs";

export const DEMO_EPISODE = {
  program: "¿Y si fueras tú?",
  programShort: "YSFT",
  hosts: ["Lilly Méndez", "Nico Osorio"],
  network: "NAVI Bienestar",
  /** Short label used in chips and breadcrumbs. */
  label: "Reaccionar o responder",
  title: "La diferencia entre reaccionar y responder",
  publishedTitle: "La diferencia entre REACCIONAR y RESPONDER que cambiará tu vida",
  youtubeId: "pV5sC9v2yrY",
  /** Real published thumbnail (maxresdefault, 1280×720). */
  publishedThumbnail: "/programs/y-si-fueras-tu/thumbnail-01.jpg",
  file: {
    name: "YSFT_reaccionar-o-responder_MASTER.mp4",
    path: "Dropbox / NAVI / Programas / Y si fueras tú / Reaccionar o responder / Render",
    resolution: "1920 × 1080 · 25 fps",
    duration: "45:19",
    size: "7,6 GB",
  },
  studio: "Studio 2",
};

/** Step 1 — identification checks. */
export const DETECTION_CHECKS = [
  { label: "Dropbox", result: "Archivo encontrado", detail: DEMO_EPISODE.file.name },
  { label: "Metadata", result: "Programa identificado", detail: DEMO_EPISODE.program },
  { label: "Season", result: "Temporada identificada", detail: "Temporada en curso" },
  { label: "Episode", result: "Episodio identificado", detail: DEMO_EPISODE.label },
] as const;

/** Program configuration NAVI OS loads automatically. */
export const PROGRAM_CONTEXT = [
  { label: "Canal", value: "NAVI Bienestar" },
  { label: "Brand Kit", value: "YSFT · Brand Kit" },
  { label: "Opus Brand Template", value: "YSFT Vertical" },
  { label: "Prompts editoriales", value: "YSFT · Tono reflexivo" },
  { label: "Plantilla de miniatura", value: "YSFT · Hosts + titular" },
  { label: "Playlist", value: "¿Y SI FUERAS TÚ?" },
  { label: "Colaboradores", value: "Lilly Méndez · Nico Osorio" },
  { label: "Calendario", value: "Martes · 21:00" },
  { label: "Reglas de distribución", value: "NAVI 3-Clip Rule" },
] as const;

/** Step 2 — parallel engines. */
export type EngineId = "opus" | "seo" | "thumbnails" | "youtube" | "assets";

export const ENGINES: Array<{
  id: EngineId;
  name: string;
  verb: string;
  done: string;
  /** Seconds (simulation timeline). */
  duration: number;
}> = [
  { id: "opus", name: "OpusClip", verb: "Detectando momentos", done: "10 clips detectados", duration: 6.4 },
  { id: "seo", name: "SEO Engine", verb: "Generando metadata", done: "Título, descripción, capítulos", duration: 5.2 },
  { id: "thumbnails", name: "Thumbnail Engine", verb: "Componiendo opciones", done: "3 propuestas listas", duration: 5.8 },
  { id: "youtube", name: "YouTube", verb: "Subiendo en privado", done: "Subido · privado", duration: 4.6 },
  { id: "assets", name: "Assets", verb: "Organizando carpetas", done: "Estructura creada", duration: 3.6 },
];

export const SEO_OUTPUT = {
  titles: [
    DEMO_EPISODE.publishedTitle,
    "Reaccionar o responder: el hábito que cambia tus relaciones",
    "Por qué reaccionas antes de pensar (y cómo evitarlo)",
  ],
  description:
    "Lilly Méndez y Nico Osorio hablan de la diferencia entre reaccionar y responder: qué ocurre en el instante antes de actuar y cómo recuperar el control de tus emociones.",
  chapters: [
    { t: "00:00", label: "Introducción" },
    { t: "02:40", label: "¿Reaccionar o responder?" },
    { t: "10:15", label: "Cuando la emoción conduce" },
    { t: "21:30", label: "Gestión emocional en el día a día" },
    { t: "32:05", label: "Herramientas para responder" },
    { t: "41:20", label: "La pregunta final" },
  ],
  tags: ["gestión emocional", "reaccionar", "responder", "bienestar", "podcast", "NAVI Bienestar"],
};

export const ASSET_TREE = [
  { depth: 0, name: "Y si fueras tú / Reaccionar o responder" },
  { depth: 1, name: "Render + recursos" },
  { depth: 1, name: "Miniatura + recursos" },
  { depth: 1, name: "Social Clips NAVI" },
  { depth: 1, name: "Social Clips Programa" },
] as const;

/** Step 3 — thumbnail options. B is the real published thumbnail. */
export type ThumbnailId = "A" | "B" | "C";

export const THUMBNAILS: Array<{
  id: ThumbnailId;
  concept: string;
  note: string;
}> = [
  { id: "A", concept: "Tipográfica", note: "Pregunta en serif, sin rostro" },
  { id: "B", concept: "Hosts en set", note: "Ambos hosts + titular" },
  { id: "C", concept: "Primer plano", note: "Retrato cercano + palabra clave" },
];

/** Step 4 — clips detected (SIMULATION). Scores are illustrative. */
export interface DemoClip {
  id: string;
  title: string;
  start: string;
  duration: string;
  score: number;
  speaker: "Nico" | "Lilly" | "Ambos";
  copy: string;
  /** Visual variant for the stylised frame. */
  frame: 0 | 1 | 2 | 3;
}

export const CLIPS: DemoClip[] = [
  { id: "c01", title: "Reaccionar no es lo mismo que responder", start: "06:12", duration: "00:43", score: 94, speaker: "Lilly", copy: "Entre lo que pasa y lo que haces hay un espacio. Ahí decides tú.", frame: 1 },
  { id: "c02", title: "El segundo antes de contestar", start: "11:40", duration: "00:52", score: 91, speaker: "Nico", copy: "Todo se decide en el segundo antes de contestar.", frame: 0 },
  { id: "c03", title: "¿Tener razón o estar en paz?", start: "21:05", duration: "00:37", score: 88, speaker: "Ambos", copy: "A veces ganar la discusión es perder la relación.", frame: 2 },
  { id: "c04", title: "Cuando la emoción conduce", start: "15:22", duration: "01:02", score: 86, speaker: "Lilly", copy: "La emoción no es el problema. Dejarle el volante, sí.", frame: 3 },
  { id: "c05", title: "Lo que aprendí de mis peores reacciones", start: "27:48", duration: "00:51", score: 83, speaker: "Nico", copy: "Mis peores reacciones fueron mis mejores maestras.", frame: 0 },
  { id: "c06", title: "Responder también es poner límites", start: "30:10", duration: "00:29", score: 81, speaker: "Lilly", copy: "Responder con calma no significa aceptarlo todo.", frame: 1 },
  { id: "c07", title: "El ejercicio de la pausa", start: "34:26", duration: "00:46", score: 79, speaker: "Nico", copy: "Una pausa pequeña. Una conversación distinta.", frame: 2 },
  { id: "c08", title: "Reaccionar en pareja", start: "37:12", duration: "00:55", score: 76, speaker: "Ambos", copy: "¿Discutís para entenderos o para ganar?", frame: 3 },
  { id: "c09", title: "Una conversación pendiente contigo", start: "40:03", duration: "00:34", score: 72, speaker: "Lilly", copy: "La primera respuesta que te debes es a ti.", frame: 1 },
  { id: "c10", title: "La pregunta que te devuelve el control", start: "43:05", duration: "01:08", score: 70, speaker: "Nico", copy: "Una pregunta para volver a elegir cómo actuar.", frame: 0 },
];

export function rulePlatforms(rank: number): readonly PlatformId[] {
  return CLIP_RULES.find((r) => r.rank === rank)?.platforms ?? [];
}

/** Step 5 — automatic distribution tasks. */
export const DISTRIBUTION_TASKS = [
  "Organizando Dropbox",
  "Guardando Social Clips NAVI",
  "Creando Host Package",
  "Aplicando copy",
  "Programando Instagram",
  "Programando TikTok",
  "Programando YouTube Shorts",
  "Actualizando YouTube",
  "Asignando thumbnail",
  "Actualizando Airtable",
  "Preparando entrega",
] as const;

const DAY_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

/** Real YSFT weekly slot (audited): Martes 21:00. */
export const EPISODE_SCHEDULE = "Mar · 21:00";

/** Proposed Social Clips NAVI slots after the premiere (SIMULATION). 0 = Monday. */
export const CLIP_SLOTS = [
  { rank: 1, day: 2, time: "19:30" },
  { rank: 2, day: 3, time: "19:30" },
  { rank: 3, day: 4, time: "19:30" },
] as const;

export const CLIP_SCHEDULE: Record<number, string> = Object.fromEntries(
  CLIP_SLOTS.map((s) => [s.rank, `${DAY_SHORT[s.day]} · ${s.time}`]),
);

/** Step 6 — production summary. */
export const COMPLETION_ITEMS = [
  "Render",
  "SEO",
  "Thumbnail",
  "Clips",
  "Social Distribution",
  "YouTube",
  "Host Package",
  "Data Sync",
] as const;
