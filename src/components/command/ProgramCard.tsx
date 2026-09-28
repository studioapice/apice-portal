import { programState, type Program } from "@/data/programs";
import { cn } from "@/lib/cn";
import { NetworkBadge } from "@/components/ui/NetworkBadge";
import { ProgramThumb } from "@/components/ui/ProgramThumb";

/** Pipeline status tokens (SIMULATION) used by cards and the overview bar. */
export const STATUS_STYLE = {
  published: { label: "Publicados", className: "bg-fg-2" },
  scheduled: { label: "Programados", className: "bg-sys" },
  review: { label: "En revisión", className: "bg-gold" },
  processing: { label: "Procesando", className: "bg-sys/50" },
  pending: { label: "Por grabar", className: "bg-ink-500" },
} as const;

const STATE_CHIP = {
  processing: { label: "Procesando", dot: "bg-sys animate-pulse-soft", text: "text-sys" },
  review: { label: "En revisión", dot: "bg-gold", text: "text-gold" },
  scheduled: { label: "Programado", dot: "bg-fg-2", text: "text-fg-2" },
  published: { label: "Publicado", dot: "bg-fg-4", text: "text-fg-3" },
} as const;

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

/** Program row: real thumbnail · name · network · hosts · pipeline state. */
export function ProgramCard({ program }: { program: Program }) {
  const state = STATE_CHIP[programState(program)];
  const slot = program.slots[0];
  return (
    <article className="flex gap-3 rounded-xl border border-line bg-ink-850 p-2.5">
      <ProgramThumb
        src={program.thumbnail}
        name={program.name}
        network={program.networkSlug}
        sizes="(min-width: 1280px) 144px, 112px"
        objectPosition={program.thumbnailPosition}
        className="w-28 shrink-0 self-start rounded-lg xl:w-36"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h4 className="truncate text-[13px] leading-snug text-fg" title={program.name}>
          {program.name}
        </h4>
        <div className="flex min-w-0 items-center gap-2">
          <NetworkBadge network={program.networkSlug} size="xs" />
          {program.hosts.length > 0 && (
            <p className="truncate text-[11px] text-fg-3">{program.hosts.join(" · ")}</p>
          )}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 pt-1 text-[10.5px] whitespace-nowrap">
          <span className={cn("inline-flex items-center gap-1.5", state.text)}>
            <span className={cn("size-1.5 rounded-full", state.dot)} aria-hidden />
            {state.label}
          </span>
          {slot && (
            <span className="font-mono text-fg-4">
              {program.slots.length > 1
                ? program.slots.map((s) => DAYS[s.day]).join("·")
                : DAYS[slot.day]}{" "}
              {slot.time}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
