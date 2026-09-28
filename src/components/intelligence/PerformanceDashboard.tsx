"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { DEMO_EPISODE } from "@/data/demo";
import {
  DAILY_VIEWS,
  EPISODE_MINUTES,
  EPISODE_PERFORMANCE,
  PLATFORM_SERIES,
  RETENTION,
  SHORTS_PERFORMANCE,
  shortTotal,
} from "@/data/performance";
import { formatCompact, formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ColumnChart, LineChart, StackedBars } from "@/components/charts/Charts";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { PLATFORM_LABEL } from "@/components/ui/Glyphs";
import { Reveal } from "@/components/ui/Reveal";

function Panel({ title, meta, children, className }: { title: string; meta?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-2xl border border-line bg-ink-850 p-5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[13px] text-fg">{title}</h3>
        {meta && <span className="text-[11px] text-fg-3">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

function toSeconds(mmssText: string): number {
  const [m, s] = mmssText.split(":").map(Number);
  return m * 60 + s;
}

function mmss(minutes: number): string {
  const total = Math.round(minutes * 60);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function PerformanceDashboard() {
  const p = EPISODE_PERFORMANCE;
  const shortsMax = Math.max(...SHORTS_PERFORMANCE.map((s) => shortTotal(s.byPlatform)));
  const peakDay = DAILY_VIEWS.reduce((best, d, i, arr) => (d.views > arr[best].views ? i : best), 0);

  return (
    <div className="flex w-full flex-col gap-4">
      {/* KPI row */}
      <Reveal className="grid grid-cols-2 gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col justify-between gap-3 rounded-2xl border border-line bg-ink-850 p-5 lg:col-span-1">
          <span className="text-[13px] text-fg-2">Visualizaciones · 7 días</span>
          <span className="display text-[clamp(3rem,5vw,4.6rem)] leading-none text-fg">
            <AnimatedNumber value={p.views} format={(v) => formatCompact(v)} />
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-ok">
            <ArrowUpRight className="size-3.5" aria-hidden /> +18 % frente a la media de la temporada
          </span>
        </div>
        <Kpi label="CTR" value={<AnimatedNumber value={p.ctr * 100} digits={1} format={(v) => `${formatNumber(v, 1)} %`} />}>
          <div className="flex flex-col gap-1.5">
            <Bullet label="Miniatura B · publicada" value={p.ctr} max={0.1} accent />
            <Bullet label="Media del canal" value={p.channelCtr} max={0.1} />
          </div>
        </Kpi>
        <Kpi label="Duración media" value={p.avgViewDuration}>
          <span className="text-xs text-fg-3">de {p.episodeDuration} · {formatPercent(toSeconds(p.avgViewDuration) / toSeconds(p.episodeDuration))} del episodio</span>
        </Kpi>
        <Kpi label="Suscriptores" value={<>+<AnimatedNumber value={p.subscribers} /></>}>
          <span className="text-xs text-fg-3">atribuidos al episodio</span>
        </Kpi>
      </Reveal>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.1}>
          <Panel title="Visualizaciones por día" meta="Estreno martes 21:00">
            <ColumnChart
              data={DAILY_VIEWS.map((d) => ({ label: d.day, value: d.views }))}
              format={(v) => formatCompact(v)}
              highlight={peakDay}
              ticks={[0, 10000, 20000, 30000]}
              height={150}
              ariaLabel="Visualizaciones diarias durante los primeros 7 días"
            />
          </Panel>
        </Reveal>
        <Reveal delay={0.18}>
          <Panel title="Retención de audiencia" meta={`Episodio de ${p.episodeDuration}`}>
            <LineChart
              points={RETENTION}
              xMax={EPISODE_MINUTES}
              yMax={1}
              height={150}
              formatX={mmss}
              formatY={(v) => formatPercent(v)}
              yTicks={[0, 0.5, 1]}
              xTicks={[0, 15, 30, 45]}
              band={[0, 1.5]}
              bandLabel="1:30"
              ariaLabel="Curva de retención de audiencia del episodio"
            />
          </Panel>
        </Reveal>
        <Reveal delay={0.26}>
          <Panel title="Social Clips NAVI" meta="Visualizaciones por plataforma">
            <StackedBars
              rows={SHORTS_PERFORMANCE.map((s) => ({
                key: `r${s.rank}`,
                label: (
                  <>
                    <span className="mr-1.5 font-mono text-gold">#{s.rank}</span>
                    {s.title}
                  </>
                ),
                segments: s.byPlatform,
              }))}
              series={PLATFORM_SERIES.map((s) => ({ id: s.id, color: s.color, label: PLATFORM_LABEL[s.id] }))}
              format={(v) => formatCompact(v)}
              max={shortsMax}
              ariaLabel="Visualizaciones de los 3 clips por plataforma"
            />
          </Panel>
        </Reveal>
      </div>
    </div>
  );
}

function Kpi({ label, value, children }: { label: string; value: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-ink-850 p-5">
      <span className="text-[13px] text-fg-2">{label}</span>
      <span className="display text-[clamp(2rem,3vw,2.8rem)] leading-none text-fg">{value}</span>
      {children}
    </div>
  );
}

function Bullet({ label, value, max, accent }: { label: string; value: number; max: number; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[10.5px]">
        <span className="text-fg-3">{label}</span>
        <span className="font-mono text-fg-2 tabular">{formatPercent(value, 1)}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-ink-600">
        <div className={cn("h-full rounded-full", accent ? "bg-gold" : "bg-fg-3")} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

export function EpisodeChip() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-ink-850 py-1 pr-3 pl-1 text-xs whitespace-nowrap text-fg">
      <img src="/brand/programs/ysft-sello.png" alt="" className="size-6 rounded-full bg-ysft-paper object-contain" />
      {DEMO_EPISODE.program} · {DEMO_EPISODE.label}
    </span>
  );
}

