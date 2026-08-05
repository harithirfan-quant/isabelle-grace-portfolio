"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { radarSkills } from "@/content/portfolio";

export function SkillsRadar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="What I'm good at"
        description="Self-assessed against real work, from 0 to 100."
      />

      <div
        ref={ref}
        className="mx-auto mt-12 max-w-3xl border-y-2 border-foreground/15"
      >
        {radarSkills.map((skill, i) => (
          <div
            key={skill.subject}
            className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-5 transition-colors hover:bg-secondary/50"
          >
            <p className="font-medium text-foreground/90">{skill.subject}</p>
            <p className="font-mono text-sm font-bold text-accent">
              {skill.A}
            </p>
            <div className="col-span-2 mt-2 h-2 bg-foreground/10">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.A}%` } : { width: 0 }}
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

      <p className="mt-5 text-center font-mono text-xs text-muted-foreground">
        Based on certifications, projects, and real-world experience. Updated
        regularly.
      </p>
    </section>
  );
}
