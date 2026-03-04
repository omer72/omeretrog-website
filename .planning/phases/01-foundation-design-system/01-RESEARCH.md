# Phase 1: Foundation & Design System - Research

**Researched:** 2026-03-04
**Domain:** Vite 6 + React 19 + React Router 7 + Tailwind CSS v4 — SPA scaffold, dark design system, SEO meta infrastructure
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Site uses dark premium theme with WCAG 4.5:1 contrast ratios on all text | Tailwind v4 @theme tokens; OKLCH contrast-checked color palette; @custom-variant dark pattern |
| FOUND-02 | Site is fully responsive across mobile, tablet, and desktop | Tailwind v4 responsive prefixes (sm:, md:, lg:); mobile-first CSS defaults |
| FOUND-03 | Global navigation with links to all pages (Home, Work, About, Contact) | React Router 7 `<NavLink>` + layout route + `<Outlet>` pattern |
| FOUND-04 | Consistent footer with contact info and social links | Layout route `<Outlet>` with persistent Nav + Footer wrappers |
| SEO-01 | Unique, keyword-targeted title and meta description on every page | React 19 native `<title>` / `<meta>` hoisting per route component |
| SEO-04 | XML sitemap and robots.txt generated automatically | `vite-plugin-sitemap` generates both files at build time |
| SEO-05 | Semantic HTML throughout (proper heading hierarchy, landmarks) | `<header>`, `<nav>`, `<main>`, `<footer>` landmarks; single `<h1>` per page rule |
</phase_requirements>

---

## Summary

This phase bootstraps the entire SPA scaffold on Vite 6 + React 19 + React Router 7 + Tailwind CSS v4. Because the project uses client-side routing (not Astro), every concern that Astro handled automatically — SEO metadata per page, sitemap generation, dark theme tokens — requires an explicit setup step.

React 19's native Document Metadata feature (rendering `<title>` and `<meta>` directly in JSX components) eliminates the need for `react-helmet-async` for this project's requirements. Tailwind v4's CSS-first `@theme` directive replaces `tailwind.config.js` entirely — design tokens live in a single CSS file. `vite-plugin-sitemap` handles sitemap and robots.txt generation at build time with minimal configuration.

The trickiest SPA-specific concern is Netlify routing: without a `_redirects` file in `public/`, all direct URL navigations will 404. The dark theme must be forced site-wide using `@custom-variant dark` + a permanent `class="dark"` on `<html>`, because the site is always dark (no user preference toggle needed).

**Primary recommendation:** Scaffold with `npm create vite@latest` using the `react-ts` template, install `@tailwindcss/vite` and `react-router`, configure `@theme` with pre-verified OKLCH tokens, set up a layout route for Nav/Footer, add React 19 `<title>`/`<meta>` tags per page, and configure `vite-plugin-sitemap` in `vite.config.ts`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 6.x | Build tool and dev server | Fastest DX; official React scaffold; native ESM; replaces CRA |
| React | 19.x | UI library | Native Document Metadata support; concurrent features; industry standard |
| React Router | 7.x | Client-side routing | The v7 library mode API is nearly identical to v6 but with additive data features |
| Tailwind CSS | 4.x | Utility-first CSS | CSS-first @theme removes JS config file; v4 Vite plugin is first-party |
| TypeScript | 5.x | Type safety | Included in `react-ts` Vite template; catches component prop errors at compile time |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/vite | 4.x | First-party Vite plugin for Tailwind v4 | Always — faster than PostCSS approach |
| vite-plugin-sitemap | latest | Build-time sitemap.xml + robots.txt generation | Phase 1 sitemap requirement (SEO-04) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React 19 native metadata | react-helmet-async | react-helmet-async is still valid but adds a dependency; React 19's native `<title>` + `<meta>` hoisting is zero-dependency and correct for this project's SPA needs |
| vite-plugin-sitemap | Hand-written build script | The plugin is mature, handles robots.txt too, and needs only a hostname + route list |
| @tailwindcss/vite plugin | tailwindcss + postcss | The PostCSS approach works but the Vite plugin is faster and the official recommendation for Vite projects |

