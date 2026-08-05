"use client";

import type { ElementType } from "react";
import {
  Newspaper,
  FileText,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { press, type PressMention } from "@/content/portfolio";

const TYPE_ICON: Record<PressMention["type"], ElementType> = {
  news: Newspaper,
  pdf: FileText,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  web: Globe,
};

// Free, key-less live screenshot of any public URL (WordPress mShots).
function autoPreview(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    url
  )}?w=640&h=360`;
}

export function Press() {
  return (
    <section id="press" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="03"
        eyebrow="Press"
        title="As featured in"
        description="Media mentions, roughly newest first. Tap any card to read the original."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {press.map((item, i) => {
          const Icon = TYPE_ICON[item.type] ?? Globe;
          const previewSrc =
            item.preview && item.preview.length
              ? item.preview
              : autoPreview(item.url);
          return (
            <Reveal key={item.url + i} delay={(i % 3) * 0.05}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full cursor-pointer flex-col border-2 border-foreground/15 bg-card transition-all hover:border-foreground hover:shadow-hard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Website preview thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewSrc}
                    alt={`Preview of ${item.outlet}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* outlet strip */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 bg-foreground px-2.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-background">
                    <Icon className="h-3 w-3 text-accent" />
                    <span className="truncate">{item.outlet}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-pretty text-sm font-medium leading-snug text-foreground/90">
                    {item.title}
                  </p>
                  <div className="mt-auto pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="border border-foreground/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        {item.event}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                      Read
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
