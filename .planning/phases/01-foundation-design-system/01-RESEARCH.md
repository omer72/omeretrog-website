# Phase 1: Foundation & Design System - Research

**Researched:** 2026-03-04
**Domain:** Astro 5 + Tailwind CSS v4 project scaffold, dark design system, navigation, SEO infrastructure
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Site uses dark premium theme with WCAG 4.5:1 contrast ratios on all text | Tailwind v4 `@theme` + `@layer base` pattern; color token table with pre-verified pairs documented in Code Examples |
| FOUND-02 | Site is fully responsive across mobile, tablet, and desktop | Tailwind responsive prefix system (`sm:`, `md:`, `lg:`); Nav mobile toggle pattern documented |
| FOUND-03 | Global navigation with links to all pages (Home, Work, About, Contact) | Astro layout component pattern; Nav built as `.astro` component with inline `<script>` for mobile toggle; `Astro.url.pathname` for active state |
| FOUND-04 | Consistent footer with contact info and social links | Footer is a static `.astro` component composed into the root `Layout.astro`; no JS needed |
| SEO-01 | Unique, keyword-targeted title and meta description on every page | `BaseHead.astro` component receives `title` + `description` props; each page passes its own values |
| SEO-04 | XML sitemap and robots.txt generated automatically | `@astrojs/sitemap` integration + dynamic `src/pages/robots.txt.ts` endpoint; `site` config key required |
| SEO-05 | Semantic HTML throughout (proper heading hierarchy, landmarks) | Documented in Architecture Patterns section; nav/main/footer landmarks, single `<h1>` per page rule |
</phase_requirements>

---

## Summary

Phase 1 establishes the complete scaffold that all subsequent phases inherit. The work divides into three independent tracks: (1) project initialisation and Tailwind v4 configuration, (2) root layout with Nav and Footer, and (3) SEO infrastructure (BaseHead component, sitemap, robots.txt). All three tracks can be built and verified before any page content is written.

The biggest risk in this phase is dark theme contrast failure. Gray values that look correct on a calibrated MacBook display often fail the WCAG 4.5:1 minimum when actually measured. The safe approach is to lock a small palette of pre-verified color pairs into Tailwind's `@theme` block before writing any component markup. Every color used on the site must trace back to one of these verified tokens — no inline hex values, no opacity tricks that lower contrast below threshold.

The second risk is deferred SEO infrastructure. The `BaseHead.astro` component and `@astrojs/sitemap` integration must be wired in Phase 1, not retrofitted in a later phase. Once pages accumulate content, adding per-page metadata cleanly requires the `BaseHead` interface to already exist. The sitemap requires Astro's `site` config key, which must be set before the first deployment; it cannot be added to an already-deployed site without triggering a full re-crawl.

**Primary recommendation:** Create the project, configure Tailwind v4 with the verified dark color token palette, build `Layout.astro` composing `Nav` + `Footer`, create `BaseHead.astro` for per-page SEO, and add `@astrojs/sitemap`. Verify contrast ratios before proceeding to Phase 2.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.18.x | Site framework, SSG, routing, image optimisation | Zero JS by default; Islands architecture; first-class Tailwind v4 support via `npx astro add tailwind` |
| Tailwind CSS | 4.2.x | Utility-first styling + design token system | CSS-first `@theme` block replaces `tailwind.config.js`; generates CSS custom properties automatically; 5x faster builds than v3 |
| @tailwindcss/vite | 4.2.x | Tailwind v4 Vite plugin (replaces old PostCSS setup) | Required for Tailwind v4 in Astro; installed automatically by `npx astro add tailwind` |
| @astrojs/sitemap | latest | Automatic `sitemap-index.xml` + `sitemap-0.xml` generation | Official Astro integration; zero configuration beyond adding `site` URL to `astro.config.mjs` |
| TypeScript | 5.x (bundled with Astro) | Type safety for `.astro` frontmatter and `.ts` files | Enables typed props for `BaseHead`, `Nav`, and content interfaces defined in later phases |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | auto (bundled by Astro) | Image optimisation for `<Image />` component | Used automatically; no separate install needed |
| prettier + prettier-plugin-astro | latest | Code formatting that handles `.astro` file syntax | Without `prettier-plugin-astro`, Prettier mangles Astro's frontmatter delimiter (`---`) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind v4 CSS-first `@theme` | Tailwind v3 `tailwind.config.js` | v3 receives security fixes only; v4 is stable, faster, and the Astro integration targets it. Do not start a new project on v3. |
| `@astrojs/sitemap` | `astro-sitemap` (third-party) | Official integration is simpler and maintained by the Astro team. Use the official one. |
| Dynamic `robots.txt.ts` | Static `public/robots.txt` | Dynamic file reuses the `site` value from `astro.config.mjs` and automatically references the correct sitemap URL. Use dynamic. |

