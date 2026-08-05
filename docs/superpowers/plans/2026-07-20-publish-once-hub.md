# Publish-Once Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let Harith publish an achievement, certificate, experience, or job change once from a private `/admin` page on his portfolio, and have it land on the website plus LinkedIn, Instagram, and Threads automatically.

**Architecture:** A password-gated `/admin` client form posts multipart data to `/api/publish`. The route commits the image and a new `content/feed.json` entry to GitHub via the Contents API (Vercel auto-deploys), then fires a Make.com webhook that fans the post out to the three social platforms. Pure logic (slug, captions, validation) lives in small tested modules under `lib/publish/`; the route is thin glue.

**Tech Stack:** Next.js 14 App Router, TypeScript (strict), Tailwind CSS, framer-motion, existing shadcn-style primitives (`Button`, `Badge`), Vitest (added in Task 1), GitHub Contents REST API, Make.com webhook.

## Global Constraints

- **Runtime:** Node.js runtime for `/api/publish` (needs `Buffer` and `crypto`). Do NOT use the edge runtime.
- **Image size cap: 4 MB.** This deliberately overrides the spec's "~8 MB" — Vercel Serverless Functions reject request bodies over 4.5 MB, so 8 MB would fail in production.
- **Accepted image types:** `image/jpeg`, `image/png`, `image/webp` only.
- **Env vars (already set locally and on Vercel, all three environments):** `ADMIN_SECRET`, `GITHUB_TOKEN`, `GITHUB_REPO`, `MAKE_WEBHOOK_URL`. Never commit these; `.env*` is gitignored.
- **Git is the source of truth.** No database. The GitHub commit must succeed before any social fan-out is attempted.
- **Social fan-out is best-effort.** A Make webhook failure must NOT fail the request or roll back the commit.
- **No em dashes or en dashes** in any user-visible copy (site-wide rule established earlier in this project). Use colons or "to".
- **Content style:** every new content file gets `// EDIT THIS:` comments, matching `content/portfolio.ts`.
- **Repo:** `harithirfan-quant/harith-irfan-portfolio`, branch `main`.
- **Production origin:** `https://harith-irfan-portfolio.vercel.app`.

---

## File Structure

**Create:**
- `vitest.config.ts` — test runner config
- `lib/publish/types.ts` — `PostType`, `FeedEntry`, `PublishInput`, `Captions`
- `lib/publish/slug.ts` — `slugify()`, `buildImagePath()`
- `lib/publish/captions.ts` — `draftCaptions()` and per-platform drafters
- `lib/publish/validate.ts` — `validatePublishInput()`
- `lib/publish/github.ts` — `commitImage()`, `appendFeedEntry()`
- `lib/publish/make.ts` — `fireWebhook()`
- `lib/publish/*.test.ts` — unit tests alongside each module
- `content/feed.json` — the published-post feed (seeded from the existing timeline)
- `app/api/publish/route.ts` — `GET` (auth probe) + `POST` (publish)
- `app/admin/page.tsx` — server wrapper, noindex metadata
- `components/admin/publish-form.tsx` — the client form
- `docs/make-scenario-setup.md` — click-by-click Make guide for Harith

**Modify:**
- `package.json` — add vitest dev dep + `test` script
- `content/portfolio.ts` — remove the `timeline` array and `TimelineItem` type (moved to feed)
- `components/sections/timeline.tsx:8` — import from `content/feed.json` instead
- `app/robots.ts` — disallow `/admin`

---

### Task 1: Test harness, shared types, and slug helpers

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `lib/publish/types.ts`
- Create: `lib/publish/slug.ts`
- Test: `lib/publish/slug.test.ts`

**Interfaces:**
- Consumes: nothing (first task)
- Produces:
  - `type PostType = "achievement" | "certificate" | "experience" | "job-change"`
  - `type FeedEntry = { id: string; type: PostType; title: string; org: string; date: string; description: string; image: string; link: string; publishedAt: string }`
  - `type PublishInput = { type: PostType; title: string; org: string; date: string; description: string; link: string }`
  - `type Captions = { linkedin: string; instagram: string; threads: string }`
  - `slugify(input: string): string`
  - `buildImagePath(slug: string, mimeType: string): string`

- [ ] **Step 1: Install Vitest**

```bash
cd "/Users/harithirfan/The Portfolio"
npm install -D vitest@^2.1.8
```

- [ ] **Step 2: Add the test script**

In `package.json`, change the `scripts` block to:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: Create `lib/publish/types.ts`**

```ts
/**
 * Shared types for the publish-once hub.
 * A FeedEntry is what lands in content/feed.json and renders in the
 * Highlights timeline. A PublishInput is what the admin form submits.
 */

export type PostType =
  | "achievement"
  | "certificate"
  | "experience"
  | "job-change";

export const POST_TYPES: PostType[] = [
  "achievement",
  "certificate",
  "experience",
  "job-change",
];

/** One published post, stored in content/feed.json. */
export type FeedEntry = {
  id: string;
  type: PostType;
  title: string;
  org: string;
  date: string;
  description: string;
  /** Site-relative path, e.g. "/achievements/goexplore.jpg". Empty if no image. */
  image: string;
  /** Optional external URL. Empty string when unset. */
  link: string;
  /** ISO 8601 timestamp of when this was published. */
  publishedAt: string;
};

/** The text fields the admin form submits (image is sent separately). */
export type PublishInput = {
  type: PostType;
  title: string;
  org: string;
  date: string;
  description: string;
  link: string;
};

/** Per-platform captions, editable in the form before publishing. */
export type Captions = {
  linkedin: string;
  instagram: string;
  threads: string;
};
```

- [ ] **Step 5: Write the failing test for slug helpers**

Create `lib/publish/slug.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { slugify, buildImagePath } from "./slug";

describe("slugify", () => {
  it("lowercases and hyphenates words", () => {
    expect(slugify("Bank Islam GoExplore")).toBe("bank-islam-goexplore");
  });

  it("strips punctuation and collapses separators", () => {
    expect(slugify("1st Runner Up: The Leaders' Challenge!")).toBe(
      "1st-runner-up-the-leaders-challenge"
    );
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Hello--  ")).toBe("hello");
  });

  it("caps length at 60 characters without a trailing hyphen", () => {
    const result = slugify("a".repeat(80));
    expect(result.length).toBeLessThanOrEqual(60);
    expect(result.endsWith("-")).toBe(false);
  });

  it("falls back to 'post' when nothing survives", () => {
    expect(slugify("!!!")).toBe("post");
  });
});

describe("buildImagePath", () => {
  it("maps jpeg to .jpg under /public/achievements", () => {
    expect(buildImagePath("goexplore", "image/jpeg")).toBe(
      "public/achievements/goexplore.jpg"
    );
  });

  it("maps png and webp to their extensions", () => {
    expect(buildImagePath("cert", "image/png")).toBe(
      "public/achievements/cert.png"
    );
    expect(buildImagePath("cert", "image/webp")).toBe(
      "public/achievements/cert.webp"
    );
  });

  it("throws on an unsupported mime type", () => {
    expect(() => buildImagePath("x", "image/gif")).toThrow(
      "Unsupported image type"
    );
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./slug"`

