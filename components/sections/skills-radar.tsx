"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { radarSkills } from "@/content/portfolio";
import { useInDeskWindow } from "@/components/desktop/scroll-root";

/**
 * Skills as a compact ruled table rather than eight stacked bar rows.
 *
 * The old layout gave every skill its own full-width row (label, number, then
 * the bar underneath) which ate roughly 700px of the window. Same data, same
 * numbers, one quarter of the height: four columns with a hairline rule above
 * each cell, and a 3px inline meter instead of a full-width bar.
 */
export function SkillsRadar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  // In the desktop window the observer does not fire, which would leave every
  // meter at width 0. Treat the section as in view there.
  const inWindow = useInDeskWindow();
  const showBars = inWindow || inView;

  return (
    <section id="skills" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="What I'm good at"
      />

      <div ref={ref} className="mx-auto mt-10 max-w-4xl">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {radarSkills.map((skill, i) => (
            <div
              key={skill.subject}
              className="border-t-2 border-foreground/15 pt-3"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold leading-tight text-foreground">
                  {skill.subject}
                </p>
                <p className="shrink-0 font-mono text-xs font-bold text-accent">
                  {skill.A}
                </p>
              </div>
              <div className="mt-2.5 h-[3px] w-full bg-foreground/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={showBars ? { width: `${skill.A}%` } : { width: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="h-full bg-accent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        Based on certifications, projects, and real-world experience
      </p>
    </section>
  );
}
