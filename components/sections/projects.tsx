"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/portfolio";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { links, openExternal } from "@/lib/actions";

type Project = (typeof projects)[number];

/**
 * Full-width hero card for a featured project.
 * The card itself is a div rather than a link so the demo, source and case
 * study links are real, separately focusable anchors (nesting them inside one
 * big anchor is invalid HTML and breaks keyboard navigation).
 */
function FeaturedProject({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy?: CaseStudy;
}) {
  const hasUrl = Boolean(project.url);

  const preview = (
    <div className="relative flex h-full w-full items-center justify-center">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} landing page`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <span className="font-display text-5xl font-bold tracking-tight text-foreground/60 transition-colors group-hover:text-foreground sm:text-6xl">
          {project.title}
        </span>
      )}
    </div>
  );

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden border-2 border-foreground/15 bg-card transition-all hover:border-foreground hover:shadow-hard"
    >
      {/* Preview; links straight to the live demo when one exists */}
      {hasUrl ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${project.title} live demo`}
          className={`relative flex items-center justify-center overflow-hidden border-b-2 border-foreground/15 bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
            project.image ? "aspect-[16/10]" : "aspect-[16/8]"
          }`}
        >
          {preview}
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border-2 border-foreground bg-background text-foreground transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </a>
      ) : (
        <div
          className={`relative flex items-center justify-center overflow-hidden border-b-2 border-foreground/15 bg-secondary ${
            project.image ? "aspect-[16/10]" : "aspect-[16/8]"
          }`}
        >
          {preview}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-xl font-bold">{project.title}</h3>
          <span className="border border-accent bg-accent px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-accent-foreground">
            Featured
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="border border-foreground/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {hasUrl && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold uppercase tracking-widest text-accent hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
          {caseStudy && (
            <Link
              href={`/case-studies/${caseStudy.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Case Study
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  // Every project marked featured gets its own hero card.
  const featured = projects.filter((p) => p.featured);
  const shown = featured.length > 0 ? featured : projects.slice(0, 1);
  const featuredTitles = new Set(shown.map((p) => p.title));

  // Case studies that do not belong to a featured project show as small cards.
  const otherCaseStudies = caseStudies.filter(
    (cs) => !featuredTitles.has(cs.projectSlug)
  );

  return (
    <section id="projects" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="10"
        eyebrow="Projects"
        title="Things I've built"
        description="What each one does, and where it lives."
      />

      <div className="mx-auto mt-12 max-w-4xl space-y-6">
        {shown.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08}>
            <FeaturedProject
              project={project}
              caseStudy={caseStudies.find(
                (cs) => cs.projectSlug === project.title
              )}
            />
          </Reveal>
        ))}

        {/* Case study cards for non-project experiences */}
        {otherCaseStudies.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {otherCaseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={0.1 + i * 0.05}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group flex h-full flex-col border-2 border-foreground/15 bg-card p-5 transition-all hover:border-foreground hover:shadow-hard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="border border-foreground/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      {cs.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-accent" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground/90 transition-colors group-hover:text-accent">
                    {cs.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {cs.subtitle}
                  </p>
                  <span className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Read case study
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Coming soon */}
        <Reveal delay={0.2}>
          <div className="flex flex-col items-center justify-between gap-4 border-2 border-dashed border-foreground/25 bg-secondary/30 p-6 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-display text-lg font-bold">
                More projects coming soon
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                I&apos;m actively building. Follow along for the latest.
              </p>
            </div>
            <Button variant="outline" onClick={() => openExternal(links.linkedin)}>
              <Linkedin className="h-4 w-4" />
              Check my LinkedIn
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
