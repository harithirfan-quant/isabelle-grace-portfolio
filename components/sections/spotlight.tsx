"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { aiInternship, type DailyWorkItem } from "@/content/portfolio";

export function Spotlight() {
  const [lit, setLit] = React.useState(false);
  const reduceMotion = useReducedMotion();

  const dimmed = reduceMotion
    ? { opacity: 0.6, y: 0 }
    : { opacity: 0.25, y: 8 };

  const items = aiInternship.dailyWork;

  return (
    <section id="spotlight" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="02"
        eyebrow="Currently"
        title={`What I do as an ${aiInternship.role}`}
        description={aiInternship.blurb}
      />

      {/* Company lockup */}
      {aiInternship.company && (
        <div className="mt-6">
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

      {/* The stage */}
      <div className="mt-10 border-2 border-foreground/15 bg-secondary/30 p-6 sm:p-10">
        {/* Top rule lights up when on */}
        <div
          className={`-mx-6 -mt-6 mb-8 h-1.5 transition-colors duration-500 sm:-mx-10 sm:-mt-10 ${
            lit ? "bg-accent" : "bg-foreground/10"
          }`}
          aria-hidden
        />

        {/* Toggle */}
        <div className="flex justify-center">
          <Button
            variant={lit ? "accent" : "outline"}
            size="lg"
            onClick={() => setLit((v) => !v)}
            aria-pressed={lit}
          >
            <Lightbulb className={lit ? "fill-accent" : ""} />
            {lit ? "Dim the spotlight" : "Turn on the spotlight"}
          </Button>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item: DailyWorkItem, i) => (
            <motion.div
              key={i}
              animate={lit ? { opacity: 1, y: 0 } : dimmed}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: "easeOut",
                delay: lit && !reduceMotion ? i * 0.09 : 0,
              }}
              className={`h-full border-2 p-5 transition-colors duration-500 ${
                lit
                  ? "border-accent bg-accent/5"
                  : "border-foreground/15 bg-card"
              }`}
            >
              {item.time && (
                <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                  {"// "}
                  {item.time}
                </p>
              )}
              <h3 className="font-display text-lg font-bold leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {item.description}
              </p>
              {item.tools && item.tools.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
