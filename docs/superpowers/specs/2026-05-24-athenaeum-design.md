# Athenaeum Tutoring Website, Design Spec

Date: 2026-05-24
Status: brainstorming complete, pending user review before plan and implementation

## 1. Overview

A polished marketing site for Athenaeum, a 1-on-1 test-prep and college-counseling service taught by current Ivy League and peer-university students. The site lets prospective students and parents browse services, browse tutors, read about what makes Athenaeum different, and book either a free 30-minute consult or a paid first lesson.

V1 is a static marketing site. Booking is handled via Cal.com embeds. No accounts, no payments processed on-site, no admin panel.

## 2. Decisions made during brainstorming

| Topic | Decision |
|---|---|
| Stack | Astro 4 + Tailwind CSS + Astro Content Collections |
| Booking | Cal.com inline embeds, per-tutor event types |
| Brand | "Athenaeum", Ivy League positioning |
| Project location | `1-Projects/Tutoring-Website/` inside the vault |
| Tutor data | placeholder MDX in `src/content/tutors/*.mdx`, swappable later |
| Free consult | 30 minutes, includes a brief diagnostic |
| Pricing display | "Starting at $X/hr" plus 2-3 example packages, specifics on consult |
| Testimonials | not in v1, will add once real ones exist |
| Mockup use | design system reference, structure adapted for 1-on-1 |

## 3. Site map

| URL | Purpose |
|---|---|
| `/` | Home |
| `/ap` | AP tutoring service page |
| `/sat` | SAT tutoring service page |
| `/act` | ACT tutoring service page |
| `/college-counseling` | College counseling service page |
| `/tutors` | Tutor directory (filterable) |
| `/tutors/[slug]` | Tutor profile + Cal.com embed |
| `/why-different` | What separates us |
| `/book` | Booking hub (free consult / first lesson tabs) |
| `/privacy` | Privacy policy (boilerplate) |
| `/terms` | Terms of service (boilerplate) |

## 4. Booking flow

1. All top-of-funnel CTAs ("Join Us", "Get Started", nav button, sticky bar, hero buttons) link to `/book?type=consult`.
2. `/book` has two tabs:
   - **Free 30-min Consult** (default tab): brief intro, then Cal.com inline embed for the team round-robin consult event.
   - **Schedule a First Lesson**: tutor-picker grid (4-card layout). On click, that tutor's Cal.com "First Lesson" event loads inline below.
3. Tutor profile pages have "Book a Lesson with [Name]" plus a Cal.com inline embed at the bottom, pre-routed to that tutor's calendar.
4. Service page CTAs like "Find Your SAT Tutor" link to `/tutors?subject=sat` (URL filter on the directory).
5. Deep links: `/book?type=consult`, `/book?type=lesson&tutor=eliza-m`.

## 5. Homepage structure

Top to bottom:

1. **Announcement bar**, "Now booking spring 1-on-1 sessions, limited slots."
2. **Nav**, links: Services / Tutors / Why Different / How It Works / Join Us (lime CTA).
3. **Hero**, editorial typography. Headline: "Test prep & college counseling, taught by Ivy League minds." Subhead: "One-on-one. Custom plan. Top-1% tutors from Harvard, Yale, Princeton, Columbia." CTAs: "Schedule Free Consult" (lime mega) plus "Browse Tutors" (ghost).
4. **Hero stat cards** to the right: "1:1 Attention", "Ivy League", "Free Consult". Same visual style as the HTML's stat cards.
5. **University marquee**, Harvard, Yale, Princeton, Columbia, Brown, Dartmouth, Cornell, UPenn, MIT, Stanford.
6. **Services grid**, 4 cards: AP, SAT, ACT, College Counseling. Each links to its service page.
7. **What's Included**, 6 feature cards adapted for 1-on-1:
   - One-on-one sessions
   - Recorded for review
   - Custom lesson plans
   - Hand-graded weekly homework
   - Office hours + async support
   - Test-day strategy session
8. **How It Works**, 3 steps:
   1. Free 30-min consult
   2. Get matched with your tutor
   3. Weekly 1-on-1s, homework, practice tests, exam day
9. **Tutor preview**, 4 tutor cards (monogram + school-tag style).
10. **Why Different teaser**, 3 punchy reasons plus link to `/why-different`.
11. **FAQ**, 6 FAQs, copy adapted for 1-on-1.
12. **Big CTA**, "Reserve your free consult." -> `/book`.
13. **Footer + sticky bar**.

