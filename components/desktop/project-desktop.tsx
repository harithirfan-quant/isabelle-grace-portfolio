"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { projects } from "@/content/portfolio";

/**
 * Project icons on the pink desktop, and the windows they open.
 *
 * Like a real PC: double-click an icon (or press Enter on it, or tap it on a
 * touch screen) and the project opens in its own window on top of the
 * portfolio, with the live site loading inside. Windows can be dragged by
 * the title bar, maximised with the green dot and closed with the red one
 * or Escape.
 *
 * Desktop only: the icons need the wallpaper strip beside the portfolio window,
 * which only exists on wide screens (see `.desk-icons` in globals.css).
 * Phones keep the Projects section inside the page. Only projects with a
 * live site get an icon (a talk or event card has nothing to open).
 *
 * Some sites refuse to be shown inside another site. /api/frame-check reads
 * the site's headers first; if it refuses, the window shows the screenshot
 * and an "Open in new tab" button instead of the browser's error page.
 */

type Project = (typeof projects)[number];

const webProjects = projects.filter((p) => p.url && p.image);

export type ProjectDesktopState = {
  /** Open project windows, in the order they were opened (sets position). */
  open: string[];
  /** The same windows, back to front (sets stacking). */
  stack: string[];
  /** Which window is in front: a project title, or "main". */
  front: string;
};

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/* ------------------------------------------------------------------ icons */

function DesktopIcon({
  project,
  selected,
  onSelect,
  onOpen,
}: {
  project: Project;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        onSelect();
        // Touch screens have no double-click, so a tap opens straight away.
        if ((e.nativeEvent as PointerEvent).pointerType === "touch") onOpen();
      }}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
      aria-label={`Open ${project.title} (${host(project.url)}) in a window`}
      title="Double-click to open"
      className="group flex w-24 flex-col items-center gap-1.5 rounded-md p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {/* A tiny browser window holding the site's screenshot */}
      <span
        className={`block w-16 overflow-hidden rounded-xl border-2 border-foreground bg-white shadow-[0_10px_22px_-8px_rgb(120_20_70/0.45)] transition-transform group-hover:-translate-y-0.5 ${
          selected ? "ring-2 ring-white ring-offset-2 ring-offset-[#ffb3d4]" : ""
        }`}
      >
        <span className="flex gap-[3px] border-b-2 border-foreground bg-secondary px-1.5 py-1" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFC64B]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#4CD07D]" />
        </span>
        <span className="relative block h-11 w-full bg-secondary">
          {project.image && (
            <Image
              src={project.image}
              alt=""
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          )}
        </span>
      </span>
      <span
        className={`max-w-full rounded-full px-2 py-0.5 text-center text-[0.75rem] font-semibold leading-tight ${
          selected ? "bg-accent text-white" : "bg-white/85 text-foreground"
        }`}
      >
        {project.title}
      </span>
    </button>
  );
}

export function DesktopIcons({
  onOpen,
}: {
  onOpen: (title: string) => void;
}) {
  const [selected, setSelected] = React.useState<string | null>(null);

  // Clicking the empty desktop clears the selection, like a real desktop.
  React.useEffect(() => {
    if (!selected) return;
    const clear = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest?.(".desk-icons")) setSelected(null);
    };
    window.addEventListener("pointerdown", clear);
    return () => window.removeEventListener("pointerdown", clear);
  }, [selected]);

  return (
    <nav
      aria-label="Project shortcuts"
      className="desk-icons absolute left-5 top-6 z-0 flex-col gap-4"
    >
      {webProjects.map((p) => (
        <DesktopIcon
          key={p.title}
          project={p}
          selected={selected === p.title}
          onSelect={() => setSelected(p.title)}
          onOpen={() => onOpen(p.title)}
        />
      ))}
    </nav>
  );
}

/* ---------------------------------------------------------------- windows */

