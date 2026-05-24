# Athenaeum Tutoring Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a polished static marketing site for Athenaeum (1-on-1 Ivy League tutoring) using Astro + Tailwind, with embedded Cal.com booking, ready to launch.

**Architecture:** Astro 4 static site, Tailwind CSS for utilities, scoped CSS in components for custom design (animations, brutalist shadows, noise overlay). Astro Content Collections for tutor profiles, vanilla Cal.com embed snippet for booking. All pages prerendered, no SSR, no auth, no DB. Visual design lifted from the existing `index (1).html` mockup (cream / lime / tangerine / plum / ink palette, Bricolage Grotesque + Instrument Serif + Geist).

**Tech Stack:** Astro 4, Tailwind CSS 3, TypeScript (strict), MDX, Cal.com embed snippet, Google Fonts.

**Important — vault sync:** This project lives inside the SecondBrain vault, which has an auto-commit + push hook on session Stop. Skip manual `git commit` / `git push` in tasks. Each task ends with a verification step instead.

---

## Reference

- **Spec:** `1-Projects/Tutoring-Website/docs/superpowers/specs/2026-05-24-athenaeum-design.md`
- **Visual mockup (read for design tokens, animations, exact CSS values):** `~/Downloads/index (1).html`
- **Project root:** `/Users/rayanbatada/Documents/Obsidian Vault/SecondBrain/1-Projects/Tutoring-Website/`
- **Dev server URL:** `http://localhost:4321` (Astro default)

All terminal commands run from the project root unless noted.

---

## Task 1: Initialize Astro project + integrations

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json` (via Astro CLI)
- Create: `src/pages/index.astro` (placeholder)
- Create: `src/env.d.ts`

- [ ] **Step 1: Create the project**

```bash
cd "/Users/rayanbatada/Documents/Obsidian Vault/SecondBrain/1-Projects/Tutoring-Website"
npm create astro@latest . -- --template minimal --typescript strict --install --no-git --skip-houston --yes
```

If prompted "directory not empty" (because `docs/` already lives here), answer yes to continue. The CLI keeps existing files.

- [ ] **Step 2: Install Tailwind + MDX integrations**

```bash
npx astro add tailwind --yes
npx astro add mdx --yes
```

Both prompts answer yes. Astro will edit `astro.config.mjs` and `package.json` automatically.

- [ ] **Step 3: Install Cal.com embed snippet**

```bash
npm install @calcom/embed-snippet
```

- [ ] **Step 4: Replace placeholder index page**

Write `src/pages/index.astro` (overwrite Astro's default):

```astro
---
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Athenaeum</title>
  </head>
  <body>
    <main>Scaffolding in progress.</main>
  </body>
</html>
```

- [ ] **Step 5: Verify dev server boots**

```bash
npm run dev
```

Expected: `Local: http://localhost:4321/`, opening the URL shows "Scaffolding in progress." Stop the server (Ctrl+C).

- [ ] **Step 6: Verify production build**

```bash
npm run build
```

Expected: builds cleanly. `dist/index.html` exists.

---

## Task 2: Theme tokens, fonts, globals

**Files:**
- Create: `src/styles/theme.css`
- Create: `src/styles/globals.css`
- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Write `src/styles/theme.css`**

Contains the palette CSS variables, font-family helpers, base body styles, and the noise overlay. These exact values come from the mockup HTML's `<style>` block.

```css
:root {
  --cream: #f7f0df;
  --cream-deep: #ede4cc;
  --ink: #0c0c0c;
  --ink-soft: #2a2a2a;
  --ink-faint: rgba(12, 12, 12, 0.55);
  --line: rgba(12, 12, 12, 0.15);
  --lime: #d4f04a;
  --lime-deep: #b8d433;
  --tangerine: #ff5e2c;
  --plum: #2c1947;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background: var(--cream);
  color: var(--ink);
  font-family: 'Geist', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Subtle noise overlay across the whole page */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}

.display { font-family: 'Bricolage Grotesque', sans-serif; }
.serif { font-family: 'Instrument Serif', serif; font-style: italic; }

/* Reveal-on-scroll baseline (intersection observer adds .in) */
.reveal {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.in { opacity: 1; transform: translateY(0); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes highlightIn {
  from { transform: skew(-3deg) scaleX(0); }
  to { transform: skew(-3deg) scaleX(1); }
}
```

- [ ] **Step 2: Write `src/styles/globals.css`**

```css
@import './theme.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Update `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'cream-deep': 'var(--cream-deep)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-faint': 'var(--ink-faint)',
        line: 'var(--line)',
        lime: 'var(--lime)',
        'lime-deep': 'var(--lime-deep)',
        tangerine: 'var(--tangerine)',
        plum: 'var(--plum)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['Geist', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        'site': '1400px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Verify Tailwind picks up the theme**

Temporarily edit `src/pages/index.astro` body to:

```astro
<body class="bg-cream text-ink font-sans">
  <main class="p-8">
    <h1 class="font-display text-6xl">Athenaeum <span class="font-serif italic text-tangerine">test</span></h1>
  </main>
</body>
```

Run `npm run dev`, open localhost:4321, confirm: cream background, big Bricolage Grotesque heading, tangerine italic "test" in Instrument Serif. Stop server.

---

## Task 3: Base + Page layouts

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/PageLayout.astro`

- [ ] **Step 1: Write `src/layouts/BaseLayout.astro`**

Loads fonts, sets up `<head>`, imports globals, applies body class. All pages extend this.

```astro
---
import '../styles/globals.css';

export interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const { title, description = 'One-on-one test prep & college counseling, taught by Ivy League tutors.', ogImage = '/og.png' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:type" content="website" />
  </head>
  <body class="bg-cream text-ink font-sans antialiased overflow-x-hidden">
    <slot />

    <script is:inline>
      // Reveal-on-scroll observer (shared site-wide)
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 2: Write `src/layouts/PageLayout.astro`**

Wraps BaseLayout with nav, footer, sticky bar, announcement bar.

```astro
---
import BaseLayout from './BaseLayout.astro';
import AnnouncementBar from '../components/AnnouncementBar.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import StickyBar from '../components/StickyBar.astro';

export interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const props = Astro.props;
---
<BaseLayout {...props}>
  <AnnouncementBar />
  <Nav />
  <slot />
  <Footer />
  <StickyBar />
</BaseLayout>
```

- [ ] **Step 3: Verify layout compiles**

Temporarily edit `src/pages/index.astro` (we'll rewrite it in Task 9):

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Athenaeum — Test">
  <main class="p-8 relative z-10">
    <h1 class="font-display text-6xl">Athenaeum</h1>
  </main>
</BaseLayout>
```

Run `npm run dev`. Confirm: page loads, Google Fonts load (network tab), noise overlay visible, headline renders in Bricolage Grotesque. Stop server.

(PageLayout still references components we haven't built yet. Don't use it in pages until Task 4 completes.)

---

## Task 4: Atom components

**Files:**
- Create: `src/components/AnnouncementBar.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/StickyBar.astro`
- Create: `src/components/Eyebrow.astro`
- Create: `src/components/SectionTitle.astro`
- Create: `src/components/MegaButton.astro`
- Create: `src/components/GhostButton.astro`

### 4.1 AnnouncementBar

- [ ] **Step 1: Write `src/components/AnnouncementBar.astro`**

```astro
---
export interface Props {
  text?: string;
  emphasis?: string;
}
const { text = 'Now booking spring 1-on-1 sessions —', emphasis = 'limited slots' } = Astro.props;
---
<div class="announce">
  <span class="announce-inner">
    <span class="dot"></span>
    <span>{text} <em>{emphasis}</em></span>
  </span>
</div>

<style>
  .announce {
    background: var(--ink);
    color: var(--cream);
    padding: 0.6rem 1.5rem;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-align: center;
    position: relative;
    z-index: 101;
  }
  .announce-inner { display: inline-flex; align-items: center; gap: 0.6rem; }
  .announce .dot {
    width: 7px; height: 7px;
    background: var(--lime);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--lime);
    animation: pulse 1.5s ease-in-out infinite;
  }
  .announce em {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    color: var(--lime);
    font-size: 0.95rem;
  }
</style>
```

### 4.2 Nav

- [ ] **Step 2: Write `src/components/Nav.astro`**

```astro
---
const links = [
  { href: '/#services', label: 'Services' },
  { href: '/tutors', label: 'Tutors' },
  { href: '/why-different', label: 'Why Different' },
  { href: '/#how', label: 'How It Works' },
];
---
<nav>
  <a href="/" class="logo">
    <span class="logo-dot"></span>Athenaeum
  </a>
  <ul class="nav-links">
    {links.map((link) => (
      <li><a href={link.href}>{link.label}</a></li>
    ))}
    <li><a href="/book" class="nav-cta">Join Us →</a></li>
  </ul>
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 1.1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(247, 240, 223, 0.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
  }
  .logo {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    font-variation-settings: "wdth" 75;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--ink);
    text-decoration: none;
  }
  .logo-dot {
    width: 10px; height: 10px;
    background: var(--lime);
    border-radius: 50%;
    border: 1.5px solid var(--ink);
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; align-items: center; margin: 0; padding: 0; }
  .nav-links a {
    color: var(--ink);
    text-decoration: none;
    font-size: 0.92rem;
    font-weight: 500;
    transition: color 0.3s;
  }
  .nav-links a:hover { text-decoration: underline; text-underline-offset: 4px; }

  .nav-cta {
    background: var(--ink);
    color: var(--cream) !important;
    padding: 0.7rem 1.3rem;
    border-radius: 999px;
    font-size: 0.88rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .nav-cta::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--lime);
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: -1;
  }
  .nav-cta:hover { color: var(--ink) !important; text-decoration: none !important; }
  .nav-cta:hover::before { transform: translateY(0); }

  @media (max-width: 640px) {
    nav { padding: 0.9rem 1.2rem; }
    .nav-links li:not(:last-child) { display: none; }
  }
</style>
```

### 4.3 Footer

- [ ] **Step 3: Write `src/components/Footer.astro`**

```astro
---
const cols = [
  {
    heading: 'Services',
    links: [
      { href: '/ap', label: 'AP Tutoring' },
      { href: '/sat', label: 'SAT' },
      { href: '/act', label: 'ACT' },
      { href: '/college-counseling', label: 'College Counseling' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/tutors', label: 'Faculty' },
      { href: '/why-different', label: 'Why Different' },
      { href: '/#how', label: 'How It Works' },
      { href: '/book', label: 'Book a Consult' },
    ],
  },
  {
    heading: 'Get in Touch',
    links: [
      { href: 'mailto:hello@athenaeum.co', label: 'hello@athenaeum.co' },
      { href: '#', label: 'Live Online · Worldwide' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];
---
<footer>
  <div class="footer-top">
    <div>
      <a href="/" class="footer-brand">
        <span class="logo-dot"></span>Athenaeum
      </a>
      <p class="footer-tag">
        One-on-one test prep & college counseling, taught live by Ivy League tutors.
      </p>
    </div>
    {cols.map((col) => (
      <div class="footer-col">
        <h4>{col.heading}</h4>
        <ul>
          {col.links.map((link) => (
            <li><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  <div class="footer-bottom">
    <div>© 2026 Athenaeum & Co. All rights reserved.</div>
    <div>Made with <span class="serif">care</span> in New York.</div>
  </div>
</footer>

<style>
  footer {
    background: var(--ink);
    color: var(--cream);
    padding: 4rem 2rem 2rem;
    position: relative;
    z-index: 2;
  }
  .footer-top {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(247, 240, 223, 0.15);
  }
  .footer-brand {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
    font-variation-settings: "wdth" 80;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--cream);
    text-decoration: none;
  }
  .footer-brand .logo-dot {
    width: 14px; height: 14px;
    background: var(--lime);
    border-radius: 50%;
  }
  .footer-tag {
    color: rgba(247, 240, 223, 0.7);
    font-size: 0.95rem;
    line-height: 1.55;
    max-width: 340px;
  }
  .footer-col h4 {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--lime);
    margin-bottom: 1.2rem;
  }
  .footer-col ul { list-style: none; padding: 0; margin: 0; }
  .footer-col li { margin-bottom: 0.6rem; }
  .footer-col a {
    color: rgba(247, 240, 223, 0.75);
    text-decoration: none;
    font-size: 0.92rem;
    transition: color 0.25s;
  }
  .footer-col a:hover { color: var(--cream); }
  .footer-bottom {
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    color: rgba(247, 240, 223, 0.5);
  }
  .footer-bottom .serif {
    color: var(--lime);
    font-size: 0.95rem;
    font-family: 'Instrument Serif', serif;
    font-style: italic;
  }

  @media (max-width: 640px) {
    .footer-top { grid-template-columns: 1fr 1fr; }
    .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
</style>
```

### 4.4 StickyBar

- [ ] **Step 4: Write `src/components/StickyBar.astro`**

```astro
---
---
<div class="sticky-bar" id="stickyBar">
  <span class="dot"></span>
  <span>
    <span class="hide-mobile">Now booking — </span>
    <span class="serif">limited slots</span>
  </span>
  <a href="/book">Schedule Free Consult</a>
</div>

<script is:inline>
  (() => {
    const sticky = document.getElementById('stickyBar');
    if (!sticky) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600 && window.scrollY < document.body.scrollHeight - 1100) {
        sticky.classList.add('show');
      } else {
        sticky.classList.remove('show');
      }
    });
  })();
</script>

<style>
  .sticky-bar {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%) translateY(120%);
    z-index: 99;
    background: var(--ink);
    color: var(--cream);
    border-radius: 999px;
    padding: 0.6rem 0.6rem 0.6rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 1.3rem;
    box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.4);
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    font-size: 0.92rem;
  }
  .sticky-bar.show { transform: translateX(-50%) translateY(0); }
  .sticky-bar .dot {
    width: 8px; height: 8px;
    background: var(--lime);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--lime);
    animation: pulse 1.5s ease-in-out infinite;
  }
  .sticky-bar .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    color: var(--lime);
    font-size: 1.05rem;
  }
  .sticky-bar a {
    background: var(--lime);
    color: var(--ink);
    padding: 0.7rem 1.2rem;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.88rem;
    transition: background 0.3s;
    white-space: nowrap;
  }
  .sticky-bar a:hover { background: var(--cream); }

  @media (max-width: 640px) {
    .sticky-bar { font-size: 0.82rem; padding: 0.5rem 0.5rem 0.5rem 1.2rem; gap: 0.8rem; }
    .sticky-bar .hide-mobile { display: none; }
  }
</style>
```

### 4.5 Eyebrow

- [ ] **Step 5: Write `src/components/Eyebrow.astro`**

```astro
---
export interface Props {
  text: string;
  variant?: 'default' | 'lime-on-ink';
}
const { text, variant = 'default' } = Astro.props;
---
<div class:list={['eyebrow', variant]}>
  <span class="dot"></span>{text}
</div>

<style>
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: var(--ink);
    color: var(--lime);
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    margin-bottom: 1.5rem;
  }
  .eyebrow .dot {
    width: 6px; height: 6px;
    background: var(--lime);
    border-radius: 50%;
  }
  .eyebrow.lime-on-ink {
    background: var(--lime);
    color: var(--ink);
  }
  .eyebrow.lime-on-ink .dot { background: var(--ink); }
</style>
```

### 4.6 SectionTitle

- [ ] **Step 6: Write `src/components/SectionTitle.astro`**

Renders a section title that supports italic-serif inline emphasis via slot.

```astro
---
export interface Props {
  subtitle?: string;
}
const { subtitle } = Astro.props;
---
<h2 class="section-title"><slot /></h2>
{subtitle && <p class="section-sub">{subtitle}</p>}

<style>
  .section-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 0.95;
    font-weight: 700;
    letter-spacing: -0.035em;
    font-variation-settings: "wdth" 85;
    margin-bottom: 1rem;
  }
  .section-title :global(.serif) {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-variation-settings: normal;
  }
  .section-sub {
    font-size: 1.15rem;
    color: var(--ink-soft);
    max-width: 600px;
    line-height: 1.55;
    margin-bottom: 4rem;
  }