- [ ] **Step 7: Create `lib/publish/slug.ts`**

```ts
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** URL and filename safe slug: lowercase, hyphenated, max 60 chars. */
export function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return slug || "post";
}

/** Repo path for an uploaded image, e.g. "public/achievements/foo.jpg". */
export function buildImagePath(slug: string, mimeType: string): string {
  const ext = EXTENSIONS[mimeType];
  if (!ext) {
    throw new Error(`Unsupported image type: ${mimeType}`);
  }
  return `public/achievements/${slug}.${ext}`;
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 8 tests in `lib/publish/slug.test.ts`

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/publish/types.ts lib/publish/slug.ts lib/publish/slug.test.ts
git commit -m "feat(publish): add vitest, shared types, and slug helpers"
```

---

### Task 2: Caption drafting

**Files:**
- Create: `lib/publish/captions.ts`
- Test: `lib/publish/captions.test.ts`

**Interfaces:**
- Consumes: `PostType`, `PublishInput`, `Captions` from `lib/publish/types.ts`
- Produces: `draftCaptions(input: PublishInput): Captions`

- [ ] **Step 1: Write the failing test**

Create `lib/publish/captions.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { draftCaptions } from "./captions";
import type { PublishInput } from "./types";

const base: PublishInput = {
  type: "achievement",
  title: "1st Runner Up at the Leaders Challenge",
  org: "Malaysian Leaders of Tomorrow",
  date: "Feb 2026",
  description:
    "Placed 1st Runner Up at the national leadership challenge. The team aligned on a single thesis before dividing any work.",
  link: "",
};

describe("draftCaptions", () => {
  it("returns a caption for each platform", () => {
    const c = draftCaptions(base);
    expect(c.linkedin.length).toBeGreaterThan(0);
    expect(c.instagram.length).toBeGreaterThan(0);
    expect(c.threads.length).toBeGreaterThan(0);
  });

  it("includes the title and org in the LinkedIn caption", () => {
    const c = draftCaptions(base);
    expect(c.linkedin).toContain(base.title);
    expect(c.linkedin).toContain(base.org);
  });

  it("appends the link when one is provided", () => {
    const c = draftCaptions({ ...base, link: "https://example.com/story" });
    expect(c.linkedin).toContain("https://example.com/story");
  });

  it("omits any link line when the link is empty", () => {
    const c = draftCaptions(base);
    expect(c.linkedin).not.toContain("http");
  });

  it("uses job-change phrasing for a job-change post", () => {
    const c = draftCaptions({
      ...base,
      type: "job-change",
      title: "Campus Ambassador",
      org: "MyNext by TalentCorp",
    });
    expect(c.linkedin).toContain("new role");
    expect(c.linkedin).toContain("Campus Ambassador");
  });

  it("uses completion phrasing for a certificate post", () => {
    const c = draftCaptions({
      ...base,
      type: "certificate",
      title: "Google Project Management Certificate",
      org: "Google",
    });
    expect(c.linkedin).toContain("Completed");
  });

  it("adds hashtags to the Instagram caption", () => {
    const c = draftCaptions(base);
    expect(c.instagram).toContain("#");
  });

  it("keeps the Threads caption under 300 characters", () => {
    const c = draftCaptions({
      ...base,
      description: "word ".repeat(200),
    });
    expect(c.threads.length).toBeLessThanOrEqual(300);
  });

  it("contains no em dashes or en dashes", () => {
    const c = draftCaptions(base);
    const all = `${c.linkedin}${c.instagram}${c.threads}`;
    expect(all).not.toContain("—");
    expect(all).not.toContain("–");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./captions"`

- [ ] **Step 3: Create `lib/publish/captions.ts`**

```ts
import type { Captions, PostType, PublishInput } from "./types";

/**
 * EDIT THIS: reword any template below to change the drafted captions.
 * These are starting points only. Every caption is editable in the
 * /admin form before publishing.
 */

const HASHTAGS: Record<PostType, string> = {
  achievement: "#achievement #leadership #growth #student",
  certificate: "#certification #learning #professionaldevelopment",
  experience: "#experience #opportunity #growth",
  "job-change": "#newrole #grateful #career",
};

/** Truncate at a word boundary, adding an ellipsis when cut. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 3);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
}

function linkLine(link: string): string {
  return link ? `\n\n${link}` : "";
}

function draftLinkedIn(input: PublishInput): string {
  const { type, title, org, date, description, link } = input;
  const footer = `\n\n${org} | ${date}${linkLine(link)}`;

  switch (type) {
    case "certificate":
      return `Completed: ${title}\n\n${description}${footer}\n\n${HASHTAGS.certificate}`;
    case "job-change":
      return `I am happy to share that I have started a new role as ${title} at ${org}.\n\n${description}\n\n${date}${linkLine(
        link
      )}\n\n${HASHTAGS["job-change"]}`;
    case "experience":
      return `${title} at ${org}\n\n${description}${footer}\n\n${HASHTAGS.experience}`;
    case "achievement":
    default:
      return `${title}\n\n${description}${footer}\n\n${HASHTAGS.achievement}`;
  }
}

function draftInstagram(input: PublishInput): string {
  const { type, title, org, description, link } = input;
  const emoji =
    type === "certificate"
      ? "📜"
      : type === "job-change"
      ? "🚀"
      : type === "experience"
      ? "✨"
      : "🏆";

  return `${emoji} ${title}\n\n${truncate(description, 400)}\n\n${org}${linkLine(
    link
  )}\n\n${HASHTAGS[type]}`;
}

function draftThreads(input: PublishInput): string {
  const { title, description } = input;
  const head = `${title}: `;
  return truncate(`${head}${description}`, 300);
}

/** Draft a starting caption for each platform from one set of inputs. */
export function draftCaptions(input: PublishInput): Captions {
  return {
    linkedin: draftLinkedIn(input),
    instagram: draftInstagram(input),
    threads: draftThreads(input),
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 9 tests in `lib/publish/captions.test.ts`, 17 total

- [ ] **Step 5: Commit**

```bash
git add lib/publish/captions.ts lib/publish/captions.test.ts
git commit -m "feat(publish): add per-platform caption drafting"
```

---

### Task 3: Input validation

**Files:**
- Create: `lib/publish/validate.ts`
- Test: `lib/publish/validate.test.ts`

**Interfaces:**
- Consumes: `PostType`, `POST_TYPES`, `PublishInput` from `lib/publish/types.ts`
- Produces:
  - `MAX_IMAGE_BYTES: number` (4 MB)
  - `ALLOWED_IMAGE_TYPES: string[]`
  - `type ValidationResult = { ok: true; value: PublishInput } | { ok: false; error: string }`
  - `validatePublishInput(raw: Record<string, unknown>): ValidationResult`
  - `validateImage(size: number, mimeType: string): { ok: true } | { ok: false; error: string }`

- [ ] **Step 1: Write the failing test**

Create `lib/publish/validate.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  validatePublishInput,
  validateImage,
  MAX_IMAGE_BYTES,
} from "./validate";

