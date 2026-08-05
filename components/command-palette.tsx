"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  User,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  FolderGit2,
  Sparkles,
  Newspaper,
  Mail,
  Download,
  Linkedin,
  Instagram,
  MoonStar,
  Lightbulb,
  Megaphone,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { navItems, resume } from "@/content/portfolio";
import { links, openExternal, openResume, scrollToSection } from "@/lib/actions";

const sectionIcons: Record<string, React.ElementType> = {
  about: User,
  spotlight: Lightbulb,
  ambassador: Megaphone,
  experience: Briefcase,
  highlights: Sparkles,
  education: GraduationCap,
  certifications: BadgeCheck,
  press: Newspaper,
  projects: FolderGit2,
  contact: Mail,
};

/** Dispatch this event anywhere to open the palette (used by the navbar hint). */
export const OPEN_COMMAND_EVENT = "open-command-palette";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openEvt = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener(OPEN_COMMAND_EVENT, openEvt);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener(OPEN_COMMAND_EVENT, openEvt);
    };
  }, []);

  const run = React.useCallback((fn: () => void) => {
    setOpen(false);
    // let the dialog close before scrolling/opening
    setTimeout(fn, 80);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {navItems.map((item, i) => {
            const Icon = sectionIcons[item.id] ?? User;
            return (
              <CommandItem
                key={item.id}
                value={`Go to ${item.label}`}
                onSelect={() => run(() => scrollToSection(item.id))}
              >
                <Icon />
                <span>Go to {item.label}</span>
                <CommandShortcut>⌘{i + 1}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandGroup heading="Actions">
          {resume.available && (
            <CommandItem
              value="Download Latest Resume"
              onSelect={() => run(openResume)}
            >
              <Download />
              <span>Download Latest Resume</span>
            </CommandItem>
          )}
          <CommandItem
            value="Connect on LinkedIn"
            onSelect={() => run(() => openExternal(links.linkedin))}
          >
            <Linkedin />
            <span>Connect on LinkedIn</span>
          </CommandItem>
          <CommandItem
            value="Follow on Instagram"
            onSelect={() => run(() => openExternal(links.instagram))}
          >
            <Instagram />
            <span>Follow on Instagram</span>
          </CommandItem>
          <CommandItem
            value="Send Email"
            onSelect={() => run(() => openExternal(links.mailto))}
          >
            <Mail />
            <span>Send Email</span>
          </CommandItem>
          <CommandItem
            value="Toggle Dark Mode"
            onSelect={() =>
              run(() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              )
            }
          >
            <MoonStar />
            <span>Toggle Dark Mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
