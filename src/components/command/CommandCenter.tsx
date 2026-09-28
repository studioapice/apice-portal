"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Blocks,
  CalendarDays,
  Clapperboard,
  Factory,
  Film,
  HeartPulse,
  Image as ImageIcon,
  Info,
  LayoutDashboard,
  Palette,
  Send,
  Tv,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { PEOPLE } from "@/config/presentation";
import {
  ALERTS,
  CALENDAR_DAYS,
  CALENDAR_ITEMS,
  INTEGRATIONS,
  PIPELINE,
  WEEK_METRICS,
  WORKFLOW_RUNS_24H,
} from "@/data/commandCenter";
import { CHANNELS, NETWORK_ORDER, PROGRAMS, programBySlug, programTotals, type NetworkSlug } from "@/data/programs";
import Image from "next/image";
import { NetworkBadge } from "@/components/ui/NetworkBadge";
import type { SceneId } from "@/data/scenes";
import { cn } from "@/lib/cn";
import { formatCompact, formatNumber, formatPercent } from "@/lib/format";
import { Sparkline } from "@/components/charts/Charts";
import { PlatformIcon } from "@/components/ui/Glyphs";
import { NaviOSMark } from "@/components/ui/Wordmark";
import { usePresentationApi } from "@/components/presentation/PresentationProvider";
import { ProgramCard, STATUS_STYLE } from "./ProgramCard";

type ViewId =
  | "overview"
  | "programs"
  | "episodes"
  | "production"
  | "clips"
  | "thumbnails"
  | "calendar"
  | "distribution"
  | "analytics"
  | "brand"
  | "integrations"
  | "health";

const NAV: Array<{ id: ViewId; label: string; icon: LucideIcon; badge?: number }> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "programs", label: "Programs", icon: Tv },
  { id: "episodes", label: "Episodes", icon: Clapperboard },
  { id: "production", label: "Production", icon: Factory },
  { id: "clips", label: "Clip Review", icon: Film, badge: 1 },
  { id: "thumbnails", label: "Thumbnails", icon: ImageIcon, badge: 1 },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "distribution", label: "Distribution", icon: Send },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "brand", label: "Brand Kits", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Blocks },
  { id: "health", label: "System Health", icon: HeartPulse },
];

const CONCEPT_VIEWS: Partial<Record<ViewId, { text: string; link?: { scene: SceneId; label: string } }>> = {
  episodes: { text: "Cada episodio con su estado, recursos, metadata y trazabilidad completa del workflow." },
  production: { text: "Cola de producción: renders detectados, procesos en curso y reintentos.", link: { scene: "demo", label: "Ver en la simulación" } },
  clips: { text: "Revisión de clips: selección 1 · 2 · 3 y aprobación en un paso.", link: { scene: "demo", label: "Ver en la simulación" } },
  thumbnails: { text: "Propuestas A · B · C por episodio con la plantilla de cada programa.", link: { scene: "demo", label: "Ver en la simulación" } },
  distribution: { text: "Reglas de distribución por programa, plataforma y rango de clip." },
  analytics: { text: "Rendimiento por episodio, programa y red.", link: { scene: "intelligence", label: "Ver NAVI Intelligence" } },
  brand: { text: "Brand Kit, plantilla de Opus, plantilla de miniatura y prompts editoriales de cada programa." },
};

