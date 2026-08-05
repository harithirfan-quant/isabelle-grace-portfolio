# Handover for Isabelle — finish her portfolio

Send these to Harith; each maps to a specific place in the site. Until each
item lands, the site shows clean pink placeholders, which is intentional.

## 1. Photos (highest priority — currently a pink "IG" monogram stands in)

| Item | Where it goes |
|---|---|
| **Her photo** (headshot or 4:5 portrait, 1–2 MB, JPG/PNG) | `public/` → set `personal.photo` + `about.photo` in `content/portfolio.ts` |
| **Bintulu Port logo** (square PNG, transparent, ≥128 px) | `public/logos/` → `aiInternship.companyLogo` + `experience[0].logo` |
| **MyNext month photos** (Nov 2025 PICC, Dec talk, Mar, Apr sessions) | `public/ambassador/` → `ambassador.months[].photos` |
| **Jul 25 session poster/screenshot** | Ambassador Jul 2026 card + timeline + projects image |
| **Scholarship award photo/letter scan** | Press card image + timeline |

## 2. Resume (currently hidden everywhere on purpose)

Her current resume PDF → `public/resume.pdf`, then set `resume.available: true`
in `content/portfolio.ts`. That one flag re-enables every Resume button and
caption across the site (hero, navbar, footer, contact, experience, /api/resume).

## 3. Links to restore (currently rendered as non-clickable cards)

- **Her own Instagram post** for the Jul 25 Personal Branding session
  (press card + projects card URL). The old link pointed at the co-host's
  personal account, so it was removed.
- **Bintulu Port Scholar announcement link** (press card), if one exists.
- Any UniMAP/TalentCorp/MyNext coverage about **her** for the press section.

## 4. Claims that need her confirmation (shown live but assumed from shared context)

Please confirm each is true, and send credential URLs/IDs if she wants them shown:

- Google Project Management certifications — **all 6 entries** (titles/dates
  were inherited from the template; some look like the free Coursera courses)
- 1st Place CoGLIEx 2023 (UiTM, 50+ teams)
- RIYI Mentorship Programme (REHDA Institute)
- Dean's Award 3.95 GPA (Sem 1 2025)
- CGPA 3.80 overall
- "Certified in Business Analysis" (skills summary line)

## 5. Optional polish

- Japanese proficiency level (currently "working proficiency")
- Education highlights (currently "Microsoft Excel", "Analytical Skills")
- Her preferred tagline tweaks once she reads it live

## How to land the domain (Aug 7, after purchase)

1. Vercel → project `isabelle-grace-portfolio` → Domains → add `isabelle.hietech.my`
2. Point DNS as Vercel instructs (CNAME/ALIAS to `cname.vercel-dns.com`)
3. In `content/portfolio.ts`, change `site.url` to `https://isabelle.hietech.my`
4. Deploy: `npx vercel --prod --yes` from `~/Portfolios Projects`
