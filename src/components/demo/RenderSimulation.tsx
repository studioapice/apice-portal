"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  CalendarDays,
  Check,
  Clapperboard,
  Film,
  HeartPulse,
  Image as ImageIcon,
  LayoutDashboard,
  RotateCcw,
  Send,
  Tv,
  UserRound,
} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { DEMO_EPISODE } from "@/data/demo";
import { cn } from "@/lib/cn";
import { ClaimTag } from "@/components/ui/ClaimTag";
import { NaviOSMark } from "@/components/ui/Wordmark";
import { useSceneController } from "@/components/presentation/Scene";
import { RESET_DEMO_EVENT, usePresentationApi } from "@/components/presentation/PresentationProvider";
import { ClipSelector } from "./ClipSelector";
import { DetectStage, IdleStage, ProcessingStage } from "./DemoStages";
import { DistributionMap } from "./DistributionMap";
import { EpisodeStatus } from "./EpisodeStatus";
import { ThumbnailSelector } from "./ThumbnailSelector";
import { deriveLog, type LogEntry } from "./demoLog";
import { INITIAL_DEMO, PHASES, demoReducer, tickDelay, type DemoPhase, type DemoState } from "./demoMachine";

const PHASE_STATUS: Record<DemoPhase, { label: string; tone: "sys" | "gold" | "ok" | "idle" }> = {
  idle: { label: "Esperando render", tone: "idle" },
  renderDetected: { label: "Render detectado", tone: "sys" },
  processing: { label: "Procesando", tone: "sys" },
  thumbnailReview: { label: "Esperando decisión", tone: "gold" },
  clipReview: { label: "Esperando decisión", tone: "gold" },
  distributing: { label: "Distribuyendo", tone: "sys" },
  complete: { label: "Completado", tone: "ok" },
};

