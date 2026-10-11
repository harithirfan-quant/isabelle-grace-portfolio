import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { wallItems, type WallItem } from "@/content/portfolio";

/**
 * The pinned wall. Each card carries washi tape, a slight tilt and a soft
 * shadow, so it reads as something pressed onto the wallpaper rather than a
 * UI panel.
 *
 * Cards with an `image` show the photo. Cards without one fall back to a
 * handwritten note, so the wall looks finished either way. Certificates and
 * cheques render letterboxed (object-contain) so a document is never cropped
 * through the middle, and clicking one opens the full-size image.
 */

const TONES: Record<string, string> = {
  paper: "bg-white",
  blush: "bg-[#FFE3EE]",
  lilac: "bg-[#F1E6FF]",
  mint: "bg-[#E1F6EE]",
};

const RIBBON_TONES: Record<string, string> = {
  accent: "",
  lilac: "ribbon-lilac",
  mint: "ribbon-mint",
};

function WallCard({ item, index }: { item: WallItem; index: number }) {
  const tone = TONES[item.tone ?? "paper"] ?? TONES.paper;
  const ribbonTone = RIBBON_TONES[item.ribbonTone ?? "accent"] ?? "";
  // Documents hold their whole page; plain photos fill the frame.
  const contained = item.imageContain === true;
  // Alternate the ribbon corner so a row of cards does not read as a grid.
  const ribbonSide = index % 2 === 0 ? "ribbon-tl" : "ribbon-tr";

  const body = (
    <>
      <span className="wall-tape wall-tape-l" aria-hidden />
      <span className="wall-tape wall-tape-r" aria-hidden />

      {item.image ? (
        <span className="relative mb-3 block aspect-[4/3] overflow-hidden rounded-[6px] border-2 border-foreground bg-white">
          <Image
            src={item.image}
            alt={item.label}
            fill
            sizes="(max-width: 640px) 90vw, 320px"
            className={contained ? "object-contain" : "object-cover"}
          />
        </span>
      ) : null}

      <span className="block font-hand text-3xl leading-none text-foreground">
        {item.label}
      </span>
      {item.caption ? (
        <span className="mt-2 block font-mono text-[0.65rem] uppercase leading-relaxed tracking-wider text-muted-foreground">
          {item.caption}
        </span>
      ) : null}
    </>
  );

  return (
    <Reveal>
      <div
        className={`wall-card group relative h-full rounded-[10px] border-2 border-foreground p-4 shadow-hard ${tone}`}
        style={{ ["--tilt" as string]: `${item.rotate ?? 0}deg` }}
      >
        {item.ribbon ? (
          <span className={`ribbon ${ribbonSide} ${ribbonTone}`} aria-hidden>
            {item.ribbon}
          </span>
        ) : null}

        {item.image ? (
          <a
            href={item.image}
            target="_blank"
            rel="noopener noreferrer"
            title="Open full size"
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {body}
          </a>
        ) : (
          body
        )}
      </div>
    </Reveal>
  );
}

export function Wall() {
  return (
    <section id="wall" className="scroll-mt-24">
      <div className="container">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pinned up
          </h2>
          <span className="font-hand text-xl text-accent">
            the lovely bits
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Awards, prizes and the keepsakes that came with them. Tap any photo
          to open it full size.
        </p>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {wallItems.map((item, i) => (
            <WallCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
