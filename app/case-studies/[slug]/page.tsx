import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Users, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { caseStudies, getCaseStudy, getRelatedCaseStudies } from "@/content/case-studies";
import { site } from "@/content/portfolio";
import { CaseStudyClient } from "@/components/case-study/case-study-client";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title}, Case Study | Harith Irfan`,
    description: cs.subtitle,
    alternates: { canonical: `${site.url}/case-studies/${cs.slug}` },
    openGraph: {
      title: cs.title,
      description: cs.subtitle,
      url: `${site.url}/case-studies/${cs.slug}`,
      type: "article",
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const related = getRelatedCaseStudies(params.slug);

  return (
    <main className="pb-24 pt-32">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2 text-border">·</span>
          <Link href="/#projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <span className="mx-2 text-border">·</span>
          <span>{cs.title}</span>
        </nav>

        {/* Back */}
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <div className="container mb-16 max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="accent">{cs.category}</Badge>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {cs.timeline}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            {cs.role}
          </span>
        </div>

        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          {cs.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {cs.subtitle}
        </p>

        {/* Tag cloud */}
        <div className="mt-6 flex flex-wrap gap-2">
          {cs.tags.map((tag) => (
            <Badge key={tag} variant="mono">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main content, client component handles scroll spy TOC */}
      <CaseStudyClient cs={cs} />

      {/* Tools */}
      <section className="container mt-16 max-w-4xl">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <Wrench className="h-4 w-4" />
            Tools &amp; Methods
          </h3>
          <div className="flex flex-wrap gap-2">
            {cs.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground/80"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="container mt-12 max-w-4xl">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Related Projects
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/case-studies/${r.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-accent/50 hover:shadow-lg"
              >
                <Badge variant="accent" className="mb-3 w-fit text-[0.65rem]">
                  {r.category}
                </Badge>
                <p className="font-semibold text-foreground/90 group-hover:text-accent transition-colors">
                  {r.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {r.subtitle}
                </p>
                <span className="mt-4 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View case study →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
