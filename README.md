# Harith Irfan — Portfolio

A premium, conversion-focused portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **shadcn/ui**, and **Recharts**. Deployed on **Vercel**.

Features: animated hero, **⌘K command palette**, floating **"Hire Me"** button, **Skills Radar chart**, **Achievement Trophy Case** with confetti, filterable certifications, dark/light mode, contact form, dynamic OG image, JSON-LD SEO, and a sitemap.

---

## 🚀 One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/harithirfan-quant/harith-irfan-portfolio)

> Note: the repo is currently **private**. Make it public on GitHub if you want
> the one-click deploy button to work for others.

**Live site:** https://harith-irfan-portfolio.vercel.app

---

## 🧑‍💻 Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## ✏️ Everything is editable from ONE file

Open [`content/portfolio.ts`](content/portfolio.ts). Every section reads from it, and every field has an inline `// EDIT THIS:` comment. No need to touch React components.

### Update your resume
Drop your latest PDF into **`/public/resume.pdf`**, then update `resumeLastUpdated`:

```ts
export const resume = {
  file: "/resume.pdf",
  lastUpdated: "June 2026", // EDIT THIS
};
```

The "Latest Resume" buttons (navbar, hero, about, contact, footer, command palette, Hire-Me menu) all open + download this file.

### Update the Skills Radar chart
Edit the `radarSkills` array with new values **0–100**:

```ts
export const radarSkills = [
  { subject: "Project Management", A: 90, fullMark: 100 },
  // ...keep 8 entries for the best layout
];
```

### Update the Trophy Case
Edit the top achievements under `trophyCase`. Each `icon` can be one of:
`"Trophy" | "Medal" | "Award" | "Star" | "Crown" | "Target"`.

```ts
export const trophyCase = [
  { icon: "Crown", title: "1st Runner Up — The Leaders Challenge", issuer: "…", date: "2025" },
  // ...
];
```

### Add / edit certifications
Append to the `certifications` array. The `category` controls which filter tab it appears under (`"Google" | "Finance & Business" | "Government" | "Competitions"`). Add a `url` to enable the "Show Credential" link.

```ts
{
  title: "New Certificate",
  issuer: "Issuer",
  date: "Jan 2026",
  credentialId: "ABC123",     // optional
  category: "Finance & Business",
  url: "",                     // optional verification link
}
```

### Update social links, email, text
All in `content/portfolio.ts` under `personal`, `socials`, `about`, `contact`, etc.

### Replace the avatar image
Drop a photo at **`/public/avatar.jpg`**, then in [`components/sections/about.tsx`](components/sections/about.tsx) uncomment the `<Image>` line (instructions are in the file).

---

## 📬 Contact form (Resend)

The form posts to `app/api/contact/route.ts` using [Resend](https://resend.com). If no key is set, it gracefully falls back to opening the visitor's email client.

1. Copy `.env.example` → `.env.local`
2. Fill in:

```bash
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=harithirfanworkspace@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev   # or your verified domain sender
```

3. Add the same variables in **Vercel → Project → Settings → Environment Variables**.

---

## 🌐 Custom domain

1. Vercel → your project → **Settings → Domains**.
2. Add your domain and follow the DNS instructions.
3. Update `site.url` in `content/portfolio.ts` so SEO/OG/sitemap point to the new URL.

---

## ⌨️ Keyboard shortcuts

- **⌘K / Ctrl+K** — open the command palette (navigate, download resume, toggle theme, open socials).

---

## 🧱 Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui (Radix) · cmdk · Recharts · next-themes · Lucide · Resend · Sonner.
