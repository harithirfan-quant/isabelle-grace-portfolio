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
import { blogPosts } from "@/content/blog";
import { publicCaseStudies } from "@/content/case-studies";

/*
 * /llms.txt: a plain summary of this portfolio for AI assistants (ChatGPT,
 * Claude, Perplexity, Gemini and others), following the llms.txt
 * convention. Built from content/portfolio.ts, so it always matches the
 * page; items waiting for Isabelle's confirmation are commented out there
 * and never appear here. Built once at deploy time.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${personal.fullName} (${personal.preferredName})`,
    "",
    `> ${site.metaDescription}`,
    "",
    `${personal.tagline} Based in ${personal.location}. Languages: ${personal.languages.join(", ")}. GPA ${personal.gpa}. ${personal.deansAward}.`,
    "",
    ...about.bio.flatMap((paragraph) => [paragraph, ""]),
    "## Experience",
    "",
    ...experience.flatMap((e) => [
      `### ${e.role}, ${e.company} (${e.dates})`,
      "",
      `${e.type}${e.location ? `, ${e.location}` : ""}. ${e.description}`,
      "",
      `Skills: ${e.skills.join(", ")}.`,
      "",
    ]),
    "## Education",
    "",
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.dates})`),
    "",
    "## Awards and recognition",
    "",
    ...trophyCase.map((t) => `- ${t.title}: ${t.issuer}, ${t.date}`),
    "",
    "## Certifications and programmes",
    "",
    ...certifications.map((c) => `- ${c.title}: ${c.issuer}, ${c.date}${c.url ? ` (${c.url})` : ""}`),
    "",
    "## Team projects",
    "",
    ...projects.map((p) => (p.url ? `- [${p.title}](${p.url}): ${p.description}` : `- ${p.title}: ${p.description}`)),
    "",
    "## Recognition and coverage",
    "",
    ...press.map((p) => (p.url ? `- [${p.outlet}: ${p.title}](${p.url}) (${p.date})` : `- ${p.outlet}: ${p.title} (${p.date})`)),
    "",
    "## Writing",
    "",
    ...blogPosts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`),
    ...publicCaseStudies.map((c) => `- [Case study: ${c.title}](${site.url}/case-studies/${c.slug}): ${c.subtitle}`),
    "",
    "## Skills",
    "",
    `- ${Array.from(new Set([...about.skillTags, ...experience.flatMap((e) => e.skills)])).join(", ")}`,
    `- ${about.skillsSummary}`,
    "",
    "## Contact and profiles",
    "",
    `- Email: ${personal.email}`,
    `- Website: ${site.url}`,
    `- LinkedIn: ${socials.linkedin}`,
    `- Resume (PDF): ${site.url}${personal.cvUrl}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