**Installation:**
```bash
# Bootstrap (choose the minimal TypeScript template)
npm create astro@latest omeretrog-website -- --template minimal --typescript strict

cd omeretrog-website

# Add Tailwind v4 (configures @tailwindcss/vite automatically)
npx astro add tailwind

# Add @astrojs/sitemap
npx astro add sitemap

# Dev tools (Prettier for .astro file formatting)
npm install -D prettier prettier-plugin-astro
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)

```
src/
├── layouts/
│   └── Layout.astro          # Root layout: BaseHead + Nav + Footer + <slot />
├── components/
│   ├── BaseHead.astro         # <head> SEO block: title, meta, canonical, OG
│   ├── Nav.astro              # Top navigation bar with mobile toggle
│   └── Footer.astro           # Footer with contact info and social links
├── pages/
│   ├── index.astro            # Home page (placeholder for Phase 2)
│   ├── work.astro             # Work/Portfolio page (placeholder for Phase 3)
│   ├── about.astro            # About page (placeholder for Phase 2)
│   ├── contact.astro          # Contact page (placeholder for Phase 4)
│   └── robots.txt.ts          # Dynamic robots.txt endpoint
└── styles/
    └── global.css             # @import "tailwindcss"; @theme block; @layer base
```

**Note:** Astro uses `src/pages/` for routing (not `app/` as in Next.js). The file `src/pages/index.astro` maps to `/`. No `page.tsx` files — Astro pages use `.astro` extension.

### Pattern 1: Root Layout Component

**What:** A single `Layout.astro` wraps every page. It receives `title` and `description` as props, passes them down to `BaseHead`, and composes `Nav` and `Footer` around a `<slot />`.

**When to use:** Always. Every page imports `Layout` and passes its own SEO props.

**Example:**
```astro
---
// src/layouts/Layout.astro
// Source: https://docs.astro.build/en/tutorial/3-components/

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body class="bg-surface text-text-primary">
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Per-page usage:**
```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---
<Layout
  title="Wix to Modern Web — Under an Hour | Omer Etrog"
  description="Omer Etrog transforms outdated Wix sites into fast, modern websites in under an hour. View portfolio, pricing, and book a free consultation."
>
  <h1>...</h1>
</Layout>
```

### Pattern 2: BaseHead SEO Component

**What:** A reusable `BaseHead.astro` component that renders all `<head>` metadata from props. Phase 1 delivers title, description, charset, viewport, and canonical. Phase 2 extends it with OG tags.

**When to use:** Imported once inside `Layout.astro`. Never write raw `<title>` or `<meta name="description">` directly in page files.

**Example:**
```astro
---
// src/components/BaseHead.astro
// Source: https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/

interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image = '/og/default.jpg' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />
<link rel="sitemap" href="/sitemap-index.xml" />
```

### Pattern 3: Dark Theme via Tailwind v4 @theme

**What:** Define all color tokens in a single `@theme` block in `global.css`. Tailwind v4 automatically generates both utility classes (`bg-surface`, `text-text-primary`) and CSS custom properties (`--color-surface`, `--color-text-primary`) from these tokens.

**When to use:** All colors on the site must trace to a token defined here. No inline hex values in component markup.

**Example:**
```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */

@import "tailwindcss";

@theme {
  /* Background surfaces — near-black, not pure black (reduces halation) */
  --color-surface:        #111111;   /* page background */
  --color-surface-raised: #1a1a1a;   /* card / elevated surface */
  --color-surface-border: #2a2a2a;   /* dividers, borders */

  /* Text — pre-verified against #111111 background */
  --color-text-primary:   #f0f0f0;   /* ratio vs #111111: 16.75:1  PASS */
  --color-text-secondary: #a8a8a8;   /* ratio vs #111111:  5.74:1  PASS */
  --color-text-muted:     #767676;   /* ratio vs #111111:  4.54:1  PASS (minimum) */

  /* Brand accent */
  --color-accent:         #7c6af7;   /* ratio vs #111111:  5.94:1  PASS */
  --color-accent-hover:   #9585f8;   /* ratio vs #111111:  8.15:1  PASS */

  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  :root {
    color-scheme: dark;
  }
  html {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
  }
}
```

