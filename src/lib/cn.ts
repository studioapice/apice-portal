type ClassValue = string | false | null | undefined | 0;

/** Tiny className joiner (no dependency needed). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
