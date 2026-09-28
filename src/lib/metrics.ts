/**
 * Derived figures. Every number shown in the presentation that is not a raw
 * constant is computed here from `src/config/presentation.ts`.
 */
import {
  CURRENT_EPISODES_PER_WEEK,
  CURRENT_PROGRAMS,
  EPISODES_PER_SEASON,
  KNOWN_HOURS_WEEK,
  PROJECT_PRICE,
  WEEKS_PER_MONTH,
  WORKDAY_HOURS,
} from "@/config/presentation";

/** Identified weekly hours per program (baseline: 20 h / 11 programs). */
export const HOURS_PER_PROGRAM_WEEK = KNOWN_HOURS_WEEK / CURRENT_PROGRAMS;

/** Identified hours per episode today. */
export const HOURS_PER_EPISODE = KNOWN_HOURS_WEEK / CURRENT_EPISODES_PER_WEEK;

/** Episodes in the current season universe (programs × season length). */
export const SEASON_UNIVERSE = CURRENT_PROGRAMS * EPISODES_PER_SEASON;

/** Linear projection of identified weekly hours for N programs. */
export function projectWeeklyHours(programs: number): number {
  return programs * HOURS_PER_PROGRAM_WEEK;
}

/** Hours expressed in workdays. */
export function toWorkdays(hours: number): number {
  return hours / WORKDAY_HOURS;
}

export interface RoiInput {
  programs: number;
  hourlyCost: number;
  /** 0–1 */
  automationRate: number;
  price?: number;
}

export interface RoiResult {
  weeklyHours: number;
  monthlyHours: number;
  hoursFreedMonthly: number;
  monthlyValue: number;
  annualValue: number;
  /** Months to recover the investment. `null` when value is 0. */
  breakEvenMonths: number | null;
}

/**
 * ROI scenario (all outputs are scenarios based on editable hypotheses):
 *   weekly      = N × (20 / 11)
 *   monthly     = weekly × 4.33
 *   freed       = monthly × automationRate
 *   value       = freed × hourlyCost
 *   breakEven   = price / value
 */
export function computeRoi({
  programs,
  hourlyCost,
  automationRate,
  price = PROJECT_PRICE,
}: RoiInput): RoiResult {
  const weeklyHours = projectWeeklyHours(programs);
  const monthlyHours = weeklyHours * WEEKS_PER_MONTH;
  const hoursFreedMonthly = monthlyHours * automationRate;
  const monthlyValue = hoursFreedMonthly * hourlyCost;
  const annualValue = monthlyValue * 12;
  const breakEvenMonths = monthlyValue > 0 ? price / monthlyValue : null;
  return {
    weeklyHours,
    monthlyHours,
    hoursFreedMonthly,
    monthlyValue,
    annualValue,
    breakEvenMonths,
  };
}