const valid = {
  type: "achievement",
  title: "Won the thing",
  org: "Some Org",
  date: "Feb 2026",
  description: "A description of the thing that was won.",
  link: "",
};

describe("validatePublishInput", () => {
  it("accepts a well formed input", () => {
    const result = validatePublishInput(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.title).toBe("Won the thing");
  });

  it("trims whitespace from text fields", () => {
    const result = validatePublishInput({ ...valid, title: "  Padded  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.title).toBe("Padded");
  });

  it("rejects a missing title", () => {
    const result = validatePublishInput({ ...valid, title: "   " });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("title");
  });

  it("rejects a missing org", () => {
    const result = validatePublishInput({ ...valid, org: "" });
    expect(result.ok).toBe(false);
  });

  it("rejects an unknown post type", () => {
    const result = validatePublishInput({ ...valid, type: "nonsense" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("type");
  });

  it("rejects a non http link", () => {
    const result = validatePublishInput({
      ...valid,
      link: "javascript:alert(1)",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("link");
  });

  it("accepts an https link", () => {
    const result = validatePublishInput({
      ...valid,
      link: "https://example.com",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects a title longer than 200 characters", () => {
    const result = validatePublishInput({ ...valid, title: "a".repeat(201) });
    expect(result.ok).toBe(false);
  });
});

describe("validateImage", () => {
  it("accepts a jpeg under the size cap", () => {
    expect(validateImage(1000, "image/jpeg").ok).toBe(true);
  });

  it("rejects a file over the size cap", () => {
    const result = validateImage(MAX_IMAGE_BYTES + 1, "image/jpeg");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("4 MB");
  });

  it("rejects a disallowed mime type", () => {
    const result = validateImage(1000, "image/gif");
    expect(result.ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./validate"`

- [ ] **Step 3: Create `lib/publish/validate.ts`**

```ts
import { POST_TYPES, type PostType, type PublishInput } from "./types";

/** 4 MB. Vercel Serverless Functions reject request bodies over 4.5 MB. */
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type ValidationResult =
  | { ok: true; value: PublishInput }
  | { ok: false; error: string };

const MAX_LENGTHS: Record<keyof PublishInput, number> = {
  type: 32,
  title: 200,
  org: 200,
  date: 60,
  description: 2000,
  link: 500,
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validatePublishInput(
  raw: Record<string, unknown>
): ValidationResult {
  const type = str(raw.type);
  if (!POST_TYPES.includes(type as PostType)) {
    return { ok: false, error: `Invalid post type: "${type}"` };
  }

  const value: PublishInput = {
    type: type as PostType,
    title: str(raw.title),
    org: str(raw.org),
    date: str(raw.date),
    description: str(raw.description),
    link: str(raw.link),
  };

  for (const field of ["title", "org", "date", "description"] as const) {
    if (!value[field]) {
      return { ok: false, error: `Missing required field: ${field}` };
    }
    if (value[field].length > MAX_LENGTHS[field]) {
      return {
        ok: false,
        error: `Field ${field} exceeds ${MAX_LENGTHS[field]} characters`,
      };
    }
  }

  if (value.link) {
    if (!/^https?:\/\//i.test(value.link)) {
      return { ok: false, error: "The link must start with http:// or https://" };
    }
    if (value.link.length > MAX_LENGTHS.link) {
      return { ok: false, error: "The link is too long" };
    }
  }

  return { ok: true, value };
}

export function validateImage(
  size: number,
  mimeType: string
): { ok: true } | { ok: false; error: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
    return {
      ok: false,
      error: `Unsupported image type: ${mimeType}. Use JPG, PNG, or WebP.`,
    };
  }
  if (size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "Image is larger than 4 MB. Please compress it." };
  }
  return { ok: true };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 11 tests in `lib/publish/validate.test.ts`, 28 total

- [ ] **Step 5: Commit**

```bash
git add lib/publish/validate.ts lib/publish/validate.test.ts
git commit -m "feat(publish): add publish input and image validation"
```

---

### Task 4: Seed `content/feed.json` and migrate the Highlights timeline

**Files:**
- Create: `content/feed.json`
- Modify: `content/portfolio.ts` (remove the `TimelineItem` type and `timeline` array, lines 557 to 645)
- Modify: `components/sections/timeline.tsx:8`

**Interfaces:**
- Consumes: `FeedEntry` from `lib/publish/types.ts`
- Produces: `content/feed.json` as a `FeedEntry[]`, newest first. Every later task appends to this file.

- [ ] **Step 1: Create `content/feed.json` with the nine existing timeline entries**

```json
[
  {
    "id": "riyi-mentorship",
    "type": "experience",
    "title": "Mentee: RIYI Mentorship Programme",
    "org": "REHDA Institute",
    "date": "Apr 2026",
    "description": "Selected among 60 students nationwide, representing UniMAP among 15 universities in a competitive industry-academia mentorship.",
    "image": "",
    "link": "",
    "publishedAt": "2026-04-01T00:00:00.000Z"
  },
  {
    "id": "leaders-challenge-runner-up",
    "type": "achievement",
    "title": "1st Runner Up: Malaysian Leaders of Tomorrow Challenge",
    "org": "MLTC (National)",
    "date": "Feb 2026",
    "description": "Placed 1st Runner Up at the national-level leadership challenge: covered by The Star, NKF, and UniMAP.",
    "image": "/achievements/leaderschallenge.jpg",
    "link": "",
    "publishedAt": "2026-02-01T00:00:00.000Z"
  },
  {
    "id": "bank-islam-goexplore",
    "type": "experience",
    "title": "Bank Islam GoExplore Program",
    "org": "Bank Islam Malaysia Berhad (BIYA)",
    "date": "2026",
    "description": "Planned and led an immersive industry visit to Bank Islam KL HQ, bringing 20+ faculty students to experience real-world banking operations. Full program report available.",
    "image": "/achievements/goexplore.jpg",
    "link": "",
    "publishedAt": "2026-01-15T00:00:00.000Z"
  },
  {
    "id": "bank-islam-youth-ambassador",
    "type": "experience",
    "title": "Bank Islam Youth Ambassador",
    "org": "Bank Islam Malaysia Berhad",
    "date": "Jan 2026",
    "description": "Appointed as a Youth Ambassador, simplifying complex topics for student audiences and representing the bank on campus throughout the semester.",
    "image": "",
    "link": "",
    "publishedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mkn-creative-video-2026",
    "type": "achievement",
    "title": "1st Place: MKN Creative Video Challenge 2026",
    "org": "Majlis Keselamatan Negara",
    "date": "2026",
    "description": "Won first place with “Benteng Yang Tersirat” in the national security creative video competition.",
    "image": "",
    "link": "",
    "publishedAt": "2026-01-10T00:00:00.000Z"
  },
  {
    "id": "creative-sdg-video-win",
    "type": "achievement",
    "title": "Winner: Creative SDG Video Competition",
    "org": "UniMAP Library and Springer Nature",
    "date": "2026",
    "description": "Awarded for a creative video advancing the UN Sustainable Development Goals.",
    "image": "",
    "link": "",
    "publishedAt": "2026-01-05T00:00:00.000Z"
  },
  {
    "id": "mynext-campus-ambassador",
    "type": "experience",
    "title": "Campus Ambassador",
    "org": "MyNext by TalentCorp",
    "date": "Oct 2025",
    "description": "Led 3+ career development events nationally, driving a 40% increase in student engagement.",
    "image": "",
    "link": "",
    "publishedAt": "2025-10-01T00:00:00.000Z"
  },
  {
    "id": "green-build-challenge-2025",
    "type": "achievement",
    "title": "Winner: International Green Build Challenge 2025",
    "org": "Universiti Malaysia Perlis",
    "date": "Aug 2025",
    "description": "Recognised among top teams in the international green building challenge.",
    "image": "",
    "link": "",
    "publishedAt": "2025-08-01T00:00:00.000Z"
  },
  {
    "id": "future-ready-5",
    "type": "experience",
    "title": "Participant: Future Ready 5.0",
    "org": "Tunku Abdul Rahman Foundation",
    "date": "Jul 2025",
    "description": "Completed an intensive employability and leadership readiness programme.",
    "image": "",
    "link": "",
    "publishedAt": "2025-07-01T00:00:00.000Z"
  }
]
```

- [ ] **Step 2: Remove the timeline block from `content/portfolio.ts`**

Delete the entire section starting at the `KEY ACTIVITIES TIMELINE ("Highlights")` comment block through the closing `];` of the `timeline` array (lines 557 to 645). Replace it with:

```ts
/* ===========================================================================
 * KEY ACTIVITIES TIMELINE ("Highlights")
 * MOVED: this now lives in content/feed.json so the /admin publisher can
 * append to it. Edit that file (or publish from /admin) to change the
 * Highlights section.
 * ======================================================================== */
```

- [ ] **Step 3: Point the timeline component at the feed**

In `components/sections/timeline.tsx`, replace line 8:

```ts
import { timeline } from "@/content/portfolio";
```

with:

```ts
import feed from "@/content/feed.json";
import type { FeedEntry } from "@/lib/publish/types";

const timeline = feed as FeedEntry[];
```

The import must sit with the other imports at the top; the `const` goes directly below the import block, above `export function Timeline()`. No other change to this file: `item.image`, `item.title`, `item.org`, `item.date`, and `item.description` all exist on `FeedEntry`.

- [ ] **Step 4: Verify the build passes and the timeline still renders**

Run: `npm run build`
Expected: `✓ Compiled successfully`, no type errors, `/` still listed in the route table.

If TypeScript complains about importing JSON, confirm `"resolveJsonModule": true` is present in `tsconfig.json` under `compilerOptions` and add it if missing.

- [ ] **Step 5: Verify no other file still imports the old export**

Run: `grep -rn "timeline" content/portfolio.ts components/ app/ --include=*.ts --include=*.tsx | grep -v feed.json`
Expected: only the comment block in `content/portfolio.ts` and the local `const timeline` in `timeline.tsx`. No import of `timeline` from `@/content/portfolio`.

- [ ] **Step 6: Commit**

```bash
git add content/feed.json content/portfolio.ts components/sections/timeline.tsx
git commit -m "refactor(content): move Highlights timeline into content/feed.json"
```

---

### Task 5: GitHub Contents API client

**Files:**
- Create: `lib/publish/github.ts`
- Test: `lib/publish/github.test.ts`

**Interfaces:**
- Consumes: `FeedEntry` from `lib/publish/types.ts`
- Produces:
  - `commitImage(opts: { path: string; base64: string; message: string }): Promise<void>`
  - `appendFeedEntry(entry: FeedEntry, message: string): Promise<void>`

Both read `GITHUB_TOKEN` and `GITHUB_REPO` from `process.env` at call time (not module load, so tests can set them). Both throw an `Error` with a readable message on failure. `appendFeedEntry` retries once on a `409` conflict, which happens when two publishes race.

- [ ] **Step 1: Write the failing test**

Create `lib/publish/github.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { commitImage, appendFeedEntry } from "./github";
import type { FeedEntry } from "./types";

const entry: FeedEntry = {
  id: "test-post",
  type: "achievement",
  title: "Test Post",
  org: "Test Org",
  date: "Jul 2026",
  description: "A test.",
  image: "/achievements/test-post.jpg",
  link: "",
  publishedAt: "2026-07-20T00:00:00.000Z",
};

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

/** Base64 of "[]" is "W10=" — an empty feed. */
const EMPTY_FEED = jsonResponse({ content: "W10=", sha: "abc123" });

beforeEach(() => {
  process.env.GITHUB_TOKEN = "test-token";
  process.env.GITHUB_REPO = "owner/repo";
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("commitImage", () => {
  it("PUTs the file to the contents API", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ content: {} }, 201));
    vi.stubGlobal("fetch", fetchMock);

    await commitImage({
      path: "public/achievements/x.jpg",
      base64: "AAAA",
      message: "add image",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      "https://api.github.com/repos/owner/repo/contents/public/achievements/x.jpg"
    );
    expect(init.method).toBe("PUT");
    expect(JSON.parse(init.body).content).toBe("AAAA");
    expect(init.headers.Authorization).toBe("Bearer test-token");
  });

  it("throws a readable error when GitHub rejects the write", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ message: "Bad credentials" }, 401))
    );

    await expect(
      commitImage({ path: "p", base64: "AAAA", message: "m" })
    ).rejects.toThrow("Bad credentials");
  });

  it("throws when GITHUB_TOKEN is missing", async () => {
    delete process.env.GITHUB_TOKEN;
    await expect(
      commitImage({ path: "p", base64: "AAAA", message: "m" })
    ).rejects.toThrow("GITHUB_TOKEN");
  });
});

describe("appendFeedEntry", () => {
  it("reads the feed, prepends the entry, and writes it back with the sha", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(EMPTY_FEED)
      .mockResolvedValueOnce(jsonResponse({ content: {} }, 200));
    vi.stubGlobal("fetch", fetchMock);

    await appendFeedEntry(entry, "add entry");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const putBody = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(putBody.sha).toBe("abc123");

    const written = JSON.parse(
      Buffer.from(putBody.content, "base64").toString("utf8")
    );
    expect(written).toHaveLength(1);
    expect(written[0].id).toBe("test-post");
  });

  it("puts the newest entry first", async () => {
    const existing = Buffer.from(
      JSON.stringify([{ ...entry, id: "older" }])
    ).toString("base64");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ content: existing, sha: "s1" }))
      .mockResolvedValueOnce(jsonResponse({ content: {} }, 200));
    vi.stubGlobal("fetch", fetchMock);

    await appendFeedEntry(entry, "add entry");

    const putBody = JSON.parse(fetchMock.mock.calls[1][1].body);
    const written = JSON.parse(
      Buffer.from(putBody.content, "base64").toString("utf8")
    );
    expect(written.map((e: FeedEntry) => e.id)).toEqual(["test-post", "older"]);
  });

  it("retries once on a 409 conflict", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(EMPTY_FEED)
      .mockResolvedValueOnce(jsonResponse({ message: "conflict" }, 409))
      .mockResolvedValueOnce(jsonResponse({ content: "W10=", sha: "def456" }))
      .mockResolvedValueOnce(jsonResponse({ content: {} }, 200));
    vi.stubGlobal("fetch", fetchMock);

    await appendFeedEntry(entry, "add entry");

    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(JSON.parse(fetchMock.mock.calls[3][1].body).sha).toBe("def456");
  });

  it("throws when the conflict retry also fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(EMPTY_FEED)
      .mockResolvedValueOnce(jsonResponse({ message: "conflict" }, 409))
      .mockResolvedValueOnce(jsonResponse({ content: "W10=", sha: "def456" }))
      .mockResolvedValueOnce(jsonResponse({ message: "conflict again" }, 409));
    vi.stubGlobal("fetch", fetchMock);

    await expect(appendFeedEntry(entry, "add entry")).rejects.toThrow(
      "conflict again"
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./github"`

- [ ] **Step 3: Create `lib/publish/github.ts`**

```ts
import type { FeedEntry } from "./types";

const API = "https://api.github.com";
const FEED_PATH = "content/feed.json";
const BRANCH = "main";

function config() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token) throw new Error("GITHUB_TOKEN is not configured.");
  if (!repo) throw new Error("GITHUB_REPO is not configured.");
  return { token, repo };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function failure(res: Response): Promise<Error> {
  let detail = `HTTP ${res.status}`;
  try {
    const body = (await res.json()) as { message?: string };
    if (body?.message) detail = body.message;
  } catch {
    // response had no JSON body; keep the status text
  }
  return new Error(`GitHub request failed: ${detail}`);
}

/** Create a new file in the repo. Fails if the path already exists. */
export async function commitImage(opts: {
  path: string;
  base64: string;
  message: string;
}): Promise<void> {
  const { token, repo } = config();
  const res = await fetch(`${API}/repos/${repo}/contents/${opts.path}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify({
      message: opts.message,
      content: opts.base64,
      branch: BRANCH,
    }),
  });
  if (!res.ok) throw await failure(res);
}

async function readFeed(
  repo: string,
  token: string
): Promise<{ entries: FeedEntry[]; sha: string }> {
  const res = await fetch(
    `${API}/repos/${repo}/contents/${FEED_PATH}?ref=${BRANCH}`,
    { headers: headers(token), cache: "no-store" }
  );
  if (!res.ok) throw await failure(res);
  const body = (await res.json()) as { content: string; sha: string };
  const decoded = Buffer.from(body.content, "base64").toString("utf8");
  return { entries: JSON.parse(decoded) as FeedEntry[], sha: body.sha };
}

async function writeFeed(
  repo: string,
  token: string,
  entries: FeedEntry[],
  sha: string,
  message: string
): Promise<Response> {
  const content = Buffer.from(
    `${JSON.stringify(entries, null, 2)}\n`,
    "utf8"
  ).toString("base64");

  return fetch(`${API}/repos/${repo}/contents/${FEED_PATH}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify({ message, content, sha, branch: BRANCH }),
  });
}

/**
 * Prepend an entry to content/feed.json so it appears newest-first.
 * Retries once on a 409, which happens when two publishes race.
 */
export async function appendFeedEntry(
  entry: FeedEntry,
  message: string
): Promise<void> {
  const { token, repo } = config();

  for (let attempt = 0; attempt < 2; attempt++) {
    const { entries, sha } = await readFeed(repo, token);
    const res = await writeFeed(repo, token, [entry, ...entries], sha, message);
    if (res.ok) return;
    if (res.status !== 409 || attempt === 1) throw await failure(res);
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 8 tests in `lib/publish/github.test.ts`, 36 total

- [ ] **Step 5: Commit**

```bash
git add lib/publish/github.ts lib/publish/github.test.ts
git commit -m "feat(publish): add GitHub contents API client with conflict retry"
```

---

### Task 6: Make.com webhook client

**Files:**
- Create: `lib/publish/make.ts`
- Test: `lib/publish/make.test.ts`

**Interfaces:**
- Consumes: `Captions` from `lib/publish/types.ts`
- Produces: `fireWebhook(payload: WebhookPayload): Promise<boolean>` where
  `type WebhookPayload = { title: string; org: string; date: string; type: string; imageUrl: string; link: string; captions: Captions }`

`fireWebhook` never throws. It returns `true` on success and `false` on any failure, so a social outage cannot roll back a successful site publish.

- [ ] **Step 1: Write the failing test**

Create `lib/publish/make.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fireWebhook } from "./make";

const payload = {
  title: "Test",
  org: "Org",
  date: "Jul 2026",
  type: "achievement",
  imageUrl: "https://harith-irfan-portfolio.vercel.app/achievements/test.jpg",
  link: "",
  captions: { linkedin: "li", instagram: "ig", threads: "th" },
};

beforeEach(() => {
  process.env.MAKE_WEBHOOK_URL = "https://hook.example.com/abc";
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fireWebhook", () => {
  it("POSTs the payload as JSON and returns true", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fireWebhook(payload);

    expect(result).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://hook.example.com/abc");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).captions.linkedin).toBe("li");
  });

  it("returns false when the webhook responds with an error status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );
    expect(await fireWebhook(payload)).toBe(false);
  });

  it("returns false instead of throwing when fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    expect(await fireWebhook(payload)).toBe(false);
  });

  it("returns false when MAKE_WEBHOOK_URL is not configured", async () => {
    delete process.env.MAKE_WEBHOOK_URL;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    expect(await fireWebhook(payload)).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "./make"`

- [ ] **Step 3: Create `lib/publish/make.ts`**

```ts
import type { Captions } from "./types";

export type WebhookPayload = {
  title: string;
  org: string;
  date: string;
  type: string;
  /** Absolute production URL of the image, live once Vercel redeploys. */
  imageUrl: string;
  link: string;
  captions: Captions;
};

/**
 * Notify the Make.com scenario that fans the post out to LinkedIn,
 * Instagram, and Threads.
 *
 * Never throws: social fan-out is best-effort and must not roll back a
 * successful site publish. Returns false when the post did not go through.
 */
export async function fireWebhook(payload: WebhookPayload): Promise<boolean> {
  const url = process.env.MAKE_WEBHOOK_URL;
  if (!url) {
    console.error("MAKE_WEBHOOK_URL is not configured; skipping social post.");
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`Make webhook returned HTTP ${res.status}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Make webhook failed:", err);
    return false;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 4 tests in `lib/publish/make.test.ts`, 40 total

- [ ] **Step 5: Commit**

```bash
git add lib/publish/make.ts lib/publish/make.test.ts
git commit -m "feat(publish): add best-effort Make.com webhook client"
```

---

### Task 7: The `/api/publish` route

**Files:**
- Create: `app/api/publish/route.ts`
- Modify: `app/robots.ts`

**Interfaces:**
- Consumes: `slugify`, `buildImagePath` (Task 1); `draftCaptions` (Task 2); `validatePublishInput`, `validateImage` (Task 3); `commitImage`, `appendFeedEntry` (Task 5); `fireWebhook` (Task 6)
- Produces:
  - `GET /api/publish` with header `x-admin-secret` → `200 {ok:true}` or `401 {error}`. Used by the admin page to check the password.
  - `POST /api/publish` multipart form with fields `type`, `title`, `org`, `date`, `description`, `link`, `captionLinkedin`, `captionInstagram`, `captionThreads`, and file field `image` (optional) → `200 {ok:true, id, imagePath, socials:"sent"|"failed"}` or `4xx/5xx {error}`.

- [ ] **Step 1: Create `app/api/publish/route.ts`**

```ts
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { slugify, buildImagePath } from "@/lib/publish/slug";
import { draftCaptions } from "@/lib/publish/captions";
import { validatePublishInput, validateImage } from "@/lib/publish/validate";
import { commitImage, appendFeedEntry } from "@/lib/publish/github";
import { fireWebhook } from "@/lib/publish/make";
import type { FeedEntry } from "@/lib/publish/types";
import { site } from "@/content/portfolio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Constant-time password check so the secret cannot be guessed by timing. */
function authorized(req: Request): boolean {
  const expected = process.env.ADMIN_SECRET;
  const provided = req.headers.get("x-admin-secret");
  if (!expected || !provided) return false;

  const a = Buffer.from(expected);
  const b = Buffer.from(provided);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Password probe for the admin page. */
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Could not read the submitted form." },
      { status: 400 }
    );
  }

  const validation = validatePublishInput({
    type: form.get("type"),
    title: form.get("title"),
    org: form.get("org"),
    date: form.get("date"),
    description: form.get("description"),
    link: form.get("link"),
  });
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const input = validation.value;

  // Captions: use the edited values from the form, falling back to drafts.
  const drafted = draftCaptions(input);
  const captions = {
    linkedin: String(form.get("captionLinkedin") || drafted.linkedin),
    instagram: String(form.get("captionInstagram") || drafted.instagram),
    threads: String(form.get("captionThreads") || drafted.threads),
  };

  const slug = `${slugify(input.title)}-${Date.now().toString(36)}`;

  // 1. Image (optional) goes to the repo first.
  let sitePath = "";
  const file = form.get("image");
  if (file && typeof file === "object" && "arrayBuffer" in file) {
    const upload = file as File;
    const imageCheck = validateImage(upload.size, upload.type);
    if (!imageCheck.ok) {
      return NextResponse.json({ error: imageCheck.error }, { status: 400 });
    }

    const repoPath = buildImagePath(slug, upload.type);
    sitePath = repoPath.replace(/^public/, "");

    try {
      const base64 = Buffer.from(await upload.arrayBuffer()).toString("base64");
      await commitImage({
        path: repoPath,
        base64,
        message: `content: add image for "${input.title}"`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Image upload failed.";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  // 2. Feed entry. If this fails nothing is published; the orphan image is harmless.
  const entry: FeedEntry = {
    id: slug,
    type: input.type,
    title: input.title,
    org: input.org,
    date: input.date,
    description: input.description,
    image: sitePath,
    link: input.link,
    publishedAt: new Date().toISOString(),
  };

  try {
    await appendFeedEntry(entry, `content: publish "${input.title}"`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Publishing failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  // 3. Social fan-out. Best effort: a failure here never fails the request.
  const sent = await fireWebhook({
    title: input.title,
    org: input.org,
    date: input.date,
    type: input.type,
    imageUrl: sitePath ? `${site.url}${sitePath}` : "",
    link: input.link,
    captions,
  });

  return NextResponse.json({
    ok: true,
    id: entry.id,
    imagePath: sitePath,
    socials: sent ? "sent" : "failed",
  });
}
```

- [ ] **Step 2: Keep `/admin` out of search results**

Replace the contents of `app/robots.ts` with:

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: `✓ Compiled successfully`, and `ƒ /api/publish` appears in the route table.

- [ ] **Step 4: Smoke test the auth probe against the dev server**

Start the dev server in one shell: `npm run dev`

In another shell, run all three:

```bash
curl -s -o /dev/null -w "no-secret:%{http_code}\n" http://localhost:3000/api/publish
curl -s -o /dev/null -w "wrong-secret:%{http_code}\n" -H "x-admin-secret: wrong" http://localhost:3000/api/publish
curl -s -o /dev/null -w "right-secret:%{http_code}\n" -H "x-admin-secret: $(grep '^ADMIN_SECRET=' .env.local | cut -d= -f2)" http://localhost:3000/api/publish
```

Expected exactly:
```
no-secret:401
wrong-secret:401
right-secret:200
```

- [ ] **Step 5: Smoke test validation rejection (no live commit)**

```bash
curl -s -X POST http://localhost:3000/api/publish \
  -H "x-admin-secret: $(grep '^ADMIN_SECRET=' .env.local | cut -d= -f2)" \
  -F "type=nonsense" -F "title=T" -F "org=O" -F "date=D" -F "description=X" -F "link="
```

Expected: `{"error":"Invalid post type: \"nonsense\""}` and no commit in the repo.

- [ ] **Step 6: Commit**

```bash
git add app/api/publish/route.ts app/robots.ts
git commit -m "feat(publish): add /api/publish route with constant-time auth"
```

---

### Task 8: The `/admin` publishing page

**Files:**
- Create: `app/admin/page.tsx`
- Create: `components/admin/publish-form.tsx`

**Interfaces:**
- Consumes: `POST_TYPES`, `PostType`, `PublishInput` (Task 1); `draftCaptions` (Task 2); `MAX_IMAGE_BYTES`, `ALLOWED_IMAGE_TYPES` (Task 3); `GET`/`POST /api/publish` (Task 7)
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Create `app/admin/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PublishForm } from "@/components/admin/publish-form";

export const metadata: Metadata = {
  title: "Publish",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="container max-w-2xl pb-24 pt-32">
      <h1 className="text-3xl font-extrabold tracking-tight">Publish</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Post once. It lands on this site, LinkedIn, Instagram, and Threads.
      </p>
      <PublishForm />
    </main>
  );
}
```

- [ ] **Step 2: Create `components/admin/publish-form.tsx`**

```tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Upload, CheckCircle2, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { draftCaptions } from "@/lib/publish/captions";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/publish/validate";
import { POST_TYPES, type PostType, type PublishInput } from "@/lib/publish/types";

const TYPE_LABELS: Record<PostType, string> = {
  achievement: "Achievement",
  certificate: "Certificate",
  experience: "Experience",
  "job-change": "Job change",
};

const EMPTY: PublishInput = {
  type: "achievement",
  title: "",
  org: "",
  date: "",
  description: "",
  link: "",
};

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground/90";

type Status =
  | { kind: "idle" }
  | { kind: "publishing" }
  | { kind: "done"; socials: string }
  | { kind: "error"; message: string };

export function PublishForm() {
  const [secret, setSecret] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(false);
  const [gateError, setGateError] = React.useState("");
  const [checking, setChecking] = React.useState(false);

  const [fields, setFields] = React.useState<PublishInput>(EMPTY);
  const [file, setFile] = React.useState<File | null>(null);
  const [captions, setCaptions] = React.useState(draftCaptions(EMPTY));
  const [captionsEdited, setCaptionsEdited] = React.useState(false);
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  // Restore the session password so a refresh does not lock you out.
  React.useEffect(() => {
    const saved = sessionStorage.getItem("admin-secret");
    if (saved) {
      setSecret(saved);
      setUnlocked(true);
    }
  }, []);

  // Redraft captions as fields change, until the user edits one by hand.
  React.useEffect(() => {
    if (!captionsEdited) setCaptions(draftCaptions(fields));
  }, [fields, captionsEdited]);

  const set = (key: keyof PublishInput) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setGateError("");
    try {
      const res = await fetch("/api/publish", {
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        sessionStorage.setItem("admin-secret", secret);
        setUnlocked(true);
      } else {
        setGateError("That password is not right.");
      }
    } catch {
      setGateError("Could not reach the server.");
    } finally {
      setChecking(false);
    }
  }

  function pickFile(next: File | null) {
    if (!next) return setFile(null);
    if (!ALLOWED_IMAGE_TYPES.includes(next.type)) {
      setStatus({ kind: "error", message: "Use a JPG, PNG, or WebP image." });
      return;
    }
    if (next.size > MAX_IMAGE_BYTES) {
      setStatus({ kind: "error", message: "That image is larger than 4 MB." });
      return;
    }
    setStatus({ kind: "idle" });
    setFile(next);
  }

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "publishing" });

    const body = new FormData();
    (Object.keys(fields) as (keyof PublishInput)[]).forEach((key) =>
      body.append(key, fields[key])
    );
    body.append("captionLinkedin", captions.linkedin);
    body.append("captionInstagram", captions.instagram);
    body.append("captionThreads", captions.threads);
    if (file) body.append("image", file);

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "x-admin-secret": secret },
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? "Publishing failed." });
        return;
      }
      setStatus({ kind: "done", socials: data.socials });
      setFields(EMPTY);
      setFile(null);
      setCaptionsEdited(false);
    } catch {
      setStatus({ kind: "error", message: "Could not reach the server." });
    }
  }

  if (!unlocked) {
    return (
      <form onSubmit={unlock} className="mt-10 max-w-sm">
        <label className={labelClass} htmlFor="secret">
          Admin password
        </label>
        <div className="flex gap-2">
          <input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className={inputClass}
            autoComplete="current-password"
          />
          <Button type="submit" variant="accent" disabled={checking || !secret}>
            {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Unlock
          </Button>
        </div>
        {gateError && (
          <p className="mt-2 text-sm text-destructive">{gateError}</p>
        )}
      </form>
    );
  }

  return (
    <motion.form
      onSubmit={publish}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-10 space-y-6"
    >
      {/* Type */}
      <div>
        <span className={labelClass}>Type</span>
        <div className="flex flex-wrap gap-2">
          {POST_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => set("type")(type)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                fields.type === type
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Image */}
      <div>
        <span className={labelClass}>Photo (optional, max 4 MB)</span>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-4 py-6 transition-colors hover:border-accent/60">
          <Upload className="h-5 w-5 text-accent" />
          <span className="text-sm text-muted-foreground">
            {file ? file.name : "Choose a JPG, PNG, or WebP"}
          </span>
          <input
            type="file"
            accept={ALLOWED_IMAGE_TYPES.join(",")}
            className="hidden"
            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {/* Text fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="title">Title</label>
          <input id="title" className={inputClass} value={fields.title}
            onChange={(e) => set("title")(e.target.value)} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="org">Organisation</label>
          <input id="org" className={inputClass} value={fields.org}
            onChange={(e) => set("org")(e.target.value)} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="date">Date</label>
          <input id="date" className={inputClass} placeholder="Jul 2026"
            value={fields.date} onChange={(e) => set("date")(e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">Description</label>
          <textarea id="description" rows={4} className={inputClass}
            value={fields.description}
            onChange={(e) => set("description")(e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="link">Link (optional)</label>
          <input id="link" className={inputClass} placeholder="https://"
            value={fields.link} onChange={(e) => set("link")(e.target.value)} />
        </div>
      </div>

      {/* Captions */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-semibold">
          Captions
          <span className="ml-2 font-normal text-muted-foreground">
            drafted for you, edit anything
          </span>
        </p>
        {(["linkedin", "instagram", "threads"] as const).map((platform) => (
          <div key={platform}>
            <label className={labelClass} htmlFor={platform}>
              {platform === "linkedin" ? "LinkedIn" : platform === "instagram" ? "Instagram" : "Threads"}
            </label>
            <textarea
              id={platform}
              rows={platform === "threads" ? 2 : 5}
              className={`${inputClass} font-mono text-xs`}
              value={captions[platform]}
              onChange={(e) => {
                setCaptionsEdited(true);
                setCaptions((prev) => ({ ...prev, [platform]: e.target.value }));
              }}
            />
          </div>
        ))}
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full"
        disabled={status.kind === "publishing"}>
        {status.kind === "publishing" ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Publishing...</>
        ) : (
          "Publish everywhere"
        )}
      </Button>

      {status.kind === "done" && (
        <div className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-semibold">Published.</p>
            <p className="mt-1 text-muted-foreground">
              The site updates in about two minutes once Vercel rebuilds.{" "}
              {status.socials === "sent"
                ? "Socials were queued in Make."
                : "Socials did NOT go out: check your Make scenario."}
            </p>
          </div>
        </div>
      )}

      {status.kind === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p>{status.message}</p>
        </div>
      )}
    </motion.form>
  );
}
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: `✓ Compiled successfully`, and `/admin` appears in the route table.