export function RenderSimulation() {
  const [state, dispatch] = useReducer(demoReducer, INITIAL_DEMO);
  const stateRef = useRef<DemoState>(state);
  const api = usePresentationApi();

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  /* Automatic phases. */
  useEffect(() => {
    const delay = tickDelay(state);
    if (delay === null) return;
    const id = window.setTimeout(() => dispatch({ type: "tick", now: performance.now() }), delay);
    return () => window.clearTimeout(id);
  }, [state]);

  /* Presenter dock "Reset demo". */
  useEffect(() => {
    const onReset = () => dispatch({ type: "reset" });
    window.addEventListener(RESET_DEMO_EVENT, onReset);
    return () => window.removeEventListener(RESET_DEMO_EVENT, onReset);
  }, []);

  /* Keyboard: → / Space drive the demo until it is complete. */
  const controller = useMemo(
    () => ({
      next: () => {
        const s = stateRef.current;
        switch (s.phase) {
          case "idle":
            dispatch({ type: "start" });
            return true;
          case "renderDetected":
          case "processing":
          case "distributing":
            dispatch({ type: "fastForward", now: performance.now() });
            return true;
          case "thumbnailReview":
            if (s.thumbnailApproved) dispatch({ type: "tick", now: performance.now() });
            else if (s.thumbnail) dispatch({ type: "approveThumbnail" });
            else dispatch({ type: "nudge" });
            return true;
          case "clipReview":
            if (s.selection.length === 3) dispatch({ type: "approveClips" });
            else dispatch({ type: "nudge" });
            return true;
          case "complete":
            return false;
        }
      },
      prev: () => false,
    }),
    [],
  );
  useSceneController(controller);

  const reset = useCallback(() => dispatch({ type: "reset" }), []);
  // Cheap to derive; the memoized log views below skip re-rendering unless
  // the entries actually change (not on every processing tick).
  const log = deriveLog(state);
  const status = PHASE_STATUS[state.phase];
  const phaseIndex = PHASES.findIndex((p) => p.id === state.phase);

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">
            <span className="text-gold">Acto IV</span>
            <span className="mx-2 text-fg-4">/</span>Vivir NAVI OS
          </span>
          <ClaimTag kind="concept" label="Simulación de experiencia propuesta" />
        </div>

        <ol className="order-3 flex w-full items-center gap-1 overflow-x-auto scrollbar-none lg:order-none lg:w-auto" aria-label="Fases de la simulación">
          {PHASES.map((p, i) => {
            const done = phaseIndex > i;
            const now = phaseIndex === i;
            return (
              <li key={p.id} className="flex items-center gap-1">
                {i > 0 && <span className={cn("h-px w-4 sm:w-6", done || now ? "bg-fg-3" : "bg-line-2")} />}
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] whitespace-nowrap transition-colors duration-300",
                    now
                      ? p.human
                        ? "border-gold/60 bg-gold/10 text-gold"
                        : "border-line-2 bg-ink-700 text-fg"
                      : done
                        ? "border-line text-fg-2"
                        : "border-line text-fg-4",
                  )}
                >
                  {done ? (
                    <Check className="size-3 text-ok" aria-hidden />
                  ) : p.human ? (
                    <UserRound className="size-3" aria-hidden />
                  ) : (
                    <span className="font-mono text-[10px]">{i + 1}</span>
                  )}
                  {p.label}
                </span>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-fg-3 transition-colors hover:border-line-2 hover:text-fg"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Reset demo
        </button>
      </div>

      {/* App frame */}
      <div className="flex min-h-[640px] flex-1 overflow-hidden rounded-2xl border border-line-2 bg-ink-900 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] lg:min-h-0">
        <Sidebar phase={state.phase} />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <div className="flex h-12 shrink-0 items-center justify-between gap-4 border-b border-line px-4 sm:px-5">
            <nav aria-label="Ruta" className="flex min-w-0 items-center gap-1.5 truncate text-xs text-fg-3">
              <span className="hidden sm:inline">Programas</span>
              <span className="hidden text-fg-4 sm:inline">/</span>
              <span className="truncate text-fg-2">{DEMO_EPISODE.program}</span>
              <span className="text-fg-4">/</span>
              <span className="hidden md:inline">Episodios</span>
              <span className="hidden text-fg-4 md:inline">/</span>
              <span className="truncate text-fg">{DEMO_EPISODE.label}</span>
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]",
                  status.tone === "gold" && "bg-gold/10 text-gold",
                  status.tone === "sys" && "bg-sys/10 text-sys",
                  status.tone === "ok" && "bg-ok/10 text-ok",
                  status.tone === "idle" && "bg-ink-700 text-fg-3",
                )}
                aria-live="polite"
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-current",
                    (status.tone === "sys" || status.tone === "gold") && "animate-pulse-soft",
                  )}
                />
                {status.label}
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-ink-600 text-[11px] text-fg" aria-hidden>
                E
              </span>
            </div>
          </div>

          {/* Stage */}
          <div className="relative min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                {state.phase === "idle" && <IdleStage onStart={() => dispatch({ type: "start" })} />}
                {state.phase === "renderDetected" && <DetectStage step={state.detectStep} />}
                {state.phase === "processing" && <ProcessingStage elapsed={state.elapsed} />}
                {state.phase === "thumbnailReview" && (
                  <ThumbnailSelector
                    selected={state.thumbnail}
                    approved={state.thumbnailApproved}
                    nudge={state.nudge}
                    onSelect={(id) => dispatch({ type: "selectThumbnail", id })}
                    onApprove={() => dispatch({ type: "approveThumbnail" })}
                  />
                )}
                {state.phase === "clipReview" && (
                  <ClipSelector
                    selection={state.selection}
                    nudge={state.nudge}
                    onToggle={(id) => dispatch({ type: "toggleClip", id })}
                    onApprove={() => dispatch({ type: "approveClips" })}
                  />
                )}
                {state.phase === "distributing" && <DistributionMap selection={state.selection} step={state.distStep} />}
                {state.phase === "complete" && (
                  <EpisodeStatus
                    thumbnail={state.thumbnail}
                    selection={state.selection}
                    onReset={reset}
                    onContinue={() => api.goToId("later")}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <StatusBar entry={log[log.length - 1]} />
        </div>

        <ActivityLog entries={log} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Programs", icon: Tv },
  { label: "Episodes", icon: Clapperboard, active: true },
  { label: "Thumbnails", icon: ImageIcon, phase: "thumbnailReview" as DemoPhase },
  { label: "Clip Review", icon: Film, phase: "clipReview" as DemoPhase },
  { label: "Calendar", icon: CalendarDays },
  { label: "Distribution", icon: Send, phase: "distributing" as DemoPhase },
  { label: "Analytics", icon: BarChart3 },
  { label: "System Health", icon: HeartPulse },
];

const Sidebar = memo(function Sidebar({ phase }: { phase: DemoPhase }) {
  return (
    <aside className="hidden w-52 shrink-0 flex-col gap-6 border-r border-line bg-ink-950/40 p-4 lg:flex" aria-label="Navegación de NAVI OS (simulada)">
      <NaviOSMark tree className="px-2 text-lg text-fg" />
      <ul className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const flagged = item.phase === phase;
          return (
            <li
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px]",
                item.active ? "bg-ink-700 text-fg" : "text-fg-3",
              )}
            >
              <Icon className="size-4" aria-hidden />
              <span className="flex-1">{item.label}</span>
              {flagged && (
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    phase === "distributing" ? "animate-pulse-soft bg-sys" : "bg-gold",
                  )}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-auto flex items-center gap-2 rounded-lg border border-line p-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-ink-600 text-[11px] text-fg">E</span>
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-fg">Eli</span>
          <span className="text-[10px] text-fg-4">NAVI Centro Creativo</span>
        </div>
      </div>
    </aside>
  );
});

