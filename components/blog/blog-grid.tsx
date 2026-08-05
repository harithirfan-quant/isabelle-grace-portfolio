"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/content/blog";

const CATEGORY_COLORS: Record<
  BlogPost["category"],
  "accent" | "default" | "outline" | "mono"
> = {
  Strategy: "accent",
  Leadership: "default",
  "Lessons Learned": "mono",
  Career: "outline",
};

function BlogCard({
  post,
  index,
  large = false,
}: {
  post: BlogPost;
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex h-full flex-col overflow-hidden border-2 border-foreground/15 bg-card transition-all hover:border-foreground hover:shadow-hard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${large ? "min-h-[320px]" : ""}`}
      >
        {/* Decorative top strip */}
        <div className="h-1.5 w-full bg-accent" />

        <div className="flex flex-1 flex-col p-6">
          {/* Category + read time */}
          <div className="mb-4 flex items-center gap-2">
            <Badge variant={CATEGORY_COLORS[post.category]}>
              {post.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h2
            className={`font-bold tracking-tight text-foreground/90 transition-colors group-hover:text-accent ${large ? "text-2xl leading-snug sm:text-3xl" : "text-lg leading-snug"}`}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p
            className={`mt-3 flex-1 text-muted-foreground ${large ? "text-base leading-relaxed" : "text-sm leading-relaxed line-clamp-3"}`}
          >
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              Read more
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const CATEGORY_OPTIONS = ["All", "Strategy", "Leadership", "Lessons Learned", "Career"] as const;
type CategoryFilter = (typeof CATEGORY_OPTIONS)[number];

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = React.useState<CategoryFilter>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`border-2 px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
              active === cat
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-inspired grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          No posts in this category yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => {
            // First post is wide (spans 2 cols on lg) if All filter active
            const isHero = i === 0 && active === "All";
            return (
              <div
                key={post.slug}
                className={isHero ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <BlogCard post={post} index={i} large={isHero} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
