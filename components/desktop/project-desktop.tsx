"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, Trophy } from "lucide-react";
import { projects, wallItems, type WallItem } from "@/content/portfolio";

/**
 * Icons on the pink desktop, and the windows they open.
 *
 * Like a real PC: double-click an icon (or press Enter on it, or tap it on a
 * touch screen) and it opens in its own window on top of the portfolio.
 *  - A project icon opens the live site inside the window. Only projects
 *    with a live site get one (a talk or event card has nothing to open).
 *  - The Achievements folder opens a folder window with every card from the
 *    Pinned up wall (`wallItems` in content/portfolio.ts); double-click one
 *    to open its photo in a window of its own.
 * Windows drag by the title bar, maximise with the green dot (or a double-
 * click on the title bar), close with the red dot or Escape, and stack: the
 * last one clicked comes to the front, portfolio window included.
 *
 * Desktop only: the icons need the wallpaper strip beside the portfolio window,
 * which only exists on wide screens (see `.desk-icons` in globals.css).
 * Phones keep the Projects section and the wall inside the page.
 *
 * Some sites refuse to be shown inside another site. /api/frame-check reads
 * the site's headers first; if it refuses, the window shows the screenshot
 * and an "Open" button instead of the browser's error page.
 */

type Project = (typeof projects)[number];

const webProjects = projects.filter((p) => p.url && p.image);

/** Window ids: "project:<title>", "folder:achievements", "award:<wall id>". */
export type DeskWindowsState = {
  /** Open windows, in the order they were opened (sets position). */
  open: string[];
  /** The same windows, back to front (sets stacking). */
  stack: string[];
  /** Which window is in front: a window id, or "main". */
  front: string;
};

const FOLDER_ID = "folder:achievements";
const FOLDER_FILL = "#FF9EC4";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Single click selects, double-click / Enter / a touch tap opens. */
function openHandlers(onSelect: () => void, onOpen: () => void) {
  return {
    onClick: (e: React.MouseEvent) => {
      onSelect();
      // Touch screens have no double-click, so a tap opens straight away.
      if ((e.nativeEvent as PointerEvent).pointerType === "touch") onOpen();
    },
    onDoubleClick: onOpen,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter") onOpen();
    },
  };
}

/* ------------------------------------------------------------------ icons */

function IconLabel({ text, selected }: { text: string; selected: boolean }) {
  return (
    <span
      className={`max-w-full rounded-full px-2 py-0.5 text-center text-[0.75rem] font-semibold leading-tight ${
        selected ? "bg-accent text-white" : "bg-white/85 text-foreground"
      }`}
    >
      {text}
    </span>
  );
}

const iconButton =
  "group flex w-24 flex-col items-center gap-1.5 rounded-md p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const selectedRing = "ring-2 ring-white ring-offset-2 ring-offset-[#ffb3d4]";

function ProjectIcon({
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
      {...openHandlers(onSelect, onOpen)}
      aria-label={`Open ${project.title} (${host(project.url)}) in a window`}
      title="Double-click to open"
      className={iconButton}
    >
      {/* A tiny browser window holding the site's screenshot */}
      <span
        className={`block w-16 overflow-hidden rounded-xl border-2 border-foreground bg-white shadow-[0_10px_22px_-8px_rgb(120_20_70/0.45)] transition-transform group-hover:-translate-y-0.5 ${
          selected ? selectedRing : ""
        }`}
      >
        <span className="flex gap-[3px] border-b-2 border-foreground bg-secondary px-1.5 py-1" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFC64B]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#4CD07D]" />
        </span>
        <span className="relative block h-11 w-full bg-secondary">
          {project.image && (
            <Image src={project.image} alt="" fill sizes="64px" className="object-cover object-top" />
          )}
        </span>
      </span>
      <IconLabel text={project.title} selected={selected} />
    </button>
  );
}