</style>
```

Usage: `<SectionTitle>Pick your <span class="serif">test.</span></SectionTitle>`

### 4.7 MegaButton

- [ ] **Step 7: Write `src/components/MegaButton.astro`**

```astro
---
export interface Props {
  href: string;
  variant?: 'lime' | 'ink';
}
const { href, variant = 'lime' } = Astro.props;
---
<a href={href} class:list={['btn-mega', variant]}>
  <slot />
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 9H16M16 9L10 3M16 9L10 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</a>

<style>
  .btn-mega {
    background: var(--lime);
    color: var(--ink);
    border: 2px solid var(--ink);
    padding: 1.2rem 1.8rem;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    border-radius: 999px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    box-shadow: 5px 5px 0 var(--ink);
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .btn-mega:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 var(--ink);
    background: #e1ff5e;
  }
  .btn-mega:active {
    transform: translate(3px, 3px);
    box-shadow: 1px 1px 0 var(--ink);
  }
  .btn-mega svg { transition: transform 0.3s; }
  .btn-mega:hover svg { transform: translateX(4px) rotate(-8deg); }

  .btn-mega.ink {
    background: var(--ink);
    color: var(--lime);
  }
  .btn-mega.ink:hover {
    background: var(--cream);
    color: var(--ink);
  }
</style>
```

### 4.8 GhostButton

- [ ] **Step 8: Write `src/components/GhostButton.astro`**

```astro
---
export interface Props {
  href: string;
}
const { href } = Astro.props;
---
<a href={href} class="btn-ghost"><slot /></a>

<style>
  .btn-ghost {
    background: transparent;
    color: var(--ink);
    border: 2px solid var(--ink);
    padding: 1.2rem 1.8rem;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    border-radius: 999px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s;
    display: inline-flex;
    align-items: center;
  }
  .btn-ghost:hover { background: var(--ink); color: var(--cream); }
</style>
```

- [ ] **Step 9: Verify atoms by composing PageLayout**

Edit `src/pages/index.astro`:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import Eyebrow from '../components/Eyebrow.astro';
import SectionTitle from '../components/SectionTitle.astro';
import MegaButton from '../components/MegaButton.astro';
import GhostButton from '../components/GhostButton.astro';
---
<PageLayout title="Athenaeum">
  <main class="max-w-site mx-auto px-8 py-20 relative z-10">
    <Eyebrow text="Atoms test" />
    <SectionTitle subtitle="Confirming components render.">
      Atom <span class="serif">smoke</span> test
    </SectionTitle>
    <div class="flex gap-4">
      <MegaButton href="#">Mega Button</MegaButton>
      <GhostButton href="#">Ghost Button</GhostButton>
    </div>
  </main>
</PageLayout>
```

Run `npm run dev`, open localhost:4321. Confirm:
- Black announcement bar on top with lime dot + italic serif text.
- Sticky nav with Athenaeum logo and 5 links.
- Footer at the bottom with 4 columns + copyright.
- Sticky bottom-center bar appears after scrolling 600px down.
- Buttons render with lime mega and ghost styles, hover effects work.

Stop server.

---

## Task 5: Molecule components — Part 1 (Marquee, ServiceCard, FeatureCard, HowCard, HeroStatCard, Hero)

**Files:**
- Create: `src/components/Marquee.astro`
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/FeatureCard.astro`
- Create: `src/components/HowCard.astro`
- Create: `src/components/HeroStatCard.astro`
- Create: `src/components/Hero.astro`

### 5.1 Marquee

- [ ] **Step 1: Write `src/components/Marquee.astro`**

```astro
---
export interface Props {
  items?: string[];
  serifIntro?: string;
}
const {
  items = ['Harvard', 'Yale', 'Princeton', 'Columbia', 'Brown', 'Dartmouth', 'Cornell', 'UPenn', 'MIT', 'Stanford'],
  serifIntro = 'Instructors from',
} = Astro.props;

// Render the items twice for seamless looping
const doubled = [...items, ...items];
---
<div class="marquee">
  <div class="marquee-track">
    {doubled.map((item, i) => (
      <>
        {i === Math.floor(doubled.length / 2) - items.length + 8 && (
          <span class="serif">{serifIntro}</span>
        )}
        <span>{item}</span>
      </>
    ))}
  </div>
</div>

<style>
  .marquee {
    background: var(--ink);
    color: var(--cream);
    padding: 1.2rem 0;
    overflow: hidden;
    position: relative;
    z-index: 2;
  }
  .marquee-track {
    display: flex;
    gap: 3rem;
    white-space: nowrap;
    animation: marquee 30s linear infinite;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    font-variation-settings: "wdth" 85;
  }
  .marquee-track > span:not(.serif)::after {
    content: "★";
    color: var(--lime);
    font-size: 1rem;
    margin-left: 3rem;
  }
  .marquee-track .serif {
    color: var(--lime);
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 1.6rem;
    font-weight: 400;
  }
</style>
```

### 5.2 ServiceCard

- [ ] **Step 2: Write `src/components/ServiceCard.astro`**

```astro
---
export interface Props {
  href: string;
  tag: string;        // e.g., "Weekly 1-on-1s"
  name: string;       // "AP" or "SAT"
  nameItalic?: string; // "Classes" appended in serif italic
  topics: string[];   // 1-2 lines of bullet topics
  blurb: string;
  color: 'lime' | 'tangerine' | 'ink' | 'cream';
}
const { href, tag, name, nameItalic, topics, blurb, color } = Astro.props;
---
<a href={href} class:list={['program-card', color]}>
  <div class="program-tag">{tag}</div>
  <h3>{name}{nameItalic && <> <span class="serif">{nameItalic}</span></>}</h3>
  <div class="program-meta">
    {topics.map((t) => <span>{t}</span>)}
  </div>
  <p>{blurb}</p>
  <span class="program-link">Learn more →</span>
</a>

<style>
  .program-card {
    border: 2px solid var(--ink);
    border-radius: 24px;
    padding: 2rem 1.6rem 1.6rem;
    background: var(--cream-deep);
    position: relative;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    min-height: 400px;
    text-decoration: none;
    color: var(--ink);
  }
  .program-card:hover { transform: translateY(-6px); box-shadow: 6px 6px 0 var(--ink); }

  .program-card.lime { background: var(--lime); }
  .program-card.tangerine { background: var(--tangerine); color: var(--cream); }
  .program-card.ink { background: var(--ink); color: var(--cream); }
  .program-card.cream { background: var(--cream); }

  .program-tag {
    align-self: flex-start;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    border: 1.5px solid currentColor;
    border-radius: 999px;
    opacity: 0.85;
  }
  .program-card h3 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 3.4rem;
    line-height: 0.9;
    font-weight: 700;
    letter-spacing: -0.045em;
    margin: 1.4rem 0 0.6rem;
    font-variation-settings: "wdth" 85;
  }
  .program-card h3 .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-variation-settings: normal;
  }
  .program-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.8rem;
    margin-bottom: 1rem;
    font-size: 0.82rem;
    opacity: 0.85;
  }
  .program-meta span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }
  .program-meta span::before {
    content: "";
    width: 5px;
    height: 5px;
    background: currentColor;
    border-radius: 50%;
    opacity: 0.6;
  }
  .program-card p {
    font-size: 0.92rem;
    line-height: 1.5;
    margin-bottom: 1.4rem;
    opacity: 0.88;
    flex-grow: 1;
  }
  .program-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: inherit;
    text-decoration: none;
    border-top: 1.5px solid currentColor;
    padding-top: 1rem;
    transition: gap 0.3s;
  }
  .program-card:hover .program-link { gap: 0.7rem; }
</style>
```

### 5.3 FeatureCard

- [ ] **Step 3: Write `src/components/FeatureCard.astro`**

For the "What's Included" section, dark-on-cream feature listing.

```astro
---
export interface Props {
  icon: string;        // single letter like "L"
  title: string;       // supports serif spans via slot below alternative
  titleSerif?: string; // optional italic part
  description: string;
  iconColor?: 'lime' | 'tangerine' | 'cream';
}
const { icon, title, titleSerif, description, iconColor = 'lime' } = Astro.props;
---
<div class="include-card">
  <div class:list={['include-icon', iconColor]}>{icon}</div>
  <h4>{title}{titleSerif && <> <span class="serif">{titleSerif}</span></>}</h4>
  <p>{description}</p>
</div>

<style>
  .include-card {
    border: 1px solid rgba(247, 240, 223, 0.18);
    border-radius: 20px;
    padding: 1.8rem;
    transition: all 0.4s;
    position: relative;
    overflow: hidden;
  }
  .include-card:hover {
    background: rgba(247, 240, 223, 0.04);
    transform: translateY(-3px);
  }
  .include-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.2rem;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
  }
  .include-icon.lime { background: var(--lime); color: var(--ink); }
  .include-icon.tangerine { background: var(--tangerine); color: var(--cream); }
  .include-icon.cream { background: var(--cream); color: var(--ink); }

  .include-card h4 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-bottom: 0.6rem;
    font-variation-settings: "wdth" 90;
    color: var(--cream);
  }
  .include-card h4 .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--lime);
    font-variation-settings: normal;
  }
  .include-card p {
    font-size: 0.92rem;
    line-height: 1.55;
    color: rgba(247, 240, 223, 0.75);
  }
</style>
```

### 5.4 HowCard

- [ ] **Step 4: Write `src/components/HowCard.astro`**

```astro
---
export interface Props {
  num: number;             // 1, 2, 3
  numColor: 'ink' | 'lime' | 'tangerine';
  title: string;
  titleSerif?: string;
  description: string;
}
const { num, numColor, title, titleSerif, description } = Astro.props;
---
<div class="how-card">
  <div class:list={['how-num', numColor]}>{num}</div>
  <h4>{title}{titleSerif && <> <span class="serif">{titleSerif}</span></>}</h4>
  <p>{description}</p>
</div>

<style>
  .how-card {
    background: var(--cream);
    border: 2px solid var(--ink);
    border-radius: 24px;
    padding: 2rem;
    transition: transform 0.3s;
  }
  .how-card:hover { transform: translateY(-4px); }
  .how-num {
    width: 56px; height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .how-num.ink { background: var(--ink); color: var(--lime); }
  .how-num.lime { background: var(--lime); color: var(--ink); }
  .how-num.tangerine { background: var(--tangerine); color: var(--cream); }

  .how-card h4 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 0.8rem;
    font-variation-settings: "wdth" 90;
  }
  .how-card h4 .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-variation-settings: normal;
  }
  .how-card p { color: var(--ink-soft); font-size: 0.95rem; line-height: 1.55; }
</style>
```

### 5.5 HeroStatCard

- [ ] **Step 5: Write `src/components/HeroStatCard.astro`**

```astro
---
export interface Props {
  variant: 'ink' | 'lime' | 'tangerine';
  text: string;
}
const { variant, text } = Astro.props;
---
<div class:list={['stat-card', variant]}>
  <div class="stat-num"><slot name="num" /></div>
  <div class="stat-text">{text}</div>
</div>

<style>
  .stat-card {
    background: var(--ink);
    color: var(--cream);
    padding: 1.6rem 1.8rem;
    border-radius: 22px;
    position: relative;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .stat-card:hover { transform: translateY(-4px) rotate(-1deg); }
  .stat-card.lime { background: var(--lime); color: var(--ink); }
  .stat-card.tangerine { background: var(--tangerine); color: var(--cream); }
  .stat-num {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 3.2rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.04em;
    font-variation-settings: "wdth" 85;
    display: flex;
    align-items: baseline;
    gap: 0.2rem;
  }
  .stat-num :global(.small) { font-size: 1.4rem; font-weight: 500; }
  .stat-num :global(.serif) {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
  }
  .stat-text {
    margin-top: 0.4rem;
    font-size: 0.92rem;
    opacity: 0.88;
    line-height: 1.4;
  }
</style>
```

### 5.6 Hero

- [ ] **Step 6: Write `src/components/Hero.astro`**

```astro
---
import MegaButton from './MegaButton.astro';
import GhostButton from './GhostButton.astro';
import HeroStatCard from './HeroStatCard.astro';
---
<section class="hero">
  <div class="hero-pill">
    <span class="pulse"></span>
    <span>One-on-one online sessions · Top-1% Ivy League tutors</span>
  </div>

  <h1>
    Test prep<br>
    & college counseling,<br>
    taught by <span class="serif">Ivy League</span> <span class="highlight">minds.</span>
  </h1>

  <div class="hero-row">
    <div>
      <p class="hero-sub">
        One-on-one classes for <strong>AP, SAT, ACT &amp; college counseling</strong> taught by tutors from Harvard, Yale, Princeton, and Columbia. Live online. Recorded for review. Built around your student.
      </p>

      <div class="hero-cta">
        <MegaButton href="/book">Schedule Free Consult</MegaButton>
        <GhostButton href="/tutors">Browse Tutors</GhostButton>
      </div>

      <div class="hero-trust">
        <span>✓ One-on-one attention</span>
        <span class="serif">·</span>
        <span>✓ Live + recorded</span>
        <span class="serif">·</span>
        <span>✓ First-week money-back</span>
      </div>
    </div>

    <div class="hero-stats">
      <HeroStatCard variant="lime" text="One-on-one attention. Every session built around your student.">
        <span slot="num">1:1</span>
      </HeroStatCard>
      <HeroStatCard variant="ink" text="Attend live or rewatch on demand. Every session is yours to keep.">
        <span slot="num">Live<span class="serif">+</span><span class="small">recorded</span></span>
      </HeroStatCard>
      <HeroStatCard variant="tangerine" text="Tutors from Harvard, Yale, Princeton, Columbia &amp; beyond.">
        <span slot="num">Ivy<span class="serif">League</span></span>
      </HeroStatCard>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 5rem 2rem 4rem;
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
  }
  .hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--ink);
    color: var(--cream);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.8rem;
    margin-bottom: 2rem;
    animation: fadeUp 0.8s 0.1s both;
  }
  .hero-pill .pulse {
    width: 7px; height: 7px;
    background: var(--lime);
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }
  .hero h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(3rem, 9vw, 8.5rem);
    line-height: 0.88;
    font-weight: 700;
    letter-spacing: -0.045em;
    margin-bottom: 2.5rem;
    font-variation-settings: "wdth" 85;
    animation: fadeUp 1s 0.2s both;
  }
  .hero h1 .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.01em;
    font-variation-settings: normal;
  }
  .hero h1 .highlight {
    position: relative;
    display: inline-block;
    z-index: 1;
    padding: 0 0.15em;
  }
  .hero h1 .highlight::before {
    content: "";
    position: absolute;
    inset: 0.12em -0.05em 0.18em;
    background: var(--lime);
    z-index: -1;
    transform: skew(-3deg);
    animation: highlightIn 0.9s 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
    transform-origin: left;
  }

  .hero-row {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 4rem;
    align-items: end;
  }
  .hero-sub {
    font-size: 1.25rem;
    line-height: 1.55;
    color: var(--ink-soft);
    max-width: 540px;
    margin-bottom: 2rem;
    animation: fadeUp 1s 0.4s both;
  }
  .hero-cta {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    animation: fadeUp 1s 0.5s both;
  }
  .hero-trust {
    margin-top: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.85rem;
    color: var(--ink-faint);
    animation: fadeUp 1s 0.7s both;
    flex-wrap: wrap;
  }
  .hero-trust .serif {
    color: var(--ink);
    font-size: 1rem;
    font-family: 'Instrument Serif', serif;
    font-style: italic;
  }
  .hero-stats {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: fadeUp 1.2s 0.6s both;
  }
  @media (max-width: 1024px) {
    .hero-row { grid-template-columns: 1fr; gap: 3rem; }
  }
  @media (max-width: 640px) {
    .hero { padding: 3rem 1.2rem 3rem; }
  }