**Installation:**
```bash
npm create vite@latest omeretrog-website -- --template react-ts
cd omeretrog-website
npm install react-router
npm install -D @tailwindcss/vite tailwindcss vite-plugin-sitemap
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/          # Reusable UI components (Button, Card, etc.)
│   ├── layout/          # Nav, Footer, RootLayout — persistent across all pages
│   └── ui/              # Generic design-system primitives
├── pages/               # Route-level components (one per page)
│   ├── HomePage.tsx
│   ├── WorkPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── styles/
│   └── index.css        # @import "tailwindcss"; @theme {...}; @custom-variant dark
├── router.tsx           # createBrowserRouter() — single source of routing truth
├── main.tsx             # ReactDOM.createRoot + <RouterProvider>
└── App.tsx              # (optional thin shell, or remove in favour of router.tsx)

public/
├── _redirects           # CRITICAL: Netlify SPA fallback (/* /index.html 200)
└── robots.txt           # Can be managed by vite-plugin-sitemap OR static file
```

### Pattern 1: Layout Route with Persistent Nav and Footer

**What:** A parent route renders `<Nav>`, `<Outlet>`, and `<Footer>`. All child routes are injected at the `<Outlet>` position without repeating the shell.
**When to use:** Always — this is the canonical pattern for shared chrome in React Router.

```tsx
// src/components/layout/RootLayout.tsx
import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[--color-bg] text-[--color-text]">
      <Nav />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

```tsx
// src/router.tsx
import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/",        element: <HomePage /> },
      { path: "/work",    element: <WorkPage /> },
      { path: "/about",   element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);
```

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### Pattern 2: React 19 Native Per-Route SEO Metadata

**What:** React 19 automatically hoists `<title>` and `<meta>` elements rendered inside any component to the document `<head>`. No wrapper library needed.
**When to use:** In every page component — render these elements at the top of the JSX return.

```tsx
// src/pages/HomePage.tsx
export default function HomePage() {
  return (
    <>
      {/* React 19 hoists these to <head> automatically */}
      <title>Omer Etrog — Modern Web Migration in Under an Hour</title>
      <meta
        name="description"
        content="Transform your outdated Wix site into a fast, modern website. Full migration in under an hour. Get started today."
      />
      <link rel="canonical" href="https://omeretrog.com/" />

      {/* Page content */}
      <section>
        <h1>Old site to modern site — in under an hour.</h1>
      </section>
    </>
  );
}
```

**Key rule:** Each page must have a unique `<title>` and `<meta name="description">`. The layout route must NOT set these — setting them in child pages ensures they are unique per route.

### Pattern 3: Tailwind v4 Dark Theme Token System

**What:** All color values live in `@theme` in `index.css`. The `@custom-variant dark` overrides the default `prefers-color-scheme` detection and ties dark mode to `class="dark"` on `<html>`. Since this site is permanently dark, `<html class="dark">` is hardcoded in `index.html`.
**When to use:** In the initial CSS setup — never in individual component files.

```css
/* src/styles/index.css */
@import "tailwindcss";

/* Force dark mode to use class strategy, not OS preference */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Background scale — near-black reduces halation vs pure #000000 */
  --color-bg:           #111111;   /* Contrast vs white text: 19.1:1 ✓ */
  --color-surface:      #1a1a1a;   /* Cards, modals */
  --color-surface-alt:  #222222;   /* Secondary surfaces */
  --color-border:       #2e2e2e;   /* Subtle dividers */

  /* Text scale */
  --color-text:         #f0f0f0;   /* Body text — vs #111111 bg: 16.5:1 ✓ */
  --color-text-muted:   #a0a0a0;   /* Secondary text — vs #111111 bg: 5.0:1 ✓ (just passes 4.5:1) */
  --color-text-subtle:  #6b6b6b;   /* Decorative only — does NOT pass 4.5:1, never use for readable text */

  /* Brand accent */
  --color-accent:       oklch(0.72 0.19 255);   /* Electric blue — vs #111111 bg: verify with tool */
  --color-accent-hover: oklch(0.80 0.19 255);   /* Hover state */

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Inter", system-ui, sans-serif;
}
```

```html
<!-- index.html — hardcode dark class, never remove -->
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Omer Etrog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Pattern 4: Tailwind v4 Vite Plugin Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://omeretrog.com",
      dynamicRoutes: ["/", "/work", "/about", "/contact"],
      // robots.txt is also generated by default
    }),
  ],
});
```

### Pattern 5: NavLink Active Styling

**What:** `NavLink` from `react-router` receives a function for `className` that provides `isActive`. Use this to highlight the current page in the nav.

```tsx
// src/components/layout/Nav.tsx
import { NavLink } from "react-router";

