/**
 * Deterministic state machine for the NAVI OS demo (SIMULATION).
 *
 * idle → renderDetected → processing → thumbnailReview → clipReview
 *      → distributing → complete
 *
 * Automatic phases advance on timers (see useDemoTimers); human phases wait
 * for explicit approval.
 */
import {
  DETECTION_CHECKS,
  DISTRIBUTION_TASKS,
  ENGINES,
  type ThumbnailId,
} from "@/data/demo";
import { NAVI_CLIPS_PER_EPISODE } from "@/config/presentation";

export type DemoPhase =
  | "idle"
  | "renderDetected"
  | "processing"
  | "thumbnailReview"
  | "clipReview"
  | "distributing"
  | "complete";

export const PHASES: Array<{ id: DemoPhase; label: string; human?: boolean }> = [
  { id: "renderDetected", label: "Render" },
  { id: "processing", label: "Procesos" },
  { id: "thumbnailReview", label: "Miniatura", human: true },
  { id: "clipReview", label: "Clips", human: true },
  { id: "distributing", label: "Distribución" },
  { id: "complete", label: "Completo" },
];

export interface DemoState {
  phase: DemoPhase;
  /** 0..checks.length (+1 when program context is loaded). */
  detectStep: number;
  /** Simulated seconds elapsed in processing (wall-clock based). */
  elapsed: number;
  /** performance.now() when processing started. */
  processingStart: number | null;
  thumbnail: ThumbnailId | null;
  thumbnailApproved: boolean;
  /** Clip ids in rank order (index 0 = NAVI #1). */
  selection: string[];
  clipsApproved: boolean;
  /** Distribution tasks completed. */
  distStep: number;
  /** Incremented to flash a "decision required" hint. */
  nudge: number;
}

export const DETECT_TOTAL = DETECTION_CHECKS.length + 1;
export const PROCESSING_TOTAL = Math.max(...ENGINES.map((e) => e.duration)) + 0.6;
export const DIST_TOTAL = DISTRIBUTION_TASKS.length;

export const INITIAL_DEMO: DemoState = {
  phase: "idle",
  detectStep: 0,
  elapsed: 0,
  processingStart: null,
  thumbnail: null,
  thumbnailApproved: false,
  selection: [],
  clipsApproved: false,
  distStep: 0,
  nudge: 0,
};

export type DemoAction =
  | { type: "start" }
  | { type: "reset" }
  | { type: "tick"; now: number }
  | { type: "selectThumbnail"; id: ThumbnailId }
  | { type: "approveThumbnail" }
  | { type: "toggleClip"; id: string }
  | { type: "approveClips" }
  | { type: "fastForward"; now: number }
  | { type: "nudge" };

function toPhase(state: DemoState, phase: DemoPhase): DemoState {
  return { ...state, phase };
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "reset":
      return INITIAL_DEMO;

    case "start":
      return state.phase === "idle" ? { ...INITIAL_DEMO, phase: "renderDetected" } : state;

    case "tick": {
      if (state.phase === "renderDetected") {
        return state.detectStep < DETECT_TOTAL
          ? { ...state, detectStep: state.detectStep + 1 }
          : { ...state, phase: "processing", processingStart: action.now, elapsed: 0 };
      }
      if (state.phase === "processing") {
        const start = state.processingStart ?? action.now;
        const elapsed = (action.now - start) / 1000;
        return elapsed >= PROCESSING_TOTAL
          ? { ...state, elapsed: PROCESSING_TOTAL, phase: "thumbnailReview" }
          : { ...state, elapsed, processingStart: start };
      }
      if (state.phase === "thumbnailReview" && state.thumbnailApproved) {
        return toPhase(state, "clipReview");
      }
      if (state.phase === "distributing") {
        return state.distStep < DIST_TOTAL
          ? { ...state, distStep: state.distStep + 1 }
          : toPhase(state, "complete");
      }
      return state;
    }

    case "selectThumbnail":
      return state.phase === "thumbnailReview" && !state.thumbnailApproved
        ? { ...state, thumbnail: action.id }
        : state;

    case "approveThumbnail":
      return state.phase === "thumbnailReview" && state.thumbnail
        ? { ...state, thumbnailApproved: true }
        : state;

    case "toggleClip": {
      if (state.phase !== "clipReview" || state.clipsApproved) return state;
      if (state.selection.includes(action.id)) {
        return { ...state, selection: state.selection.filter((id) => id !== action.id) };
      }
      if (state.selection.length >= NAVI_CLIPS_PER_EPISODE) return state;
      return { ...state, selection: [...state.selection, action.id] };
    }

    case "approveClips":
      return state.phase === "clipReview" && state.selection.length === NAVI_CLIPS_PER_EPISODE
        ? { ...state, clipsApproved: true, phase: "distributing" }
        : state;

    case "fastForward": {
      switch (state.phase) {
        case "renderDetected":
          return { ...state, detectStep: DETECT_TOTAL, phase: "processing", processingStart: action.now, elapsed: 0 };
        case "processing":
          return { ...state, elapsed: PROCESSING_TOTAL, phase: "thumbnailReview" };
        case "distributing":
          return { ...state, distStep: DIST_TOTAL, phase: "complete" };
        default:
          return state;
      }
    }

    case "nudge":
      return { ...state, nudge: state.nudge + 1 };
  }
}

/** Delay (ms) before the next automatic tick for the current state. */
export function tickDelay(state: DemoState): number | null {
  switch (state.phase) {
    case "renderDetected":
      return state.detectStep < DETECTION_CHECKS.length ? 620 : 1300;
    case "processing":
      return 120;
    case "thumbnailReview":
      return state.thumbnailApproved ? 1100 : null;
    case "distributing":
      return state.distStep < DIST_TOTAL ? 430 : 1000;
    default:
      return null;
  }
}

/** Engine progress 0..1 at a given simulated time. */
export function engineProgress(duration: number, elapsed: number): number {
  return Math.max(0, Math.min(1, elapsed / duration));
}
