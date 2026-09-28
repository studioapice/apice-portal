"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SCENES, sceneIndexOf, type SceneId } from "@/data/scenes";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type NavDirection = "forward" | "backward";

/**
 * A scene may intercept "next"/"prev" to run internal builds (keynote-style
 * steps) before the presentation moves to the adjacent scene.
 * Returning `true` means the key press was consumed.
 */
export interface SceneController {
  next?: () => boolean;
  prev?: () => boolean;
  enter?: (direction: NavDirection) => void;
}

interface PresentationApi {
  goTo: (index: number, direction?: NavDirection) => void;
  goToId: (id: SceneId) => void;
  next: () => void;
  prev: () => void;
  registerController: (id: SceneId, controller: SceneController) => () => void;
  setPresenting: (value: boolean) => void;
  toggleFullscreen: () => void;
  setIndexOpen: (value: boolean) => void;
}

interface PresentationState {
  activeIndex: number;
  presenting: boolean;
  fullscreen: boolean;
  indexOpen: boolean;
}

const ApiContext = createContext<PresentationApi | null>(null);
const StateContext = createContext<PresentationState | null>(null);

export const RESET_DEMO_EVENT = "navi:reset-demo";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function sceneElement(index: number): HTMLElement | null {
  const scene = SCENES[index];
  return scene ? document.getElementById(`scene-${scene.id}`) : null;
}

