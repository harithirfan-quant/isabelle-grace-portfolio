"use client";

import { GraduationCap, Award, Trophy } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { LogoBadge } from "@/components/logo-badge";
import { education, personal } from "@/content/portfolio";

export function Education() {
  return (
    <section id="education" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="08"
        eyebrow="Education"
        title="Academic foundation"
        description="Bachelor of Business (International Business) at Universiti Malaysia Perlis."
      />

      {/* GPA / Dean's Award */}
      <Reveal className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        <span className="flex items-center gap-2 border-2 border-accent bg-accent/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider">
          <Award className="h-4 w-4 text-accent" />
          {personal.deansAward}
        </span>
        <span className="flex items-center gap-2 border-2 border-foreground/20 bg-card px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="h-4 w-4 text-accent" />
          CGPA {personal.gpa}
        </span>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl border-t-2 border-foreground/15">
        {education.map((edu, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="grid gap-4 border-b-2 border-foreground/15 py-6 transition-colors hover:bg-secondary/50 sm:grid-cols-[56px_1fr_auto] sm:gap-6">
              <LogoBadge name={edu.school} image={edu.logoImage} className="sm:mt-1" />
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold leading-tight">
                  {edu.school}
                </h3>
                <p className="mt-1 text-sm text-accent">{edu.degree}</p>
                {edu.grade && (
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Grade: {edu.grade}
                  </p>
                )}
                {edu.highlights?.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {edu.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <Trophy className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="shrink-0 font-mono text-xs text-muted-foreground sm:text-right">
                {edu.dates}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
