import { contact, personal, resume, socials } from "@/content/portfolio";

/** Smoothly scroll to a section id (used by navbar + command palette). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Open the resume in a new tab AND trigger a download. */
export function openResume() {
  // No-op until a resume actually exists for Isabelle.
  if (!resume.available) return;
  // open in a new tab
  window.open(resume.file, "_blank", "noopener,noreferrer");
  // also trigger a download
  const a = document.createElement("a");
  a.href = resume.file;
  a.download = "Isabelle-Grace-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export const links = {
  linkedin: socials.linkedin,
  instagram: socials.instagram,
  project: socials.projectUrl,
  mailto: `mailto:${personal.email}`,
  scheduleMailto: `mailto:${personal.email}?subject=${encodeURIComponent(
    "Let's schedule a call"
  )}&body=${encodeURIComponent(
    "Hi Isabelle,\n\nI'd love to schedule a call to discuss an opportunity.\n\nProposed times:\n- \n\nBest,\n"
  )}`,
  // Uses the Calendly/booking URL from content if set, otherwise a prefilled email.
  schedule: contact.bookingUrl ?? "",
};

// Resolve the best "schedule a call" target.
export const scheduleLink = contact.bookingUrl ?? links.scheduleMailto;
