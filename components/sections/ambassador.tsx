"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  UserPlus,
  MapPin,
  BadgeCheck,
  ImageIcon,
  Trophy,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ambassador, type AmbassadorMonth } from "@/content/portfolio";

/** A month counts as "filled in" once it has a title or any real numbers. */
function hasData(m: AmbassadorMonth) {
  return Boolean(m.title || m.participants || m.signups || m.location);
}

/** 3000 with approx -> "3,000+". Keeps reported figures honest as a floor. */
function fmt(n: number, approx?: boolean) {
  return `${n.toLocaleString("en-US")}${approx ? "+" : ""}`;
}

function StatBlock({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
}) {
  return (
    <div className="border-2 border-foreground/15 bg-card p-4 text-center">
      <Icon className="mx-auto h-4 w-4 text-accent" />
      <p className="mt-2 font-display text-2xl font-bold tracking-tight">
        {value}
      </p>
      <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function MonthDetail({ m }: { m: AmbassadorMonth }) {
  const gallery = m.photos.filter(Boolean);

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-1">
      <p className="eyebrow text-accent">{m.month}</p>
      <DialogTitle className="mt-3 font-display text-2xl font-bold">
        {m.title || "Details coming soon"}
      </DialogTitle>

      {m.summary && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {m.summary}
        </p>
      )}

      {/* a) participants  b) MyNext sign ups */}
      {(m.participants > 0 || m.signups > 0) && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {m.participants > 0 && (
            <StatBlock
              icon={Users}
              value={fmt(m.participants, m.approx)}
              label="Participants joined"
            />
          )}
          {m.signups > 0 && (
            <StatBlock
              icon={UserPlus}
              value={fmt(m.signups, m.approx)}
              label="MyNext sign ups"
            />
          )}
        </div>
      )}

      {/* d) location  e) position */}
      {(m.location || m.role) && (
        <div className="mt-4 space-y-2">
          {m.location && (
            <p className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-foreground/85">{m.location}</span>
            </p>
          )}
          {m.role && (
            <p className="flex items-start gap-2 text-sm">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-foreground/85">{m.role}</span>
            </p>
          )}
        </div>
      )}

      {/* c) photos from the session */}
      {gallery.length > 0 && (
        <div className="mt-5">
          <p className="eyebrow mb-2 flex items-center gap-1.5 text-muted-foreground">
            <ImageIcon className="h-3.5 w-3.5" />
            From the session
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden border-2 border-foreground/15 bg-muted"
              >
                <Image
                  src={src}
                  alt={`${m.month} session photo`}
                  fill
                  sizes="(max-width: 640px) 45vw, 200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasData(m) && gallery.length === 0 && (
        <p className="mt-5 border-2 border-dashed border-foreground/20 p-4 text-center font-mono text-sm text-muted-foreground">
          This month has not been written up yet.
        </p>
      )}
    </div>
  );
}

export function Ambassador() {
  const scroller = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<AmbassadorMonth | null>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const months = ambassador.months;

  const totals = React.useMemo(() => {
    // If any month reported a floor ("3000++"), the totals are floors too.
    const approx = months.some((m) => m.approx && m.participants > 0);
    return {
      participants: months.reduce((n, m) => n + (m.participants || 0), 0),
      signups: months.reduce((n, m) => n + (m.signups || 0), 0),
      // Only months that actually ran an event, not the in person outreach ones.
      events: months.filter((m) => m.participants > 0).length,
      approx,
    };
  }, [months]);

  const updateArrows = React.useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const slide = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    // Scroll by roughly one card, including its gap.
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="ambassador" className="container scroll-mt-20 py-24">
      <SectionHeading
        index="06"
        eyebrow={ambassador.org}
        title="Campus Ambassador, month by month"
        description={ambassador.blurb}
      />

      {/* Cumulative totals, only once there is something to total */}
      {(totals.participants > 0 || totals.signups > 0) && (
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">
          <StatBlock
            icon={Users}
            value={fmt(totals.participants, totals.approx)}
            label="Total participants"
          />
          <StatBlock
            icon={UserPlus}
            value={fmt(totals.signups, totals.approx)}
            label="Total sign ups"
          />
          <StatBlock icon={Trophy} value={totals.events} label="Events run" />
        </div>
      )}

      {/* Slider */}
      <div className="relative mt-10">
        {/* Arrows */}
        <button
          onClick={() => slide(-1)}
          disabled={atStart}
          aria-label="Previous months"
          className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-foreground bg-background transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => slide(1)}
          disabled={atEnd}
          aria-label="Next months"
          className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-foreground bg-background transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {months.map((m, i) => (
            <motion.button
              key={m.month}
              data-card
              onClick={() => setOpen(m)}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="group w-[240px] shrink-0 snap-start border-2 border-foreground/15 bg-card text-left transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-[260px]"
            >
              {/* Highlight photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                {m.highlight ? (
                  <Image
                    src={m.highlight}
                    alt={`${m.month} highlight`}
                    fill
                    sizes="260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <ImageIcon className="h-7 w-7 text-foreground/30" />
                  </div>
                )}
                <span className="absolute left-0 top-0 bg-foreground px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-background">
                  {m.month}
                </span>
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-sm font-semibold leading-snug text-foreground/90 transition-colors group-hover:text-accent">
                  {m.title || "Coming soon"}
                </p>

                {(m.participants > 0 || m.signups > 0) && (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                    {m.participants > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3 text-accent" />
                        {fmt(m.participants, m.approx)}
                      </span>
                    )}
                    {m.signups > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <UserPlus className="h-3 w-3 text-accent" />
                        {fmt(m.signups, m.approx)}
                      </span>
                    )}
                  </div>
                )}

                <span className="mt-3 block font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Tap for the full month
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="mt-3 text-center font-mono text-xs text-muted-foreground sm:hidden">
          Swipe to see more months
        </p>
      </div>

      {/* Expanded month */}
      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl">
          {open && <MonthDetail m={open} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