## 6. Service page template

`/ap`, `/sat`, `/act` share this layout. `/college-counseling` is a content variant.

1. **Hero**: eyebrow (e.g., "AP TUTORING"), big title, subhead, primary CTA ("Find Your AP Tutor" -> `/tutors?subject=ap`).
2. **What we cover**: list of subjects or sections.
3. **How it works**: 3-step mini-section (same as homepage but service-tinted background).
4. **Sample tutors**: 2-3 tutors filtered by `serviceSlugs`.
5. **Pricing**: "Starting at $X/hr" plus 2-3 packages (8 / 16 / 24 hours).
6. **Service-specific FAQs**: 4-5 FAQs.
7. **Closing CTA**: "Schedule a free consult" -> `/book`.

College Counseling variant swaps "What we cover" for:
- School list strategy
- Application essay coaching
- Interview prep
- Timeline and deadline management
- Activity / extracurricular narrative
- Optional: subject test guidance, scholarship search

## 7. Tutor directory and profile pages

### `/tutors` (directory)
- Hero with eyebrow ("THE FACULTY") and section title.
- Filter chips: All / AP / SAT / ACT / College Counseling. Reads `?subject=` URL param, defaults to All.
- Grid of tutor cards (4 per row on desktop, 2 on tablet, 1 on mobile). Same style as homepage preview.
- Each card links to that tutor's profile.

### `/tutors/[slug]` (profile)
- Hero band: monogram avatar (large), school tag, full display name, subjects, "Starting at $X/hr".
- Long bio (MDX body, rich content).
- "Sessions with [Name]" bullet list of what working with this tutor looks like.
- Sample availability blurb.
- CTA block: "Book a Lesson with [Name]" (lime mega) plus "Schedule a Free Consult" (ghost).
- Cal.com inline embed at the bottom, pre-routed to that tutor's calendar.

## 8. Why We're Different page

Twelve reasons grouped into four pillars.

### Talent
1. **Top-1% Ivy League tutors.** Harvard, Yale, Princeton, Columbia, MIT, Stanford. Every tutor scored at the top of the exam they teach.

### Method
2. **Custom lesson plans, every student.** A diagnostic week determines the gaps. Weekly plan adapts to scores and pace. No cookie-cutter curriculum.
3. **Hand-graded homework, every week.** Tutor reviews every problem set personally. Real, specific feedback. Not auto-graded.
4. **Real practice tests, real walkthroughs.** Proctored, timed conditions. Then question-by-question debriefs on every miss.
5. **Test-day strategy session.** Final week is pacing, anxiety, and mindset, not new content.
6. **Integrated college counseling.** Your tutor knows your college list. One conversation across scores, GPA, essays, fit.

### Touch
7. **Office hours and async support between sessions.** Message your tutor for quick questions. No 24-hour-response gulf.
8. **Recorded sessions, kept in your portal.** Rewatch anytime.
9. **Biweekly parent updates.** Short note on progress, focus areas, what's next.

### Trust
10. **Free 30-min consult first.** Meet the fit before any commitment.
11. **No long-term contracts.** Pay per package (8 / 16 / 24 hours). Cancel anytime.
12. **First-week money-back guarantee.** Try a week. Full refund if not the right fit.

### Page layout
- Hero: "Built around the student, not the syllabus."
- Four pillar sections, each with eyebrow (TALENT / METHOD / TOUCH / TRUST), heading, and the matching feature cards.
- Comparison band: "Athenaeum vs. a big tutoring chain." Side-by-side table on class size, tutor caliber, lesson plan, homework feedback, contract terms.
- Closing CTA.

## 9. Data model

```ts
// src/data/services.ts
export type Package = { hours: number; price: number; perHour: number };
export type FAQ = { question: string; answer: string };
export type Service = {
  slug: 'ap' | 'sat' | 'act' | 'college-counseling';
  name: string;          // "SAT"
  longName: string;      // "SAT Tutoring"
  tagline: string;
  blurb: string;
  cardColor: 'lime' | 'tangerine' | 'ink' | 'cream';
  cadence: string;       // "Weekly 1-on-1s"
  topics: string[];      // sections or subjects
  startingAtHourly: number;
  packages: Package[];
  faqs: FAQ[];
};

// src/content/config.ts (Astro Content Collections schema)
export type TutorFrontmatter = {
  name: string;          // "Eliza M."
  fullName: string;      // "Eliza Martinez"
  slug: string;          // "eliza-m"
  monogram: string;      // "EM"
  school: string;        // "Harvard"
  classYear: string;     // "'26"
  major?: string;
  subjects: string[];                                    // ['SAT Math', 'AP Bio']
  serviceSlugs: ('ap' | 'sat' | 'act' | 'college-counseling')[];
  hourlyRate: number;
  calLinks: { consult: string; firstLesson: string };
  cardGradient: 'lime' | 'tangerine' | 'plum' | 'ink';
  scoreHighlights?: string[];                            // ["1580 SAT", "5 on AP Calc BC"]
};
```

