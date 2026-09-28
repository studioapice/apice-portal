/**
 * Activity log derived from the demo state (pure, deterministic).
 * Timestamps are simulated: 1 s of demo ≈ 1 min of real processing.
 */
import { CLIPS, DEMO_EPISODE, DETECTION_CHECKS, DISTRIBUTION_TASKS, ENGINES, PROGRAM_CONTEXT } from "@/data/demo";
import type { DemoState } from "./demoMachine";

export interface LogEntry {
  t: string;
  text: string;
  kind: "system" | "done" | "human" | "wait";
}

const BASE = 20 * 3600 + 14 * 60 + 3; // 20:14:03, right after the recording

function clock(offsetSeconds: number): string {
  const s = BASE + Math.round(offsetSeconds);
  const hh = Math.floor(s / 3600) % 24;
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return [hh, mm, ss].map((n) => String(n).padStart(2, "0")).join(":");
}

const ORDER = ["idle", "renderDetected", "processing", "thumbnailReview", "clipReview", "distributing", "complete"];

export function deriveLog(state: DemoState): LogEntry[] {
  const log: LogEntry[] = [];
  const reached = (phase: string) => ORDER.indexOf(state.phase) >= ORDER.indexOf(phase);

  log.push({ t: clock(-40), text: `Escuchando renders · ${DEMO_EPISODE.program}`, kind: "system" });
  if (!reached("renderDetected")) return log;

  const labels = [
    `Nuevo render · ${DEMO_EPISODE.file.name}`,
    `Programa identificado · ${DEMO_EPISODE.program}`,
    "Temporada identificada · en curso",
    `Episodio identificado · ${DEMO_EPISODE.label}`,
  ];
  DETECTION_CHECKS.forEach((_, i) => {
    if (state.detectStep > i || reached("processing")) {
      log.push({ t: clock(i * 2), text: labels[i], kind: "done" });
    }
  });
  if (state.detectStep > DETECTION_CHECKS.length || reached("processing")) {
    log.push({ t: clock(9), text: `Contexto cargado · ${PROGRAM_CONTEXT.length} configuraciones`, kind: "system" });
  }
  if (!reached("processing")) return log;

  log.push({ t: clock(12), text: `Workflow iniciado · ${ENGINES.length} procesos en paralelo`, kind: "system" });
  const processingDone = reached("thumbnailReview");
  [...ENGINES]
    .sort((a, b) => a.duration - b.duration)
    .forEach((e) => {
      if (processingDone || state.elapsed >= e.duration) {
        log.push({ t: clock(12 + e.duration * 60), text: `${e.name} · ${e.done}`, kind: "done" });
      }
    });
  if (!processingDone) return log;

  const reviewStart = 12 + Math.max(...ENGINES.map((e) => e.duration)) * 60 + 20;
  log.push({ t: clock(reviewStart), text: "Aprobación requerida · Miniatura", kind: "wait" });
  if (state.thumbnailApproved) {
    log.push({ t: clock(reviewStart + 70), text: `Miniatura ${state.thumbnail} aprobada`, kind: "human" });
  }
  if (!reached("clipReview")) return log;

  log.push({ t: clock(reviewStart + 74), text: `Aprobación requerida · ${CLIPS.length} clips`, kind: "wait" });
  if (!state.clipsApproved) return log;

  const approvedAt = reviewStart + 74 + 392;
  log.push({
    t: clock(approvedAt),
    text: `Selección aprobada · 3 clips NAVI · ${CLIPS.length - 3} clips programa`,
    kind: "human",
  });
  DISTRIBUTION_TASKS.forEach((task, i) => {
    if (state.distStep > i) log.push({ t: clock(approvedAt + 6 + i * 9), text: task, kind: "done" });
  });
  if (state.phase === "complete") {
    log.push({
      t: clock(approvedAt + 12 + DISTRIBUTION_TASKS.length * 9),
      text: `Producción completa · ${DEMO_EPISODE.label}`,
      kind: "done",
    });
  }
  return log;
}
