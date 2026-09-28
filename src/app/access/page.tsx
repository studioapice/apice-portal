import type { Metadata } from "next";
import { NaviOSMark, NaviTree } from "@/components/ui/Wordmark";

/** TEMPORARY: private access page for the NAVI OS presentation. */

export const metadata: Metadata = {
  title: "NAVI OS — Presentación privada",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default async function AccessPage({ searchParams }: PageProps<"/access">) {
  const { e } = await searchParams;
  const message =
    e === "1" ? "Contraseña incorrecta." : e === "unavailable" ? "Acceso no disponible en este momento." : null;

  return (
    <main className="flex min-h-svh items-center justify-center bg-ink-950 px-6">
      <form method="post" action="/api/access" className="flex w-full max-w-xs flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-5">
          <NaviTree className="h-12" preload />
          <NaviOSMark className="text-3xl text-fg" />
          <span className="eyebrow">Presentación privada</span>
        </div>
        <div className="flex w-full flex-col gap-3">
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="Contraseña"
            aria-invalid={message ? true : undefined}
            aria-describedby={message ? "access-error" : undefined}
            className="h-11 w-full rounded-full border border-line-2 bg-ink-850 px-5 text-center text-sm text-fg placeholder:text-fg-4 focus:border-gold/60 focus:outline-none"
          />
          <button
            type="submit"
            className="h-11 w-full rounded-full bg-fg text-sm font-medium text-ink-950 transition-transform hover:scale-[1.01]"
          >
            Entrar
          </button>
          <p id="access-error" role="alert" className="min-h-5 text-xs text-fg-3">
            {message}
          </p>
        </div>
      </form>
    </main>
  );
}
