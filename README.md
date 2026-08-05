# Isabelle Grace — Portfolio

Swiss/bold portfolio for Isabelle Grace Poly, an International Business
student at Universiti Malaysia Perlis, Bintulu Port Scholar, and MyNext
Campus Ambassador.

**Stack:** Next.js 14 (App Router) · Tailwind CSS · TypeScript · Vercel

**Live site:** https://isabelle-grace-portfolio.vercel.app

## Structure

- `content/portfolio.ts` — all site content lives here (hero, about, experience,
  press, skills, certifications, projects, ambassador months, contact, metadata).
- `content/blog.ts` — blog posts.
- `content/case-studies.ts` — case studies (currently empty, ready for future projects).
- `app/` — pages, API routes (`/api/contact`, `/api/resume`), favicon + OG image.
- `components/` — section components. Edit data in `content/`, not here.

## Local dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Note: after a `npm run build`, remove `.next` before starting the dev server
(known stale-CSS bug with this template).

## Resume

The Resume buttons are hidden until `resume.available` is set to `true` in
`content/portfolio.ts` and Isabelle's PDF is placed at `public/resume.pdf`.
Until then `/api/resume` returns 404, which is intentional.

## Deploy

Push to `main`; Vercel auto-deploys the `isabelle-grace-portfolio` project
(team `hietech`). Manual prod deploy:

```bash
npx vercel --prod --yes
```

## Contact form

Uses Resend. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL` in Vercel project env vars (see `.env.example`).
