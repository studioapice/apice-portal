"use client";

import { motion } from "motion/react";
import { TOOLS, type ToolId } from "@/components/ui/Glyphs";
import { NaviOSMark } from "@/components/ui/Wordmark";
import { EASE_OUT } from "@/components/ui/Reveal";

const PILLARS = [
  { name: "Producción", items: ["Render", "Episodio", "Clips", "Miniaturas"] },
  { name: "Distribución", items: ["Reglas", "Calendario", "Plataformas", "Entregas"] },
  { name: "Datos", items: ["Métricas", "Historial", "Patrones", "Aprendizaje"] },
];

const SERVICES: ToolId[] = ["dropbox", "opus", "ai", "metricool", "youtube", "airtable"];

function Flow({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex h-8 justify-around" aria-hidden>
      {[0, 1, 2].map((i) => (
        <svg key={i} width="2" height="32" className="overflow-visible">
          <motion.line
            x1="1"
            x2="1"
            y1="0"
            y2="32"
            stroke="var(--color-fg-4)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + i * 0.08 }}
          />
          <motion.circle
            cx="1"
            r="2"
            fill="var(--color-gold)"
            initial={{ cy: 0, opacity: 0 }}
            animate={{ cy: [0, 32], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: delay + i * 0.35, ease: "linear" }}
          />
        </svg>
      ))}
    </div>
  );
}

export function ArchitectureDiagram() {
  const item = (i: number) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay: 0.15 + i * 0.15, ease: EASE_OUT },
  });

  return (
    <div className="flex w-full flex-col" role="img" aria-label="Arquitectura de NAVI OS: núcleo, tres pilares, motor de flujos y servicios externos">
      <motion.div
        {...item(0)}
        className="flex flex-col items-center gap-1 rounded-2xl border border-gold/40 bg-gold/[0.06] px-6 py-5 text-center"
      >
        <NaviOSMark className="text-3xl text-fg" />
        <span className="text-xs text-fg-2">Sistema operativo de producción, distribución e inteligencia</span>
      </motion.div>

      <Flow delay={0.3} />

      <div className="grid grid-cols-3 gap-3">
        {PILLARS.map((p, i) => (
          <motion.div key={p.name} {...item(1 + i * 0.4)} className="flex flex-col gap-3 rounded-xl border border-line-2 bg-ink-850 p-4">
            <span className="font-mono text-[11px] tracking-[0.16em] text-fg uppercase">{p.name}</span>
            <ul className="flex flex-col gap-1 text-xs text-fg-3">
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <Flow delay={0.7} />

      <motion.div
        {...item(3)}
        className="flex items-center justify-between rounded-xl border border-line-2 bg-ink-800 px-5 py-3.5"
      >
        <span className="font-mono text-[11px] tracking-[0.16em] text-fg uppercase">Workflow Engine</span>
        <span className="text-xs text-fg-3">Estados · colas · reintentos · reglas</span>
      </motion.div>

      <Flow delay={1.1} />

      <motion.div {...item(4)} className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-between gap-2">
          {SERVICES.map((id) => {
            const t = TOOLS[id];
            const Icon = t.icon;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-ink-900 px-2.5 py-1.5 text-[11px] text-fg-3"
              >
                <Icon className="size-3.5" aria-hidden />
                {t.name}
              </span>
            );
          })}
        </div>
        <span className="text-center font-mono text-[10px] tracking-[0.16em] text-fg-4 uppercase">
          Servicios que NAVI OS utiliza
        </span>
      </motion.div>
    </div>
  );
}
