"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, personal, resume } from "@/content/portfolio";
import { openResume, scrollToSection } from "@/lib/actions";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleNavClick = (id: string) => {
    if (isHome) {
      scrollToSection(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-foreground bg-background">
      <nav className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
        >
          <span className="h-3 w-3 bg-accent" aria-hidden />
          {personal.preferredName}
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems
            .filter((item) => item.primary)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="rounded-[2px] px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          <Link
            href="/blog"
            className={cn(
              "rounded-[2px] px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
              pathname.startsWith("/blog")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            Blog
          </Link>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={openResume}
          >
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Resume</span>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="mb-6 flex items-center gap-2.5 font-display text-xl">
                <span className="h-3 w-3 bg-accent" aria-hidden />
                {personal.preferredName}
              </SheetTitle>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="rounded-[2px] px-3 py-3 text-left font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {item.label}
                    </button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="rounded-[2px] px-3 py-3 text-left font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    Blog
                  </Link>
                </SheetClose>
              </div>
              <div className="mt-6 space-y-3 border-t-2 border-foreground/15 pt-6">
                <Button variant="default" className="w-full" onClick={openResume}>
                  <Download className="h-4 w-4" />
                  Resume
                </Button>
                <p className="text-center font-mono text-xs text-muted-foreground">
                  Updated {resume.lastUpdated}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