function FolderIcon({
  selected,
  onSelect,
  onOpen,
}: {
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      {...openHandlers(onSelect, onOpen)}
      aria-label={`Open the Achievements folder (${wallItems.length} items)`}
      title="Double-click to open"
      className={iconButton}
    >
      <span
        className={`relative block h-14 w-16 transition-transform group-hover:-translate-y-0.5 ${
          selected ? `rounded-lg ${selectedRing}` : ""
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 64 56" className="h-full w-full drop-shadow-[0_8px_10px_rgb(120_20_70/0.35)]">
          <path
            d="M3 10a4 4 0 0 1 4-4h16l6 6h28a4 4 0 0 1 4 4v33a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"
            fill={FOLDER_FILL}
            stroke="hsl(var(--foreground))"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M3 20h58" stroke="hsl(var(--foreground))" strokeWidth="2.5" />
        </svg>
        <Trophy className="absolute left-1/2 top-[58%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-foreground" />
      </span>
      <IconLabel text="Achievements" selected={selected} />
    </button>
  );
}

export function DesktopIcons({ onOpen }: { onOpen: (id: string) => void }) {
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
    <nav aria-label="Desktop shortcuts" className="desk-icons absolute left-5 top-6 z-0 flex-col gap-4">
      {webProjects.map((p) => {
        const id = `project:${p.title}`;
        return (
          <ProjectIcon
            key={id}
            project={p}
            selected={selected === id}
            onSelect={() => setSelected(id)}
            onOpen={() => onOpen(id)}
          />
        );
      })}
      {wallItems.length > 0 && (
        <FolderIcon
          selected={selected === FOLDER_ID}
          onSelect={() => setSelected(FOLDER_ID)}
          onOpen={() => onOpen(FOLDER_ID)}
        />
      )}
    </nav>
  );
}

/* ----------------------------------------------------------- window frame */

const dotClass =
  "h-3.5 w-3.5 rounded-full border-[1.5px] border-foreground transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * The window itself: title bar with traffic lights, dragging, maximising,
 * Escape to close. What goes inside is up to the caller.
 */
function DeskWindow({
  title,
  subtitle,
  label,
  width,
  height,
  stackIndex,
  zIndex,
  onFocus,
  onClose,
  titleAction,
  children,
}: {
  title: string;
  subtitle?: string;
  label: string;
  /** CSS width when not maximised, e.g. 980 (px, capped at 92vw) */
  width: number;
  /** CSS height when not maximised */
  height: string;
  stackIndex: number;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  titleAction?: React.ReactNode;
  children: (state: { dragging: boolean }) => React.ReactNode;
}) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [maximised, setMaximised] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
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
  const half = width / 2;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-label={label}
      tabIndex={-1}
      onPointerDownCapture={onFocus}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      }}
      style={
        maximised
          ? { zIndex }
          : {
              zIndex,
              top: 24 + cascade,
              left: `calc(50% - min(${half}px, 46vw) + ${cascade}px)`,
              width: `min(${width}px, 92vw)`,
              height,
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }
      }
      className={`desk-app-window absolute flex flex-col overflow-hidden rounded-2xl border-2 border-foreground bg-background shadow-[0_30px_70px_-20px_rgb(120_20_70/0.42)] outline-none ${
        maximised ? "inset-x-2 bottom-24 top-2" : ""
      }`}
    >
      {/* title bar: drag handle + traffic lights + title */}
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
          <button type="button" onClick={onClose} aria-label={`Close ${title}`} className={`${dotClass} bg-accent`} />
          {/* Minimise closes too: there is no taskbar to minimise it into. */}
          <button type="button" onClick={onClose} aria-label={`Minimise ${title}`} className={`${dotClass} bg-[#FFC64B]`} />
          <button
            type="button"
            onClick={() => setMaximised((v) => !v)}
            aria-label={maximised ? `Restore ${title}` : `Maximise ${title}`}
            className={`${dotClass} bg-[#4CD07D]`}
          />
        </span>
        <p className="mx-auto min-w-0 truncate font-mono text-[0.7rem] font-semibold tracking-wide">
          {title}
          {subtitle && <span className="text-muted-foreground"> · {subtitle}</span>}
        </p>
        {titleAction ?? <span className="w-[2.6rem] shrink-0" aria-hidden />}
      </div>

      {children({ dragging })}
    </div>
  );
}

const titleLinkClass =
  "inline-flex shrink-0 items-center gap-1 rounded-sm font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-foreground/70 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* ---------------------------------------------------------- window bodies */

function ProjectBody({ project, dragging }: { project: Project; dragging: boolean }) {
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

  // The live site. The screenshot sits underneath as the loading state, and
  // as the fallback if the site refuses to be embedded.
  return (
    <div className="relative min-h-0 flex-1 bg-secondary">
      {project.image && (
        <Image src={project.image} alt="" fill sizes="980px" className="object-cover object-top" />
      )}
      {embeddable === false ? (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 p-6">
          <div className="max-w-sm rounded-2xl border-2 border-foreground bg-white p-5 text-center shadow-[0_16px_40px_-14px_rgb(120_20_70/0.45)]">
            <p className="font-display text-lg font-bold">{project.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{host(project.url)} opens in its own tab.</p>
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
          data-window={`project:${project.title}`}
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
  );
}

function AwardThumb({ item, sizes }: { item: WallItem; sizes: string }) {
  return item.image ? (
    <Image
      src={item.image}
      alt=""
      fill
      sizes={sizes}
      className={item.imageContain ? "object-contain" : "object-cover"}
    />
  ) : (
    <span className="absolute inset-0 flex items-center justify-center text-accent">
      <Trophy className="h-1/3 w-1/3" />
    </span>
  );
}

function FolderBody({ onOpenItem }: { onOpenItem: (id: string) => void }) {
  const [selected, setSelected] = React.useState<string | null>(null);
  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto bg-white p-4">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-3">
          {wallItems.map((item) => {
            const isSel = selected === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  {...openHandlers(
                    () => setSelected(item.id),
                    () => onOpenItem(`award:${item.id}`),
                  )}
                  aria-label={`Open ${item.label}`}
                  title="Double-click to open"
                  className={`flex w-full flex-col items-center gap-2 rounded-md p-2 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isSel ? "bg-secondary" : "hover:bg-secondary/60"
                  }`}
                >
                  <span className="relative block aspect-[4/3] w-full overflow-hidden rounded border-2 border-foreground bg-white">
                    <AwardThumb item={item} sizes="160px" />
                  </span>
                  <span
                    className={`line-clamp-2 rounded px-1 text-xs font-semibold leading-snug ${
                      isSel ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* status bar, like a real file browser */}
      <p className="shrink-0 border-t-2 border-foreground/20 bg-secondary/60 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        {wallItems.length} items · double-click to open
      </p>
    </>
  );
}

function AwardBody({ item }: { item: WallItem }) {
  return (
    <>
      <div className="relative min-h-0 flex-1 bg-foreground/90">
        <AwardThumb item={{ ...item, imageContain: true }} sizes="760px" />
      </div>
      <div className="shrink-0 border-t-2 border-foreground bg-white px-5 py-4">
        <p className="font-display text-lg font-bold leading-tight">{item.label}</p>
        {item.caption && (
          <p className="mt-1 font-mono text-[0.7rem] uppercase leading-relaxed tracking-wider text-muted-foreground">
            {item.caption}
          </p>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------ all windows */

export function DeskWindows({
  state,
  onOpen,
  onFocus,
  onClose,
}: {
  state: DeskWindowsState;
  onOpen: (id: string) => void;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
}) {
  // Clicking inside an iframe never reaches this page, but it does blur it.
  // When focus lands in a project's iframe, bring that window to the front.
  React.useEffect(() => {
    const onBlur = () =>
      window.setTimeout(() => {
        const el = document.activeElement as HTMLElement | null;
        const id = el?.tagName === "IFRAME" ? el.dataset.window : undefined;
        if (id) onFocus(id);
      }, 0);
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [onFocus]);

  return (
    <>
      {state.open.map((id, i) => {
        const common = {
          stackIndex: i,
          // Windows stack above the portfolio window unless the portfolio
          // window was clicked last.
          zIndex: (state.front === "main" ? 5 : 30) + state.stack.indexOf(id),
          onFocus: () => onFocus(id),
          onClose: () => onClose(id),
        };

        if (id.startsWith("project:")) {
          const project = webProjects.find((p) => `project:${p.title}` === id);
          if (!project) return null;
          return (
            <DeskWindow
              key={id}
              {...common}
              title={project.title}
              subtitle={host(project.url)}
              label={`${project.title}, ${host(project.url)}`}
              width={980}
              height="calc(100% - 8.5rem)"
              titleAction={
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={titleLinkClass}>
                  <ExternalLink className="h-3.5 w-3.5" />
                  New tab
                </a>
              }
            >
              {({ dragging }) => <ProjectBody project={project} dragging={dragging} />}
            </DeskWindow>
          );
        }

        if (id === FOLDER_ID) {
          return (
            <DeskWindow
              key={id}
              {...common}
              title="Achievements"
              subtitle={`${wallItems.length} items`}
              label="Achievements folder"
              width={720}
              height="min(520px, calc(100% - 8.5rem))"
            >
              {() => <FolderBody onOpenItem={onOpen} />}
            </DeskWindow>
          );
        }

        if (id.startsWith("award:")) {
          const item = wallItems.find((w) => `award:${w.id}` === id);
          if (!item) return null;
          return (
            <DeskWindow
              key={id}
              {...common}
              title={item.label}
              label={item.label}
              width={760}
              height="calc(100% - 8.5rem)"
              titleAction={
                item.image ? (
                  <a href={item.image} target="_blank" rel="noopener noreferrer" className={titleLinkClass}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    Full size
                  </a>
                ) : undefined
              }
            >
              {() => <AwardBody item={item} />}
            </DeskWindow>
          );
        }

        return null;
      })}
    </>
  );
}
