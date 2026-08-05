"use client";

import Image from "next/image";
import { Download, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { about, personal, resume } from "@/content/portfolio";
import { links, openExternal, openResume } from "@/lib/actions";

export function About() {
  return (
    <section id="about" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="The short version"
        description="What I've done so far, and what I'm building next."
      />

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Portrait */}
        <Reveal className="lg:sticky lg:top-24">
          <div className="border-2 border-foreground bg-secondary shadow-hard">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {/* EDIT THIS: set personal.photo in content/portfolio.ts to
                 your photo (or drop it in /public and reference it there).
                 Until then, a pink monogram placeholder renders instead. */}
              {about.photo ? (
                <Image
                  src={about.photo}
                  alt={personal.preferredName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 384px"
                  className="object-cover"
                />
              ) : (
                <PhotoPlaceholder />
              )}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 border-2 border-foreground font-mono">
            <div className="border-r-2 border-foreground p-3">
              <p className="text-lg font-bold leading-none">{personal.gpa}</p>
              <p className="mt-1.5 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                CGPA
              </p>
            </div>
            <div className="p-3">
              <p className="text-lg font-bold leading-none text-accent">
                Dean&apos;s Award
              </p>
              <p className="mt-1.5 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                3.95 · Sem 1 2025
              </p>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <div className="space-y-5">
            {about.bio.map((p, i) => (
              <p
                key={i}
                className="text-pretty text-lg leading-relaxed text-foreground/85"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Milestones */}
          <div className="mt-12">
            <h3 className="eyebrow text-foreground/60">Milestones</h3>
            <ol className="mt-5 divide-y-2 divide-foreground/10 border-y-2 border-foreground/15">
              {about.milestones.map((m, i) => (
                <li
                  key={i}
                  className="group flex items-baseline gap-5 py-4 transition-colors hover:bg-secondary/60"
                >
                  <span className="w-7 shrink-0 font-mono text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {m}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Skills summary + tags */}
          <div className="mt-12">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {about.skillsSummary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {about.skillTags.map((tag) => (
                <span
                  key={tag}
                  className="border-2 border-foreground/20 bg-background px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap gap-3">
            {resume.available && (
              <Button variant="default" onClick={openResume}>
                <Download className="h-4 w-4" />
                Resume
              </Button>
            )}
            <Button variant="outline" onClick={() => openExternal(links.linkedin)}>
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            <Button variant="outline" onClick={() => openExternal(links.instagram)}>
              <Instagram className="h-4 w-4" />
              Instagram
            </Button>
            <Button variant="ghost" onClick={() => openExternal(links.mailto)}>
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
