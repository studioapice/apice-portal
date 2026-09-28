import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * TEMPORARY access gate for the private NAVI OS presentation
 * (see TEMPORARY_NAVI_DEPLOYMENT.md). Server-only.
 *
 * The password lives only in the Vercel env var NAVI_PRESENTATION_PASSWORD.
 * The cookie stores an HMAC derived from it, never the password itself.
 * Missing env var → fail closed.
 */

export const ACCESS_COOKIE = "navi_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string | null {
  const value = process.env.NAVI_PRESENTATION_PASSWORD;
  return value && value.length > 0 ? value : null;
}

/** Cookie value for the configured password, or null if not configured. */
export function expectedToken(): string | null {
  const s = secret();
  return s ? createHmac("sha256", s).update("navi-os-presentation:v1").digest("hex") : null;
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function isPasswordValid(input: string): boolean {
  const s = secret();
  if (!s) return false;
  return safeEqual(input, s);
}

export function isTokenValid(token: string | undefined): boolean {
  const expected = expectedToken();
  if (!expected || !token) return false;
  return safeEqual(token, expected);
}

export function isGateConfigured(): boolean {
  return secret() !== null;
}