- [ ] **Step 4: Verify the password gate in a browser**

With `npm run dev` running, open `http://localhost:3000/admin`.

Expected: only a password field is visible, no form. Enter a wrong password: "That password is not right." Enter the value of `ADMIN_SECRET` from `.env.local`: the full form appears with captions already drafted.

- [ ] **Step 5: Commit**

```bash
git add app/admin/page.tsx components/admin/publish-form.tsx
git commit -m "feat(publish): add password-gated /admin publishing page"
```

---

### Task 9: End-to-end verification and the Make scenario guide

**Files:**
- Create: `docs/make-scenario-setup.md`

**Interfaces:**
- Consumes: everything from Tasks 1 to 8
- Produces: a verified live pipeline plus written setup steps for Harith

- [ ] **Step 1: Publish one real test post from the dev server**

With `npm run dev` running and the real `.env.local` in place, open `http://localhost:3000/admin`, unlock, and publish:

- Type: Achievement
- Title: `Pipeline test post`
- Organisation: `Internal`
- Date: `Jul 2026`
- Description: `Verifying the publish pipeline end to end. This entry will be deleted.`
- Photo: any small JPG

Expected: the success panel appears within a few seconds.

- [ ] **Step 2: Confirm the commits actually landed**

```bash
git fetch origin main && git log origin/main --oneline -3
```

