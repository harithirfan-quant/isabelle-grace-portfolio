"use client";

import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Mail,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personal, resume } from "@/content/portfolio";
import { links, openExternal, openResume, scrollToSection } from "@/lib/actions";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight">
              <span className="h-3 w-3 bg-accent" aria-hidden />
              {personal.preferredName}
            </p>
            <p className="mt-3 max-w-xs font-mono text-xs leading-relaxed text-muted-foreground">
              {personal.title}
            </p>
          </div>

          <div>
            <p className="eyebrow text-muted-foreground">Elsewhere</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="LinkedIn"
                onClick={() => openExternal(links.linkedin)}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Instagram"
                onClick={() => openExternal(links.instagram)}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Email"
                onClick={() => openExternal(links.mailto)}
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="md:text-right">
            <p className="eyebrow text-muted-foreground">Site</p>
            <div className="mt-4 flex flex-col gap-2 md:items-end">
              <Link
                href="/blog"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
              {resume.available && (
                <button
                  onClick={openResume}
                  className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:underline"
                >
                  Resume, updated {resume.lastUpdated}
                </button>
              )}
              <Button
                variant="outline"
                size="icon"
                aria-label="Back to top"
                className="md:mt-1"
                onClick={() => scrollToSection("hero")}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t-2 border-foreground/15 pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {personal.fullName}
          </p>
          {resume.available && <p>Resume updated {resume.lastUpdated}</p>}
        </div>
      </div>
    </footer>
  );
}
