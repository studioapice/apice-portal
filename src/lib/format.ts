import { PRESENTATION } from "@/config/presentation";

const LOCALE = PRESENTATION.locale;

/** 1234.5 → "1.234,5" (max `digits` decimals). */
export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
    useGrouping: "always",
  }).format(value);
}

/** Fixed decimals: 3.3 → "3,30" when digits = 2. */
export function formatFixed(value: number, digits = 1): string {
  return new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    useGrouping: "always",
  }).format(value);
}

/** 12900 → "12.900 €" */
export function formatEuro(value: number, digits = 0): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: PRESENTATION.currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    useGrouping: "always",
  }).format(value);
}

/** 0.75 → "75 %" */
export function formatPercent(value: number, digits = 0): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "percent",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

/** 86200 → "86,2 K" */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** 1.818 h → "1 h 49 min" */
export function formatHoursMinutes(hours: number): string {
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

/** Pads scene numbers: 7 → "07" */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