Expected: two new commits, `content: add image for "Pipeline test post"` and `content: publish "Pipeline test post"`.

- [ ] **Step 3: Confirm Make received the payload**

Open the Make.com scenario, click the webhook module, and check its execution history.

Expected: one run with a JSON body containing `captions.linkedin`, `captions.instagram`, `captions.threads`, and an `imageUrl` under `https://harith-irfan-portfolio.vercel.app/achievements/`.

This run is what teaches Make the payload shape, which is required before the platform modules can map fields.

- [ ] **Step 4: Remove the test post**

```bash
git pull origin main
```

Delete the `Pipeline test post` object from `content/feed.json` and delete its image from `public/achievements/`, then:

```bash
git add content/feed.json public/achievements
git commit -m "chore: remove publish pipeline test post"
git push origin main
```

- [ ] **Step 5: Write `docs/make-scenario-setup.md`**

````markdown
# Make.com scenario setup

The website already sends every published post to the webhook. This is how to
wire that webhook to LinkedIn, Instagram, and Threads. Do this once.

Prerequisite: one test post must already have hit the webhook, so Make knows
the data shape. If the modules below show no fields to map, publish a test
post from `/admin` first.

## 1. Open the scenario

Go to make.com, open the scenario containing the `portfolio-publish` webhook.