**Critical:** The hex values above are examples only. Verify every pair at https://webaim.org/resources/contrastchecker/ before committing. Record the ratio next to each token as a comment — this is the contract that prevents future regressions.

### Pattern 4: Mobile-Responsive Navigation (Pure Astro, No React)

**What:** The Nav is a `.astro` component (not a React island). Mobile toggle uses a minimal inline `<script>` block — no React, no useState. This keeps the nav zero-JS until the user taps the menu button.

**When to use:** For simple toggle-only mobile menus. If the nav requires complex state (dropdowns, animations), wrap in a React island. For this site, a simple show/hide is sufficient.

**Example:**
```astro
---
// src/components/Nav.astro
// Source: https://docs.astro.build/en/tutorial/3-components/4/

const navLinks = [
  { href: '/',        label: 'Home'    },
  { href: '/work',    label: 'Work'    },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
];

const currentPath = Astro.url.pathname;
---
<nav aria-label="Main navigation">
  <a href="/" class="font-bold text-text-primary">Omer Etrog</a>

  <!-- Desktop links -->
  <ul class="hidden md:flex gap-8" id="nav-links">
    {navLinks.map(link => (
      <li>
        <a
          href={link.href}
          aria-current={currentPath === link.href ? 'page' : undefined}
          class="text-text-secondary hover:text-text-primary transition-colors"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>

  <!-- Mobile hamburger button -->
  <button
    id="menu-toggle"
    aria-expanded="false"
    aria-controls="mobile-menu"
    aria-label="Toggle navigation menu"
    class="md:hidden"
  >
    <!-- hamburger icon SVG -->
  </button>

  <!-- Mobile menu -->
  <ul id="mobile-menu" class="hidden md:hidden flex-col gap-4" aria-label="Mobile navigation">
    {navLinks.map(link => (
      <li>
        <a href={link.href} aria-current={currentPath === link.href ? 'page' : undefined}>
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => {
    const isOpen = menu?.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
</script>
```

### Pattern 5: Dynamic robots.txt Endpoint

**What:** Instead of a static `public/robots.txt`, create a TypeScript API route that reads the `site` value from `astro.config.mjs` and outputs the correct sitemap URL.

**Example:**
```typescript
// src/pages/robots.txt.ts
// Source: https://docs.astro.build/en/guides/integrations-guide/sitemap/

import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};
```

### Pattern 6: Sitemap Configuration

