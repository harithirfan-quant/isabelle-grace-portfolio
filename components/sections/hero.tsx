"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero, personal, resume } from "@/content/portfolio";
import { openResume, scrollToSection } from "@/lib/actions";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center border-b-2 border-foreground"
    >
      <div className="container py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text */}
          <div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.4 }}
              className="eyebrow flex items-center gap-3 text-foreground/60"
            >
              <span className="h-2.5 w-2.5 bg-accent" aria-hidden />
              Open to internships · {personal.location}
            </motion.p>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-8 text-6xl font-bold leading-[0.92] tracking-tight sm:text-8xl"
            >
              {personal.preferredName.split(" ")[0]}
              <br />
              {personal.preferredName.split(" ")[1]}
              <span className="text-accent">.</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 max-w-xl text-lg leading-snug text-foreground/80 sm:text-xl"
            >
              {personal.title}
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground"
            >
              {personal.tagline}
            </motion.p>

            {/* Social proof strip */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 border-y-2 border-foreground/15 py-3 font-mono text-xs uppercase tracking-wider text-foreground/70"
            >
              {hero.socialProof.map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && (
                    <span className="text-accent" aria-hidden>
                      {"//"}
                    </span>
                  )}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button variant="default" size="lg" onClick={openResume}>
                <Download className="h-5 w-5" />
                Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("experience")}
              >
                <ArrowDown className="h-5 w-5" />
                View Experience
              </Button>
            </motion.div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 font-mono text-xs text-muted-foreground"
            >
              Resume updated {resume.lastUpdated}
            </motion.p>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto w-full max-w-sm"
          >
            <div className="border-2 border-foreground bg-secondary shadow-hard-accent">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {/* EDIT THIS: your photo lives at /public/avatar.jpg.
                   To swap it, just replace that file (keep the same name). */}
                <Image
                  src="/avatar.jpg"
                  alt={personal.preferredName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 384px"
                  className="object-cover grayscale-[15%]"
                />
              </div>
            </div>

            {/* Caption strip */}
            <div className="mt-4 grid grid-cols-2 border-2 border-foreground font-mono">
              <div className="border-r-2 border-foreground p-3">
                <p className="text-lg font-bold leading-none">
                  {personal.gpa}
                </p>
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
          </motion.div>
        </div>
      </div>

      {/* Scroll marker */}
      <button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        Scroll
        <ArrowDown className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
