"use client";

import * as React from "react";
import { InDeskWindowContext } from "@/components/desktop/scroll-root";
import { personal } from "@/content/portfolio";

/**
 * The desktop shell for the homepage.
 *
 * Layout: a menubar strip on top, one window in the middle that does its own
 * scrolling, and a dock along the bottom that jumps between sections.
 *
 * Deliberate compromises against the reference site:
 *  - Exactly ONE window, so a recruiter never has to hunt through icons for
 *    the experience section.
 *  - On phones the fixed viewport is abandoned entirely (see globals.css):
 *    the window grows and the page scrolls like a normal site.
 *  - The three traffic lights are real: close collapses the window to a
 *    reopen card, minimise docks it, maximise widens it.
 */

type DockItem = { id: string; label: string; icon: React.ReactNode };

const iconClass = "h-6 w-6";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const DOCK: DockItem[] = [
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} {...stroke} aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} {...stroke} aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Work",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} {...stroke} aria-hidden>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    id: "certifications",
    label: "Proof",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} {...stroke} aria-hidden>
        <circle cx="12" cy="9" r="5" />
        <path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Say hi",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} {...stroke} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </svg>
    ),
  },
];

const isSmallScreen = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function DeskShell({ children }: { children: React.ReactNode }) {
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const [closed, setClosed] = React.useState(false);
  const [minimised, setMinimised] = React.useState(false);
  const [maximised, setMaximised] = React.useState(false);
  const [active, setActive] = React.useState("about");
  const [clock, setClock] = React.useState("");
  const [today, setToday] = React.useState("");

  /* Live menubar clock */
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
      setToday(d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" }));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  /* Jump to a section: inside the window on desktop, on the page on phones */
  const jump = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const behaviour: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    const scroller = bodyRef.current;
    setClosed(false);
    setMinimised(false);
    setActive(id);

    if (isSmallScreen() || !scroller) {
      const top = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: behaviour });
      return;
    }
    const top =
      el.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      12;
    scroller.scrollTo({ top, behavior: behaviour });
  }, []);

  /* Keep the dock's lit dot on whichever section is at the top of the window */
  React.useEffect(() => {
    const ids = DOCK.map((d) => d.id);
    const onScroll = () => {
      const small = isSmallScreen();
      const scroller = bodyRef.current;
      const anchorY = small
        ? 140
        : scroller
          ? scroller.getBoundingClientRect().top + 56
          : 56;
      let best: string | null = null;
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        // Nearest section ABOVE the anchor, not the last one in DOCK order:
        // on pages where the dock order and the document order differ the
        // dock order would light the wrong tile.
        const top = el.getBoundingClientRect().top;
        if (top <= anchorY && top > bestTop) {
          bestTop = top;
          best = id;
        }
      }
      if (best) setActive(best);
    };
    const target: HTMLElement | Window = isSmallScreen() ? window : (bodyRef.current ?? window);
    target.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  const windowHidden = closed || minimised;

  return (
    <div className="desk-field mobile-shell flex h-[100dvh] flex-col max-[900px]:h-auto max-[900px]:min-h-[100svh]">
      {/* ---------------- menubar ---------------- */}
      <div className="mobile-menubar relative z-40 flex shrink-0 items-center gap-4 border-b-2 border-foreground bg-white/90 px-4 py-1.5 text-[0.8rem] font-semibold backdrop-blur">
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full border-[1.5px] border-foreground bg-accent"
          aria-hidden
        />
        <span className="font-display tracking-tight">{personal.fullName}</span>
        <nav className="hidden items-center gap-4 text-foreground/70 md:flex" aria-label="Sections">
          {DOCK.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => jump(d.id)}
              className="-my-3 rounded-sm px-1 py-3 transition-colors hover:text-accent lg:my-0 lg:py-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {d.label}
            </button>
          ))}
        </nav>
        <span className="ml-auto flex items-center gap-3 font-mono text-[0.7rem] tracking-wide">
          <span className="hidden sm:inline">{today}</span>
          <span className="tabular-nums">{clock || "--:--:--"}</span>
        </span>
      </div>

      {/* ---------------- desk ---------------- */}
      <div className="relative flex min-h-0 flex-1 flex-col items-center px-4 pt-6 pb-28 max-[900px]:pb-24">
        <div
          className={`desk-window flex flex-col overflow-hidden rounded-2xl border-2 border-foreground bg-background shadow-[0_30px_70px_-20px_rgb(120_20_70/0.42)] transition-all duration-300 ${
            maximised ? "w-[min(1320px,100%)]" : "w-[min(1060px,100%)]"
          } h-full max-[900px]:h-auto ${
            closed
              ? "pointer-events-none scale-95 opacity-0"
              : minimised
                ? "pointer-events-none translate-y-[calc(100%-8px)] scale-[0.32] opacity-0"
                : "opacity-100"
          }`}
        >
          {/* titlebar with working traffic lights */}
          <div className="flex shrink-0 items-center gap-3 border-b-2 border-foreground bg-secondary px-3 py-2">
            <span className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setClosed(true)}
                aria-label="Close the portfolio window"
                className="h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground bg-accent transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-[900px]:hidden"
              />
              {/* Phones: closing the whole site from a 14px dot was a trap, so the
                  dot stays as decoration only, like its two neighbours. */}
              <span aria-hidden className="hidden h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground bg-accent max-[900px]:block" />
              <button
                type="button"
                onClick={() => setMinimised(true)}
                aria-label="Minimise the window"
                className="h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground bg-[#FFC64B] transition-transform hover:scale-110 max-[900px]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
              <button
                type="button"
                onClick={() => setMaximised((v) => !v)}
                aria-label={maximised ? "Restore window size" : "Maximise window"}
                className="h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground bg-[#4CD07D] transition-transform hover:scale-110 max-[900px]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
            </span>
            <p className="mx-auto font-mono text-[0.7rem] font-semibold tracking-wide">
              {personal.fullName}{" "}
              <span className="text-muted-foreground">· portfolio</span>
            </p>
          </div>

          {/* The scroller. Everything inside renders with the desk-window
              flag set, so Reveal stops gating content behind an
              IntersectionObserver that cannot fire reliably in here. */}
          <div ref={bodyRef} className="desk-body min-h-0 flex-1">
            <InDeskWindowContext.Provider value={true}>
              {children}
            </InDeskWindowContext.Provider>
          </div>
        </div>

        {/* reopen card (window closed) */}
        {closed ? (
          <button
            type="button"
            onClick={() => setClosed(false)}
            className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-foreground bg-white/95 px-6 py-5 text-center shadow-[6px_7px_0_0_hsl(var(--foreground))] transition-transform hover:-translate-y-[calc(50%+3px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="block font-display text-xl font-bold">Reopen portfolio</span>
            <span className="mt-1 block font-hand text-lg text-accent">
              window closed, click to bring it back
            </span>
          </button>
        ) : null}

        {/* ---------------- dock ---------------- */}
        <div className="mobile-dock absolute bottom-0 left-0 right-0 flex justify-center px-3 pb-3 max-[900px]:fixed max-[900px]:z-40">
          <div
            className="mobile-dock-row no-scrollbar flex max-w-full gap-2.5 overflow-x-auto rounded-2xl border-2 border-foreground bg-white/90 p-2.5 shadow-[6px_7px_0_0_hsl(var(--foreground))] backdrop-blur"
            role="toolbar"
            aria-label="Jump to a section"
          >
            {DOCK.map((d) => (
              <button
                key={d.id}
                type="button"
                data-label={d.label}
                onClick={() => jump(d.id)}
                aria-current={active === d.id ? "true" : undefined}
                className={`desk-tile relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  active === d.id ? "bg-secondary" : "bg-background"
                }`}
              >
                {d.icon}
                {/* Phones only: the desktop tooltip never fires on touch, so
                    the tile carries its own label under the icon. */}
                <span className="desk-tile-label" aria-hidden>
                  {d.label}
                </span>
                <span
                  className={`desk-tile-dot absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground transition-opacity ${
                    active === d.id ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* window minimised: a click anywhere in the dock restores it */}
      {windowHidden && !closed ? (
        <button
          type="button"
          onClick={() => setMinimised(false)}
          className="sr-only"
        >
          Restore the window
        </button>
      ) : null}
    </div>
  );
}