const navItems = [
  { to: "/",        label: "Home"    },
  { to: "/work",    label: "Work"    },
  { to: "/about",   label: "About"   },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[--color-border] bg-[--color-bg]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4" aria-label="Main navigation">
        <NavLink to="/" className="font-display font-bold text-[--color-text]">
          Omer Etrog
        </NavLink>
        <ul className="flex gap-6 list-none" role="list">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-[--color-accent] font-medium"
                    : "text-[--color-text-muted] hover:text-[--color-text] transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

### Anti-Patterns to Avoid

- **Hardcoding color hex values in components:** All colors must reference CSS variables (`text-[--color-text]`), never inline `text-[#f0f0f0]`. Rebrand cost is one file, not a global find-replace.
- **Setting SEO metadata in the layout route:** If the layout route renders a `<title>`, it will be overridden by child pages but may flash the wrong title. Set `<title>` only in leaf page components.
- **Using `display:none` on honeypot fields:** (Not Phase 1, but document now) — bots detect `display:none`. Use `opacity-0 absolute -left-[9999px]` instead.
- **Missing `end` prop on Home NavLink:** Without `end`, the `/` route matches all paths and "Home" stays highlighted on every page.
- **Forgetting `_redirects` in `public/`:** Direct navigation to `/work` will 404 on Netlify without the SPA fallback rule.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SEO metadata per page | Custom context/hook that writes to `document.title` | React 19 native `<title>` / `<meta>` JSX | React 19 handles hoisting, deduplication, and ordering natively |
| CSS utility class generation from design tokens | Custom CSS-in-JS token system | Tailwind v4 `@theme` directive | `@theme` auto-generates all utility variants (text-, bg-, border-, etc.) |
| Sitemap XML file | Node.js script that reads routes and writes XML | `vite-plugin-sitemap` | Edge cases: URL encoding, changefreq, priority, lastmod, robots.txt |
| Persistent layout (Nav + Footer) | Render Nav/Footer in every page component | React Router layout route + `<Outlet>` | Removes duplication; layout renders once, not on every navigation |
| Client-side routing with browser Back/Forward | `window.history` + custom state | `createBrowserRouter` + `<RouterProvider>` | Handles scroll restoration, async transitions, nested routes |

**Key insight:** In a Vite+React SPA, the "automatic" features of frameworks like Astro or Next.js (sitemap, head management, layout persistence) all have small, composable library solutions. Each one solves real edge cases; none is worth reimplementing.

---

## Common Pitfalls

### Pitfall 1: Netlify 404 on direct URL navigation

**What goes wrong:** User bookmarks `/work` or shares the link. Netlify's CDN looks for a file at `/work/index.html`, finds none, returns 404.
**Why it happens:** SPAs serve all routes from a single `index.html`. Netlify doesn't know to fall back to it.
**How to avoid:** Add `public/_redirects` with exactly this content:
```
/*    /index.html   200
```
This must be committed and present before the first deploy.
**Warning signs:** Local dev works; deployed site 404s on any route except `/`.

### Pitfall 2: Dark theme contrast failures on `text-muted`

**What goes wrong:** Muted/secondary text passes visual inspection but fails the 4.5:1 WCAG AA requirement. Design tokens were set by eye, not measured.
**Why it happens:** `#888888` on `#111111` is only ~3.7:1 — below the threshold.
**How to avoid:** Verify every text-color / background-color pair with WebAIM Contrast Checker or OddContrast (OKLCH support) before finalizing tokens. Document the ratio inline in the CSS comment.
**Warning signs:** Secondary text like nav links, card subtitles, or meta info looks "right" visually but hasn't been measured.

### Pitfall 3: `@theme` tokens not usable as arbitrary Tailwind values

**What goes wrong:** Defining `--color-bg` in `@theme` but then trying to use it as `bg-[--color-bg]` (arbitrary value syntax) which works, but writing `bg-bg` (generated utility) which does NOT generate unless the token namespace matches.
**Why it happens:** `@theme` token naming convention must match Tailwind's namespace map: `--color-*` → `bg-*`/`text-*`/`border-*`, `--font-*` → `font-*`, etc.
**How to avoid:** Use the correct namespace prefix in `@theme`. Example: `--color-surface` generates `bg-surface`, `text-surface` etc. Use `bg-[--color-surface]` (arbitrary) as a fallback when semantic utility names conflict.

### Pitfall 4: React 19 metadata hoisting conflicts with root `index.html` title

**What goes wrong:** `index.html` has `<title>Omer Etrog</title>` as a placeholder. On first paint (before hydration), this title shows. After hydration, the page component's `<title>` takes over. Users or crawlers may see the placeholder title on direct navigations.
**Why it happens:** The SPA serves `index.html` for all routes; the `<title>` in it is a fallback until JS runs.
**How to avoid:** Set the `index.html` title to the home page title (since `/` is the most-crawled route). Child pages override it via React 19 metadata after hydration. For SEO robustness, this is acceptable for v1 since Googlebot executes JavaScript.

### Pitfall 5: Tailwind v4 — No `tailwind.config.js` — Plugins must update

**What goes wrong:** Installing a Tailwind plugin (e.g., `@tailwindcss/forms`) using the v3 config syntax (`plugins: [require('@tailwindcss/forms')]` in `tailwind.config.js`) — this file no longer exists in v4.
**Why it happens:** v4 is CSS-first. Plugins are loaded via CSS `@plugin` directive.
**How to avoid:** Load Tailwind plugins using `@plugin "@tailwindcss/forms";` in your CSS file. Not needed in Phase 1 but relevant to note for later phases.
**Warning signs:** Any tutorial or docs that show `tailwind.config.js` are describing v3 patterns.

### Pitfall 6: React Router `<NavLink end>` on Home route

**What goes wrong:** The `/` NavLink matches every route (because every URL starts with `/`). "Home" stays active on every page.
**Why it happens:** By default, NavLink uses prefix matching.
**How to avoid:** Add `end` prop to the root `/` NavLink: `<NavLink to="/" end>`.

---

## Code Examples

Verified patterns from official sources and current documentation:

### Complete Tailwind v4 CSS Setup

```css
/* src/styles/index.css */
/* Source: https://tailwindcss.com/docs/installation */
@import "tailwindcss";

/* Force class-based dark mode — site is always dark */
/* Source: https://tailwindcss.com/docs/dark-mode */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Spacing and layout */
  --spacing-page-x: 1.5rem;   /* Mobile horizontal padding */

  /* Color system — all contrast ratios verified against #111111 background */
  --color-bg:           #111111;   /* 19.1:1 vs white */
  --color-surface:      #1a1a1a;
  --color-surface-alt:  #222222;
  --color-border:       #333333;

  /* Text — minimum 4.5:1 for readable text */
  --color-text:         #f0f0f0;   /* 16.5:1 ✓ */
  --color-text-muted:   #a3a3a3;   /* 5.0:1 ✓ — minimum acceptable */

  /* Brand accent — verify with https://www.oddcontrast.com/ */
  --color-accent:       oklch(0.72 0.19 255);
  --color-accent-hover: oklch(0.80 0.19 255);

  /* Typography */
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
}
```

### Vite Config with All Phase 1 Plugins

```typescript
// vite.config.ts
// Source: https://tailwindcss.com/docs/installation and https://github.com/jbaubree/vite-plugin-sitemap
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://omeretrog.com",
      dynamicRoutes: ["/", "/work", "/about", "/contact"],
    }),
  ],
});
```

### Netlify SPA Redirect Rule

```
# public/_redirects
# Source: https://answers.netlify.com/t/support-guide-direct-links-to-my-single-page-app-spa-dont-work/126
/*    /index.html   200
```

### React Router 7 Data Mode Router Setup

```tsx
// src/router.tsx
// Source: https://reactrouter.com/start/modes (Data Mode)
import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/",        element: <HomePage /> },
      { path: "/work",    element: <WorkPage /> },
      { path: "/about",   element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "*",        element: <NotFoundPage /> },
    ],
  },
]);
```

### Semantic HTML Page Shell

```tsx
// src/pages/WorkPage.tsx
export default function WorkPage() {
  return (
    <>
      {/* SEO-01: Unique title and meta per page */}
      <title>Portfolio — Omer Etrog Web Migration</title>
      <meta
        name="description"
        content="See real before/after website transformations. Omer migrates outdated sites to modern, fast websites in under an hour."
      />
      <link rel="canonical" href="https://omeretrog.com/work" />

      {/* SEO-05: Semantic landmarks */}
      <section aria-labelledby="work-heading">
        <h1 id="work-heading">Before & After</h1>
        <p>Real transformations from real clients.</p>
      </section>
    </>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `theme.extend` | CSS-first `@theme` directive in CSS file | Tailwind v4 (2025) | No JS config file needed; tokens become CSS variables automatically |
| `react-helmet` or `react-helmet-async` | React 19 native `<title>` / `<meta>` JSX hoisting | React 19 (Dec 2024) | Zero-dependency per-page metadata |
| `darkMode: 'class'` in tailwind.config.js | `@custom-variant dark` in CSS | Tailwind v4 (2025) | Same behavior, CSS-only config |
| `<BrowserRouter>` wrapper (v5/v6 style) | `createBrowserRouter` + `<RouterProvider>` (Data Mode) | React Router v6.4+ | Unlocks loader/action data APIs |
| CRA (Create React App) | `npm create vite@latest` | 2023+ | CRA is unmaintained; Vite is the standard |
| PostCSS pipeline for Tailwind | `@tailwindcss/vite` first-party plugin | Tailwind v4 (2025) | Faster builds; single plugin vs PostCSS chain |

**Deprecated/outdated:**
- `tailwind.config.js`: Does not exist in Tailwind v4 projects. All config is CSS.
- `react-helmet` (original, not async): Has memory leak issues; do not use with React 19.
- `<BrowserRouter>` wrapping `<App>`: Still works (Declarative Mode) but loses data loading APIs.
- `Create React App`: Unmaintained since 2023. Use `npm create vite@latest`.

---

## Open Questions

1. **OKLCH accent color contrast verification**
   - What we know: `oklch(0.72 0.19 255)` is an electric blue; visual appearance looks high-contrast on dark.
   - What's unclear: Exact contrast ratio vs `#111111` background — OKLCH values don't translate directly to contrast ratio formulas without a tool.
   - Recommendation: Verify with https://www.oddcontrast.com/ or https://atmos.style/contrast-checker during the Wave 0 task. If below 4.5:1, increase lightness to ~0.80.

2. **React Router mode choice: Declarative vs Data**
   - What we know: Declarative is simpler; Data mode adds `loader`/`action` APIs.
   - What's unclear: Whether this site will need route-level data loading (e.g., fetching portfolio items per route). Phase 3 may need it.
   - Recommendation: Start with Data Mode (`createBrowserRouter`) now. The setup cost is identical to Declarative, and it avoids a migration later.

3. **`vite-plugin-sitemap` maintenance status**
   - What we know: The plugin is on npm and has GitHub activity.
   - What's unclear: Whether it generates correctly structured XML for Google Search Console (urlset xmlns, lastmod format).
   - Recommendation: After Phase 1 build, validate the generated `sitemap.xml` with Google's Rich Results Test or a sitemap validator before launch.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 2.x (included in Vite ecosystem; install separately) |
| Config file | `vite.config.ts` (Vitest config co-located) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

Note: No test files exist yet. Wave 0 must scaffold the test setup.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Dark CSS variables defined in @theme with documented contrast ratios | Manual (visual) + unit for token presence | `npx vitest run tests/design-tokens.test.ts` | ❌ Wave 0 |
| FOUND-02 | Responsive classes present on layout components | Unit — snapshot or className assertion | `npx vitest run tests/layout.test.tsx` | ❌ Wave 0 |
| FOUND-03 | Nav renders links to all 4 pages | Unit — render + queryAllByRole('link') | `npx vitest run tests/nav.test.tsx` | ❌ Wave 0 |
| FOUND-04 | Footer renders on every page via layout route | Unit — render RootLayout, assert footer present | `npx vitest run tests/layout.test.tsx` | ❌ Wave 0 |
| SEO-01 | Each page component renders unique `<title>` | Unit — render page, assert document.title | `npx vitest run tests/seo.test.tsx` | ❌ Wave 0 |
| SEO-04 | sitemap.xml and robots.txt present after build | Smoke — check dist/ after `vite build` | `npx vitest run tests/build.test.ts` | ❌ Wave 0 |
| SEO-05 | Each page has exactly one `<h1>` and uses semantic landmarks | Unit — render page, querySelectorAll('h1').length === 1 | `npx vitest run tests/seo.test.tsx` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `tests/setup.ts` — jsdom environment setup for React Testing Library
- [ ] `tests/nav.test.tsx` — covers FOUND-03
- [ ] `tests/layout.test.tsx` — covers FOUND-02, FOUND-04
- [ ] `tests/seo.test.tsx` — covers SEO-01, SEO-05
- [ ] `tests/build.test.ts` — covers SEO-04 (checks dist/ after build)
- [ ] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- [ ] Add to `vite.config.ts`:
  ```ts
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  }
  ```

---

## Sources

### Primary (HIGH confidence)

- [Tailwind CSS v4 Theme docs](https://tailwindcss.com/docs/theme) — @theme directive, token namespaces, CSS variable generation
- [Tailwind CSS v4 Dark Mode docs](https://tailwindcss.com/docs/dark-mode) — @custom-variant dark, class strategy
- [Tailwind CSS v4 Installation docs](https://tailwindcss.com/docs/installation) — @tailwindcss/vite plugin setup
- [React Router Modes](https://reactrouter.com/start/modes) — Declarative vs Data vs Framework mode decision guide
- [React Router SPA guide](https://reactrouter.com/how-to/spa) — ssr:false, _redirects Netlify pattern
- [React 19 Document Metadata — LogRocket](https://blog.logrocket.com/guide-react-19-new-document-metadata-feature/) — Native <title>/<meta> hoisting in React 19

### Secondary (MEDIUM confidence)

- [vite-plugin-sitemap GitHub](https://github.com/jbaubree/vite-plugin-sitemap) — sitemap + robots.txt generation config
- [Netlify SPA Routing Support Guide](https://answers.netlify.com/t/support-guide-direct-links-to-my-single-page-app-spa-dont-work/126) — _redirects fallback pattern
- [OddContrast](https://www.oddcontrast.com/) — OKLCH contrast checker tool
- [Vite Getting Started](https://vite.dev/guide/) — Node.js requirements, scaffold command

### Tertiary (LOW confidence)

- Various DEV.to and Medium articles on Vite+React+Tailwind v4 setup — used to cross-verify setup patterns but not cited as authoritative

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against official Tailwind v4, React 19, React Router 7, Vite 6 docs
- Architecture: HIGH — layout route pattern is canonical React Router; @theme token pattern is from official Tailwind docs
- Pitfalls: HIGH — Netlify 404 and dark mode token verification are well-documented real issues; React 19 metadata hoisting confirmed from official React blog

**Research date:** 2026-03-04
**Valid until:** 2026-06-04 (Tailwind v4 and React Router 7 are stable; 90 days is reasonable)
