import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/content/blog";
import { BlogGrid } from "@/components/blog/blog-grid";
import { site } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `Blog & Insights | ${site.metaTitle}`,
  description:
    "Reflections on strategy, leadership, and project work from an International Business student at UniMAP.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: "Blog & Insights | Harith Irfan",
    description:
      "Reflections on strategy, leadership, and project work from an International Business student at UniMAP.",
    url: `${site.url}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="container scroll-mt-20 pb-24 pt-32">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="mx-2 text-border">·</span>
        <span>Blog</span>
      </nav>

      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
          Writing
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Blog &amp; Insights
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Reflections on strategy, leadership, and what I&apos;ve learned from running programs,
          competitions, and projects as a business student. Honest and practical.
        </p>
      </div>

      <BlogGrid posts={blogPosts} />
    </main>
  );
}