</style>
```

- [ ] **Step 7: Verify Hero + Marquee render**

Edit `src/pages/index.astro`:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import Hero from '../components/Hero.astro';
import Marquee from '../components/Marquee.astro';
---
<PageLayout title="Athenaeum — Test prep & college counseling, taught by Ivy League minds.">
  <Hero />
  <Marquee />
</PageLayout>
```

Run `npm run dev`. Confirm: hero renders identical to the mockup (animated entrance, lime-highlight word "minds", 3 stat cards on the right, marquee scrolls horizontally). Stop server.

---

## Task 6: Molecule components — Part 2 (TutorCard, FAQAccordion, BigCTA, ComparisonTable, CalEmbed)

**Files:**
- Create: `src/components/TutorCard.astro`
- Create: `src/components/FAQAccordion.astro`
- Create: `src/components/BigCTA.astro`
- Create: `src/components/ComparisonTable.astro`
- Create: `src/components/CalEmbed.astro`

### 6.1 TutorCard

- [ ] **Step 1: Write `src/components/TutorCard.astro`**

```astro
---
export interface Props {
  href: string;          // /tutors/eliza-m
  monogram: string;      // "EM"
  school: string;        // "Harvard '26"
  name: string;          // "Eliza"
  nameItalic: string;    // "M."
  subjectsLine: string;  // "AP Bio · AP Chem · SAT Math"
  gradient: 'lime' | 'tangerine' | 'plum' | 'ink';
}
const { href, monogram, school, name, nameItalic, subjectsLine, gradient } = Astro.props;
---
<a href={href} class="tutor" data-subjects={subjectsLine}>
  <div class:list={['tutor-photo', gradient]}>
    <div class="tutor-monogram">{monogram}</div>
    <div class="tutor-school-tag">{school}</div>
  </div>
  <div class="tutor-name">{name} <span class="serif">{nameItalic}</span></div>
  <div class="tutor-subject">{subjectsLine}</div>
</a>

<style>
  .tutor {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .tutor:hover { transform: translateY(-6px); }
  .tutor-photo {
    aspect-ratio: 4/5;
    border-radius: 18px;
    border: 2px solid var(--ink);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .tutor-photo.lime { background: linear-gradient(135deg, var(--lime), #a8c93a); color: var(--ink); }
  .tutor-photo.tangerine { background: linear-gradient(135deg, var(--tangerine), #c84618); color: var(--cream); }
  .tutor-photo.plum { background: linear-gradient(135deg, var(--plum), #1a0e2e); color: var(--cream); }
  .tutor-photo.ink { background: linear-gradient(135deg, var(--ink), #2a2a2a); color: var(--cream); }

  .tutor-monogram {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 5rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    font-variation-settings: "wdth" 80;
  }
  .tutor-school-tag {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: var(--ink);
    color: var(--lime);
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .tutor-name {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 0.2rem;
  }
  .tutor-name .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
  }
  .tutor-subject {
    color: var(--ink-faint);
    font-size: 0.9rem;
  }
</style>
```

### 6.2 FAQAccordion

- [ ] **Step 2: Write `src/components/FAQAccordion.astro`**

```astro
---
export interface FAQItem {
  question: string;     // supports HTML for serif spans, e.g. "How <span class='serif'>big</span> are sessions?"
  answer: string;
}
export interface Props {
  items: FAQItem[];
}
const { items } = Astro.props;
---
<div class="faq-wrap">
  {items.map((item) => (
    <div class="faq-item">
      <div class="faq-q">
        <span set:html={item.question} />
        <div class="faq-plus">+</div>
      </div>
      <div class="faq-a">{item.answer}</div>
    </div>
  ))}
</div>

<script is:inline>
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('click', () => item.classList.toggle('open'));
  });
</script>

<style>
  .faq-wrap { max-width: 880px; margin: 0 auto; }
  .faq-item {
    border-top: 1.5px solid var(--ink);
    padding: 1.6rem 0;
    cursor: pointer;
  }
  .faq-item:last-of-type { border-bottom: 1.5px solid var(--ink); }
  .faq-q {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    font-variation-settings: "wdth" 90;
  }
  .faq-q :global(.serif) {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-variation-settings: normal;
  }
  .faq-plus {
    flex-shrink: 0;
    width: 38px; height: 38px;
    background: var(--lime);
    border: 1.5px solid var(--ink);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .faq-item.open .faq-plus { transform: rotate(45deg); background: var(--tangerine); color: var(--cream); }
  .faq-a {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.4s ease;
    color: var(--ink-soft);
    line-height: 1.6;
  }
  .faq-item.open .faq-a { max-height: 320px; padding-top: 1rem; }
</style>
```

### 6.3 BigCTA

- [ ] **Step 3: Write `src/components/BigCTA.astro`**

```astro
---
import MegaButton from './MegaButton.astro';
export interface Props {
  title: string;          // supports serif spans via slot below alternative
  subtitle: string;
  ctaHref: string;
  ctaLabel: string;
}
const { title, subtitle, ctaHref, ctaLabel } = Astro.props;
---
<section class="big-cta">
  <h2 class="reveal" set:html={title} />
  <p class="reveal">{subtitle}</p>
  <div class="reveal" style="display:inline-block">
    <MegaButton href={ctaHref} variant="ink">{ctaLabel}</MegaButton>
  </div>
  <div class="big-cta-foot reveal">
    <div><span class="check">✓</span> One-on-one attention</div>
    <div><span class="check">✓</span> Live + recorded</div>
    <div><span class="check">✓</span> First-week refund</div>
  </div>
</section>

<style>
  .big-cta {
    background: var(--lime);
    padding: 6rem 2rem 7rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-top: 2px solid var(--ink);
  }
  .big-cta::before, .big-cta::after {
    content: "★";
    position: absolute;
    color: var(--ink);
    font-size: 8rem;
    opacity: 0.15;
    pointer-events: none;
  }
  .big-cta::before { top: 10%; left: 5%; transform: rotate(-15deg); }
  .big-cta::after { bottom: 10%; right: 5%; transform: rotate(20deg); }

  .big-cta h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2.5rem, 8vw, 7rem);
    line-height: 0.9;
    font-weight: 700;
    letter-spacing: -0.04em;
    font-variation-settings: "wdth" 85;
    margin-bottom: 1.5rem;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }
  .big-cta h2 :global(.serif) {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    font-variation-settings: normal;
  }
  .big-cta p {
    font-size: 1.2rem;
    color: var(--ink-soft);
    max-width: 580px;
    margin: 0 auto 2.5rem;
    line-height: 1.5;
  }
  .big-cta-foot {
    margin-top: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 1.3rem;
    font-size: 0.9rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .big-cta-foot div {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .big-cta-foot .check {
    width: 18px; height: 18px;
    background: var(--ink);
    color: var(--lime);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
  }
</style>
```

### 6.4 ComparisonTable

- [ ] **Step 4: Write `src/components/ComparisonTable.astro`**

```astro
---
export interface Row {
  label: string;
  athenaeum: string;
  chain: string;
}
export interface Props {
  rows: Row[];
}
const { rows } = Astro.props;
---
<div class="compare">
  <div class="compare-head">
    <div class="compare-cell label"></div>
    <div class="compare-cell us">Athenaeum</div>
    <div class="compare-cell them">A big tutoring chain</div>
  </div>
  {rows.map((row) => (
    <div class="compare-row">
      <div class="compare-cell label">{row.label}</div>
      <div class="compare-cell us">{row.athenaeum}</div>
      <div class="compare-cell them">{row.chain}</div>
    </div>
  ))}
</div>

<style>
  .compare {
    border: 2px solid var(--ink);
    border-radius: 24px;
    overflow: hidden;
    background: var(--cream);
  }
  .compare-head, .compare-row {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1.2fr;
  }
  .compare-head {
    background: var(--ink);
    color: var(--cream);
  }
  .compare-head .compare-cell.us { color: var(--lime); }
  .compare-head .compare-cell.them { color: rgba(247, 240, 223, 0.7); }
  .compare-row { border-top: 1.5px solid var(--line); }
  .compare-row:nth-child(even) { background: var(--cream-deep); }
  .compare-cell {
    padding: 1.2rem 1.4rem;
    font-size: 0.95rem;
  }
  .compare-cell.label {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .compare-head .compare-cell {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.78rem;
  }
  @media (max-width: 768px) {
    .compare-head, .compare-row { grid-template-columns: 1fr; }
    .compare-cell.label { background: var(--ink); color: var(--lime); }
  }
</style>
```

### 6.5 CalEmbed

- [ ] **Step 5: Write `src/components/CalEmbed.astro`**

Wraps the Cal.com inline snippet. Loads only on pages that include this component.

```astro
---
export interface Props {
  calLink: string;       // e.g., "athenaeum/consult" (the cal.com user/event slug)
  embedId?: string;      // unique id if multiple embeds on the page
  height?: string;       // CSS height, e.g., "700px"
}
const { calLink, embedId = 'cal-embed', height = '700px' } = Astro.props;
---
<div id={embedId} style={`min-height:${height};width:100%`}></div>

<script define:vars={{ calLink, embedId }}>
  import('@calcom/embed-snippet').then((mod) => {
    const Cal = mod.default;
    Cal('init', { origin: 'https://cal.com' });
    Cal('inline', {
      elementOrSelector: '#' + embedId,
      calLink,
      config: { layout: 'month_view' },
    });
    Cal('ui', {
      styles: {
        branding: {
          brandColor: '#d4f04a',
        },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  });
</script>
```

- [ ] **Step 6: Verify TutorCard, FAQ, BigCTA, ComparisonTable**

Temporarily edit `src/pages/index.astro` to render each:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import TutorCard from '../components/TutorCard.astro';
import FAQAccordion from '../components/FAQAccordion.astro';
import BigCTA from '../components/BigCTA.astro';
import ComparisonTable from '../components/ComparisonTable.astro';
---
<PageLayout title="Athenaeum — Component test">
  <main class="max-w-site mx-auto px-8 py-12 relative z-10">
    <section class="grid grid-cols-4 gap-4 mb-12">
      <TutorCard href="#" monogram="EM" school="Harvard '26" name="Eliza" nameItalic="M." subjectsLine="AP Bio · AP Chem · SAT Math" gradient="lime" />
      <TutorCard href="#" monogram="JK" school="Yale '25" name="Jian" nameItalic="K." subjectsLine="AP Calc · ACT · SAT Math" gradient="tangerine" />
      <TutorCard href="#" monogram="SR" school="Princeton '26" name="Sofia" nameItalic="R." subjectsLine="AP Lit · College Counseling" gradient="plum" />
      <TutorCard href="#" monogram="AO" school="Columbia '25" name="Adetola" nameItalic="O." subjectsLine="AP Physics · ACT Sci · SAT" gradient="ink" />
    </section>
    <section class="mb-12">
      <FAQAccordion items={[
        { question: "How <span class='serif'>big</span> are sessions?", answer: "Every Athenaeum session is one-on-one. Just you (or your student) and the tutor." },
        { question: "What if my student <span class='serif'>misses</span> a lesson?", answer: "Recordings post within hours; ask your tutor in office hours for a quick recap." },
      ]} />
    </section>
    <section class="px-8 py-12">
      <ComparisonTable rows={[
        { label: 'Class size', athenaeum: '1-on-1', chain: '10-20 in a session' },
        { label: 'Tutor caliber', athenaeum: 'Top-1% Ivy League', chain: 'College students or career tutors, varied' },
      ]} />
    </section>
  </main>
  <BigCTA
    title="Reserve your <span class='serif'>free</span> consult."
    subtitle="A 30-minute consult covers your timeline, target score, and tutor match. No commitment."
    ctaHref="/book"
    ctaLabel="Book a Free Consult"
  />
</PageLayout>
```

Run `npm run dev`. Confirm:
- 4 tutor cards with gradient backgrounds, monograms, school tags.
- FAQ items expand/collapse on click, lime → tangerine + icon.
- ComparisonTable renders 3-col grid with header band.
- BigCTA renders with star background and lime page section.

Stop server.

---

## Task 7: Data layer (site, services, faqs, why-different, packages)

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/services.ts`
- Create: `src/data/faqs.ts`
- Create: `src/data/why-different.ts`
- Create: `src/data/packages.ts`

- [ ] **Step 1: Write `src/data/site.ts`**

```ts
export const site = {
  brand: 'Athenaeum',
  domain: 'athenaeum.co',
  email: 'hello@athenaeum.co',
  copyright: '© 2026 Athenaeum & Co. All rights reserved.',
  tagline: 'One-on-one test prep & college counseling, taught by Ivy League tutors.',
  // Cal.com root user slug used for the team round-robin consult event.
  // Replace with real Cal.com handle when ready to launch.
  consultCalLink: 'athenaeum/consult',
};
```

- [ ] **Step 2: Write `src/data/packages.ts`**

```ts
export type Package = { hours: number; price: number; perHour: number; tagline: string };

export const packages: Package[] = [
  { hours: 8,  price: 1200, perHour: 150, tagline: 'Targeted prep for one section or topic' },
  { hours: 16, price: 2240, perHour: 140, tagline: 'Full-test prep with weekly cadence' },
  { hours: 24, price: 3120, perHour: 130, tagline: 'Deep prep plus practice tests and review' },
];
```

- [ ] **Step 3: Write `src/data/services.ts`**

