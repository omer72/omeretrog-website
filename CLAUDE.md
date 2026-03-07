# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (port 5173)
- `npm run build` — TypeScript check + Vite production build
- `npm run lint` — ESLint
- `npx vitest` — Run all tests (jsdom environment, globals enabled)
- `npx vitest run tests/nav.test.tsx` — Run a single test file

## Architecture

React 19 SPA for Omer Etrog's web migration service, deployed on GitHub Pages at `https://omer72.github.io/omeretrog-website/`.

**Routing:** `src/router.tsx` uses React Router 7 with `createBrowserRouter`. The router has `basename: import.meta.env.BASE_URL` for GitHub Pages subpath support. HomePage is eagerly loaded; WorkPage, AboutPage, ContactPage are lazy-loaded with `React.lazy`.

**Layout:** `RootLayout` wraps all routes (Nav + Outlet + Footer). Pages live in `src/pages/`, composed from components in `src/components/{home,work,about,contact,layout,ui}/`.

**Styling:** Tailwind CSS v4 with `@theme` design tokens in `src/styles/index.css`. Custom utility classes: `.gradient-text`, `.glass`, `.glow-accent`, `.gradient-btn`, `.gradient-border-top`. Dark theme only (class="dark" on html). Use logical properties (`text-start` not `text-left`) for RTL compatibility.

**i18n:** Lightweight context-based localization (no external library). English + Hebrew (RTL).
- `src/i18n/en.ts` / `src/i18n/he.ts` — translation dictionaries (Hebrew file uses actual Hebrew letters for editability)
- `src/i18n/LocaleContext.tsx` — `LocaleProvider` and `useLocale()` hook providing `t(key)`, `locale`, `setLocale`
- Locale persisted in `localStorage`. `<html dir>` and `lang` set via useEffect + inline script in `index.html` for flash prevention.
- Content files (`portfolio.ts`, `testimonials.ts`, `how-it-works.ts`, `schema.ts`) export locale-aware getter functions like `getPortfolioItems(locale)`.
- Heebo font loaded for Hebrew; `--font-sans` overridden in `[dir="rtl"]` CSS rule.

**Content:** Portfolio items, testimonials, how-it-works steps, and JSON-LD schema are data-driven from `src/content/`. The `PortfolioItem` type supports both before/after compare slider pairs and single-image items.

**Animations:** Framer Motion (motion package) with `ScrollReveal` component for scroll-triggered animations. All animations respect `prefers-reduced-motion`.

**Deployment:** GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to main. Vite `base` is set to `/omeretrog-website/` in CI via `GITHUB_ACTIONS` env check. Public asset paths use `import.meta.env.BASE_URL` prefix.

**External services:**
- Formspree for contact form (`VITE_FORMSPREE_FORM_ID`)
- Cloudflare Turnstile for spam protection (`VITE_TURNSTILE_SITE_KEY`)
- Calendly embed for booking

**Tests:** Vitest + React Testing Library in `tests/` (not colocated). Test setup polyfills `ResizeObserver` and `IntersectionObserver` for jsdom.
