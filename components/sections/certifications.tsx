"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TrophyCard } from "@/components/trophy-card";
import { certifications, trophyCase } from "@/content/portfolio";
import { LogoBadge } from "@/components/logo-badge";

const CATEGORIES = [
  "All",
  "Google",
  "Government",
  "Scholarship",
  "Competitions",
] as const;

function CertGrid({ category }: { category: string }) {
  const items =
    category === "All"
      ? certifications
      : certifications.filter((c) => c.category === category);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => (
        <Reveal key={c.title + i} delay={(i % 3) * 0.04}>
          <div className="group flex h-full flex-col border-2 border-foreground/15 bg-card p-5 transition-all hover:border-foreground hover:shadow-hard">
            {c.image && (
              // Image-on-top: full certificate shown uncropped (contain),
              // click opens the complete image in a new tab.
              <a
                href={c.image}
                target="_blank"
                rel="noopener noreferrer"
                className="relative -mx-5 -mt-5 mb-4 block aspect-[16/9] overflow-hidden border-b-2 border-foreground/15 bg-white"
                title="Open full certificate"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-contain"
                />
              </a>
            )}
            <div className="flex items-start gap-3">
              {!c.image && (
                <LogoBadge name={c.issuer} className="h-10 w-10 text-xs" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-snug">
                  {c.title}
                </h3>
                <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {c.issuer}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="border border-foreground/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                {c.date}
              </span>
              {c.credentialId && (
                <span className="border border-foreground/20 bg-background px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                  ID: {c.credentialId}
                </span>
              )}
            </div>
            {c.url ? (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-accent hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Show Credential
              </a>
            ) : (
              <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                Verified credential
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Certifications() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section id="certifications" className="scroll-mt-20 py-24">
      <div className="container">
        <SectionHeading
          index="09"
          eyebrow="Credentials"
          title="Certifications & wins"
          description="Verified credentials from Google, TalentCorp, Bintulu Port, and university programmes."
        />
      </div>

      {/* TROPHY CASE */}
      <div className="mt-14 border-y-2 border-foreground/15 bg-secondary/30 py-10">
        <div className="container mb-4 flex items-center justify-between">
          <h3 className="eyebrow text-foreground/60">Top achievements</h3>
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scroll-padding-left:1.5rem] md:px-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))]"
        >
          {trophyCase.map((t, i) => (
            <TrophyCard key={t.title} {...t} index={i} />
          ))}
        </div>
      </div>

      {/* FULL GRID */}
      <div className="container mt-16">
        <Reveal className="mb-8 text-center">
          <p className="font-display text-5xl font-bold tracking-tight text-foreground">
            {certifications.length}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Verified credentials
          </p>
        </Reveal>

        <Tabs defaultValue="All">
          <div className="flex justify-center">
            <TabsList>
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {CATEGORIES.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <CertGrid category={cat} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