```ts
import type { Package } from './packages';
import { packages } from './packages';

export type ServiceSlug = 'ap' | 'sat' | 'act' | 'college-counseling';
export type CardColor = 'lime' | 'tangerine' | 'ink' | 'cream';

export type FAQ = { question: string; answer: string };

export interface Service {
  slug: ServiceSlug;
  name: string;
  longName: string;
  tagline: string;
  blurb: string;
  cardColor: CardColor;
  cadence: string;
  topics: string[];
  startingAtHourly: number;
  packages: Package[];
  faqs: FAQ[];
}

export const services: Service[] = [
  {
    slug: 'ap',
    name: 'AP',
    longName: 'AP Tutoring',
    tagline: 'Master the curriculum and the exam at the same time.',
    blurb: 'Subject-specific 1-on-1 tutoring covering the full AP curriculum, with weekly problem sets and timed practice through the May exam.',
    cardColor: 'lime',
    cadence: 'Weekly 1-on-1s',
    topics: ['Calc AB / BC', 'Bio · Chem · Physics', 'Lit · Lang', 'Stats · CS', 'History · Econ'],
    startingAtHourly: 130,
    packages,
    faqs: [
      { question: "When should we <span class='serif'>start</span> AP prep?", answer: "Most students start 8-12 weeks before the May exam. For especially demanding APs (Calc BC, Physics C, Chemistry), 4-6 months is ideal." },
      { question: "Do you cover <span class='serif'>school</span> coursework or just the exam?", answer: "Both. Your tutor will support classroom work and pivot to exam-specific prep as May approaches. The two reinforce each other." },
      { question: "What's the <span class='serif'>format</span>?", answer: "Two 1-on-1 sessions per week is most common. Sessions are recorded, posted to your portal, and followed by a problem set for the week ahead." },
      { question: "Can we focus on a <span class='serif'>single</span> hard unit?", answer: "Yes. Short packages (8 hours) are designed for one section or topic that's been a sticking point." },
    ],
  },
  {
    slug: 'sat',
    name: 'SAT',
    longName: 'SAT Tutoring',
    tagline: 'A custom plan, hand-graded homework, and four full practice tests.',
    blurb: 'Calibrated for the digital SAT. Section drills, adaptive strategies, and full proctored practice tests built into the plan.',
    cardColor: 'tangerine',
    cadence: 'Weekly 1-on-1s',
    topics: ['Reading & Writing', 'Math (calc + no-calc)', 'Adaptive strategy', '4+ practice tests'],
    startingAtHourly: 130,
    packages,
    faqs: [
      { question: "How long does a <span class='serif'>full</span> prep cycle take?", answer: "Most students prep over 10-14 weeks. We design the plan around your test date so practice tests fall at the right cadence." },
      { question: "Is this for the <span class='serif'>digital</span> SAT?", answer: "Yes. The plan, drills, and practice tests are all calibrated for the College Board's digital format." },
      { question: "How are <span class='serif'>practice</span> tests run?", answer: "Proctored and timed. Your tutor then walks every miss with you, question by question. The walkthrough is where the score moves." },
      { question: "What's a <span class='serif'>typical</span> score gain?", answer: "We commit to specific plans not specific points. A strong starting baseline plus 16-24 hours of focused 1-on-1 tends to move students 100-180 points." },
    ],
  },
  {
    slug: 'act',
    name: 'ACT',
    longName: 'ACT Tutoring',
    tagline: 'Pacing is the whole game. We coach it from day one.',
    blurb: 'Section coverage plus the pacing drills that make the ACT different. Optional Writing.',
    cardColor: 'ink',
    cadence: 'Weekly 1-on-1s',
    topics: ['English', 'Math', 'Reading', 'Science', 'Optional Writing'],
    startingAtHourly: 130,
    packages,
    faqs: [
      { question: "Should we pick <span class='serif'>SAT</span> or <span class='serif'>ACT</span>?", answer: "Start with a 30-min consult. We look at your math/science strengths and reading speed and recommend the better fit. Many students try both before committing." },
      { question: "How is <span class='serif'>pacing</span> different from SAT?", answer: "ACT is faster, more reading-heavy, includes Science, and rewards a different skim/lock-in cadence. We drill pacing on every section." },
      { question: "Is the <span class='serif'>Science</span> section actually science?", answer: "Not really. It's a reading-and-charts section. We teach the specific reading patterns that make it tractable." },
      { question: "What about <span class='serif'>Writing</span>?", answer: "Optional. Your tutor will tell you whether your target schools care, and add the section to the plan if so." },
    ],
  },
  {
    slug: 'college-counseling',
    name: 'College Counseling',
    longName: 'College Counseling',
    tagline: 'School list, essays, interviews, timeline. One mentor across all of it.',
    blurb: 'Application strategy from school list through final submit. Essay coaching, interview prep, timeline guidance, and an honest read of fit.',
    cardColor: 'cream',
    cadence: 'Monthly or weekly',
    topics: ['School list strategy', 'Application essays', 'Interview prep', 'Timeline & deadlines', 'Activity narrative'],
    startingAtHourly: 160,
    packages: [
      { hours: 8,  price: 1440, perHour: 180, tagline: 'Essay focus or interview sprint' },
      { hours: 16, price: 2720, perHour: 170, tagline: 'Full essay + school list package' },
      { hours: 24, price: 3840, perHour: 160, tagline: 'End-to-end from sophomore-junior planning to submit' },
    ],
    faqs: [
      { question: "When should we <span class='serif'>start</span> college counseling?", answer: "Spring of sophomore year is ideal for full planning. Rising seniors can also start in May/June and ship a strong application." },
      { question: "Does this <span class='serif'>replace</span> our school counselor?", answer: "It complements them. School counselors are essential for transcripts and rec letters. Athenaeum brings the focused application work — essays, fit research, narrative, interviews." },
      { question: "How many <span class='serif'>schools</span> do you help with?", answer: "Usually 10-15. The list is the strategy. Reach / target / likely balance, optimizing your highest-probability great-fit outcomes." },
      { question: "What about <span class='serif'>scholarships</span>?", answer: "Yes, including merit-based and need-based aid strategy. We'll fold it into the school list conversation." },
    ],
  },
];
```

- [ ] **Step 4: Write `src/data/faqs.ts`**

Homepage FAQ bank (6 items). Each service has its own FAQ list in services.ts.

```ts
import type { FAQ } from './services';

export const homepageFAQs: FAQ[] = [
  {
    question: "How <span class='serif'>big</span> are sessions?",
    answer: "Every Athenaeum session is one-on-one. Just you (or your student) and the tutor. No cohorts, no recordings of other students.",
  },
  {
    question: "Are sessions <span class='serif'>live</span> or pre-recorded?",
    answer: "Sessions are live online over Zoom. Every session is also recorded and posted to your student portal, so you can rewatch anytime.",
  },
  {
    question: "What happens if my student <span class='serif'>misses</span> a session?",
    answer: "Recordings post within a few hours. Office hours later that week are a great place to catch up on anything that needs reinforcing.",
  },
  {
    question: "How much does it <span class='serif'>cost?</span>",
    answer: "Pricing starts at $130/hour and varies by tutor and service. Most students book a 16 or 24-hour package. Full pricing is shared on the free consult call.",
  },
  {
    question: "What if it isn't a <span class='serif'>good fit?</span>",
    answer: "Full refund within the first week of any package, no questions asked. After that we'll work with you on the right fix — switching tutors, switching focus, or a partial credit.",
  },
  {
    question: "How do you <span class='serif'>match</span> students to tutors?",
    answer: "The free 30-min consult is the matching step. We look at the test, the timeline, the personality fit, and the tutor's availability, and recommend the right person.",
  },
];
```

- [ ] **Step 5: Write `src/data/why-different.ts`**

Twelve reasons grouped into four pillars (from spec §8).

```ts
export type Pillar = 'Talent' | 'Method' | 'Touch' | 'Trust';

export interface Reason {
  pillar: Pillar;
  title: string;
  titleSerif?: string;       // optional italic part appended after title
  body: string;
  iconLetter: string;        // one-letter glyph for the icon block
  iconColor: 'lime' | 'tangerine' | 'cream';
}

export const reasons: Reason[] = [
  {
    pillar: 'Talent',
    title: 'Top-1% Ivy League',
    titleSerif: 'tutors',
    body: 'Harvard, Yale, Princeton, Columbia, MIT, Stanford. Every tutor scored at the top of the exam they teach. They remember what worked.',
    iconLetter: 'T',
    iconColor: 'lime',
  },
  {
    pillar: 'Method',
    title: 'Custom lesson plans,',
    titleSerif: 'every student',
    body: 'A diagnostic week determines the gaps. The weekly plan adapts to scores and pace. No cookie-cutter curriculum.',
    iconLetter: 'C',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Method',
    title: 'Hand-graded',
    titleSerif: 'homework',
    body: 'Your tutor reviews every problem set personally. Real, specific feedback, not auto-graded.',
    iconLetter: 'H',
    iconColor: 'cream',
  },
  {
    pillar: 'Method',
    title: 'Real practice tests,',
    titleSerif: 'real walkthroughs',
    body: 'Proctored, timed conditions. Then a question-by-question debrief on every miss. The walkthrough is where the score moves.',
    iconLetter: 'P',
    iconColor: 'lime',
  },
  {
    pillar: 'Method',
    title: 'Test-day',
    titleSerif: 'strategy session',
    body: 'The final week is pacing, anxiety, and mindset, not new content. The non-academic side that matters on the actual exam.',
    iconLetter: 'S',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Method',
    title: 'Integrated',
    titleSerif: 'college counseling',
    body: 'Your test-prep tutor knows your college list. One conversation across scores, GPA, essays, fit. Not five vendors.',
    iconLetter: 'I',
    iconColor: 'cream',
  },
  {
    pillar: 'Touch',
    title: 'Office hours +',
    titleSerif: 'async support',
    body: 'Message your tutor for quick questions between sessions. No 24-hour-response gulf.',
    iconLetter: 'O',
    iconColor: 'lime',
  },
  {
    pillar: 'Touch',
    title: 'Recorded sessions,',
    titleSerif: 'kept in your portal',
    body: 'Rewatch anytime. Useful before the exam, useful during a tough unit.',
    iconLetter: 'R',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Touch',
    title: 'Biweekly',
    titleSerif: 'parent updates',
    body: 'A short note on progress, focus areas, and what is next. Quiet visibility, no surprises.',
    iconLetter: 'B',
    iconColor: 'cream',
  },
  {
    pillar: 'Trust',
    title: 'Free 30-min',
    titleSerif: 'consult first',
    body: 'Meet the fit before any commitment. We will tell you honestly if Athenaeum is not the right match.',
    iconLetter: 'F',
    iconColor: 'lime',
  },
  {
    pillar: 'Trust',
    title: 'No long-term',
    titleSerif: 'contracts',
    body: 'Pay per package: 8 / 16 / 24 hours. Cancel anytime.',
    iconLetter: 'N',
    iconColor: 'tangerine',
  },
  {
    pillar: 'Trust',
    title: 'First-week',
    titleSerif: 'money-back',
    body: 'Try a week. Full refund if it is not the right fit, no questions asked.',
    iconLetter: 'M',
    iconColor: 'cream',
  },
];

export const comparisonRows = [
  { label: 'Class size', athenaeum: '1-on-1, every session', chain: '6-20 students per session' },
  { label: 'Tutor caliber', athenaeum: 'Top-1% Ivy League students who scored at the top', chain: 'College students or career tutors, mixed credentials' },
  { label: 'Lesson plan', athenaeum: 'Custom plan from diagnostic week', chain: 'Same curriculum for everyone' },
  { label: 'Homework feedback', athenaeum: 'Tutor reviews every problem set personally', chain: 'Auto-graded or skimmed' },
  { label: 'Practice tests', athenaeum: 'Proctored + question-by-question walkthrough', chain: 'Self-graded online tests' },
  { label: 'College counseling', athenaeum: 'Integrated with the same tutor', chain: 'Separate vendor, $$ extra' },
  { label: 'Contract', athenaeum: 'Pay per package, cancel anytime', chain: '6-12 month commitment' },
  { label: 'Money-back', athenaeum: 'Full refund first week, no questions', chain: 'Conditional, school-by-school' },
];
```

- [ ] **Step 6: Verify data files type-check**

```bash
npm run astro -- check
```

Expected: no errors. (If `astro check` is missing, install: `npm install --save-dev @astrojs/check typescript`.)

---

## Task 8: Content collections + tutor MDX

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/tutors/eliza-m.mdx`
- Create: `src/content/tutors/jian-k.mdx`
- Create: `src/content/tutors/sofia-r.mdx`
- Create: `src/content/tutors/adetola-o.mdx`

- [ ] **Step 1: Write `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const tutors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),                              // "Eliza M."
    fullName: z.string(),                          // "Eliza Martinez"
    monogram: z.string().length(2),                // "EM"
    school: z.string(),                            // "Harvard"
    classYear: z.string(),                         // "'26"
    major: z.string().optional(),
    subjects: z.array(z.string()),
    serviceSlugs: z.array(z.enum(['ap', 'sat', 'act', 'college-counseling'])),
    hourlyRate: z.number(),
    calLinks: z.object({
      consult: z.string(),
      firstLesson: z.string(),
    }),
    cardGradient: z.enum(['lime', 'tangerine', 'plum', 'ink']),
    scoreHighlights: z.array(z.string()).optional(),
    headline: z.string(),                          // 1-liner used in profile hero
  }),
});

export const collections = { tutors };
```

- [ ] **Step 2: Write `src/content/tutors/eliza-m.mdx`**

```mdx
---
name: "Eliza M."
fullName: "Eliza Martinez"
monogram: "EM"
school: "Harvard"
classYear: "'26"
major: "Molecular & Cellular Biology"
subjects: ["AP Bio", "AP Chem", "SAT Math"]
serviceSlugs: ["ap", "sat"]
hourlyRate: 140
calLinks:
  consult: "athenaeum-eliza/consult"
  firstLesson: "athenaeum-eliza/first-lesson"
cardGradient: "lime"
scoreHighlights:
  - "1580 SAT"
  - "5 on AP Bio · 5 on AP Chem"
headline: "Premed at Harvard who turned AP Bio and Chem into the highest-rated APs at her high school."
---

I grew up wanting to be a doctor and discovered I love teaching the science even more. At Harvard I'm studying Molecular and Cellular Biology, work in a neurodegeneration lab, and TA for the intro chemistry sequence.

When I tutor I want students to feel the difference between "memorizing for the exam" and actually understanding a system. AP Bio and AP Chem are sprawling on the surface, but they reward students who can connect mechanisms across units. My weekly plans are built around that connective tissue plus targeted FRQ drills as May approaches.

**How I work with students**

- Diagnostic week: we figure out which units are weak and which are exam-priority.
- Weekly plan adjusts as your scores move.
- Homework gets marked up by me personally, not pattern-matched.
- I keep a running practice-test schedule and walk every missed question with you.

**Outside tutoring**

I row for Harvard Lightweight Crew and bake bread that's only sometimes edible.
```

- [ ] **Step 3: Write `src/content/tutors/jian-k.mdx`**

```mdx
---
name: "Jian K."
fullName: "Jian Kim"
monogram: "JK"
school: "Yale"
classYear: "'25"
major: "Applied Mathematics"
subjects: ["AP Calc AB/BC", "ACT", "SAT Math"]
serviceSlugs: ["ap", "sat", "act"]
hourlyRate: 140
calLinks:
  consult: "athenaeum-jian/consult"
  firstLesson: "athenaeum-jian/first-lesson"
cardGradient: "tangerine"
scoreHighlights:
  - "36 ACT (perfect Math, perfect Science)"
  - "5 on AP Calc BC"
headline: "Applied math at Yale, perfect ACT, and a pacing system that's moved a lot of students out of stuck."
---

The thing I think test-prep companies get wrong is treating Math as a content problem. For most students hitting a plateau on SAT Math or ACT Math, the bottleneck isn't content. It's pace, recognition speed, and a couple of high-leverage strategies you don't see in the textbook.

I score the ACT in the Math/Science block better than most people score their best section, and I scored Math at the same level on the SAT. My job is to transfer those reflexes to you.

**How I work with students**

- I record short pace drills for between sessions: you do 5 questions in 7 minutes, send me the recording, I respond by morning.
- For AP Calc, I run the curriculum strictly, but the last 2 weeks before the exam are pure FRQ training.
- For SAT/ACT Math, I keep a "fingerprint" sheet of your error types and we kill them one at a time.

**Outside tutoring**

I play chess (1850 USCF) and run trails. I also TA Stat 101 at Yale.
```

- [ ] **Step 4: Write `src/content/tutors/sofia-r.mdx`**

```mdx
---
name: "Sofia R."
fullName: "Sofia Reyes"
monogram: "SR"
school: "Princeton"
classYear: "'26"
major: "Comparative Literature"
subjects: ["AP Lit", "AP Lang", "SAT R&W", "College Counseling"]
serviceSlugs: ["ap", "sat", "college-counseling"]
hourlyRate: 150
calLinks:
  consult: "athenaeum-sofia/consult"
  firstLesson: "athenaeum-sofia/first-lesson"
cardGradient: "plum"
scoreHighlights:
  - "1570 SAT (perfect R&W)"
  - "5 on AP Lit · 5 on AP Lang"
headline: "ComLit at Princeton. Helps students write the essay only they could write."
---

I write fiction and I read more than is healthy. When I work with students on the SAT Reading & Writing section, on the AP English exams, or on application essays, I'm trying to teach the same underlying skill: notice what the text is actually doing, then make a defensible argument about it.