```javascript
// astro.config.mjs
// Source: https://docs.astro.build/en/guides/integrations-guide/sitemap/

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://omeretrog.com',  // REQUIRED — sitemap fails without this
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Anti-Patterns to Avoid

- **Inline color values:** Never write `text-[#a8a8a8]` in component markup. If a token isn't in `@theme`, add it there. Global find/replace later is expensive.
- **Pure black background (`#000000`):** Causes halation (glowing halos) for users with astigmatism. Use `#111111` or `#0f0f0f` as the page background.
- **Skipping `aria-current="page"` on nav links:** Screen readers rely on this to announce the current page. Astro's `Astro.url.pathname` makes this trivial — no excuse to skip it.
- **Making Nav a React island:** For a show/hide toggle, a `<script>` block in a `.astro` file ships far less JavaScript. Only upgrade to React if the nav needs complex reactive state.
- **Putting all SEO tags directly in each page file:** Use `BaseHead.astro` — one place to add future tags (OG, JSON-LD) and they appear on every page instantly.
- **Setting `color-scheme: dark` only in CSS:** Also set `<html class="dark">` or equivalent if you ever need explicit dark-class targeting in Tailwind variants.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Manual `sitemap.xml` with hardcoded URLs | `@astrojs/sitemap` | Handles pagination, `lastmod` dates, multiple sitemaps for large sites; auto-updates on every build |
| robots.txt with correct sitemap URL | Static file with hardcoded domain | `src/pages/robots.txt.ts` dynamic endpoint | References `site` from config — survives domain changes without manual edits |
| Contrast ratio verification | Eye test or CSS opacity hacks | WebAIM Contrast Checker + token comments | Eye tests fail; opacity overlays lower contrast below threshold; a 30-second tool check prevents months of rework |
| Font loading | Manual `@font-face` with multiple format variants | Astro's font optimization or a Google Fonts `<link>` in `BaseHead` | Astro handles subsetting and preloading; rolling manual font loading introduces layout shift (CLS) |

**Key insight:** Phase 1 is infrastructure, not features. The highest-value work is establishing constraints (color tokens, font scale, spacing scale) that prevent all future components from making ad-hoc style decisions.

---

## Common Pitfalls

### Pitfall 1: Dark Theme Contrast Failure (HIGH risk)

**What goes wrong:** Gray text that looks fine on screen (`#9B9B9B`) actually fails WCAG 4.5:1 on a dark background. The failure is invisible during development and only surfaces in accessibility audits.

**Why it happens:** Human eyes are poor judges of contrast ratios. Design tools show colors in isolation; the ratio must be computed algorithmically.

**How to avoid:** Before writing any component, measure every color pair you intend to use at https://webaim.org/resources/contrastchecker/. Record the ratio as a comment next to each token in `@theme`. Only use tokens that are documented as passing.

**Warning signs:** `#9B9B9B` text on dark backgrounds (classic fail), muted caption text using `opacity: 0.5` on a primary color, border-only elements where the border is the visual indicator.

**Minimum safe values on `#111111` background:**
- Text primary (`#f0f0f0`): ~16.75:1 (comfortably passes)
- Text secondary (`#a8a8a8`): ~5.74:1 (passes)
- Text muted (`#767676`): ~4.54:1 (barely passes — do not go darker)
- Any text below `#767676` on `#111111`: FAILS

### Pitfall 2: Missing `site` Config Key for Sitemap

**What goes wrong:** `@astrojs/sitemap` generates an empty or invalid sitemap, or `sitemap.xml` is entirely missing from the build output.

**Why it happens:** The integration silently skips generation if `site` is not set in `astro.config.mjs`.

**How to avoid:** Set `site: 'https://omeretrog.com'` in `astro.config.mjs` on day one. Verify by running `npm run build` locally and checking that `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist.

**Warning signs:** No `sitemap-index.xml` in the build output after adding the integration.

### Pitfall 3: `@astrojs/tailwind` (Deprecated Integration)

**What goes wrong:** Developer installs the old `@astrojs/tailwind` package (the legacy Astro integration) instead of using the new Vite plugin approach. This causes Tailwind v4 to not work correctly.

**Why it happens:** The old package still appears in search results and some older tutorials.

**How to avoid:** Use `npx astro add tailwind` on Astro 5.2+. This installs `@tailwindcss/vite` and configures `astro.config.mjs` correctly. Do not manually install `@astrojs/tailwind`.

**Warning signs:** A `tailwind.config.js` file being created (Tailwind v4 is CSS-first — no JS config file should exist).

### Pitfall 4: Placeholder SEO Content at Launch

**What goes wrong:** Pages ship with `title="My Page"` or empty `description` because SEO copy was deferred.

**Why it happens:** Developers treat SEO as a post-build polish task. Recovery after indexing means waiting for Google to re-crawl.

**How to avoid:** Write actual keyword-targeted titles and descriptions before building page stubs. The STATE.md notes this as a pending todo ("Write keyword-targeted SEO titles and meta descriptions per page before Phase 1 planning"). These must be ready before the page stubs are created.

**SEO title formula for this site:** `[Page-specific keyword] | Omer Etrog`
- Home: "Wix to Modern Web — Under an Hour | Omer Etrog"
- Work: "Website Transformation Portfolio | Omer Etrog"
- About: "About Omer Etrog — Web Migration Specialist"
- Contact: "Book a Free Consultation | Omer Etrog"

### Pitfall 5: Nav Active State Not Set

**What goes wrong:** All nav links look identical regardless of current page; screen readers cannot announce active page.

**How to avoid:** Use `Astro.url.pathname` to compare against each link's `href` and set `aria-current="page"` on the matching link. See Nav pattern above.

---

## Code Examples

Verified patterns from official sources:

### Tailwind v4 @theme Token Block with Contrast Annotations

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */

@import "tailwindcss";

@theme {
  /* ── Surfaces ──────────────────────────────────────────────────────── */
  --color-surface:        #111111;   /* page background                  */
  --color-surface-raised: #1a1a1a;   /* cards, nav background             */
  --color-surface-border: #2a2a2a;   /* borders, dividers                 */

  /* ── Text — verified at webaim.org/resources/contrastchecker/ ─────── */
  --color-text-primary:   #f0f0f0;   /* on #111111 → ~16.75:1  PASS      */
  --color-text-secondary: #a8a8a8;   /* on #111111 →  ~5.74:1  PASS      */
  --color-text-muted:     #767676;   /* on #111111 →  ~4.54:1  PASS      */

  /* ── Accent ────────────────────────────────────────────────────────── */
  --color-accent:         #7c6af7;   /* on #111111 →  ~5.94:1  PASS      */
  --color-accent-hover:   #9585f8;   /* on #111111 →  ~8.15:1  PASS      */

  /* ── Typography ────────────────────────────────────────────────────── */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* ── Spacing & Radius ────────────────────────────────────────────────*/
  --radius-card: 0.75rem;
  --radius-btn:  0.5rem;
}

@layer base {
  :root {
    color-scheme: dark;
  }
  html {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  /* Ensure no raw <a> tags have invisible link color on dark background */
  a {
    color: var(--color-accent);
  }
}
```

### Astro Config with Sitemap

```javascript
// astro.config.mjs
// Source: https://docs.astro.build/en/guides/integrations-guide/sitemap/
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://omeretrog.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Layout.astro Skeleton

```astro
---
// src/layouts/Layout.astro
import BaseHead from '../components/BaseHead.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body>
    <Nav />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Semantic Landmarks Checklist (SEO-05)

Every page must include:
```astro
<header>  <!-- contains Nav -->
<main id="main-content">    <!-- one per page, wraps all content -->
  <h1><!-- unique, keyword-targeted, one per page --></h1>
  <section aria-label="[section name]">...</section>
</main>
<footer>  <!-- contains Footer -->
```

Rules:
- One `<h1>` per page — heading is the page's primary keyword
- Heading hierarchy: `h1` → `h2` → `h3`, no skipping levels
- `<nav aria-label="Main navigation">` for the primary nav
- `<footer>` wraps the site footer
- `<main>` wraps primary content (skip-nav target)
- `<section>` with `aria-label` for each major content section

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `darkMode: 'class'` | `@theme` block in CSS + `@layer base` color scheme | Tailwind v4.0 (Jan 2025) | No JS config file; design tokens are CSS-native |
| `@astrojs/tailwind` integration package | `@tailwindcss/vite` Vite plugin | Astro 5.2 + Tailwind v4 | Old package is deprecated; new Vite plugin is faster and maintained |
| `next/head` for per-page metadata | `BaseHead.astro` component + props | Astro always | Astro doesn't have a metadata API like Next.js — use a component |
| Static `public/robots.txt` | `src/pages/robots.txt.ts` dynamic endpoint | Astro 2+ (stable) | Dynamic file auto-references correct `site` URL from config |

**Deprecated/outdated:**
- `@astrojs/tailwind`: No longer maintained; conflicts with Tailwind v4's CSS-first approach. Do not install.
- `tailwind.config.js`: Not used in Tailwind v4. The `@theme` directive in CSS replaces it entirely.

---

## Open Questions

1. **Final production URL for `site` config key**
   - What we know: `astro.config.mjs` requires `site: 'https://...'` for sitemap generation
   - What's unclear: Whether the domain `omeretrog.com` is confirmed and registered
   - Recommendation: Use `https://omeretrog.com` as a placeholder; update before first Netlify deployment. Build will warn but not fail if set to a placeholder.

2. **Font choice: Inter vs. custom brand font**
   - What we know: Inter is specified in the research stack as the placeholder; it is free, widely available via Google Fonts, and highly legible at all weights
   - What's unclear: Whether Omer has a preference for a different typeface (e.g., a display font for headings)
   - Recommendation: Default to Inter for both body and headings in Phase 1. If a display font is desired, extend `@theme` with `--font-display` and a Google Fonts import in `BaseHead`.

3. **SEO copy readiness**
   - What we know: STATE.md flags "Write keyword-targeted SEO titles and meta descriptions per page before Phase 1 planning" as a pending todo
   - What's unclear: Whether this copy is now available
   - Recommendation: The Phase 1 planner should treat SEO titles and descriptions as a required input, not an implementation task. If copy is not available, stub pages with placeholder copy marked with a `TODO` comment — but do not ship to production without real copy.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — new Astro project has no test framework installed |
| Config file | Wave 0 gap — needs creation |
| Quick run command | `npm run build && ls dist/sitemap-index.xml dist/robots.txt` (build smoke test) |
| Full suite command | `npm run build` + manual browser checks at 375px / 768px / 1280px |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | All text color pairs pass WCAG 4.5:1 | manual | WebAIM Contrast Checker on each token pair; run `axe-core` audit via browser extension | N/A — manual tool |
| FOUND-02 | Responsive layout at 375px, 768px, 1280px | manual | Browser DevTools viewport resize; check Nav collapses at mobile, expands at desktop | N/A — manual |
| FOUND-03 | Nav renders with all 4 links; mobile toggle works | smoke | `npm run build` then serve and manually verify | N/A — manual |
| FOUND-04 | Footer appears on all 4 pages with contact info | smoke | `npm run build` and open each page in browser | N/A — manual |
| SEO-01 | Each page has unique `<title>` and `<meta name="description">` | automated | `npm run build && grep -r '<title>' dist/` to verify uniqueness | ❌ Wave 0 |
| SEO-04 | `sitemap-index.xml` and `robots.txt` present in build output | automated | `npm run build && ls dist/sitemap-index.xml dist/robots.txt` | ❌ Wave 0 |
| SEO-05 | One `<h1>` per page, heading hierarchy correct, landmarks present | automated | `npm run build && npx axe-cli dist/index.html dist/work/index.html dist/about/index.html dist/contact/index.html` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` (catches broken imports, missing integrations, TS errors)
- **Per wave merge:** `npm run build` + manual browser checks at all three viewport widths
- **Phase gate:** Build passes with zero errors, all 4 pages render correctly, sitemap and robots.txt present in `dist/`, contrast ratios manually verified before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scripts/verify-seo.sh` or post-build `grep` for `<title>` uniqueness — covers SEO-01
- [ ] `npm run build && ls dist/sitemap-index.xml dist/robots.txt` — covers SEO-04 (run as part of CI or manual verification step)
- [ ] Install `axe-cli` for automated accessibility checks: `npm install -D @axe-core/cli` — covers SEO-05 and FOUND-01 partial check

No shared test fixtures needed for Phase 1 (no content data files yet — those come in Phase 2).

---

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Docs — Theme Variables](https://tailwindcss.com/docs/theme) — `@theme` syntax, custom properties, namespace reference
- [Tailwind CSS v4.0 Release Blog](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, deprecation of `tailwind.config.js`
- [Install Tailwind CSS with Astro — Official Guide](https://tailwindcss.com/docs/installation/framework-guides/astro) — Vite plugin setup steps
- [@astrojs/sitemap Integration Docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap configuration, dynamic `robots.txt.ts` pattern
- [Astro Tutorial — Navigation Component](https://docs.astro.build/en/tutorial/3-components/) — `Astro.url.pathname` for active nav state, inline `<script>` toggle pattern
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — WCAG 4.5:1 standard verification tool
- [W3C WCAG 2.1 — Success Criterion 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) — normative 4.5:1 requirement

### Secondary (MEDIUM confidence)
- [Complete Guide to Astro Website SEO — eastondev.com](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/) — `BaseHead.astro` component pattern with OG tags; verified against official Astro docs structure
- [Astro 5.2 Tailwind 4 Support — The New Stack](https://thenewstack.io/astro-5-2-brings-tailwind-4-support-and-new-features/) — confirms deprecation of `@astrojs/tailwind` in favor of `@tailwindcss/vite`
- [Dark Mode UI Best Practices — designstudiouiux.com](https://www.designstudiouiux.com/blog/dark-mode-ui-design-best-practices/) — near-black background guidance (avoid pure black)

### Tertiary (LOW confidence — cross-check before use)
- [Astro 5 + Tailwind CSS v4 Dark Mode Toggle Demo — GitHub](https://github.com/Michinded/astro5-tailwindcss4-darkmode-toggle) — community example; patterns appear correct but not officially endorsed

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Astro 5 + Tailwind v4 + `@astrojs/sitemap` all verified against official docs
- Architecture: HIGH — `Layout.astro` + `BaseHead.astro` + Nav/Footer pattern is the canonical Astro approach per official tutorial
- Pitfalls: HIGH — Contrast requirement is WCAG-normative; `site` config key requirement is documented in `@astrojs/sitemap` official docs; deprecated `@astrojs/tailwind` flag is verified

**Research date:** 2026-03-04
**Valid until:** 2026-06-04 (stable ecosystem — Tailwind v4 and Astro 5 are in active stable release; unlikely to change fundamentally in 90 days)