## 10. Project structure

```
1-Projects/Tutoring-Website/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── README.md
├── docs/superpowers/specs/2026-05-24-athenaeum-design.md   (this file)
├── public/
│   ├── favicon.svg
│   └── og.png
├── src/
│   ├── styles/
│   │   ├── globals.css        (Tailwind directives + reset)
│   │   └── theme.css          (CSS custom properties, noise overlay)
│   ├── components/
│   │   ├── AnnouncementBar.astro
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── StickyBar.astro
│   │   ├── Hero.astro
│   │   ├── HeroStatCard.astro
│   │   ├── Marquee.astro
│   │   ├── Eyebrow.astro
│   │   ├── SectionTitle.astro
│   │   ├── MegaButton.astro
│   │   ├── GhostButton.astro
│   │   ├── ServiceCard.astro
│   │   ├── FeatureCard.astro
│   │   ├── HowCard.astro
│   │   ├── TutorCard.astro
│   │   ├── FAQAccordion.astro
│   │   ├── BigCTA.astro
│   │   ├── ComparisonTable.astro
│   │   └── CalEmbed.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── data/
│   │   ├── site.ts            (brand strings, URLs, social defaults)
│   │   ├── services.ts        (4 services)
│   │   ├── faqs.ts            (homepage + per-service FAQ banks)
│   │   ├── why-different.ts   (12 reasons grouped by pillar)
│   │   └── packages.ts        (pricing packages)
│   ├── content/
│   │   ├── config.ts          (Astro Content Collections schema)
│   │   └── tutors/
│   │       ├── eliza-m.mdx
│   │       ├── jian-k.mdx
│   │       ├── sofia-r.mdx
│   │       └── adetola-o.mdx
│   └── pages/
│       ├── index.astro
│       ├── ap.astro
│       ├── sat.astro
│       ├── act.astro
│       ├── college-counseling.astro
│       ├── why-different.astro
│       ├── book.astro
│       ├── tutors/
│       │   ├── index.astro
│       │   └── [slug].astro
│       ├── privacy.astro
│       └── terms.astro
```

## 11. Tech notes

- **Astro version**: 4.x. Static output by default. No SSR needed for v1.
- **Tailwind**: configured via the official Astro Tailwind integration. Theme extends with Athenaeum palette and font families. Existing HTML CSS variables ported to a small `theme.css`.
- **Fonts**: Bricolage Grotesque, Instrument Serif, Geist, loaded from Google Fonts with `<link rel="preconnect">` (same as the mockup).
- **Cal.com embed**: use the vanilla JS snippet (`@calcom/embed-snippet` or the `<script>`-based Cal init), loaded only on `/book` and `/tutors/[slug]`. Keeps the project React-free. Embed instances target a `<div id="cal-inline">` per page.
- **Filter on `/tutors`**: read `?subject=` URL param via a tiny inline `<script>` (no framework needed). On initial load, render all tutors; filter chips toggle a `data-active-subject` attribute on a wrapper, and CSS rules hide non-matching cards via attribute selectors.
- **`/book` URL params**: page reads `?type=consult|lesson` to set the active tab and `?tutor=<slug>` to preselect the tutor on the lesson tab. Same tiny inline script pattern.
- **Per-service tutor lists**: at build time, `import.meta.glob` content collection -> filter by `serviceSlugs` -> render 2-3 cards.

## 12. Out of scope (v2 and later)

- Student or parent accounts and portal
- Payments on-site
- Real-time chat or messaging
- Blog or resources section
- CMS for non-developers
- Localization
- Testimonials (add when real ones exist)
- Custom domain and deploy configuration (handled separately when ready to launch)
- Sitemap.xml / robots.txt automation (defer to deploy)
- Analytics integration (defer to deploy)
- Email capture / newsletter
- Cohort or group classes (decided against for v1)
