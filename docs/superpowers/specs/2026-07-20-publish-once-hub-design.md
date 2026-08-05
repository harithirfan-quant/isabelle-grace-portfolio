# Publish-Once Hub — Design

**Date:** 2026-07-20
**Status:** Approved by Harith (pending spec review)

## Problem

Posting an achievement, certificate, experience, or job change currently requires
re-typing and re-uploading the same content on every platform: the portfolio
website, LinkedIn, Instagram, and Threads. Harith wants to enter it once and have
it appear everywhere.

## Decisions made

| Decision | Choice |
| --- | --- |
| Input point ("hub") | The portfolio website — a private `/admin` page |
| Social fan-out | Make.com free tier (webhook in, platform modules out) |
| Instagram | Harith converts @harith11975 to a Creator account (unlocks the API) |
| TikTok | Skipped for now (API audit not worth it yet) |
| Website storage | Git commits via the GitHub API — no database |
| Budget | $0/month |

## Architecture

```
Harith → /admin form → /api/publish
                          │
                          ├─ 1. Commit image to public/achievements/  (GitHub API)
                          ├─ 2. Append entry to content/feed.json     (GitHub API)
                          │       └─ Vercel auto-deploys → site live in ~2 min
                          └─ 3. Fire Make.com webhook (image URL + captions)
                                  └─ Make waits ~3 min → posts to
                                     LinkedIn, Instagram, Threads
```

The git commit is the source of truth. Socials are best-effort fan-out.

## Components

### 1. `content/feed.json` (new)

A JSON array of published posts. The existing `timeline` array in
`content/portfolio.ts` migrates here (same fields), so every published post
automatically appears in the Highlights timeline.

Entry schema:

```json
{
  "id": "goexplore-2026",
  "type": "achievement | certificate | experience | job-change",
  "title": "Bank Islam GoExplore Program",
  "org": "Bank Islam Malaysia Berhad (BIYA)",
  "date": "2026",
  "description": "Planned and led an immersive industry visit…",
  "image": "/achievements/goexplore.jpg",
  "link": "",
  "publishedAt": "2026-07-20T09:30:00Z"
}
```

`components/sections/timeline.tsx` switches its data source from
`content/portfolio.ts` to `content/feed.json` (a plain `import`). Trophy Case
and Certifications stay manually curated — they are "best of" showcases, not
feeds.

### 2. `/admin` page (new)

- Client page, not linked from anywhere on the site; `robots` noindex.
- Simple password gate: a password field whose value is sent with the publish
  request; remembered in `sessionStorage` for the session. Validation happens
  server-side only.
- Form fields: photo (drag & drop), type (4 options), title, org, date,
  description, optional link.
- Caption drafting: client-side templates per platform and type prefill three
  editable textareas — LinkedIn (professional), Instagram (casual + hashtags),
  Threads (short). No AI API — templates keep it $0 and predictable.
- On submit: POST everything (image as multipart) to `/api/publish`, show
  per-step progress and the final result.

### 3. `/api/publish` route (new)

Order of operations (fail-fast, no half-published states on the site):

1. Validate `ADMIN_SECRET`. Reject with 401 otherwise.
2. Validate fields and image (type, size cap ~8 MB).
3. Commit image to `public/achievements/<slug>.<ext>` via the GitHub Contents
   API (base64 PUT).
4. Read `content/feed.json` (GET with `sha`), prepend the new entry, PUT the
   update. If this fails, return an error — the orphan image is harmless.
5. Fire the Make webhook (`MAKE_WEBHOOK_URL`) with:
   `{ imageUrl, title, link, captions: { linkedin, instagram, threads } }`
   where `imageUrl` is the production URL
   (`https://harith-irfan-portfolio.vercel.app/achievements/<file>`).
6. Webhook failure does **not** fail the request — the response flags
   `socials: "failed"` so the admin page shows a warning; the site still
   updates.

### 4. Make.com scenario (Harith sets up once, with a click-by-click guide)

Webhook trigger → Sleep ~180 s (so the Vercel deploy finishes and the image
URL is live) → LinkedIn "Create a Post" → Instagram for Business "Publish a
Photo" → Threads "Create a Post". Error notifications on, so failed runs email
Harith and can be retried from Make's dashboard.

OAuth connections to LinkedIn/Instagram/Threads are done by Harith inside
Make — no credentials ever touch the website or this repo.

## Environment variables (new)

| Variable | Purpose |
| --- | --- |
| `ADMIN_SECRET` | Password for the /admin page |
| `GITHUB_TOKEN` | Fine-grained PAT, Contents read/write on `harithirfan-quant/harith-irfan-portfolio` only |
| `MAKE_WEBHOOK_URL` | The Make.com scenario's webhook URL |

Set in `.env.local` and in Vercel project env settings.

## Error handling summary

- **Bad password** → 401, nothing happens.
- **GitHub commit fails** → error shown on admin page; nothing posted anywhere.
- **Webhook/social fails** → site is updated; admin page shows a socials
  warning; retry from Make's dashboard.

## One-time setup checklist (Harith)

1. Convert Instagram to a Creator account (Settings → Account type).
2. Create a GitHub fine-grained PAT scoped to this repo (Contents: read/write).
3. Create a free Make.com account, build the scenario from the provided guide,
   connect LinkedIn + Instagram + Threads.
4. Add the three env vars locally and on Vercel.

## Out of scope

- TikTok (revisit if the audit becomes worthwhile).
- Auto-updating Trophy Case / Certifications from the feed.
- AI-generated captions (templates only, editable by hand).
- Editing or deleting published posts from /admin (edit `feed.json` in the
  repo, as today).

## Testing

- `npm run build` passes with the timeline reading from `feed.json`.
- Manual end-to-end: publish a test post with the Make scenario pointed at a
  test webhook first, verify the git commit + site update, then connect the
  real platform modules and publish one real post.
