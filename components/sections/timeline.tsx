"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { timeline } from "@/content/portfolio";

export function Timeline() {
  return (
    <section id="highlights" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="07"
        eyebrow="Highlights"
        title="Wins & milestones"
        description="The moments that shaped the path, roughly newest first."
      />

      <div className="relative mx-auto mt-14 max-w-4xl">
        {/* center line (desktop) / left line (mobile) */}
        <div
          className="absolute inset-y-0 left-4 w-0.5 bg-foreground/15 md:left-1/2 md:-translate-x-1/2"
          aria-hidden
        />

        {/*
         * Desktop: two columns with a fixed center gutter that carries the
         * timeline. Right-column entries drop 64px (md:pt-16) so each pair
         * reads as a staircase: entry N+1 sits clearly below entry N, and the
         * numbered markers stay in strict order down the line. 38px = half the
         * 3rem gutter (24px) plus half the 28px marker (14px), centering each
         * marker on the line; the right marker's 92px top = 64px drop + 28px.
         * (Padding, not margin: grid-item margins compute to zero in WebKit.)
         */}
        <div className="space-y-8 md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:items-start md:gap-y-10 md:space-y-0">
          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative pl-12 md:pl-0 ${
                  left
                    ? "md:col-start-1"
                    : "md:col-start-3 md:pt-16"
                }`}
              >
                {/* numbered marker on the line, in order */}
                <span
                  className={`absolute z-10 flex h-7 w-7 items-center justify-center border-2 border-background bg-accent font-mono text-[0.65rem] font-bold text-accent-foreground top-6 left-[2px] ${
                    left
                      ? "md:top-7 md:left-auto md:right-[-38px]"
                      : "md:top-[92px] md:left-[-38px]"
                  }`}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: (i % 2) * 0.08,
                  }}
                  className="relative overflow-hidden border-2 border-foreground/15 bg-card transition-colors hover:border-foreground"
                >
                  {/* image only when there is one; text-only cards stay compact */}
                  {item.image && (
                    <a
                      href={item.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative block aspect-[16/9] w-full overflow-hidden ${
                        item.imageContain ? "bg-white" : "bg-muted"
                      }`}
                      title="Open full image"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        className={
                          item.imageContain
                            ? "object-contain"
                            : "object-cover transition-transform duration-500 hover:scale-105"
                        }
                      />
                    </a>
                  )}

                  <div className="p-5">
                    <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                      {item.date}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {item.org}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                      {item.description}
                    </p>
                  </div>

                  {item.gallery && item.gallery.length > 0 && (
                    <div className="border-t border-foreground/10 p-5 pt-4">
                      <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                        Session photos · Apr + Jun 2026
                      </p>
                      <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
                        {item.gallery.map((src) => (
                          <a
                            key={src}
                            href={src}
                            target="_blank"
                            rel="noreferrer"
                            className="group snap-start shrink-0"
                          >
                            <div className="relative h-20 w-28 overflow-hidden border-2 border-foreground/15 transition-colors group-hover:border-accent">
                              <Image
                                src={src}
                                alt={`${item.title} session photo`}
                                fill
                                sizes="112px"
                                className="object-cover"
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
