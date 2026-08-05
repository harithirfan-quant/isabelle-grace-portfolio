import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/content/blog";
import { site } from "@/content/portfolio";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Harith Irfan`,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 2);

  return (
    <main className="container pb-24 pt-32">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article className="mx-auto max-w-2xl">
        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge variant="accent">{post.category}</Badge>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime} min read
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        {/* Excerpt / lede */}
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground border-l-2 border-accent pl-4">
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-border" />

        {/* Content blocks */}
        <div className="space-y-6 text-[1.05rem] leading-relaxed">
          {post.content.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <p key={i} className="text-foreground/85">
                  {block.content}
                </p>
              );
            }
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="pt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {block.content}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-8 rounded-r-xl border-l-4 border-accent bg-accent/8 py-4 pl-6 pr-4 italic text-foreground/90"
                >
                  {block.content}
                </blockquote>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2 pl-4">
                  {(block.content as string[]).map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-foreground/85"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-2xl">
          <div className="mb-8 h-px w-full bg-border" />
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Continue reading
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/50 hover:shadow-md"
              >
                <div className="min-w-0">
                  <Badge variant="mono" className="mb-2 text-[0.65rem]">
                    {p.category}
                  </Badge>
                  <p className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-accent transition-colors">
                    {p.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.date}</p>
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All posts link */}
      <div className="mx-auto mt-10 max-w-2xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          View all posts
        </Link>
      </div>
    </main>
  );
}
