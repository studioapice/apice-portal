/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { DEMO_EPISODE, type ThumbnailId } from "@/data/demo";
import { cn } from "@/lib/cn";
import { StudioFrame } from "@/components/visuals/StudioFrame";

/**
 * Thumbnail options for the demo episode.
 * B = the REAL published YouTube thumbnail of the episode.
 * A and C = stylised alternatives in the "¿Y si fueras tú?" palette (concept).
 */
export function ThumbnailArt({ id, className, sizes = "(min-width: 1024px) 360px, 45vw" }: { id: ThumbnailId; className?: string; sizes?: string }) {
  return (
    <div className={cn("@container relative aspect-video w-full overflow-hidden", className)}>
      {id === "A" && <ThumbA />}
      {id === "B" && (
        <Image
          src={DEMO_EPISODE.publishedThumbnail}
          alt={`Miniatura publicada de ¿Y si fueras tú? · ${DEMO_EPISODE.title}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      )}
      {id === "C" && <ThumbC />}
    </div>
  );
}

function Sello({ className }: { className?: string }) {
  return (
    <img
      src="/brand/programs/ysft-sello.png"
      alt=""
      className={cn("absolute top-[4cqw] left-[4cqw] w-[13cqw] rounded-full bg-ysft-paper/90 p-[0.5cqw]", className)}
    />
  );
}

function ThumbA() {
  return (
    <div className="absolute inset-0 bg-ysft-paper">
      <div className="absolute inset-y-0 right-0 w-[34%] bg-ysft-sand/60" />
      <img
        src="/brand/programs/ysft-logo.png"
        alt=""
        className="absolute top-1/2 right-[1%] w-[40%] -translate-y-1/2 opacity-90"
      />
      <div className="absolute top-1/2 left-[6%] w-[60%] -translate-y-1/2">
        <p className="font-serif text-[9.5cqw] leading-[0.98] tracking-[-0.02em] text-[#2f3d44]">
          ¿Reaccionas o <span className="italic text-ysft-clay">respondes?</span>
        </p>
      </div>
    </div>
  );
}

function ThumbC() {
  return (
    <div className="absolute inset-0 bg-[#1b262c]">
      <div className="absolute inset-y-0 right-0 w-[62%]">
        <StudioFrame variant="left" tone={["#2b3a42", "#d8c8b2"]} />
      </div>
      <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#1b262c] via-[#1b262c]/85 to-transparent" />
      <div className="absolute bottom-[12%] left-[6%] flex flex-col gap-[1.6cqw]">
        <span className="h-[0.8cqw] w-[10cqw] bg-ysft-clay" />
        <p className="font-serif text-[11cqw] leading-[0.9] tracking-[-0.02em] text-ysft-paper">Responder</p>
        <p className="font-sans text-[3.2cqw] text-ysft-sky">no es reaccionar</p>
      </div>
      <Sello />
    </div>
  );
}
