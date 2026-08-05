import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/content/blog";
import { BlogGrid } from "@/components/blog/blog-grid";
import { site } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `Blog & Insights | ${site.metaTitle}`,
  description:
    "Notes from training at Bintulu Port, MyNext ambassador sessions, and building a career in people operations.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: `Blog & Insights | ${site.metaTitle}`,
    description:
      "Notes from training at Bintulu Port, MyNext ambassador sessions, and building a career in people operations.",
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
          Notes from training at Bintulu Port, co-hosting MyNext ambassador
          sessions, and figuring out a career in people operations. Honest and
          practical.
        </p>
      </div>

      <BlogGrid posts={blogPosts} />
    </main>
  );
}