export function CommandCenter() {
  const [view, setView] = useState<ViewId>("overview");
  const active = NAV.find((n) => n.id === view)!;

  return (
    <div className="flex h-full min-h-[680px] w-full overflow-hidden rounded-2xl border border-line-2 bg-ink-900 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] lg:min-h-0">
      {/* Sidebar */}
      <aside className="hidden w-52 shrink-0 flex-col gap-5 border-r border-line bg-ink-950/40 p-4 lg:flex" aria-label="Navegación de NAVI OS">
        <NaviOSMark tree className="px-2 text-lg text-fg" />
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = item.id === view;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors",
                  on ? "bg-ink-700 text-fg" : "text-fg-3 hover:bg-ink-800 hover:text-fg-2",
                )}
              >
                <Icon className="size-4" aria-hidden />
                <span className="flex-1">{item.label}</span>
                {item.badge && <span className="size-1.5 rounded-full bg-gold" aria-label="Requiere decisión" />}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-line p-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-ink-600 text-[11px] text-fg">
            {PEOPLE.founder[0]}
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs text-fg">{PEOPLE.founder}</span>
            <span className="text-[10px] text-fg-4">Dirección · NAVI</span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-line p-2 scrollbar-none lg:hidden">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "shrink-0 rounded-md px-2.5 py-1 text-xs",
                item.id === view ? "bg-ink-700 text-fg" : "text-fg-3",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-5">
          <span className="text-xs text-fg-3">
            NAVI OS <span className="text-fg-4">/</span> <span className="text-fg">{active.label}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-fg-3">
            <span className="size-1.5 rounded-full bg-ok" /> Sistemas operativos
            {INTEGRATIONS.some((i) => i.status !== "ok") && (
              <span className="text-warn">· {INTEGRATIONS.filter((i) => i.status !== "ok").length} aviso</span>
            )}
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {view === "overview" && <OverviewView onNavigate={setView} />}
              {view === "programs" && <ProgramsView />}
              {view === "calendar" && <CalendarView />}
              {(view === "health" || view === "integrations") && <HealthView />}
              {CONCEPT_VIEWS[view] && <ConceptView label={active.label} icon={active.icon} {...CONCEPT_VIEWS[view]!} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Overview                                                            */
/* ------------------------------------------------------------------ */

function OverviewView({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  const t = programTotals();
  const today = [
    { label: "Processing", value: t.processing, tone: "text-sys" },
    { label: "Awaiting review", value: t.review, tone: "text-gold" },
    { label: "Scheduled", value: t.scheduled, tone: "text-fg" },
    { label: "Published", value: t.published, tone: "text-fg" },
    { label: "Alerts", value: ALERTS.length, tone: "text-warn" },
  ];
  const topGrowth = [...PROGRAMS].sort((a, b) => b.growth - a.growth).slice(0, 3);
  const bar = (["published", "scheduled", "review", "processing", "pending"] as const).map((k) => ({ k, v: t[k] }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="display text-[clamp(1.8rem,2.6vw,2.4rem)] text-fg">Buenos días, {PEOPLE.founder}.</h3>
          <p className="text-[13px] text-fg-3">
            {PROGRAMS.length} programas activos · {t.total} episodios en el universo de temporada ·{" "}
            <span className="font-mono text-fg-4">Jueves 09:12</span>
          </p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Redes de NAVI Channel">
          {NETWORK_ORDER.map((slug) => (
            <li key={slug}>
              <button
                type="button"
                onClick={() => onNavigate("programs")}
                className="inline-flex items-center gap-1.5 rounded-full border border-line py-0.5 pr-2.5 pl-0.5 text-[11px] text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
              >
                <Image
                  src={CHANNELS[slug].avatar}
                  alt=""
                  width={20}
                  height={20}
                  sizes="20px"
                  className="size-5 rounded-full"
                />
                {CHANNELS[slug].network.replace("NAVI ", "")}
                <span className="font-mono text-fg-4">{PROGRAMS.filter((p) => p.networkSlug === slug).length}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Today */}
      <section className="flex flex-col gap-3 rounded-xl border border-line bg-ink-850 p-4" aria-label="Hoy">
        <div className="flex items-center justify-between">
          <span className="text-[11px] tracking-[0.14em] text-fg-3 uppercase">Hoy</span>
          <button type="button" onClick={() => onNavigate("programs")} className="inline-flex items-center gap-1 text-[11px] text-fg-3 hover:text-fg">
            Ver programas <ArrowRight className="size-3" aria-hidden />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {today.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className={cn("display text-3xl leading-none tabular", s.tone)}>{s.value}</span>
              <span className="text-[11px] text-fg-3">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex h-1.5 gap-[2px]" role="img" aria-label="Distribución de episodios por estado">
          {bar.map(({ k, v }) =>
            v > 0 ? (
              <span key={k} className={cn("h-full first:rounded-l-full last:rounded-r-full", STATUS_STYLE[k].className)} style={{ flexGrow: v }} title={`${STATUS_STYLE[k].label}: ${v}`} />
            ) : null,
          )}
        </div>
      </section>

      {/* This week */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-5" aria-label="Esta semana">
        {WEEK_METRICS.map((m) => (
          <div key={m.id} className="flex flex-col gap-2 rounded-xl border border-line bg-ink-850 p-3.5">
            <span className="text-[11px] text-fg-3">{m.label}</span>
            <span className="display text-2xl leading-none text-fg">{formatMetric(m.value, m.format)}</span>
            <Sparkline values={m.trend} />
            <span className="font-mono text-[10.5px] text-ok">
              +{m.format === "percent" ? `${formatNumber(m.delta * 100, 1)} pp` : formatPercent(m.delta)}
            </span>
          </div>
        ))}
      </section>

      <div className="grid gap-3 lg:grid-cols-3">
        <section className="flex flex-col gap-2 rounded-xl border border-line bg-ink-850 p-4" aria-label="En curso">
          <span className="text-[11px] tracking-[0.14em] text-fg-3 uppercase">En curso</span>
          <ul className="flex flex-col divide-y divide-line">
            {PIPELINE.map((p) => {
              const program = programBySlug(p.program);
              return (
              <li key={p.program} className="flex items-center justify-between gap-2 py-2 text-[12px]">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-fg-2">{program.name}</span>
                  <span className="size-1.5 shrink-0 rounded-full" style={{ background: CHANNELS[program.networkSlug].accent }} title={program.network} aria-hidden />
                </span>
                <span className={cn("shrink-0 text-[11px]", p.tone === "gold" ? "text-gold" : "text-sys")}>{p.detail}</span>
              </li>
              );
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-2 rounded-xl border border-line bg-ink-850 p-4" aria-label="Alertas">
          <span className="text-[11px] tracking-[0.14em] text-fg-3 uppercase">Requiere atención</span>
          <ul className="flex flex-col divide-y divide-line">
            {ALERTS.map((a) => (
              <li key={a.title} className="flex items-start gap-2.5 py-2 text-[12px]">
                {a.level === "warn" ? (
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warn" aria-label="Aviso" />
                ) : (
                  <Info className="mt-0.5 size-3.5 shrink-0 text-fg-3" aria-label="Información" />
                )}
                <span className="flex flex-col">
                  <span className="text-fg-2">{a.title}</span>
                  <span className="text-[11px] text-fg-4">{a.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2 rounded-xl border border-line bg-ink-850 p-4" aria-label="Mayor crecimiento">
          <span className="text-[11px] tracking-[0.14em] text-fg-3 uppercase">Mayor crecimiento · semana</span>
          <ol className="flex flex-col divide-y divide-line">
            {topGrowth.map((p, i) => (
              <li key={p.id} className="flex items-center justify-between gap-2 py-2 text-[12px]">
                <span className="flex min-w-0 items-center gap-2 text-fg-2">
                  <span className="font-mono text-fg-4">{i + 1}</span>
                  <span className="truncate">{p.name}</span>
                  <NetworkBadge network={p.networkSlug} size="xs" />
                </span>
                <span className="shrink-0 font-mono text-ok">+{formatPercent(p.growth)}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function formatMetric(value: number, format: string): string {
  switch (format) {
    case "percent":
      return formatPercent(value, 1);
    case "hours":
      return `${formatCompact(value)} h`;
    case "signed":
      return `+${formatNumber(value)}`;
    default:
      return formatCompact(value);
  }
}

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

function ProgramsView() {
  const [filter, setFilter] = useState<NetworkSlug | "all">("all");
  const visible = filter === "all" ? PROGRAMS : PROGRAMS.filter((p) => p.networkSlug === filter);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg text-fg">
          Programas activos · {PROGRAMS.length}
        </h3>
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filtrar por red">
          {(["all", ...NETWORK_ORDER] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                filter === f ? "border-line-2 bg-ink-700 text-fg" : "border-transparent text-fg-3 hover:text-fg-2",
              )}
            >
              {f !== "all" && (
                <span className="size-1.5 rounded-full" style={{ background: CHANNELS[f].accent }} aria-hidden />
              )}
              {f === "all" ? "Todas" : CHANNELS[f].network.replace("NAVI ", "")}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

function CalendarView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg text-fg">Calendario · esta semana</h3>
        <span className="text-[11px] text-fg-3">Episodios y Social Clips NAVI programados automáticamente</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {CALENDAR_DAYS.map((d, di) => (
          <div key={d} className="flex min-h-56 flex-col gap-2 rounded-xl border border-line bg-ink-850 p-2.5">
            <span className={cn("font-mono text-[11px] uppercase", di === 3 ? "text-gold" : "text-fg-3")}>{d}</span>
            {CALENDAR_ITEMS.filter((i) => i.day === di).map((item) => (
              <div
                key={`${item.program}-${item.day}-${item.time}-${item.kind}`}
                className={cn(
                  "flex flex-col gap-1 rounded-lg border px-2 py-1.5",
                  item.kind === "episode" ? "border-line-2 bg-ink-700" : "border-line bg-ink-900",
                )}
              >
                <span className="flex items-center justify-between font-mono text-[10px] text-fg-3">
                  {item.time}
                  <span className="size-1.5 rounded-full" style={{ background: CHANNELS[item.networkSlug].accent }} aria-hidden />
                </span>
                <span className="text-[11px] leading-tight text-fg-2">
                  {item.program}
                  {item.rank && <span className="ml-1 font-mono text-gold">#{item.rank}</span>}
                </span>
                {item.kind === "episode" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-fg-3">
                    <PlatformIcon platform="youtube" className="size-3" /> Episodio
                  </span>
                ) : (
                  <span className="flex gap-1 text-fg-3">
                    {item.platforms?.map((p) => <PlatformIcon key={p} platform={p} className="size-3" />)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* System health                                                       */
/* ------------------------------------------------------------------ */

function HealthView() {
  const runs = WORKFLOW_RUNS_24H;
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg text-fg">System Health</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Workflows completados · 24 h", v: runs.ok, c: "text-fg" },
          { l: "Reintentos automáticos", v: runs.retried, c: "text-warn" },
          { l: "Fallos sin resolver", v: runs.failed, c: "text-ok" },
        ].map((s) => (
          <div key={s.l} className="flex flex-col gap-1 rounded-xl border border-line bg-ink-850 p-4">
            <span className={cn("display text-3xl tabular", s.c)}>{s.v}</span>
            <span className="text-[11px] text-fg-3">{s.l}</span>
          </div>
        ))}
      </div>
      <ul className="flex flex-col divide-y divide-line rounded-xl border border-line bg-ink-850">
        {INTEGRATIONS.map((i) => (
          <li key={i.name} className="flex items-center justify-between gap-3 px-4 py-3 text-[13px]">
            <span className="inline-flex items-center gap-2.5 text-fg">
              <span className={cn("size-2 rounded-full", i.status === "ok" ? "bg-ok" : "bg-warn")} />
              {i.name}
            </span>
            <span className="flex items-center gap-3">
              <span className="text-xs text-fg-3">{i.detail}</span>
              <span className={cn("text-[11px]", i.status === "ok" ? "text-ok" : "text-warn")}>
                {i.status === "ok" ? "Operativo" : "Atención"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Concept module (defined in the architecture, not built in the demo) */
/* ------------------------------------------------------------------ */

function ConceptView({
  label,
  icon: Icon,
  text,
  link,
}: {
  label: string;
  icon: LucideIcon;
  text: string;
  link?: { scene: SceneId; label: string };
}) {
  const api = usePresentationApi();
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-line-2 p-10 text-center">
      <Icon className="size-7 text-fg-3" aria-hidden />
      <h3 className="text-lg text-fg">{label}</h3>
      <p className="max-w-sm text-sm text-fg-3">{text}</p>
      <span className="font-mono text-[10px] tracking-[0.14em] text-fg-4 uppercase">Módulo definido en la arquitectura</span>
      {link && (
        <button
          type="button"
          onClick={() => api.goToId(link.scene)}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-3 py-1.5 text-xs text-fg-2 hover:text-fg"
        >
          {link.label} <ArrowRight className="size-3.5" aria-hidden />
        </button>
      )}
    </div>
  );
}