For College Counseling I work with rising juniors and seniors. The essay is what most families overweight; the school list is what most underweight. I push hard on the list early and on the essay late.

**How I work with students**

- Reading sessions are short and intense. We do close readings on actual passages, not summaries.
- Writing sessions are about cuts: most students need to make smaller, sharper arguments.
- For application essays, I do 3-5 rounds of brainstorming before we write a single full draft. Brainstorm carefully, draft fast.

**Outside tutoring**

I edit Princeton's undergraduate literary journal and run a small Substack.
```

- [ ] **Step 5: Write `src/content/tutors/adetola-o.mdx`**

```mdx
---
name: "Adetola O."
fullName: "Adetola Okonkwo"
monogram: "AO"
school: "Columbia"
classYear: "'25"
major: "Physics"
subjects: ["AP Physics 1/2", "AP Physics C", "ACT Science", "SAT Math"]
serviceSlugs: ["ap", "sat", "act"]
hourlyRate: 145
calLinks:
  consult: "athenaeum-adetola/consult"
  firstLesson: "athenaeum-adetola/first-lesson"
cardGradient: "ink"
scoreHighlights:
  - "1570 SAT"
  - "5 on AP Physics C: Mechanics · 5 on AP Physics C: E&M"
headline: "Physics at Columbia. Specializes in the APs and science sections that scare other tutors."
---

AP Physics C and ACT Science are the two exams I get sent students for most often, usually after another tutor told them the section was unteachable. They aren't. They both reward the same instinct: read the system carefully, identify the conserved quantity or the trend, and don't get rattled by the dense visual.

I scored 5s on both Physics C exams and the SAT Math section, and I work with students on translating that mental discipline into a repeatable approach.

**How I work with students**

- Physics: I draw every problem twice — once for what's actually happening, once for the equations.
- ACT Science: we do timed passage drills with a stopwatch. Pace first, accuracy second, both improve together.
- I send post-session voice notes summarizing what we did and the focus for the week.

**Outside tutoring**

I research neutrino physics at Columbia and play in a campus jazz combo (tenor sax).
```

- [ ] **Step 6: Verify content collection types**

```bash
npm run astro -- sync
npm run astro -- check
```

Expected: `astro sync` regenerates `.astro/content.d.ts` with the tutors collection, `astro check` passes with 0 errors.

---

## Task 9: Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../layouts/PageLayout.astro';
import Hero from '../components/Hero.astro';
import Marquee from '../components/Marquee.astro';
import Eyebrow from '../components/Eyebrow.astro';
import SectionTitle from '../components/SectionTitle.astro';
import ServiceCard from '../components/ServiceCard.astro';
import FeatureCard from '../components/FeatureCard.astro';
import HowCard from '../components/HowCard.astro';
import TutorCard from '../components/TutorCard.astro';
import FAQAccordion from '../components/FAQAccordion.astro';
import BigCTA from '../components/BigCTA.astro';
import MegaButton from '../components/MegaButton.astro';

import { services } from '../data/services';
import { homepageFAQs } from '../data/faqs';
import { reasons } from '../data/why-different';

const tutors = (await getCollection('tutors')).slice(0, 4);

const includedItems = [
  { icon: '1', title: 'One-on-one', serif: 'sessions', body: 'Every session is yours. No cohorts. Two live online sessions a week is most common, with adjustments to fit your schedule.', color: 'lime' as const },
  { icon: 'R', title: 'Recorded for', serif: 'review', body: 'Every session is recorded and kept in your portal. Miss a session, rewatch a tough unit, or come back during exam week.', color: 'tangerine' as const },
  { icon: 'C', title: 'Custom lesson', serif: 'plans', body: 'A diagnostic week determines the gaps. The weekly plan adapts to your scores and pace. No cookie-cutter curriculum.', color: 'cream' as const },
  { icon: 'H', title: 'Weekly', serif: 'homework with feedback', body: 'Targeted problem sets each week. Reviewed by your tutor personally, not auto-graded. Feedback that actually moves the score.', color: 'tangerine' as const },
  { icon: 'O', title: 'Office', serif: 'hours + async', body: 'Drop-in office hours plus async messaging with your tutor for anything that did not click between sessions.', color: 'cream' as const },
  { icon: 'M', title: 'A test-day', serif: 'strategy session', body: 'Right before the exam, a dedicated session on pacing, recovery from a hard question, and the mindset to walk in calm.', color: 'lime' as const },
];

const teaserReasons = reasons.filter((r) => ['Talent', 'Method', 'Trust'].includes(r.pillar)).slice(0, 3);
---
<PageLayout title="Athenaeum — 1-on-1 test prep & college counseling, taught by Ivy League minds.">
  <Hero />
  <Marquee />

  <!-- Services -->
  <section class="section-pad" id="services">
    <div class="reveal">
      <Eyebrow text="Services" />
      <SectionTitle subtitle="One-on-one prep tailored to the test (or college list) your student is actually facing.">
        Pick your <span class="serif">test.</span> Pick your <span class="serif">tutor.</span>
      </SectionTitle>
    </div>
    <div class="programs-grid reveal">
      {services.map((s) => (
        <ServiceCard
          href={`/${s.slug}`}
          tag={s.cadence}
          name={s.name === 'College Counseling' ? 'College' : s.name}
          nameItalic={s.name === 'College Counseling' ? 'Counseling' : (s.slug === 'ap' ? 'Classes' : undefined)}
          topics={[s.topics.slice(0, 2).join(' · '), s.topics.slice(2, 4).join(' · ')].filter(Boolean)}
          blurb={s.blurb}
          color={s.cardColor}
        />
      ))}
    </div>
  </section>

  <!-- What's Included -->
  <section class="included">
    <div class="included-inner">
      <div class="reveal" style="margin-bottom: 3rem;">
        <Eyebrow text="What's Included" variant="lime-on-ink" />
        <SectionTitle subtitle="Not just sessions. A complete structure to keep your student progressing every week.">
          Every package comes <span class="serif">fully loaded.</span>
        </SectionTitle>
      </div>
      <div class="included-grid reveal">
        {includedItems.map((item) => (
          <FeatureCard
            icon={item.icon}
            title={item.title}
            titleSerif={item.serif}
            description={item.body}
            iconColor={item.color}
          />
        ))}
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="how section-pad" id="how">
    <div class="reveal" style="text-align:center; max-width:700px; margin: 0 auto 4rem;">
      <Eyebrow text="How it works" />
      <SectionTitle>From first consult to <span class="serif">test day.</span></SectionTitle>
    </div>
    <div class="how-grid reveal">
      <HowCard num={1} numColor="ink"       title="Free 30-min" titleSerif="consult" description="A quick call: what test, current level, target score, timeline. We recommend the right tutor match." />
      <HowCard num={2} numColor="lime"      title="Get matched with" titleSerif="your tutor" description="Within a week of the consult, you'll meet your tutor and start the diagnostic week." />
      <HowCard num={3} numColor="tangerine" title="Weekly 1-on-1s," titleSerif="practice, exam day" description="Weekly sessions, hand-graded homework, regular practice tests, and a test-day strategy session." />
    </div>
    <div class="how-cta">
      <MegaButton href="/book">Schedule Your Free Consult</MegaButton>
    </div>
  </section>

  <!-- Tutor preview -->
  <section class="section-pad" id="instructors">
    <div class="reveal">
      <Eyebrow text="The Faculty" />
      <SectionTitle subtitle="Every tutor is a current Ivy League or peer-university student who scored at the top of the exam they teach.">
        Taught by people who <span class="serif">recently sat</span> these exams.
      </SectionTitle>
    </div>
    <div class="tutors-grid reveal">
      {tutors.map((t) => (
        <TutorCard
          href={`/tutors/${t.slug}`}
          monogram={t.data.monogram}
          school={`${t.data.school} ${t.data.classYear}`}
          name={t.data.name.split(' ')[0]}
          nameItalic={t.data.name.split(' ').slice(1).join(' ')}
          subjectsLine={t.data.subjects.slice(0, 3).join(' · ')}
          gradient={t.data.cardGradient}
        />
      ))}
    </div>
    <div style="text-align:center; margin-top: 3rem;">
      <a href="/tutors" class="see-all">See all tutors →</a>
    </div>
  </section>

  <!-- Why Different teaser -->
  <section class="why-teaser section-pad">
    <div class="reveal">
      <Eyebrow text="Why Athenaeum" variant="lime-on-ink" />
      <SectionTitle subtitle="Three things that make the difference. The full list is on the Why Different page.">
        Built around the <span class="serif">student</span>, not the syllabus.
      </SectionTitle>
    </div>
    <div class="why-teaser-grid reveal">
      {teaserReasons.map((r) => (
        <div class="why-teaser-card">
          <div class={`why-teaser-icon ${r.iconColor}`}>{r.iconLetter}</div>
          <h4>{r.title} {r.titleSerif && <span class="serif">{r.titleSerif}</span>}</h4>
          <p>{r.body}</p>
        </div>
      ))}
    </div>
    <div style="text-align:center; margin-top: 3rem;">
      <a href="/why-different" class="see-all">See all 12 reasons →</a>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section-pad">
    <div class="reveal" style="text-align:center; margin-bottom: 3rem;">
      <Eyebrow text="FAQ" />
      <SectionTitle>Common <span class="serif">questions.</span></SectionTitle>
    </div>
    <div class="reveal">
      <FAQAccordion items={homepageFAQs} />
    </div>
  </section>

  <!-- Big CTA -->
  <BigCTA
    title='Reserve your <span class="serif">free</span> consult.'
    subtitle="A 30-minute call covers your timeline, target score, and tutor match. No commitment."
    ctaHref="/book"
    ctaLabel="Schedule Free Consult"
  />
</PageLayout>

<style>
  section { position: relative; z-index: 2; }
  .section-pad { padding: 6rem 2rem; max-width: 1400px; margin: 0 auto; }

  .programs-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
  }

  .included {
    background: var(--ink);
    color: var(--cream);
    padding: 6rem 2rem;
    border-top: 2px solid var(--ink);
    border-bottom: 2px solid var(--ink);
  }
  .included-inner { max-width: 1400px; margin: 0 auto; }
  .included-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
  }
  .included :global(.section-title) { color: var(--cream); }
  .included :global(.section-title .serif) { color: var(--lime); }
  .included :global(.section-sub) { color: rgba(247, 240, 223, 0.7); }

  .how { background: var(--cream-deep); }
  .how-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .how-cta { text-align: center; margin-top: 3.5rem; }

  .tutors-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
  }
  .see-all {
    color: var(--ink);
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    border-bottom: 1.5px solid var(--ink);
    padding-bottom: 0.2rem;
  }
  .see-all:hover { color: var(--tangerine); border-color: var(--tangerine); }

  .why-teaser {
    background: var(--ink);
    color: var(--cream);
    border-top: 2px solid var(--ink);
    border-bottom: 2px solid var(--ink);
  }
  .why-teaser :global(.section-title) { color: var(--cream); }
  .why-teaser :global(.section-title .serif) { color: var(--lime); }
  .why-teaser :global(.section-sub) { color: rgba(247, 240, 223, 0.7); }
  .why-teaser :global(.see-all) { color: var(--lime); border-bottom-color: var(--lime); }
  .why-teaser :global(.see-all:hover) { color: var(--tangerine); border-color: var(--tangerine); }
  .why-teaser-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .why-teaser-card {
    border: 1px solid rgba(247, 240, 223, 0.18);
    border-radius: 20px;
    padding: 1.8rem;
  }
  .why-teaser-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.2rem;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
  }
  .why-teaser-icon.lime { background: var(--lime); color: var(--ink); }
  .why-teaser-icon.tangerine { background: var(--tangerine); color: var(--cream); }
  .why-teaser-icon.cream { background: var(--cream); color: var(--ink); }
  .why-teaser-card h4 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-bottom: 0.6rem;
    color: var(--cream);
  }
  .why-teaser-card h4 .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--lime);
  }
  .why-teaser-card p {
    font-size: 0.92rem;
    line-height: 1.55;
    color: rgba(247, 240, 223, 0.75);
  }

  @media (max-width: 1024px) {
    .programs-grid, .tutors-grid { grid-template-columns: repeat(2, 1fr); }
    .how-grid, .included-grid, .why-teaser-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .section-pad { padding: 4rem 1.2rem; }
    .programs-grid, .tutors-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Verify homepage**

```bash
npm run dev
```

Open localhost:4321. Confirm visually:
- Announcement bar, nav, hero with stat cards, marquee scrolling
- 4 service cards (AP / SAT / ACT / College Counseling)
- Dark "What's Included" section with 6 feature cards
- Cream "How It Works" with 3 numbered cards
- 4 tutor cards with monograms + school tags
- Dark "Why Athenaeum" teaser with 3 reasons
- FAQ accordion (clicks expand/collapse)
- Lime "Big CTA" section with star background
- Footer with 4 columns
- Sticky bar appears when scrolling
- All animations work (highlights, marquee, reveal-in)

Stop server.

---

## Task 10: Test-prep service pages (AP, SAT, ACT)

**Files:**
- Create: `src/components/ServicePage.astro` (shared template)
- Create: `src/pages/ap.astro`
- Create: `src/pages/sat.astro`
- Create: `src/pages/act.astro`

- [ ] **Step 1: Write `src/components/ServicePage.astro`**

A shared template that takes a service slug and renders the full page.

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../layouts/PageLayout.astro';
import Eyebrow from './Eyebrow.astro';
import SectionTitle from './SectionTitle.astro';
import MegaButton from './MegaButton.astro';
import GhostButton from './GhostButton.astro';
import HowCard from './HowCard.astro';
import TutorCard from './TutorCard.astro';
import FAQAccordion from './FAQAccordion.astro';
import BigCTA from './BigCTA.astro';

import { services, type ServiceSlug } from '../data/services';

export interface Props {
  slug: ServiceSlug;
}
const { slug } = Astro.props;
const service = services.find((s) => s.slug === slug)!;

const allTutors = await getCollection('tutors');
const matchingTutors = allTutors.filter((t) => t.data.serviceSlugs.includes(slug)).slice(0, 3);
---
<PageLayout title={`${service.longName} — Athenaeum`} description={service.tagline}>
  <section class="service-hero">
    <div class="service-hero-inner reveal">
      <Eyebrow text={service.longName.toUpperCase()} />
      <h1 class="display">{service.longName}</h1>
      <p class="lead">{service.tagline}</p>
      <div class="cta-row">
        <MegaButton href={`/tutors?subject=${service.slug}`}>Find Your {service.name} Tutor</MegaButton>
        <GhostButton href="/book">Schedule Free Consult</GhostButton>
      </div>
    </div>
  </section>

  <section class="section-pad">
    <div class="reveal">
      <Eyebrow text="What we cover" />
      <SectionTitle>The full <span class="serif">{service.name}</span>, taught 1-on-1.</SectionTitle>
    </div>
    <ul class="topics-grid reveal">
      {service.topics.map((t) => (
        <li class="topic-pill">{t}</li>
      ))}
    </ul>
  </section>

  <section class="how section-pad">
    <div class="reveal" style="text-align:center; max-width: 700px; margin: 0 auto 3.5rem;">
      <Eyebrow text="How it works" />
      <SectionTitle>From first <span class="serif">consult</span> to test day.</SectionTitle>
    </div>
    <div class="how-grid reveal">
      <HowCard num={1} numColor="ink"       title="Free 30-min" titleSerif="consult" description="Quick call to lock in the right tutor, plan, and timeline for your student." />
      <HowCard num={2} numColor="lime"      title="Diagnostic" titleSerif="week" description="Your tutor identifies the gaps and builds a custom weekly plan around them." />
      <HowCard num={3} numColor="tangerine" title="Weekly 1-on-1s," titleSerif="exam day" description="Weekly sessions, hand-graded homework, practice tests, and a test-day strategy session." />
    </div>
  </section>

  <section class="section-pad">
    <div class="reveal">
      <Eyebrow text="Sample tutors" />
      <SectionTitle subtitle={`Three of our ${service.name} tutors. Browse the full faculty on the Tutors page.`}>
        Who you might <span class="serif">work with.</span>
      </SectionTitle>
    </div>
    <div class="tutors-grid reveal">
      {matchingTutors.map((t) => (
        <TutorCard
          href={`/tutors/${t.slug}`}
          monogram={t.data.monogram}
          school={`${t.data.school} ${t.data.classYear}`}
          name={t.data.name.split(' ')[0]}
          nameItalic={t.data.name.split(' ').slice(1).join(' ')}
          subjectsLine={t.data.subjects.slice(0, 3).join(' · ')}
          gradient={t.data.cardGradient}
        />
      ))}
    </div>
  </section>

  <section class="pricing section-pad">
    <div class="reveal">
      <Eyebrow text="Pricing" />
      <SectionTitle subtitle={`Starting at $${service.startingAtHourly}/hour. Most students book a 16 or 24-hour package. Full pricing is confirmed on the free consult.`}>
        Built for <span class="serif">commitment-friendly</span> packages.
      </SectionTitle>
    </div>
    <div class="pkg-grid reveal">
      {service.packages.map((p, i) => (
        <div class={`pkg-card ${i === 1 ? 'featured' : ''}`}>
          <div class="pkg-hours">{p.hours} hours</div>
          <div class="pkg-price">${p.price.toLocaleString()}</div>
          <div class="pkg-per">${p.perHour}/hour</div>
          <p>{p.tagline}</p>
        </div>
      ))}
    </div>
  </section>

  <section class="section-pad">
    <div class="reveal" style="text-align:center; margin-bottom: 3rem;">
      <Eyebrow text="FAQ" />
      <SectionTitle>{service.name} <span class="serif">questions.</span></SectionTitle>
    </div>
    <div class="reveal">
      <FAQAccordion items={service.faqs} />
    </div>
  </section>

  <BigCTA
    title={`Find your <span class='serif'>${service.name}</span> tutor.`}
    subtitle="Free 30-min consult. We'll match you to the right tutor and plan."
    ctaHref="/book"
    ctaLabel="Schedule Free Consult"
  />
</PageLayout>

<style>
  .service-hero {
    background: var(--cream-deep);
    padding: 6rem 2rem 4rem;
    border-bottom: 2px solid var(--ink);
    position: relative;
    z-index: 2;
  }
  .service-hero-inner { max-width: 1400px; margin: 0 auto; }
  .service-hero h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(3rem, 9vw, 7rem);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 0.9;
    margin-bottom: 1.5rem;
    font-variation-settings: "wdth" 85;
  }
  .lead {
    font-size: 1.4rem;
    color: var(--ink-soft);
    max-width: 680px;
    margin-bottom: 2.5rem;
    line-height: 1.4;
  }
  .cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }

  section { position: relative; z-index: 2; }
  .section-pad { padding: 6rem 2rem; max-width: 1400px; margin: 0 auto; }

  .topics-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    list-style: none;
    padding: 0;
  }
  .topic-pill {
    border: 1.5px solid var(--ink);
    border-radius: 999px;
    padding: 0.6rem 1.1rem;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    background: var(--cream);
  }

  .how { background: var(--cream-deep); }
  .how-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .tutors-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }

  .pricing { background: var(--ink); color: var(--cream); }
  .pricing :global(.section-title) { color: var(--cream); }
  .pricing :global(.section-title .serif) { color: var(--lime); }
  .pricing :global(.section-sub) { color: rgba(247, 240, 223, 0.7); }
  .pkg-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;
  }
  .pkg-card {
    background: rgba(247, 240, 223, 0.04);
    border: 1px solid rgba(247, 240, 223, 0.18);
    border-radius: 22px;
    padding: 2rem 1.6rem;
  }
  .pkg-card.featured {
    background: var(--lime);
    color: var(--ink);
    border-color: var(--lime);
  }
  .pkg-hours {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0.7;
  }
  .pkg-price {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    margin-top: 0.3rem;
    font-variation-settings: "wdth" 85;
  }
  .pkg-per {
    font-size: 0.95rem;
    opacity: 0.75;
    margin-bottom: 1rem;
  }
  .pkg-card p {
    font-size: 0.92rem;
    line-height: 1.5;
    opacity: 0.85;
  }

  @media (max-width: 1024px) {
    .tutors-grid, .how-grid, .pkg-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .section-pad { padding: 4rem 1.2rem; }
    .service-hero { padding: 4rem 1.2rem 3rem; }
  }
</style>
```

