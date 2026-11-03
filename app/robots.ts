import type { MetadataRoute } from "next";
import { site } from "@/content/portfolio";

// Search engines and AI assistants are all welcome. The AI crawlers are
// named so the intent is explicit, and so is Bingbot, since Bing's index
// also feeds ChatGPT and Copilot search.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // The API routes are for the page itself (contact form, resume), not for search.
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
