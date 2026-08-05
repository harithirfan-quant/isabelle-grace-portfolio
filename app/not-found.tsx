"use client";

import Link from "next/link";
import { Home, Linkedin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socials } from "@/content/portfolio";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-8xl font-bold tracking-tight">
          404<span className="text-accent">.</span>
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold">
          This page took an early exit
        </h1>
        <p className="mt-3 text-muted-foreground">
          Even the best portfolios have a few dead links. Let&apos;s get you
          back to something worthwhile.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="default" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Back Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              Visit LinkedIn
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#about">
              <Compass className="h-4 w-4" />
              Explore the site
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