## 2. Add a delay

Click the **+** after the webhook. Search **Tools**, choose **Sleep**.
Set **Delay** to `180` seconds.

Why: Vercel needs about two minutes to rebuild before the image URL is live.
Posting sooner means the platforms fetch a 404 and the image is missing.

## 3. Add LinkedIn

Click **+** after Sleep. Search **LinkedIn**, choose **Create a User Post**.

- Click **Create a connection**, sign in, and approve. Make never shows the
  password to anyone, including the website.
- **Comment / Text:** click the field, pick `captions` then `linkedin`.
- **Visibility:** Public
- **Media:** choose Image, then map `imageUrl`.

## 4. Add Instagram

Click **+** after LinkedIn. Search **Instagram for Business**, choose
**Create a Photo Post**.

- Create a connection and sign in with the Instagram account.
- If Meta asks for a linked Facebook Page: create a blank Page at
  facebook.com/pages/create, then in the Instagram app go to
  Settings, Accounts Centre, and link it. Return to Make and reconnect.
- **Photo URL:** map `imageUrl`
- **Caption:** map `captions` then `instagram`

## 5. Add Threads

Click **+** after Instagram. Search **Threads**, choose **Create a Post**.

- Create a connection and sign in.
- **Text:** map `captions` then `threads`
- **Image URL:** map `imageUrl`

