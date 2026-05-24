# Athenaeum Tutoring Website

One-on-one Ivy League tutoring marketing site. Built with Astro 6 + Tailwind 4 + Cal.com embeds.

## Quick start

```sh
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static output to dist/
npm run preview  # preview the prod build
npm run smoke    # smoke tests (dev server must be running)
```

## Structure

- `src/components/` — reusable UI components (Astro)
- `src/layouts/` — base + page shells
- `src/pages/` — routes (Astro file-based routing)
- `src/data/` — structured site content (services, packages, FAQs, why-different)
- `src/content/tutors/` — tutor profile MDX files (Astro Content Collections)
- `src/styles/` — global CSS theme tokens + Tailwind theme

## Routes

| URL | Purpose |
|---|---|
| `/` | Home |
| `/ap` | AP Tutoring |
| `/sat` | SAT Tutoring |
| `/act` | ACT Tutoring |
| `/college-counseling` | College Counseling |
| `/tutors` | Tutor directory (filterable) |
| `/tutors/[slug]` | Tutor profile + Cal.com embed |
| `/why-different` | What separates us (12 reasons + comparison) |
| `/book` | Booking hub (free consult / first lesson tabs) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Editing tutor data

Each tutor is a single MDX file under `src/content/tutors/`. Update frontmatter for structured fields (name, subjects, Cal.com links). The MDX body becomes the bio on the profile page.

To add a new tutor: drop a new `<slug>.mdx` file in `src/content/tutors/`. Astro picks it up automatically.

## Editing services or pricing

Edit `src/data/services.ts`. Each service has its own FAQs, packages, and topic list.

## Editing the "Why Different" content

`src/data/why-different.ts` holds the 12 reasons (grouped by pillar) and the comparison table rows.

## Cal.com setup

All `calLinks` are placeholder slugs. To go live with real bookings:

1. Each tutor signs up at cal.com with their own user slug (e.g., `eliza-martinez`).
2. Each creates two event types: "Consult" (30 min, free) and "First Lesson" (60 min, paid).
3. Update `calLinks.consult` and `calLinks.firstLesson` in each tutor's MDX frontmatter to point to the real slugs (e.g., `"eliza-martinez/first-lesson"`).
4. For the homepage Schedule Free Consult button, set up a Cal.com team round-robin and update `consultCalLink` in `src/data/site.ts`.

## Pre-launch checklist

- Swap placeholder Cal.com `calLinks` for real ones.
- Generate a real 1200×630 OG image and drop it at `public/og.png` (replacing `og.txt`).
- Update legal pages (`/privacy`, `/terms`) with real policy text from your lawyer or generator.
- Replace placeholder tutor names + bios with real faculty.
- Pick a host (Vercel / Netlify / Cloudflare Pages) and connect a domain.

## Spec + plan

- Spec: `docs/superpowers/specs/2026-05-24-athenaeum-design.md`
- Plan: `docs/superpowers/plans/2026-05-24-athenaeum-implementation.md`
