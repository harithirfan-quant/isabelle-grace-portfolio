"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";

const SECTIONS = ["Overview", "Challenge", "Approach", "Metrics", "Lessons"] as const;

function MetricCard({
  metric,
  index,
}: {
  metric: CaseStudy["metrics"][number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="border-2 border-foreground/15 bg-card p-6 text-center"
    >
      <p className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
        {metric.value}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground/90">{metric.label}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {metric.description}
      </p>
    </motion.div>
  );
}

export function CaseStudyClient({ cs }: { cs: CaseStudy }) {
  const [activeSection, setActiveSection] = React.useState<string>("Overview");

  // Scroll spy
  React.useEffect(() => {
    const ids = SECTIONS.map((s) => s.toLowerCase().replace(/\s+/g, "-"));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(
              SECTIONS[ids.indexOf(id)] ?? "Overview"
            );
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="container max-w-4xl">
      <div className="flex gap-12 lg:gap-16">
        {/* Sticky TOC (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 w-40 space-y-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contents
            </p>
            {SECTIONS.map((section) => {
              const id = section.toLowerCase().replace(/\s+/g, "-");
              return (
                <button
                  key={section}
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-left text-sm transition-colors ${
                    activeSection === section
                      ? "font-semibold text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-16">
          {/* Overview */}
          <section id="overview" className="scroll-mt-28">
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Overview</h2>
            <p className="text-base leading-relaxed text-foreground/85">{cs.overview}</p>
          </section>

          {/* Challenge */}
          <section id="challenge" className="scroll-mt-28">
            <h2 className="mb-5 text-2xl font-bold tracking-tight">{cs.challenge.title}</h2>
            <div className="space-y-4">
              {cs.challenge.content.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="text-base leading-relaxed text-foreground/85"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </section>

          {/* Approach */}
          <section id="approach" className="scroll-mt-28">
            <h2 className="mb-5 text-2xl font-bold tracking-tight">{cs.approach.title}</h2>
            <ol className="space-y-5">
              {cs.approach.content.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex gap-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-foreground/25 bg-secondary font-mono text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-base leading-relaxed text-foreground/85">{step}</p>
                </motion.li>
              ))}
            </ol>
          </section>

          {/* Metrics */}
          <section id="metrics" className="scroll-mt-28">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Key Metrics</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {cs.metrics.map((m, i) => (
                <MetricCard key={m.label} metric={m} index={i} />
              ))}
            </div>
          </section>

          {/* Lessons */}
          <section id="lessons" className="scroll-mt-28">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Lessons Learned</h2>
            <div className="space-y-3">
              {cs.lessons.map((lesson, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="flex items-start gap-3 border-2 border-foreground/15 bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-relaxed text-foreground/85">{lesson}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
