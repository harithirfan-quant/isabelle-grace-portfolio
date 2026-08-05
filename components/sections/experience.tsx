"use client";

import { FileText } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { LogoBadge } from "@/components/logo-badge";
import { experience, resume } from "@/content/portfolio";
import { openResume } from "@/lib/actions";

export function Experience() {
  return (
    <section id="experience" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="05"
        eyebrow="Experience"
        title="Where I've worked"
        description="Roles in order, with the numbers that matter."
      />

      <div className="mx-auto mt-12 max-w-3xl border-t-2 border-foreground/15">
        {experience.map((job, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="grid gap-4 border-b-2 border-foreground/15 py-6 transition-colors hover:bg-secondary/50 sm:grid-cols-[64px_1fr] sm:gap-6">
              <LogoBadge name={job.company} className="sm:mt-1" />

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-bold leading-tight">
                    {job.role}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {job.dates}
                  </span>
                </div>

                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
                  {job.company}
                  {job.type ? ` · ${job.type}` : ""}
                  {job.location ? ` · ${job.location}` : ""}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {job.description}
                </p>

                {job.certificate && (
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    {"// "}
                    {job.certificate}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="border border-foreground/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <button
          onClick={openResume}
          className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-accent underline-offset-4 hover:underline"
        >
          <FileText className="h-4 w-4" />
          Full resume, updated {resume.lastUpdated}
        </button>
      </Reveal>
    </section>
  );
}
