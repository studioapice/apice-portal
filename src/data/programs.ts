/**
 * Programs shown in the Command Center.
 *
 *   audited source (src/data/navi-programs-audited.ts — VERIFIED facts)
 *        ↓
 *   presentation mapping (this file — adds a SIMULATED operational overlay)
 *        ↓
 *   UI (Command Center)
 *
 * Real: name, network, hosts, schedule, thumbnails, source URLs.
 * Simulated: pipeline status counts, weekly views, growth.
 */
import {
  NAVI_CHANNELS_AUDITED,
  NAVI_PROGRAMS_AUDITED,
  type AuditedChannel,
  type AuditedNetwork,
  type AuditedProgram,
} from "./navi-programs-audited";

export type Network = AuditedNetwork;
export type NetworkSlug = "bienestar" | "pop" | "stories" | "emprende" | "vlog";

export interface ProgramStatus {
  published: number;
  scheduled: number;
  review: number;
  processing: number;
  pending: number;
}

/** Weekly publication slot (0 = Monday), derived from the audited schedule. */
export interface ProgramSlot {
  day: number;
  time: string;
}

export interface Program {
  id: string;
  name: string;
  network: Network;
  networkSlug: NetworkSlug;
  hosts: string[];
  /** Human-readable audited schedule; null when not verified. */
  schedule: string | null;
  slots: ProgramSlot[];
  /** Chosen real thumbnail for the UI. */
  thumbnail: string;
  thumbnailPosition?: string;
  logo?: string;
  /** Traceability (not shown in the UI). */
  source: Pick<AuditedProgram, "sourceUrl" | "youtubeUrl" | "playlistUrl" | "thumbnails">;
  /** SIMULATION */
  status: ProgramStatus;
  /** SIMULATION */
  weeklyViews: number;
  /** SIMULATION (0.12 = +12 %) */
  growth: number;
}

/** Channels keyed by slug (real). */
export const CHANNELS: Record<NetworkSlug, AuditedChannel> = Object.fromEntries(
  NAVI_CHANNELS_AUDITED.map((c) => [c.slug, c]),
) as Record<NetworkSlug, AuditedChannel>;

export const NETWORK_ORDER: NetworkSlug[] = ["bienestar", "pop", "stories", "emprende", "vlog"];

function networkSlug(network: Network): NetworkSlug {
  const channel = NAVI_CHANNELS_AUDITED.find((c) => c.network === network);
  if (!channel) throw new Error(`Unknown network ${network}`);
  return channel.slug as NetworkSlug;
}

/**
 * Presentation overlay per program.
 * `slots` transcribe the audited schedule strings (see navi-programs-audited.ts).
 * Everything else here is SIMULATION; status totals are chosen so the
 * season universe stays 11 × 12 = 132.
 */
const OVERLAY: Record<
  string,
  { slots: ProgramSlot[]; thumbnail?: number; status: ProgramStatus; weeklyViews: number; growth: number }
> = {
  "y-si-fueras-tu": { slots: [{ day: 1, time: "21:00" }], status: { published: 10, scheduled: 1, review: 1, processing: 0, pending: 0 }, weeklyViews: 86200, growth: 0.18 },
  "respira-universo": { slots: [{ day: 6, time: "21:00" }], status: { published: 11, scheduled: 1, review: 0, processing: 0, pending: 0 }, weeklyViews: 30400, growth: 0.05 },
  "mujeres-amplificadas": { slots: [], status: { published: 9, scheduled: 1, review: 0, processing: 0, pending: 2 }, weeklyViews: 24800, growth: 0.12 },
  "la-sobremesa": { slots: [{ day: 0, time: "20:00" }, { day: 2, time: "20:00" }, { day: 4, time: "20:00" }], status: { published: 10, scheduled: 1, review: 1, processing: 0, pending: 0 }, weeklyViews: 63900, growth: 0.09 },
  "the-show": { slots: [{ day: 1, time: "19:00" }, { day: 3, time: "19:00" }], status: { published: 11, scheduled: 0, review: 0, processing: 1, pending: 0 }, weeklyViews: 38700, growth: 0.11 },
  "lo-que-no-se-ve": { slots: [{ day: 5, time: "19:00" }], status: { published: 10, scheduled: 1, review: 0, processing: 0, pending: 1 }, weeklyViews: 15200, growth: 0.07 },
  kom2life: { slots: [{ day: 1, time: "20:00" }], status: { published: 11, scheduled: 0, review: 0, processing: 1, pending: 0 }, weeklyViews: 19600, growth: 0.06 },
  "mindset-evolution": { slots: [{ day: 3, time: "20:00" }], status: { published: 11, scheduled: 0, review: 0, processing: 1, pending: 0 }, weeklyViews: 17300, growth: 0.14 },
  "despierta-con-luna": { slots: [{ day: 0, time: "08:00" }], status: { published: 11, scheduled: 1, review: 0, processing: 0, pending: 0 }, weeklyViews: 41300, growth: 0.04 },
  "los-amoristas": { slots: [{ day: 3, time: "20:00" }], status: { published: 11, scheduled: 1, review: 0, processing: 0, pending: 0 }, weeklyViews: 34100, growth: 0.08 },
  "hacemos-que-pase": { slots: [{ day: 5, time: "20:00" }], status: { published: 11, scheduled: 1, review: 0, processing: 0, pending: 0 }, weeklyViews: 12700, growth: 0.03 },
};

/** The 11 publicly active programs (audited), in network order. */
export const PROGRAMS: Program[] = NAVI_PROGRAMS_AUDITED.filter(
  (p) => p.activity === "active" && p.network !== null,
).map((p) => {
  const o = OVERLAY[p.slug];
  if (!o) throw new Error(`Missing presentation overlay for ${p.slug}`);
  return {
    id: p.slug,
    name: p.name,
    network: p.network!,
    networkSlug: networkSlug(p.network!),
    hosts: p.hosts ?? [],
    schedule: p.schedule,
    slots: o.slots,
    thumbnail: p.thumbnails[o.thumbnail ?? 0],
    logo: p.logo ?? undefined,
    source: { sourceUrl: p.sourceUrl, youtubeUrl: p.youtubeUrl, playlistUrl: p.playlistUrl, thumbnails: p.thumbnails },
    status: o.status,
    weeklyViews: o.weeklyViews,
    growth: o.growth,
  };
});

export function programBySlug(slug: string): Program {
  const p = PROGRAMS.find((x) => x.id === slug);
  if (!p) throw new Error(`Unknown program ${slug}`);
  return p;
}

/** Totals derived from the program list (never typed by hand). */
export function programTotals(programs: Program[] = PROGRAMS): ProgramStatus & { total: number } {
  const totals = programs.reduce<ProgramStatus>(
    (acc, p) => ({
      published: acc.published + p.status.published,
      scheduled: acc.scheduled + p.status.scheduled,
      review: acc.review + p.status.review,
      processing: acc.processing + p.status.processing,
      pending: acc.pending + p.status.pending,
    }),
    { published: 0, scheduled: 0, review: 0, processing: 0, pending: 0 },
  );
  return {
    ...totals,
    total: totals.published + totals.scheduled + totals.review + totals.processing + totals.pending,
  };
}

/** Current pipeline state of a program (SIMULATION), most urgent first. */
export function programState(p: Program): "processing" | "review" | "scheduled" | "published" {
  if (p.status.processing > 0) return "processing";
  if (p.status.review > 0) return "review";
  if (p.status.scheduled > 0) return "scheduled";
  return "published";
}
