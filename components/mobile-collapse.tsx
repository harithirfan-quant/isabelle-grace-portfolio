"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

/**
 * Collapses a long list behind one button on phones.
 *
 * The same sections that are fine inside a scrolling desktop window turn into
 * a multi-thousand-pixel scroll on a 390px screen. Rather than hiding content
 * or rewriting the sections, this wraps them: on a phone a visitor meets the
 * heading and a count, then opens what they want.
 *
 * Above 900px the wrapper is inert. CSS hides the toggle and the children
 * always render, so the desktop layout is exactly what it was.
 *
 * Collapsed by default on both server and client, so there is no hydration
 * mismatch and no layout shift for someone who never taps it.
 */
export function MobileCollapse({
  count,
  noun,
  children,
}: {
  count: number;
  noun: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="mobile-collapse" data-open={open ? "true" : "false"}>
      <div className="mobile-collapse-body">{children}</div>
      <button
        type="button"
        className="mobile-collapse-toggle mt-5 w-full items-center justify-center gap-2 border-2 border-foreground bg-background px-4 py-3 font-mono text-xs font-semibold uppercase tracking-widest shadow-hard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? `Hide ${noun}` : `Show all ${count} ${noun}`}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
    </div>
  );
}