function isTextEntry(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function isActivatable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "BUTTON" ||
    target.tagName === "A" ||
    target.getAttribute("role") === "button"
  );
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function PresentationProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [presenting, setPresentingState] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [cut, setCut] = useState(false);

  const activeRef = useRef(0);
  const lockRef = useRef(false);
  const navTokenRef = useRef(0);
  const controllers = useRef(new Map<SceneId, SceneController>());
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = Boolean(reducedMotion);
  }, [reducedMotion]);

  const setActive = useCallback((index: number) => {
    activeRef.current = index;
    setActiveIndex(index);
  }, []);

  /**
   * Resolve the active scene from geometry (the scene under the viewport's
   * center line). Observer entries can arrive late, so they only act as a
   * trigger — never as the source of truth.
   */
  const syncFromScroll = useCallback(() => {
    if (lockRef.current) return;
    const mid = window.innerHeight / 2;
    for (let i = 0; i < SCENES.length; i++) {
      const rect = sceneElement(i)?.getBoundingClientRect();
      if (rect && rect.top <= mid && rect.bottom > mid) {
        if (i !== activeRef.current) setActive(i);
        return;
      }
    }
  }, [setActive]);

  useEffect(() => {
    const observer = new IntersectionObserver(syncFromScroll, {
      rootMargin: "-49% 0px -50% 0px",
      threshold: 0,
    });
    SCENES.forEach((_, i) => {
      const el = sceneElement(i);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [syncFromScroll]);

  const releaseLockAfterScroll = useCallback(
    (token: number) => {
      const release = () => {
        if (navTokenRef.current !== token) return;
        lockRef.current = false;
        syncFromScroll();
      };
      window.addEventListener("scrollend", release, { once: true });
      window.setTimeout(release, 1400);
    },
    [syncFromScroll],
  );

  const goTo = useCallback(
    (rawIndex: number, direction?: NavDirection) => {
      const target = Math.max(0, Math.min(SCENES.length - 1, rawIndex));
      const current = activeRef.current;
      const el = sceneElement(target);
      if (!el) return;
      const dir: NavDirection =
        direction ?? (target >= current ? "forward" : "backward");

      const token = ++navTokenRef.current;
      lockRef.current = true;
      setActive(target);
      controllers.current.get(SCENES[target].id)?.enter?.(dir);

      const distance = Math.abs(target - current);
      if (distance > 1 && !reducedRef.current) {
        // Long jump → cinematic cut instead of flying past every scene.
        setCut(true);
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: "instant", block: "start" });
          window.setTimeout(() => {
            setCut(false);
            if (navTokenRef.current === token) lockRef.current = false;
          }, 80);
        }, 280);
      } else {
        el.scrollIntoView({
          behavior: reducedRef.current || distance === 0 ? "instant" : "smooth",
          block: "start",
        });
        releaseLockAfterScroll(token);
      }
    },
    [releaseLockAfterScroll, setActive],
  );

  const next = useCallback(() => {
    const scene = SCENES[activeRef.current];
    if (controllers.current.get(scene.id)?.next?.()) return;
    if (activeRef.current < SCENES.length - 1) {
      goTo(activeRef.current + 1, "forward");
    }
  }, [goTo]);

  const prev = useCallback(() => {
    const scene = SCENES[activeRef.current];
    if (controllers.current.get(scene.id)?.prev?.()) return;
    if (activeRef.current > 0) goTo(activeRef.current - 1, "backward");
  }, [goTo]);

  const goToId = useCallback(
    (id: SceneId) => goTo(sceneIndexOf(id), "forward"),
    [goTo],
  );

  const registerController = useCallback(
    (id: SceneId, controller: SceneController) => {
      controllers.current.set(id, controller);
      return () => {
        if (controllers.current.get(id) === controller) {
          controllers.current.delete(id);
        }
      };
    },
    [],
  );

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      void document.exitFullscreen?.();
    } else {
      void document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }, []);

  const setPresenting = useCallback((value: boolean) => {
    setPresentingState(value);
    if (value && !document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.().catch(() => {});
    }
    if (!value && document.fullscreenElement) {
      void document.exitFullscreen?.();
    }
  }, []);

  /* Deep links: /#demo, /#investment… (also keeps position across reloads). */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const index = SCENES.findIndex((s) => s.id === id);
    if (index > 0) {
      window.requestAnimationFrame(() => {
        sceneElement(index)?.scrollIntoView({ behavior: "instant", block: "start" });
        activeRef.current = index;
        setActiveIndex(index);
      });
    }
  }, []);

  useEffect(() => {
    const id = SCENES[activeIndex]?.id;
    const url = activeIndex === 0 ? window.location.pathname : `#${id}`;
    window.history.replaceState(null, "", url);
  }, [activeIndex]);

  /* Hash typed into the address bar while the page is open. */
  useEffect(() => {
    const onHash = () => {
      const index = SCENES.findIndex((s) => s.id === window.location.hash.slice(1));
      if (index >= 0) goTo(index);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [goTo]);

  /* Keep fullscreen state in sync (ESC exits natively). */
  useEffect(() => {
    const onChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      setFullscreen(isFs);
      if (!isFs) setPresentingState(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* Keyboard navigation. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIndexOpen((v) => !v);
        return;
      }
      if (mod || e.altKey) return;
      if (isTextEntry(e.target)) return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case " ":
          if (isActivatable(e.target)) return;
          e.preventDefault();
          if (e.shiftKey) prev();
          else next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0, "forward");
          break;
        case "End":
          e.preventDefault();
          goTo(SCENES.length - 1, "forward");
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "p":
        case "P":
          setPresenting(!document.fullscreenElement);
          break;
        case "Escape":
          setIndexOpen(false);
          setPresentingState(false);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, next, prev, setPresenting, toggleFullscreen]);

  const api = useMemo<PresentationApi>(
    () => ({
      goTo,
      goToId,
      next,
      prev,
      registerController,
      setPresenting,
      toggleFullscreen,
      setIndexOpen,
    }),
    [goTo, goToId, next, prev, registerController, setPresenting, toggleFullscreen],
  );

  const state = useMemo<PresentationState>(
    () => ({ activeIndex, presenting, fullscreen, indexOpen }),
    [activeIndex, presenting, fullscreen, indexOpen],
  );

  return (
    <ApiContext.Provider value={api}>
      <StateContext.Provider value={state}>
        {children}
        <AnimatePresence>
          {cut && (
            <motion.div
              key="cut"
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[65] bg-ink-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              transition={{ duration: 0.26, ease: "easeIn" }}
            />
          )}
        </AnimatePresence>
      </StateContext.Provider>
    </ApiContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

export function usePresentationApi(): PresentationApi {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("usePresentationApi must be used within PresentationProvider");
  return ctx;
}

export function usePresentationState(): PresentationState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("usePresentationState must be used within PresentationProvider");
  return ctx;
}
