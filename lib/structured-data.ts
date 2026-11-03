import {
  about,
  certifications,
  education,
  experience,
  personal,
  press,
  projects,
  site,
  socials,
  trophyCase,
} from "@/content/portfolio";
import type { BlogPost } from "@/content/blog";
import type { CaseStudy } from "@/content/case-studies";

/*
 * Structured data (JSON-LD) for search engines and AI assistants.
 * Everything here is read from content/portfolio.ts, so it always matches
 * what the page shows: items still waiting for Isabelle's confirmation are
 * commented out there, so they never reach search either. Edit the
 * content file, never this one.
 */

export const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;

/** "Mar 2026" -> "2026-03-01"; anything else -> undefined. */
export function monthToIso(date: string): string | undefined {
  const m = /^([A-Za-z]{3})[a-z]*\s+(\d{4})$/.exec(date.trim());
  if (!m) return undefined;
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const i = months.indexOf(m[1].toLowerCase());
  return i < 0 ? undefined : `${m[2]}-${String(i + 1).padStart(2, "0")}-01`;
}

/** Drop the "(fluent)" style notes: "English (fluent)" -> "English". */
const languageName = (l: string) => l.replace(/\s*\(.*\)\s*$/, "");

const unique = <T,>(xs: T[]) => Array.from(new Set(xs));

// Roles still running ("to Present") count as affiliations. Finished roles,
// like the Bintulu Port training, are described in llms.txt instead.
const ongoing = experience.filter((e) => /present/i.test(e.dates));

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: personal.fullName,
  alternateName: personal.preferredName,
  url: site.url,
  image: `${site.url}${personal.photo}`,
  email: `mailto:${personal.email}`,
  description: site.metaDescription,
  jobTitle: personal.title.split(" | ")[0],
  affiliation: unique(ongoing.map((e) => e.company)).map((name) => ({ "@type": "Organization", name })),
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  knowsLanguage: personal.languages.map(languageName),
  knowsAbout: unique([...about.skillTags, ...experience.flatMap((e) => e.skills)]),
  award: trophyCase.map((t) => `${t.title} (${t.issuer}, ${t.date})`),
  hasCredential: certifications
    .filter((c) => c.category !== "Competitions")
    .map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      ...(c.url ? { url: c.url } : {}),
    })),
  sameAs: [socials.linkedin, socials.instagram].filter(Boolean),
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profilepage`,
      url: site.url,
      name: site.metaTitle,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: site.url,
      name: `${personal.preferredName} Portfolio`,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    person,
    // Team projects she worked on, as listed on the page
    ...projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      ...(p.url ? { url: p.url } : {}),
      keywords: p.tags.join(", "),
      contributor: { "@id": PERSON_ID },
    })),
    // Coverage that has a link
    ...press
      .filter((p) => p.url)
      .map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        url: p.url,
        publisher: { "@type": "Organization", name: p.outlet },
        about: { "@id": PERSON_ID },
      })),
  ],
};

const self = { "@type": "Person", "@id": PERSON_ID, name: personal.fullName, url: site.url };

export function blogPostJsonLd(post: BlogPost) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    ...(monthToIso(post.date) ? { datePublished: monthToIso(post.date) } : {}),
    articleSection: post.category,
    inLanguage: "en",
    author: self,
    publisher: self,
    image: `${site.url}/opengraph-image`,
  };
}

// Case studies are team projects, so Isabelle is credited as a
// contributor, not the sole author.
export function caseStudyJsonLd(cs: CaseStudy) {
  const url = `${site.url}/case-studies/${cs.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: cs.title,
    description: cs.subtitle,
    url,
    mainEntityOfPage: url,
    articleSection: "Case study",
    keywords: cs.tags.join(", "),
    inLanguage: "en",
    contributor: self,
    publisher: self,
    image: `${site.url}/opengraph-image`,
  };
}

/** JSON for a <script type="application/ld+json">, safe to inline in HTML. */
export const toJsonLdScript = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
