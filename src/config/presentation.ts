/**
 * NAVI OS — Presentation configuration
 * ---------------------------------------------------------------------------
 * Single source of truth for every business figure shown in the experience.
 * Edit the values here; every derived number (projections, ROI, per-episode
 * load, universe counts…) is computed in `src/lib/metrics.ts` from these
 * constants and never duplicated inside components.
 *
 * Claim discipline (see `ClaimKind` in src/lib/claims.ts):
 *   ACTUAL      → measured / reported by NAVI today
 *   PROJECTION  → linear extrapolation of ACTUAL figures
 *   ESTIMATE    → development estimates (hours, weeks)
 *   TARGET      → design objective, not a measurement
 *   SIMULATION  → invented demo data to visualise the experience
 */

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

export const PEOPLE = {
  /** Founder — audience of the presentation. */
  founder: "Eli",
  /** Editorial lead — SEO, titles, descriptions, thumbnails. */
  editorial: "Miguel",
} as const;

/* ------------------------------------------------------------------ */
/* Operation today (ACTUAL)                                            */
/* ------------------------------------------------------------------ */

/** Active programs today (≈ one episode per program per week). */
export const CURRENT_PROGRAMS = 11;

/** Episodes per week today. Kept separate in case cadence changes. */
export const CURRENT_EPISODES_PER_WEEK = 11;

/** Standard season length. */
export const EPISODES_PER_SEASON = 12;

/** NAVI Studios available. */
export const STUDIOS = 3;

/** Maximum cameras per multicam setup (public NAVI info). */
export const MAX_CAMERAS = 4;

/** Miguel: SEO + editorial optimisation + thumbnails, per week (~2 workdays). */
export const SEO_THUMBNAIL_HOURS_WEEK = 16;

/** Workday length used to express hours as workdays. */
export const WORKDAY_HOURS = 8;

/** Social Clips NAVI scheduling + sharing folders with programs, per week. */
export const SOCIAL_HOURS_WEEK = 4;

/**
 * Identified weekly load across the measured layers only.
 * Not the whole operation of NAVI — only the layers measured so far.
 */
export const KNOWN_HOURS_WEEK = SEO_THUMBNAIL_HOURS_WEEK + SOCIAL_HOURS_WEEK;

/* ------------------------------------------------------------------ */
/* Distribution rules (ACTUAL rule used by NAVI today)                 */
/* ------------------------------------------------------------------ */

/** Social Clips NAVI selected per episode. */
export const NAVI_CLIPS_PER_EPISODE = 3;

/**
 * Where each selected clip goes. Rank 1 = the best clip.
 * NAVI OS applies this automatically after the human selects 1 · 2 · 3.
 */
export const CLIP_RULES = [
  { rank: 1, platforms: ["instagram", "tiktok", "shorts"] },
  { rank: 2, platforms: ["tiktok", "shorts"] },
  { rank: 3, platforms: ["shorts"] },
] as const satisfies ReadonlyArray<{
  rank: number;
  platforms: ReadonlyArray<"instagram" | "tiktok" | "shorts">;
}>;

/* ------------------------------------------------------------------ */
/* Scaling scenarios (PROJECTION)                                      */
/* ------------------------------------------------------------------ */

/** Program counts used in the "11 no es el problema" projection. */
export const SCALING_STEPS = [11, 20, 30, 40, 50] as const;

/* ------------------------------------------------------------------ */
/* Project                                                             */
/* ------------------------------------------------------------------ */

/** One-off investment, EUR. */
export const PROJECT_PRICE = 12900;

export const EXPECTED_DEV_HOURS_MIN = 220;
export const EXPECTED_DEV_HOURS_MAX = 350;

export const BETA_WEEKS_MIN = 4;
export const BETA_WEEKS_MAX = 8;

/** Design objective for human intervention per episode, minutes (TARGET). */
export const HUMAN_TARGET_MINUTES = 10;

/**
 * Illustrative human time shown at the end of the demo (TARGET, not measured).
 * Format mm:ss.
 */
export const DEMO_HUMAN_TIME = "07:42";

/* ------------------------------------------------------------------ */
/* ROI calculator                                                      */
/* ------------------------------------------------------------------ */

export const DEFAULT_ROI_PROGRAMS = 30;
export const DEFAULT_HOURLY_COST = 22;
export const DEFAULT_AUTOMATION_RATE = 0.75;

/** Average weeks per month used to convert weekly → monthly. */
export const WEEKS_PER_MONTH = 4.33;

export const ROI_LIMITS = {
  programs: { min: 11, max: 60, step: 1 },
  hourlyCost: { min: 12, max: 60, step: 1 },
  automationRate: { min: 0.3, max: 0.95, step: 0.05 },
} as const;

/* ------------------------------------------------------------------ */
/* Presentation meta                                                   */
/* ------------------------------------------------------------------ */

export const PRESENTATION = {
  title: "NAVI OS",
  subtitle: "El sistema operativo detrás de cada episodio.",
  client: "NAVI Centro Creativo",
  /** Shown on the opening scene. */
  dateLabel: "Propuesta · 2026",
  currency: "EUR",
  locale: "es-ES",
} as const;