- [ ] **Step 2: Write `src/pages/ap.astro`**

```astro
---
import ServicePage from '../components/ServicePage.astro';
---
<ServicePage slug="ap" />
```

- [ ] **Step 3: Write `src/pages/sat.astro`**

```astro
---
import ServicePage from '../components/ServicePage.astro';
---
<ServicePage slug="sat" />
```

- [ ] **Step 4: Write `src/pages/act.astro`**

```astro
---
import ServicePage from '../components/ServicePage.astro';
---
<ServicePage slug="act" />
```

- [ ] **Step 5: Verify**

Run `npm run dev`. Visit `/ap`, `/sat`, `/act`. Confirm each:
- Hero with eyebrow + big title + lead + 2 CTAs
- Topics pills section
- How It Works strip
- 3 sample tutors filtered by service
- 3-card pricing band with the middle card highlighted lime
- Service-specific FAQ list
- Big CTA at the bottom

Stop server.

---

## Task 11: College Counseling page

**Files:**
- Create: `src/pages/college-counseling.astro`

- [ ] **Step 1: Write `src/pages/college-counseling.astro`**

Variant of the service template with college-specific copy. Reuses ServicePage component but the topics are already college-flavored in the data.

```astro
---
import ServicePage from '../components/ServicePage.astro';
---
<ServicePage slug="college-counseling" />
```

(The data in `services.ts` already shapes the page: topics like "School list strategy", "Application essays", etc., and college-specific FAQs and packages.)

- [ ] **Step 2: Verify**

Run `npm run dev`, visit `/college-counseling`. Confirm:
- Topics show: School list, Essays, Interview prep, Timeline, Activity narrative
- Pricing is the college-tier (starts at $160/hr)
- Sample tutors include Sofia (college counseling tag)
- FAQs are college-specific

Stop server.

---

## Task 12: Tutors directory

**Files:**
- Create: `src/pages/tutors/index.astro`

- [ ] **Step 1: Write `src/pages/tutors/index.astro`**

Renders all tutors with filter chips. Filter is URL param `?subject=ap|sat|act|college-counseling`. Uses inline JS to toggle visibility.

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import Eyebrow from '../../components/Eyebrow.astro';
import SectionTitle from '../../components/SectionTitle.astro';
import TutorCard from '../../components/TutorCard.astro';
import BigCTA from '../../components/BigCTA.astro';

const allTutors = await getCollection('tutors');

const filters = [
  { slug: 'all', label: 'All' },
  { slug: 'ap', label: 'AP' },
  { slug: 'sat', label: 'SAT' },
  { slug: 'act', label: 'ACT' },
  { slug: 'college-counseling', label: 'College Counseling' },
];
---
<PageLayout title="Tutors — Athenaeum" description="Browse our faculty. Top-1% Ivy League and peer-university tutors.">
  <section class="tutors-hero">
    <div class="reveal" style="max-width: 1400px; margin: 0 auto;">
      <Eyebrow text="The Faculty" />
      <SectionTitle subtitle="Every Athenaeum tutor is a current Ivy League or peer-university student who scored at the top of the exam they teach. Pick your fit.">
        Browse our <span class="serif">tutors.</span>
      </SectionTitle>
    </div>
  </section>

  <section class="tutors-filters section-pad" data-tutors-wrap>
    <div class="filter-chips reveal" id="filterChips">
      {filters.map((f) => (
        <button
          class:list={['chip', f.slug === 'all' && 'active']}
          data-filter={f.slug}
          type="button"
        >{f.label}</button>
      ))}
    </div>

    <div class="tutors-grid reveal" id="tutorsGrid">
      {allTutors.map((t) => (
        <div
          class="tutor-wrap"
          data-service-slugs={t.data.serviceSlugs.join(',')}
        >
          <TutorCard
            href={`/tutors/${t.slug}`}
            monogram={t.data.monogram}
            school={`${t.data.school} ${t.data.classYear}`}
            name={t.data.name.split(' ')[0]}
            nameItalic={t.data.name.split(' ').slice(1).join(' ')}
            subjectsLine={t.data.subjects.slice(0, 3).join(' · ')}
            gradient={t.data.cardGradient}
          />
        </div>
      ))}
    </div>
  </section>

  <BigCTA
    title='Find your <span class="serif">match.</span>'
    subtitle="The free consult is where we pair you with the right tutor."
    ctaHref="/book"
    ctaLabel="Schedule Free Consult"
  />
</PageLayout>

<script is:inline>
  (() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get('subject') || 'all';

    const chips = document.querySelectorAll('#filterChips .chip');
    const wraps = document.querySelectorAll('.tutor-wrap');

    function applyFilter(filter) {
      chips.forEach((c) => c.classList.toggle('active', c.dataset.filter === filter));
      wraps.forEach((w) => {
        const slugs = (w.dataset.serviceSlugs || '').split(',');
        const visible = filter === 'all' || slugs.includes(filter);
        w.style.display = visible ? '' : 'none';
      });

      const url = new URL(window.location.href);
      if (filter === 'all') {
        url.searchParams.delete('subject');
      } else {
        url.searchParams.set('subject', filter);
      }
      window.history.replaceState({}, '', url);
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => applyFilter(chip.dataset.filter));
    });

    applyFilter(initial);
  })();
</script>

<style>
  .tutors-hero {
    padding: 6rem 2rem 3rem;
    background: var(--cream-deep);
    border-bottom: 2px solid var(--ink);
    position: relative;
    z-index: 2;
  }
  section { position: relative; z-index: 2; }
  .section-pad { padding: 4rem 2rem 6rem; max-width: 1400px; margin: 0 auto; }

  .filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 3rem;
  }
  .chip {
    border: 1.5px solid var(--ink);
    background: transparent;
    color: var(--ink);
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.25s;
  }
  .chip:hover { background: var(--ink); color: var(--cream); }
  .chip.active { background: var(--lime); border-color: var(--lime); }
  .chip.active:hover { background: var(--lime-deep); color: var(--ink); }

  .tutors-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
  }
  @media (max-width: 1024px) { .tutors-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px) { .tutors-grid { grid-template-columns: 1fr; } .section-pad { padding: 3rem 1.2rem 4rem; } }
</style>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Visit `/tutors`. Confirm:
- All 4 tutors render
- Filter chips render: All, AP, SAT, ACT, College Counseling
- Clicking "AP" hides non-AP tutors
- URL updates to `?subject=ap`
- Page-load with `?subject=sat` highlights SAT chip
- Big CTA at bottom

Stop server.

---

## Task 13: Tutor profile page

**Files:**
- Create: `src/pages/tutors/[slug].astro`

- [ ] **Step 1: Write `src/pages/tutors/[slug].astro`**

