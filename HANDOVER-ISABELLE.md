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

## 6. Team projects (copied from Harith's portfolio — confirm credits)

The Projects section now shows the shared team work: **Trajectory** and
**SuriaSnap** (featured hero cards with live demos + landing screenshots) and
case studies for both, plus **Bank Islam GoExplore Program** and **The Leaders
Challenge**. They're written in team voice ("we", "our team") since these are
joint projects. Confirm with Isabelle what her actual role was in each
(especially SuriaSnap and GoExplore, which were originally documented as
individual efforts) and adjust the `role` field + overview in
`content/case-studies.ts` if her part differs.

## How to land the domain (Aug 7 — in progress)

DONE (by Hermes):
1. ✅ `hietech.my` added to Vercel (team `hietech`)
2. ✅ `isabelle.hietech.my` attached to project `isabelle-grace-portfolio`
3. ✅ `site.url` in `content/portfolio.ts` → `https://isabelle.hietech.my` (deployed)

REMAINING — at the domain registrar (one DNS record):
4. Add an **A record**: host `isabelle` → value `76.76.21.21`
   (optionally also `@` → `76.76.21.21` for the apex hietech.my)
5. Wait for propagation (minutes to ~24h), then https://isabelle.hietech.my serves the site.
   Verification is automatic; Vercel emails when the cert is issued.
