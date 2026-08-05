# Handover for Isabelle — finish her portfolio

Send these to Harith; each maps to a specific place in the site. Until each
item lands, the site shows clean pink placeholders, which is intentional.

## 1. Photos (high priority — photo added, ambassador months filled)

| Item | Status |
|---|---|
| **Her photo** (headshot) | ✅ DONE — `public/isabelle-photo.jpg` wired to hero + about (swap file anytime to update) |
| **MyNext month photos** (Nov PICC, Dec talk, Mar, Apr, Jul flyer) | ✅ DONE — copied from Harith's site to `public/ambassador/`, wired to all 5 month cards |
| **Bintulu Port logo** (square PNG, transparent, ≥128 px) | ⬜ PENDING → `public/logos/` → `aiInternship.companyLogo` + `experience[0].logo` |
| **Jul 25 session poster/screenshot** | ✅ DONE — official flyer is the Jul 2026 card image |
| **Scholarship award photo/letter scan** | ⬜ PENDING → press card image + timeline |

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