const StatusBar = memo(function StatusBar({ entry }: { entry?: LogEntry }) {
  return (
    <div className="flex h-9 shrink-0 items-center justify-between gap-4 border-t border-line px-4 font-mono text-[10.5px] text-fg-3 sm:px-5">
      <AnimatePresence mode="wait">
        {entry && (
          <motion.span
            key={entry.t + entry.text}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex min-w-0 items-center gap-2 truncate"
          >
            <span className="text-fg-4 tabular">{entry.t}</span>
            <LogDot kind={entry.kind} />
            <span className="truncate text-fg-2">{entry.text}</span>
          </motion.span>
        )}
      </AnimatePresence>
      <span className="hidden shrink-0 tracking-[0.12em] text-fg-4 uppercase sm:inline">Datos ficticios · sin APIs</span>
    </div>
  );
}, (a, b) => a.entry?.t === b.entry?.t && a.entry?.text === b.entry?.text);

function LogDot({ kind }: { kind: LogEntry["kind"] }) {
  return (
    <span
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        kind === "done" && "bg-ok",
        kind === "system" && "bg-sys",
        kind === "human" && "bg-gold",
        kind === "wait" && "animate-pulse-soft bg-gold",
      )}
    />
  );
}

const ActivityLog = memo(function ActivityLog({ entries }: { entries: LogEntry[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries.length]);

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-l border-line bg-ink-950/40 2xl:flex" aria-label="Actividad del sistema">
      <div className="flex h-12 items-center border-b border-line px-4 font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">
        Activity
      </div>
      <ol ref={listRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4 scrollbar-none">
        {entries.map((e, i) => (
          <motion.li
            key={`${e.t}-${i}`}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2.5 text-[11.5px] leading-snug"
          >
            <span className="mt-1.5">
              <LogDot kind={e.kind} />
            </span>
            <span className="flex flex-col">
              <span className="font-mono text-[10px] text-fg-4 tabular">{e.t}</span>
              <span className={e.kind === "human" ? "text-gold" : "text-fg-2"}>{e.text}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </aside>
  );
}, (a, b) => a.entries.length === b.entries.length);