## 6. Turn on error notifications

Bottom left, click the clock icon, then **Settings**. Enable
**Send error notifications by email**. Failed runs then email you and can be
retried from the scenario's History tab.

## 7. Activate

Toggle the scenario **ON** (bottom left). Save.

## Testing it

Publish a real post from `/admin`. Watch the History tab: the run should show
green checks on all four modules after about three minutes.

If a module fails, the site post is unaffected. Fix the module, then use
**Run once** on that history entry to retry.
````

- [ ] **Step 6: Run the full test suite and build one final time**

```bash
npm test && npm run build
```

Expected: 40 tests pass, `✓ Compiled successfully`.

- [ ] **Step 7: Commit and push**

```bash
git add docs/make-scenario-setup.md
git commit -m "docs: add Make.com scenario setup guide"
git push origin main
```

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
| --- | --- |
| `content/feed.json` with the documented entry schema | 4 |
| Timeline reads from the feed; Trophy Case and Certifications untouched | 4 |
| `/admin` client page, not linked, noindex | 7 (robots), 8 (page) |
| Password gate, server-side validation, sessionStorage | 8 (UI), 7 (server) |
| Form fields: photo, type, title, org, date, description, link | 8 |
| Editable per-platform caption drafting, no AI | 2, 8 |
| Auth check, field validation, image cap | 3, 7 |
| Image commit to `public/achievements/` via Contents API | 5, 7 |
| Feed read, prepend, write with sha | 5 |
| Make webhook fired with production `imageUrl` and captions | 6, 7 |
| Webhook failure does not fail the request | 6, 7 |
| Fail-fast: no half-published states | 7 (step ordering) |
| Env vars used, none committed | 5, 6, 7 |
| Make scenario setup guide for Harith | 9 |
| Build passes with the timeline on the feed | 4, 9 |
| Manual end-to-end publish verification | 9 |

Two deliberate deviations from the spec, both noted in Global Constraints:
the image cap is 4 MB rather than 8 MB (Vercel's body limit would reject 8 MB),
and the spec's webhook test-first sequencing is folded into Task 9 because Make
cannot map fields until a real payload has arrived.

**Placeholder scan:** No TBDs, no "add error handling" hand-waving, no "similar to Task N". Every code step contains complete code.

**Type consistency:** `FeedEntry`, `PublishInput`, `Captions`, and `PostType` are defined once in Task 1 and imported by Tasks 2, 3, 5, 6, 7, and 8 under those exact names. `slugify`/`buildImagePath` (Task 1), `draftCaptions` (Task 2), `validatePublishInput`/`validateImage`/`MAX_IMAGE_BYTES`/`ALLOWED_IMAGE_TYPES` (Task 3), `commitImage`/`appendFeedEntry` (Task 5), and `fireWebhook` (Task 6) are each consumed in Task 7 with matching signatures. `buildImagePath` returns a `public/`-prefixed repo path; Task 7 strips that prefix once to produce the site path stored in the feed.
