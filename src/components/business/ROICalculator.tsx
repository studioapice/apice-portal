"use client";

import { RotateCcw } from "lucide-react";
import { useId, useMemo, useState } from "react";
import {
  CURRENT_PROGRAMS,
  DEFAULT_AUTOMATION_RATE,
  DEFAULT_HOURLY_COST,
  DEFAULT_ROI_PROGRAMS,
  KNOWN_HOURS_WEEK,
  PROJECT_PRICE,
  ROI_LIMITS,
  WEEKS_PER_MONTH,
} from "@/config/presentation";
import { computeRoi } from "@/lib/metrics";
import { formatEuro, formatFixed, formatNumber, formatPercent } from "@/lib/format";
import { LineChart } from "@/components/charts/Charts";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ClaimTag } from "@/components/ui/ClaimTag";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  hint: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, display, hint, onChange }: SliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] text-fg-2">
          {label}
        </label>
        <span className="display text-2xl text-fg tabular">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        // Release focus after a mouse drag so → / Space keep driving the presentation.
        onPointerUp={(e) => e.currentTarget.blur()}
        style={{ "--fill": `${pct}%` } as React.CSSProperties}
      />
      <span className="text-[11px] text-fg-4">{hint}</span>
    </div>
  );
}

function niceMax(v: number): number {
  const steps = [3, 6, 9, 12, 18, 24, 36, 48, 60];
  return steps.find((s) => s >= v) ?? Math.ceil(v / 12) * 12;
}

export function ROICalculator() {
  const [programs, setPrograms] = useState(DEFAULT_ROI_PROGRAMS);
  const [hourlyCost, setHourlyCost] = useState(DEFAULT_HOURLY_COST);
  const [rate, setRate] = useState(DEFAULT_AUTOMATION_RATE);

  const roi = computeRoi({ programs, hourlyCost, automationRate: rate });

  const curve = useMemo(() => {
    const pts: Array<[number, number]> = [];
    for (let n = ROI_LIMITS.programs.min; n <= ROI_LIMITS.programs.max; n++) {
      const r = computeRoi({ programs: n, hourlyCost, automationRate: rate });
      if (r.breakEvenMonths !== null) pts.push([n, r.breakEvenMonths]);
    }
    return pts;
  }, [hourlyCost, rate]);

  const yMax = niceMax(Math.max(...curve.map((p) => p[1])));
  const yTicks = [0, yMax / 3, (yMax / 3) * 2, yMax];
  const isDefault =
    programs === DEFAULT_ROI_PROGRAMS && hourlyCost === DEFAULT_HOURLY_COST && rate === DEFAULT_AUTOMATION_RATE;

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
      {/* Inputs */}
      <div className="flex flex-col gap-7 rounded-2xl border border-line bg-ink-850 p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.16em] text-fg-3 uppercase">Hipótesis editables</span>
          <button
            type="button"
            onClick={() => {
              setPrograms(DEFAULT_ROI_PROGRAMS);
              setHourlyCost(DEFAULT_HOURLY_COST);
              setRate(DEFAULT_AUTOMATION_RATE);
            }}
            disabled={isDefault}
            className="inline-flex items-center gap-1.5 text-[11px] text-fg-3 transition-colors hover:text-fg disabled:opacity-30"
          >
            <RotateCcw className="size-3" aria-hidden /> Restablecer
          </button>
        </div>
        <Slider
          label="Programas activos"
          value={programs}
          {...ROI_LIMITS.programs}
          display={String(programs)}
          hint={`Hoy: ${CURRENT_PROGRAMS} programas`}
          onChange={setPrograms}
        />
        <Slider
          label="Coste operativo por hora"
          value={hourlyCost}
          {...ROI_LIMITS.hourlyCost}
          display={formatEuro(hourlyCost)}
          hint="Coste interno aproximado de una hora de trabajo operativo"
          onChange={setHourlyCost}
        />
        <Slider
          label="Carga medida automatizable"
          value={rate}
          {...ROI_LIMITS.automationRate}
          display={formatPercent(rate)}
          hint="Porcentaje de la carga identificada que el sistema asumiría"
          onChange={(v) => setRate(Math.round(v * 100) / 100)}
        />
        <p className="border-t border-line pt-4 font-mono text-[10.5px] leading-relaxed text-fg-4">
          {programs} × ({KNOWN_HOURS_WEEK} h ÷ {CURRENT_PROGRAMS}) × {formatNumber(WEEKS_PER_MONTH, 2)} sem × {formatPercent(rate)} ×{" "}
          {formatEuro(hourlyCost)}/h
        </p>
      </div>

      {/* Outputs */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <ClaimTag kind="projection" label="Escenario" />
            <div className="flex items-baseline gap-3">
              <span className="display text-[clamp(3.6rem,7vw,6.5rem)] leading-none text-gold">
                {roi.breakEvenMonths === null ? "—" : <AnimatedNumber value={roi.breakEvenMonths} live format={(v) => `≈ ${formatFixed(v, 1)}`} />}
              </span>
              <span className="text-lg text-fg-2">meses</span>
            </div>
            <span className="text-sm text-fg-3">para recuperar {formatEuro(PROJECT_PRICE)} en este escenario</span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
          {[
            { l: "Carga estimada / semana", v: `${formatFixed(roi.weeklyHours, 1)} h` },
            { l: "Carga estimada / mes", v: `${formatFixed(roi.monthlyHours, 1)} h` },
            { l: "Horas liberables / mes", v: `${formatFixed(roi.hoursFreedMonthly, 1)} h` },
            { l: "Valor mensual equivalente", v: formatEuro(roi.monthlyValue) },
          ].map((m) => (
            <div key={m.l} className="flex flex-col gap-1">
              <dt className="text-[11px] text-fg-3">{m.l}</dt>
              <dd className="display text-2xl text-fg tabular">{m.v}</dd>
            </div>
          ))}
        </dl>

        <figure className="flex flex-col gap-2">
          <figcaption className="flex items-baseline justify-between text-xs text-fg-3">
            <span>Meses para amortizar (eje vertical) según el número de programas (eje horizontal)</span>
            <span className="font-mono text-fg-4">con {formatEuro(hourlyCost)}/h · {formatPercent(rate)}</span>
          </figcaption>
          <LineChart
            points={curve}
            xMin={ROI_LIMITS.programs.min}
            xMax={ROI_LIMITS.programs.max}
            yMax={yMax}
            height={130}
            formatX={(x) => `${Math.round(x)}`}
            formatY={(y) => formatNumber(y, 1)}
            yTicks={yTicks}
            xTicks={[11, 20, 30, 40, 50, 60]}
            marker={roi.breakEvenMonths !== null ? { x: programs, y: roi.breakEvenMonths, label: "" } : undefined}
            ariaLabel="Meses de amortización según el número de programas"
          />
        </figure>

        <div className="flex flex-col gap-1 text-xs leading-relaxed">
          <p className="text-fg-2">En determinados escenarios de escala, la inversión puede amortizarse en pocos meses.</p>
          <p className="text-fg-4">
            Simulación basada en hipótesis editables. No representa una garantía de ahorro o retorno. Base: {KNOWN_HOURS_WEEK} h
            semanales identificadas con {CURRENT_PROGRAMS} programas, escaladas linealmente solo para construir escenarios.
          </p>
        </div>
      </div>
    </div>
  );
}