```astro
---
import { getCollection, getEntry } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import Eyebrow from '../../components/Eyebrow.astro';
import MegaButton from '../../components/MegaButton.astro';
import GhostButton from '../../components/GhostButton.astro';
import CalEmbed from '../../components/CalEmbed.astro';

export async function getStaticPaths() {
  const tutors = await getCollection('tutors');
  return tutors.map((tutor) => ({ params: { slug: tutor.slug }, props: { tutor } }));
}

const { tutor } = Astro.props;
const { Content } = await tutor.render();
const d = tutor.data;
---
<PageLayout title={`${d.name} — Athenaeum`} description={d.headline}>
  <section class="profile-hero">
    <div class="profile-hero-inner">
      <div class={`profile-photo ${d.cardGradient}`}>
        <div class="profile-monogram">{d.monogram}</div>
        <div class="profile-school-tag">{d.school} {d.classYear}</div>
      </div>
      <div class="profile-meta">
        <Eyebrow text={`${d.school.toUpperCase()} ${d.classYear}`} />
        <h1>{d.name}</h1>
        <p class="profile-headline">{d.headline}</p>
        <ul class="profile-subjects">
          {d.subjects.map((s) => <li>{s}</li>)}
        </ul>
        {d.scoreHighlights && d.scoreHighlights.length > 0 && (
          <ul class="profile-scores">
            {d.scoreHighlights.map((s) => <li>{s}</li>)}
          </ul>
        )}
        <div class="profile-meta-rate">Starting at <strong>${d.hourlyRate}/hour</strong></div>
        <div class="cta-row">
          <MegaButton href={`/book?type=lesson&tutor=${tutor.slug}`}>Book a Lesson with {d.name.split(' ')[0]}</MegaButton>
          <GhostButton href={`/book?type=consult&tutor=${tutor.slug}`}>Free Consult First</GhostButton>
        </div>
      </div>
    </div>
  </section>

  <section class="profile-bio section-pad">
    <div class="bio-grid">
      <aside class="reveal">
        <Eyebrow text="Sessions with" />
        <h3 class="aside-name">{d.name.split(' ')[0]}</h3>
        <ul class="aside-list">
          <li>Weekly 1-on-1s, two sessions per week most common</li>
          <li>Hand-graded homework</li>
          <li>Recorded for review in your portal</li>
          <li>Office hours + async messaging between sessions</li>
        </ul>
      </aside>
      <article class="bio-content reveal">
        <Eyebrow text="About" />
        <Content />
      </article>
    </div>
  </section>

  <section class="profile-cal section-pad" id="book-here">
    <div class="reveal" style="text-align:center; max-width: 720px; margin: 0 auto 3rem;">
      <Eyebrow text="Book directly" />
      <h2 class="big">Pick a time with <span class="serif">{d.name.split(' ')[0]}.</span></h2>
      <p class="sub">Choose either a free 30-minute consult or your first lesson.</p>
    </div>
    <div class="cal-wrap reveal">
      <CalEmbed calLink={d.calLinks.firstLesson} embedId={`cal-tutor-${tutor.slug}`} />
    </div>
  </section>
</PageLayout>

<style>
  .profile-hero {
    background: var(--cream-deep);
    padding: 5rem 2rem 5rem;
    border-bottom: 2px solid var(--ink);
    position: relative;
    z-index: 2;
  }
  .profile-hero-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.7fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  .profile-photo {
    aspect-ratio: 4/5;
    border-radius: 24px;
    border: 2px solid var(--ink);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 8px 8px 0 var(--ink);
  }
  .profile-photo.lime { background: linear-gradient(135deg, var(--lime), #a8c93a); color: var(--ink); }
  .profile-photo.tangerine { background: linear-gradient(135deg, var(--tangerine), #c84618); color: var(--cream); }
  .profile-photo.plum { background: linear-gradient(135deg, var(--plum), #1a0e2e); color: var(--cream); }
  .profile-photo.ink { background: linear-gradient(135deg, var(--ink), #2a2a2a); color: var(--cream); }
  .profile-monogram {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 11rem;
    font-weight: 700;
    letter-spacing: -0.06em;
    font-variation-settings: "wdth" 80;
    line-height: 1;
  }
  .profile-school-tag {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    background: var(--ink);
    color: var(--lime);
    padding: 0.45rem 1rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .profile-meta h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.95;
    margin-bottom: 1rem;
  }
  .profile-headline {
    font-size: 1.3rem;
    color: var(--ink-soft);
    line-height: 1.45;
    margin-bottom: 1.5rem;
    max-width: 540px;
  }
  .profile-subjects {
    display: flex; flex-wrap: wrap; gap: 0.5rem;
    list-style: none; padding: 0; margin-bottom: 1.1rem;
  }
  .profile-subjects li {
    background: var(--ink); color: var(--lime);
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
  }
  .profile-scores {
    display: flex; flex-wrap: wrap; gap: 0.5rem 1rem;
    list-style: none; padding: 0; margin-bottom: 1.4rem;
  }
  .profile-scores li {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    color: var(--ink);
    font-size: 1.1rem;
  }
  .profile-scores li::before {
    content: "★ ";
    color: var(--tangerine);
    font-style: normal;
  }
  .profile-meta-rate {
    font-size: 1rem;
    margin-bottom: 1.6rem;
    color: var(--ink-soft);
  }
  .profile-meta-rate strong {
    font-family: 'Bricolage Grotesque', sans-serif;
    color: var(--ink);
  }
  .cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }

  section { position: relative; z-index: 2; }
  .section-pad { padding: 6rem 2rem; max-width: 1400px; margin: 0 auto; }

  .profile-bio {}
  .bio-grid {
    display: grid;
    grid-template-columns: 0.7fr 1.6fr;
    gap: 4rem;
    align-items: start;
  }
  .aside-name {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
  }
  .aside-list {
    list-style: none; padding: 0;
  }
  .aside-list li {
    border-top: 1px solid var(--line);
    padding: 0.8rem 0;
    font-size: 0.95rem;
    color: var(--ink-soft);
    line-height: 1.45;
  }
  .aside-list li:last-child { border-bottom: 1px solid var(--line); }
  .bio-content :global(h1),
  .bio-content :global(h2),
  .bio-content :global(h3),
  .bio-content :global(h4) {
    font-family: 'Bricolage Grotesque', sans-serif;
    letter-spacing: -0.02em;
    margin-top: 1.8rem;
    margin-bottom: 0.6rem;
  }
  .bio-content :global(p) {
    font-size: 1.08rem;
    line-height: 1.65;
    color: var(--ink-soft);
    margin-bottom: 1rem;
  }
  .bio-content :global(ul) {
    padding-left: 1.2rem;
    margin-bottom: 1.2rem;
  }
  .bio-content :global(li) {
    font-size: 1.04rem;
    line-height: 1.5;
    color: var(--ink-soft);
    margin-bottom: 0.4rem;
  }
  .bio-content :global(strong) { color: var(--ink); }

  .profile-cal {
    background: var(--ink);
    color: var(--cream);
    border-top: 2px solid var(--ink);
  }
  .profile-cal h2.big {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 0.95;
    margin-bottom: 1rem;
  }
  .profile-cal h2 .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--lime);
  }
  .profile-cal .sub {
    font-size: 1.1rem;
    color: rgba(247, 240, 223, 0.75);
  }
  .cal-wrap {
    background: var(--cream);
    border-radius: 24px;
    padding: 1rem;
    max-width: 980px;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    .profile-hero-inner, .bio-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  }
  @media (max-width: 640px) {
    .profile-hero { padding: 3rem 1.2rem 3rem; }
    .section-pad { padding: 4rem 1.2rem; }
    .profile-monogram { font-size: 7rem; }
  }
</style>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Visit `/tutors/eliza-m`. Confirm:
- Giant monogram avatar on the left with school tag
- Big name + headline + subject pills + score highlights + rate
- Two CTAs link correctly (one to `/book?type=lesson&tutor=eliza-m`)
- Sidebar "Sessions with Eliza" + the MDX bio content renders with paragraphs and bullets
- Cal.com embed loads at the bottom

Visit `/tutors/jian-k`, `/tutors/sofia-r`, `/tutors/adetola-o`. Each should render correctly with the right gradient and bio.

Note: The Cal.com embed will show "User not found" because the calLinks point to placeholder slugs. That's expected for now — the embed renders, just with a placeholder error. When real tutors are onboarded, swap the slugs.

Stop server.

---

## Task 14: Why Different page

**Files:**
- Create: `src/pages/why-different.astro`

- [ ] **Step 1: Write `src/pages/why-different.astro`**

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import Eyebrow from '../components/Eyebrow.astro';
import SectionTitle from '../components/SectionTitle.astro';
import FeatureCard from '../components/FeatureCard.astro';
import ComparisonTable from '../components/ComparisonTable.astro';
import BigCTA from '../components/BigCTA.astro';
import { reasons, comparisonRows, type Pillar } from '../data/why-different';

const pillars: Pillar[] = ['Talent', 'Method', 'Touch', 'Trust'];
---
<PageLayout title="Why Athenaeum is Different — Athenaeum" description="Twelve reasons that make Athenaeum different from a big tutoring chain.">
  <section class="why-hero">
    <div class="reveal" style="max-width: 1400px; margin: 0 auto;">
      <Eyebrow text="Why Athenaeum" />
      <h1 class="why-title">
        Built around the<br>
        <span class="serif">student,</span> not the syllabus.
      </h1>
      <p class="why-lead">
        Twelve specific things we do differently from a big tutoring chain. Grouped into the four reasons it adds up to a different outcome.
      </p>
    </div>
  </section>

  {pillars.map((pillar) => {
    const items = reasons.filter((r) => r.pillar === pillar);
    return (
      <section class="pillar-section section-pad">
        <div class="reveal" style="margin-bottom: 3rem;">
          <Eyebrow text={pillar.toUpperCase()} variant="lime-on-ink" />
          <SectionTitle>
            {pillar === 'Talent' && <>The <span class="serif">people</span> in the room.</>}
            {pillar === 'Method' && <>How we <span class="serif">actually</span> teach.</>}
            {pillar === 'Touch' && <>Between the <span class="serif">sessions.</span></>}
            {pillar === 'Trust' && <>How we <span class="serif">earn</span> the commitment.</>}
          </SectionTitle>
        </div>
        <div class="pillar-grid reveal">
          {items.map((r) => (
            <FeatureCard
              icon={r.iconLetter}
              title={r.title}
              titleSerif={r.titleSerif}
              description={r.body}
              iconColor={r.iconColor}
            />
          ))}
        </div>
      </section>
    );
  })}

  <section class="compare-section section-pad">
    <div class="reveal" style="text-align: center; max-width: 700px; margin: 0 auto 3rem;">
      <Eyebrow text="Side by side" />
      <SectionTitle>Athenaeum vs. a <span class="serif">big tutoring chain.</span></SectionTitle>
    </div>
    <div class="reveal">
      <ComparisonTable rows={comparisonRows} />
    </div>
  </section>

  <BigCTA
    title='See if we are the <span class="serif">fit</span> for your student.'
    subtitle="The free 30-minute consult is the honest version of this conversation."
    ctaHref="/book"
    ctaLabel="Schedule Free Consult"
  />
</PageLayout>

<style>
  .why-hero {
    background: var(--ink);
    color: var(--cream);
    padding: 7rem 2rem 6rem;
    border-bottom: 2px solid var(--ink);
    position: relative;
    z-index: 2;
  }
  .why-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(3rem, 9vw, 7.5rem);
    line-height: 0.9;
    font-weight: 700;
    letter-spacing: -0.045em;
    margin-bottom: 1.5rem;
    font-variation-settings: "wdth" 85;
  }
  .why-title .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--lime);
  }
  .why-lead {
    font-size: 1.3rem;
    color: rgba(247, 240, 223, 0.75);
    max-width: 640px;
    line-height: 1.45;
  }

  section { position: relative; z-index: 2; }
  .section-pad { padding: 6rem 2rem; max-width: 1400px; margin: 0 auto; }

  .pillar-section {
    background: var(--ink);
    color: var(--cream);
    border-bottom: 1px solid rgba(247, 240, 223, 0.15);
  }
  .pillar-section :global(.section-title) { color: var(--cream); }
  .pillar-section :global(.section-title .serif) { color: var(--lime); }
  .pillar-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .compare-section { background: var(--cream); }

  @media (max-width: 1024px) {
    .pillar-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .why-hero { padding: 4rem 1.2rem 4rem; }
    .section-pad { padding: 4rem 1.2rem; }
  }
</style>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Visit `/why-different`. Confirm:
- Dark hero with lime-serif "student"
- Four pillar sections (Talent, Method, Touch, Trust) each with their respective FeatureCards
- Method has 5 cards, Touch has 3, Trust has 3, Talent has 1 (or similar based on data)
- Comparison table renders 8 rows
- Big CTA at the bottom

Stop server.

---

## Task 15: Book page

**Files:**
- Create: `src/pages/book.astro`

- [ ] **Step 1: Write `src/pages/book.astro`**

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../layouts/PageLayout.astro';
import Eyebrow from '../components/Eyebrow.astro';
import CalEmbed from '../components/CalEmbed.astro';
import { site } from '../data/site';

const tutors = await getCollection('tutors');
---
<PageLayout title="Book — Athenaeum" description="Schedule a free 30-min consult or your first lesson.">
  <section class="book-hero section-pad">
    <div class="reveal" style="text-align:center; max-width: 800px; margin: 0 auto;">
      <Eyebrow text="Book your seat" />
      <h1 class="book-title">
        Start with a <span class="serif">free consult,</span><br>
        or jump straight to a <span class="serif">first lesson.</span>
      </h1>
      <p class="book-sub">
        The free 30-minute consult is the matching call. If you already know who you want to work with, book directly with that tutor.
      </p>
    </div>

    <div class="tabs reveal" id="bookTabs" role="tablist">
      <button class="tab active" data-tab="consult" role="tab" type="button">Free 30-min Consult</button>
      <button class="tab" data-tab="lesson" role="tab" type="button">Schedule a First Lesson</button>
    </div>
  </section>

  <!-- Consult panel -->
  <section class="book-panel section-pad" data-panel="consult">
    <div class="reveal" style="text-align:center; max-width: 700px; margin: 0 auto 3rem;">
      <h2 class="panel-title">A free 30-min <span class="serif">diagnostic call.</span></h2>
      <p class="panel-sub">Tell us about your timeline, target score, and the subjects you're focused on. We'll match you with the right tutor.</p>
    </div>
    <div class="cal-wrap reveal">
      <CalEmbed calLink={site.consultCalLink} embedId="cal-consult" />
    </div>
  </section>

  <!-- Lesson panel -->
  <section class="book-panel hidden section-pad" data-panel="lesson">
    <div class="reveal" style="text-align:center; max-width: 700px; margin: 0 auto 3rem;">
      <h2 class="panel-title">Pick your <span class="serif">tutor.</span></h2>
      <p class="panel-sub">Choose a tutor below, then pick a time for your first paid lesson directly on their calendar.</p>
    </div>
    <div class="tutor-picker reveal" id="tutorPicker">
      {tutors.map((t) => (
        <button
          class="picker-card"
          data-tutor-slug={t.slug}
          data-cal-link={t.data.calLinks.firstLesson}
          type="button"
        >
          <div class={`picker-photo ${t.data.cardGradient}`}>
            <div class="picker-monogram">{t.data.monogram}</div>
            <div class="picker-school">{t.data.school} {t.data.classYear}</div>
          </div>
          <div class="picker-name">{t.data.name}</div>
          <div class="picker-subjects">{t.data.subjects.slice(0, 3).join(' · ')}</div>
        </button>
      ))}
    </div>

    <div class="lesson-cal-wrap reveal" id="lessonCalWrap" style="display:none;">
      <div id="lesson-cal-embed" style="min-height: 700px; width: 100%;"></div>
    </div>
  </section>
</PageLayout>

<script is:inline>
  (() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') === 'lesson' ? 'lesson' : 'consult';
    const tutorParam = params.get('tutor');

    const tabs = document.querySelectorAll('#bookTabs .tab');
    const panels = document.querySelectorAll('[data-panel]');

    function setTab(name) {
      tabs.forEach((t) => t.classList.toggle('active', t.dataset.tab === name));
      panels.forEach((p) => p.classList.toggle('hidden', p.dataset.panel !== name));

      const url = new URL(window.location.href);
      url.searchParams.set('type', name);
      window.history.replaceState({}, '', url);
    }

    tabs.forEach((t) => t.addEventListener('click', () => setTab(t.dataset.tab)));
    setTab(type);

    // Tutor picker
    const pickerCards = document.querySelectorAll('.picker-card');
    const lessonWrap = document.getElementById('lessonCalWrap');

    let calLoaded = false;
    async function loadTutorCal(calLink) {
      const mod = await import('@calcom/embed-snippet');
      const Cal = mod.default;
      if (!calLoaded) {
        Cal('init', { origin: 'https://cal.com' });
        calLoaded = true;
      }
      // Clear and reload
      const target = document.getElementById('lesson-cal-embed');
      target.innerHTML = '';
      Cal('inline', {
        elementOrSelector: '#lesson-cal-embed',
        calLink,
        config: { layout: 'month_view' },
      });
      Cal('ui', {
        styles: { branding: { brandColor: '#d4f04a' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      lessonWrap.style.display = '';
      lessonWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    pickerCards.forEach((card) => {
      card.addEventListener('click', () => {
        pickerCards.forEach((c) => c.classList.toggle('selected', c === card));
        loadTutorCal(card.dataset.calLink);

        const url = new URL(window.location.href);
        url.searchParams.set('tutor', card.dataset.tutorSlug);
        window.history.replaceState({}, '', url);
      });
    });

    if (type === 'lesson' && tutorParam) {
      const match = document.querySelector(`.picker-card[data-tutor-slug="${tutorParam}"]`);
      if (match) match.click();
    }
  })();
</script>

<style>
  .book-hero {
    padding: 6rem 2rem 3rem;
    background: var(--cream-deep);
    border-bottom: 2px solid var(--ink);
    position: relative;
    z-index: 2;
  }
  .book-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    line-height: 0.95;
    font-weight: 700;
    letter-spacing: -0.04em;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .book-title .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--tangerine);
  }
  .book-sub {
    font-size: 1.2rem;
    color: var(--ink-soft);
    text-align: center;
    line-height: 1.5;
    margin-bottom: 3rem;
  }
  .tabs {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .tab {
    border: 2px solid var(--ink);
    background: transparent;
    color: var(--ink);
    padding: 0.9rem 1.6rem;
    border-radius: 999px;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.25s;
  }
  .tab:hover { background: var(--ink); color: var(--cream); }
  .tab.active {
    background: var(--lime);
    color: var(--ink);
    box-shadow: 4px 4px 0 var(--ink);
  }

  section { position: relative; z-index: 2; }
  .section-pad { padding: 5rem 2rem; max-width: 1400px; margin: 0 auto; }
  .hidden { display: none; }

  .panel-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 0.95;
    margin-bottom: 1rem;
  }
  .panel-title .serif {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--tangerine);
  }
  .panel-sub {
    font-size: 1.1rem;
    color: var(--ink-soft);
    line-height: 1.5;
  }
  .cal-wrap {
    background: var(--cream-deep);
    border: 2px solid var(--ink);
    border-radius: 24px;
    padding: 1rem;
    max-width: 980px;
    margin: 0 auto;
  }
  .lesson-cal-wrap { margin-top: 3rem; background: var(--cream-deep); border: 2px solid var(--ink); border-radius: 24px; padding: 1rem; max-width: 980px; margin-left: auto; margin-right: auto; }

  .tutor-picker {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  .picker-card {
    text-align: left;
    background: transparent;
    border: 2px solid var(--ink);
    border-radius: 20px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.25s;
  }
  .picker-card:hover { transform: translateY(-3px); box-shadow: 4px 4px 0 var(--ink); }
  .picker-card.selected { background: var(--lime); border-color: var(--lime); box-shadow: 4px 4px 0 var(--ink); }
  .picker-photo {
    aspect-ratio: 4/5;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
    border: 1.5px solid var(--ink);
  }
  .picker-photo.lime { background: linear-gradient(135deg, var(--lime), #a8c93a); color: var(--ink); }
  .picker-photo.tangerine { background: linear-gradient(135deg, var(--tangerine), #c84618); color: var(--cream); }
  .picker-photo.plum { background: linear-gradient(135deg, var(--plum), #1a0e2e); color: var(--cream); }
  .picker-photo.ink { background: linear-gradient(135deg, var(--ink), #2a2a2a); color: var(--cream); }
  .picker-monogram {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
  .picker-school {
    position: absolute;
    bottom: 0.6rem;
    left: 0.6rem;
    background: var(--ink);
    color: var(--lime);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
  }
  .picker-name {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
  }
  .picker-subjects {
    font-size: 0.82rem;
    color: var(--ink-faint);
    margin-top: 0.2rem;
  }

  @media (max-width: 1024px) {
    .tutor-picker { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .tutor-picker { grid-template-columns: 1fr; }
    .book-hero, .section-pad { padding: 4rem 1.2rem; }
  }
</style>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Visit `/book`. Confirm:
- Hero with "Start with a free consult, or jump straight to a first lesson"
- Two tabs: "Free 30-min Consult" (active, lime) + "Schedule a First Lesson"
- Default tab shows Cal.com consult embed
- Click second tab: shows tutor picker (4 cards)
- Click a tutor card: card highlights lime, Cal.com lesson embed loads below
- URL updates: `/book?type=lesson&tutor=eliza-m`

Visit `/book?type=lesson&tutor=jian-k` directly: lesson tab active, Jian preselected.

Stop server.

---

## Task 16: Legal pages (Privacy, Terms)

**Files:**
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`

