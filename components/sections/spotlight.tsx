"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { aiInternship, type DailyWorkItem } from "@/content/portfolio";
import { cn } from "@/lib/utils";

/**
 * "What I do as an AI and Automation Executive" as an accordion.
 *
 * The six cards used to sit open in a grid, which turned the section into a
 * wall of text. Collapsed, a reader sees the six headings only and opens the
 * one they care about. Deliberately the same pattern as the Experience
 * section: real button, aria-expanded/aria-controls, one panel at a time.
 */
export function Spotlight() {
  const [open, setOpen] = React.useState<number | null>(null);
  const items = aiInternship.dailyWork;

  return (
    <section id="spotlight" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="02"
        eyebrow="Currently"
        title={`What I do as an ${aiInternship.role}`}
        description={aiInternship.blurb}
      />

      <div className="mx-auto mt-10 max-w-3xl">
        {/* Company lockup */}
        {aiInternship.company && (
          <div className="mb-6">
            {aiInternship.companyLogo ? (
              <span className="inline-flex h-12 items-center rounded-[2px] border-2 border-foreground/20 bg-white px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aiInternship.companyLogo}
                  alt={`${aiInternship.company} logo`}
                  className="h-8 w-auto object-contain"
                />
              </span>
            ) : (
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                {aiInternship.company}
              </p>
            )}
          </div>
        )}

        <div className="border-t-2 border-foreground/15">
          {items.map((item: DailyWorkItem, i) => {
            const isOpen = open === i;
            const panelId = `spotlight-panel-${i}`;
            const buttonId = `spotlight-button-${i}`;

            return (
              <div key={i} className="border-b-2 border-foreground/15">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-secondary/50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:gap-6"
                  >
                    <span className="min-w-0 flex-1">
                      {item.time && (
                        <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                          {"// "}
                          {item.time}
                        </span>
                      )}
                      <span className="mt-1 block font-display text-base font-bold leading-tight tracking-tight sm:text-lg">
                        {item.title}
                      </span>
                    </span>

                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-6"
                  >
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {item.description}
                    </p>

                    {item.tools && item.tools.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tools.map((tool) => (
                          <span
                            key={tool}
                            className="border border-foreground/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