function ProjectWindow({
  project,
  stackIndex,
  zIndex,
  onFocus,
  onClose,
}: {
  project: Project;
  stackIndex: number;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
}) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [maximised, setMaximised] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  // null while checking or if the check failed (then the iframe is tried)
  const [embeddable, setEmbeddable] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`/api/frame-check?title=${encodeURIComponent(project.title)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.embeddable === "boolean") setEmbeddable(d.embeddable);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [project.title]);
  const drag = React.useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  // Move focus into the window when it opens, for keyboard users.
  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    onFocus();
    if (maximised || (e.target as HTMLElement).closest("button, a")) return;
    drag.current = { px: e.clientX, py: e.clientY, x: offset.x, y: offset.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    // Never let the title bar leave the top of the desk, so it can always be
    // grabbed again.
    const y = Math.max(d.y + e.clientY - d.py, -(24 + stackIndex * 28));
    setOffset({ x: d.x + e.clientX - d.px, y });
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const cascade = stackIndex * 28;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-label={`${project.title}, ${host(project.url)}`}
      tabIndex={-1}
      onPointerDownCapture={onFocus}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      style={
        maximised
          ? { zIndex }
          : {
              zIndex,
              top: 24 + cascade,
              left: `calc(50% - min(490px, 46vw) + ${cascade}px)`,
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }
      }
      className={`project-window absolute flex flex-col overflow-hidden rounded-2xl border-2 border-foreground bg-background shadow-[0_30px_70px_-20px_rgb(120_20_70/0.42)] outline-none ${
        maximised
          ? "inset-x-2 bottom-24 top-2"
          : "h-[calc(100%-8.5rem)] w-[min(980px,92vw)]"
      }`}
    >
      {/* title bar: drag handle + traffic lights + address */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button, a")) setMaximised((v) => !v);
        }}
        className={`flex shrink-0 select-none items-center gap-3 border-b-2 border-foreground bg-secondary px-3 py-2 ${
          maximised ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <span className="flex gap-1.5">
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${project.title}`}
            className="h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground bg-accent transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {/* Minimise closes too: there is no taskbar to minimise it into. */}
          <button
            type="button"
            onClick={onClose}
            aria-label={`Minimise ${project.title}`}
            className="h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground bg-[#FFC64B] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <button
            type="button"
            onClick={() => setMaximised((v) => !v)}
            aria-label={maximised ? `Restore ${project.title}` : `Maximise ${project.title}`}
            className="h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground bg-[#4CD07D] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </span>
        <p className="mx-auto min-w-0 truncate font-mono text-[0.7rem] font-semibold tracking-wide">
          {project.title} <span className="text-muted-foreground">· {host(project.url)}</span>
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-sm font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-foreground/70 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          New tab
        </a>
      </div>

      {/* The live site. The screenshot sits underneath as the loading state,
          and as the fallback if the site refuses to be embedded. */}
      <div className="relative min-h-0 flex-1 bg-secondary">
        {project.image && (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="980px"
            className="object-cover object-top"
          />
        )}
        {embeddable === false ? (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 p-6">
            <div className="max-w-sm rounded-2xl border-2 border-foreground bg-white p-5 text-center shadow-[0_16px_40px_-14px_rgb(120_20_70/0.45)]">
              <p className="font-display text-lg font-bold">{project.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {host(project.url)} opens in its own tab.
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4" />
                Open {host(project.url)}
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={project.url}
            title={`${project.title} live site`}
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            } ${dragging ? "pointer-events-none" : ""}`}
            data-project={project.title}
          />
        )}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3 ${
            embeddable === false || loaded ? "hidden" : ""
          }`}
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white/95 px-3 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest shadow-[0_8px_20px_-8px_rgb(120_20_70/0.45)] transition-colors hover:text-accent"
          >
            Loading {host(project.url)}
            <span className="text-accent">Open in new tab</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectWindows({
  state,
  onFocus,
  onClose,
}: {
  state: ProjectDesktopState;
  onFocus: (title: string) => void;
  onClose: (title: string) => void;
}) {
  // Clicking inside an iframe never reaches this page, but it does blur it.
  // When focus lands in a project's iframe, bring that window to the front.
  React.useEffect(() => {
    const onBlur = () =>
      window.setTimeout(() => {
        const el = document.activeElement as HTMLElement | null;
        const title = el?.tagName === "IFRAME" ? el.dataset.project : undefined;
        if (title) onFocus(title);
      }, 0);
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [onFocus]);

  return (
    <>
      {state.open.map((title, i) => {
        const project = webProjects.find((p) => p.title === title);
        if (!project) return null;
        return (
          <ProjectWindow
            key={title}
            project={project}
            stackIndex={i}
            // Project windows stack above the portfolio window unless the
            // portfolio window was clicked last.
            zIndex={(state.front === "main" ? 5 : 30) + state.stack.indexOf(title)}
            onFocus={() => onFocus(title)}
            onClose={() => onClose(title)}
          />
        );
      })}
    </>
  );
}