- [ ] **Step 1: Write `src/pages/privacy.astro`**

Boilerplate privacy policy. Not legal advice, but reasonable placeholder text. The user can swap in real policy from a generator later.

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import Eyebrow from '../components/Eyebrow.astro';
---
<PageLayout title="Privacy Policy — Athenaeum">
  <main class="legal section-pad">
    <Eyebrow text="Legal" />
    <h1>Privacy Policy</h1>
    <p class="updated">Last updated: 2026-05-24</p>

    <p>This Privacy Policy describes how Athenaeum (the "Service", "we", "us", or "our") collects, uses, and shares your personal information when you visit athenaeum.co or use our services.</p>

    <h2>Information we collect</h2>
    <p>We collect information you provide directly to us, including when you book a consult or lesson (name, email, phone), and information we receive from our scheduling provider (Cal.com). We also collect basic analytics about how you use the site (page views, referrers, browser type).</p>

    <h2>How we use information</h2>
    <p>We use the information we collect to: provide and maintain the Service, schedule and deliver tutoring sessions, respond to inquiries, send service-related communications, and improve the Service.</p>

    <h2>Sharing</h2>
    <p>We share information only as needed to provide the Service. This includes our scheduling provider (Cal.com), our payment processor (when applicable), and the tutor you are matched with. We do not sell personal information.</p>

    <h2>Your choices</h2>
    <p>You can request access to, correction of, or deletion of your personal information by emailing <a href="mailto:hello@athenaeum.co">hello@athenaeum.co</a>.</p>

    <h2>Children's privacy</h2>
    <p>Many of our students are minors. Parents and legal guardians control account creation and consent. We collect only the information needed to deliver tutoring services.</p>

    <h2>Contact</h2>
    <p>Questions: <a href="mailto:hello@athenaeum.co">hello@athenaeum.co</a></p>
  </main>
</PageLayout>

<style>
  .legal {
    max-width: 780px;
    margin: 0 auto;
    padding: 6rem 2rem;
    position: relative;
    z-index: 2;
  }
  .legal h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .legal .updated {
    color: var(--ink-faint);
    font-size: 0.95rem;
    margin-bottom: 2.5rem;
  }
  .legal h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2.5rem;
    margin-bottom: 0.8rem;
    letter-spacing: -0.02em;
  }
  .legal p {
    font-size: 1.05rem;
    line-height: 1.65;
    color: var(--ink-soft);
    margin-bottom: 1rem;
  }
  .legal a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
  .legal a:hover { color: var(--tangerine); }
</style>
```

- [ ] **Step 2: Write `src/pages/terms.astro`**

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import Eyebrow from '../components/Eyebrow.astro';
---
<PageLayout title="Terms of Service — Athenaeum">
  <main class="legal section-pad">
    <Eyebrow text="Legal" />
    <h1>Terms of Service</h1>
    <p class="updated">Last updated: 2026-05-24</p>

    <p>By using athenaeum.co or any Athenaeum tutoring services (the "Service"), you agree to these Terms.</p>

    <h2>Service description</h2>
    <p>Athenaeum provides one-on-one tutoring and college counseling services delivered live over the internet. Scheduling is handled through our partner, Cal.com.</p>

    <h2>Free consult</h2>
    <p>The free 30-minute consult is provided without charge and creates no obligation. We may decline to take on any student where Athenaeum is not the right fit.</p>

    <h2>Packages and payment</h2>
    <p>Tutoring packages are sold by the hour in 8/16/24-hour bundles (and similar). Payment terms, refund eligibility, and scheduling policies are confirmed in your enrollment email after the free consult.</p>

    <h2>First-week refund</h2>
    <p>Full refunds are available within the first seven (7) calendar days from your first lesson, less any cancellation fees imposed by our scheduling partner. To request a refund, email <a href="mailto:hello@athenaeum.co">hello@athenaeum.co</a>.</p>

    <h2>Cancellations and rescheduling</h2>
    <p>You may reschedule any session up to 24 hours before its start time via your Cal.com confirmation email. Cancellations within 24 hours may forfeit the session.</p>

    <h2>Conduct</h2>
    <p>You agree to behave respectfully with your tutor and other staff. We reserve the right to terminate Service for conduct that disrupts the learning environment.</p>

    <h2>Limitation of liability</h2>
    <p>To the maximum extent permitted by law, Athenaeum is not liable for indirect, incidental, or consequential damages. Total liability for any claim is limited to the amount paid in the prior three months.</p>

    <h2>Contact</h2>
    <p>Questions: <a href="mailto:hello@athenaeum.co">hello@athenaeum.co</a></p>
  </main>
</PageLayout>

<style>
  .legal {
    max-width: 780px;
    margin: 0 auto;
    padding: 6rem 2rem;
    position: relative;
    z-index: 2;
  }
  .legal h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .legal .updated { color: var(--ink-faint); font-size: 0.95rem; margin-bottom: 2.5rem; }
  .legal h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2.5rem;
    margin-bottom: 0.8rem;
    letter-spacing: -0.02em;
  }
  .legal p {
    font-size: 1.05rem;
    line-height: 1.65;
    color: var(--ink-soft);
    margin-bottom: 1rem;
  }
  .legal a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
  .legal a:hover { color: var(--tangerine); }
</style>
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Visit `/privacy` and `/terms`. Confirm: clean typographic legal pages with the right brand fonts.

Stop server.

---

## Task 17: Favicon, OG image, README

**Files:**
- Create: `public/favicon.svg`
- Create: `public/og.png` (placeholder)
- Create: `README.md`

- [ ] **Step 1: Write `public/favicon.svg`**

Simple lime dot on cream, matching the brand logo dot.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#f7f0df"/>
  <circle cx="16" cy="16" r="9" fill="#d4f04a" stroke="#0c0c0c" stroke-width="2"/>
</svg>
```

- [ ] **Step 2: Create OG image placeholder**

Skip making a real PNG for v1. Instead, write `public/og.txt` as a marker:

```bash
echo "Placeholder. Generate a 1200x630 PNG with the Athenaeum brand before launch." > public/og.txt
```

The `<meta property="og:image">` tag in `BaseLayout.astro` points to `/og.png` which won't exist; that's OK for v1 dev. Add a real OG image before launch.

- [ ] **Step 3: Write `README.md`**

```markdown
# Athenaeum Tutoring Website

One-on-one Ivy League tutoring marketing site. Built with Astro 4 + Tailwind + Cal.com.

## Quick start

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static output to dist/
npm run preview  # preview the prod build
```

## Structure

- `src/components/` — reusable UI components
- `src/layouts/` — base + page shells
- `src/pages/` — routes (Astro file-based routing)
- `src/data/` — structured site content (services, packages, FAQs, why-different)
- `src/content/tutors/` — tutor profile MDX files
- `src/styles/` — global CSS theme tokens

## Editing tutor data

Each tutor is a single MDX file under `src/content/tutors/`. Update frontmatter for structured fields (name, subjects, Cal.com links). The MDX body becomes the bio on the profile page.

## Editing services or pricing

Edit `src/data/services.ts`. Each service has its own FAQs, packages, and topic list.

## Cal.com setup

Tutor `calLinks` are placeholders. To use real Cal.com:
1. Each tutor signs up at cal.com with their own user slug.
2. Each creates two event types: "Consult" (30 min, free) and "First Lesson" (60 min, paid).
3. Update the `calLinks` in each tutor's MDX frontmatter to point to the real slugs (e.g., `"jian-kim/first-lesson"`).
4. For the team consult (the homepage Schedule Free Consult button), set up a Cal.com team round-robin and update `src/data/site.ts` `consultCalLink`.

## Spec + plan

- Spec: `docs/superpowers/specs/2026-05-24-athenaeum-design.md`
- Plan: `docs/superpowers/plans/2026-05-24-athenaeum-implementation.md`
```

- [ ] **Step 4: Verify**

Run `npm run dev`, visit any page. Confirm: favicon is the lime dot on cream in the browser tab.

Stop server.

---

## Task 18: Smoke test script

**Files:**
- Create: `scripts/smoke-test.mjs`
- Modify: `package.json` (add `"smoke"` script)

- [ ] **Step 1: Write `scripts/smoke-test.mjs`**

Hits each route on the running dev server and asserts:
1. Status 200
2. Page body contains expected strings (proves data flowed through, not just empty shell)

```js
#!/usr/bin/env node
// Smoke test: assumes `npm run dev` is running on localhost:4321.

const base = 'http://localhost:4321';

const checks = [
  { path: '/',                    expectAll: ['Athenaeum', 'Ivy League', 'Schedule Free Consult', 'College'] },
  { path: '/ap',                  expectAll: ['AP Tutoring', 'Calc', 'Free Consult'] },
  { path: '/sat',                 expectAll: ['SAT Tutoring', 'Reading', 'Math'] },
  { path: '/act',                 expectAll: ['ACT Tutoring', 'pacing', 'Science'] },
  { path: '/college-counseling',  expectAll: ['College Counseling', 'School list', 'essay'] },
  { path: '/tutors',              expectAll: ['Browse our', 'Eliza', 'Jian', 'Sofia', 'Adetola'] },
  { path: '/tutors/eliza-m',      expectAll: ['Eliza', 'Harvard', 'Book a Lesson'] },
  { path: '/tutors/jian-k',       expectAll: ['Jian', 'Yale'] },
  { path: '/tutors/sofia-r',      expectAll: ['Sofia', 'Princeton'] },
  { path: '/tutors/adetola-o',    expectAll: ['Adetola', 'Columbia'] },
  { path: '/why-different',       expectAll: ['Built around the', 'Top-1%', 'No long-term'] },
  { path: '/book',                expectAll: ['Free 30-min Consult', 'Schedule a First Lesson'] },
  { path: '/privacy',             expectAll: ['Privacy Policy'] },
  { path: '/terms',               expectAll: ['Terms of Service'] },
];

let failures = 0;
for (const c of checks) {
  process.stdout.write(`  ${c.path.padEnd(28)} ... `);
  try {
    const res = await fetch(base + c.path);
    if (res.status !== 200) {
      console.log(`FAIL (status ${res.status})`);
      failures++;
      continue;
    }
    const body = await res.text();
    const missing = c.expectAll.filter((s) => !body.includes(s));
    if (missing.length > 0) {
      console.log(`FAIL (missing: ${missing.join(', ')})`);
      failures++;
      continue;
    }
    console.log('ok');
  } catch (err) {
    console.log(`FAIL (${err.message})`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} smoke test failure(s).`);
  process.exit(1);
}
console.log('\nAll smoke tests passed.');
```

- [ ] **Step 2: Add npm script to `package.json`**

Locate the `"scripts"` object in `package.json` and add:

```json
"smoke": "node scripts/smoke-test.mjs"
```

- [ ] **Step 3: Run smoke tests**

Open two terminal panes.

Pane 1:
```bash
npm run dev
```

Pane 2 (once Astro reports ready):
```bash
npm run smoke
```

Expected: all 14 checks pass. If any fail, read the missing-strings list, fix the offending page/data, re-run.

Stop the dev server.

---

## Task 19: Build verification + visual QA

**Files:** none

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: builds cleanly. Output shows ~14 static HTML pages (homepage + 4 services + tutors index + 4 profiles + why-different + book + privacy + terms) plus dist/ contents.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Visit localhost:4322. Click through:
- Home → Services → AP → back
- Tutors → click each profile → back
- Why Different → scroll the full page
- Book → switch tabs → click a tutor picker card → Cal.com loads
- Verify all navigation works, no console errors (except expected Cal.com "user not found" placeholders)

Stop server.

- [ ] **Step 3: Mobile viewport check**

Open Chrome DevTools, toggle device toolbar, switch to iPhone 14 viewport (390 × 844). Revisit:
- Home (hero stacks single column, nav collapses, services grid → 1 column)
- A service page (hero text scales, pricing cards stack)
- A tutor profile (monogram + bio stack)
- Book page (tutor picker → 1 column)

Confirm everything is readable and tappable.

- [ ] **Step 4: Verify dev console clean**

In dev mode, open browser console. Navigate through all pages. Confirm: no JS errors, no missing-asset 404s (Cal.com network 404s on placeholder slugs are expected and fine).

- [ ] **Step 5: Final smoke run**

```bash
npm run dev      # pane 1
npm run smoke    # pane 2
```

Expected: all pass.

- [ ] **Step 6: Done**

The site is launch-ready in placeholder form. To go live:
1. Onboard real tutors → swap calLinks in their MDX files.
2. Set up Cal.com team round-robin for the homepage consult → update `src/data/site.ts`.
3. Generate a real OG image (1200×630 PNG) → drop at `public/og.png`.
4. Pick a host (Vercel / Netlify / Cloudflare Pages), connect a domain, deploy.

The vault's auto-commit hook handles git for this entire build.

---

## Self-Review Notes

Cross-checked spec sections against tasks:

- Spec §3 site map (11 routes): all covered (Tasks 9, 10, 11, 12, 13, 14, 15, 16).
- Spec §4 booking flow (5 points): tabs on `/book`, deep links, tutor profile embed, service page CTAs → all in Task 15 + Task 10's CTA wiring + Task 13.
- Spec §5 homepage 13 sections: covered in Task 9 (announcement, nav, hero, hero stats, marquee, services grid, what's included, how it works, tutor preview, why teaser, FAQ, big CTA, footer + sticky bar).
- Spec §6 service template: Task 10.
- Spec §7 tutor directory + profile: Tasks 12, 13.
- Spec §8 why-different 12 reasons + pillars + comparison table: Task 14, with data in Task 7.
- Spec §9 data model: Task 7 + Task 8.
- Spec §10 project structure: implicitly built across Tasks 1-17.
- Spec §11 tech notes: Cal.com vanilla snippet (Task 6.5 + 15), filter URL param (Task 12), `/book` URL params (Task 15) — all wired.
- Spec §12 out-of-scope: not built (correctly).

No placeholders, TBDs, or missing definitions found in the plan. Types in `services.ts`, `why-different.ts`, and tutor frontmatter are consistent.
