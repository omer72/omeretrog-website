# Stack Research

**Domain:** Premium service business marketing website (dark theme, before/after showcase, testimonials, lead generation)
**Researched:** 2026-03-04
**Confidence:** HIGH — all core decisions verified against official sources and current community consensus

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.18.x (latest stable) | Site framework / SSG | Zero-JS-by-default means perfect Lighthouse scores out of the box. Multi-page support is first-class. Islands architecture lets you drop in interactive React components (the before/after slider, contact form) without paying the full React bundle cost everywhere. Consistently outperforms Next.js on Core Web Vitals for content-marketing sites in independent benchmarks. |
| Tailwind CSS | 4.2.x (latest stable) | Utility-first styling | CSS-first configuration (no tailwind.config.js) is cleaner and builds 5x faster than v3. Dark theme is trivially implemented with a single CSS custom property layer — perfect for a fixed dark aesthetic. v4 ships with a Vite plugin that Astro 5.2+ integrates with natively via `npx astro add tailwind`. |
| Motion (formerly Framer Motion) | 11.x | Scroll animations, reveal effects | Astro ships zero JS, so Motion is added only to interactive islands where needed. The `whileInView` API and `useScroll` hook cover the majority of marketing-site animation patterns (fade-in on scroll, parallax hero, staggered reveals) with a clean React API. Smaller bundle than GSAP for this scope. |
| React | 19.x | UI islands (interactive components only) | Used selectively as an Astro island framework, NOT as the whole-page renderer. This means the before/after slider, contact form, and any animated components get React's ecosystem while the static shell ships zero KB. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-compare-slider | 3.x | Before/after image comparison slider | Use for the portfolio/work page transformation showcases. Zero dependencies, responsive by default, fully customizable handle and divider. The most maintained option in this category (highest stars, active releases). |
| Formspree (service, not npm package) | — | Contact form submissions | Use for the contact/booking page. Handles form POST, email delivery, spam filtering (Akismet), and submission storage with no server code. Free tier covers 50 submissions/month — sufficient for a lead-gen site. No EmailJS because it exposes credentials client-side. No Netlify Forms because it creates platform lock-in. |
| sharp | Current (auto-installed by Astro) | Image optimization | Astro's `<Image />` component uses sharp under the hood to generate WebP/AVIF variants and apply `loading="lazy"` + correct dimensions. Use for all hero images and before/after source images. Critical for performance on a dark, visually heavy site. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vite (built into Astro) | Dev server + bundler | Do not configure separately — Astro manages Vite internally. Tailwind v4's Vite plugin hooks in automatically via `npx astro add tailwind`. |
| TypeScript | Type safety across `.astro` and `.ts` files | Enable with `npx astro add typescript` or by choosing the TypeScript template at project init. Set `"strict": true` in tsconfig. |
| Prettier + prettier-plugin-astro | Code formatting | The `prettier-plugin-astro` package adds `.astro` file support. Without it, Prettier mangles Astro's frontmatter/template hybrid syntax. |
| ESLint + eslint-plugin-astro | Linting | Catches common Astro issues. Pairs with `@typescript-eslint/eslint-plugin` for TS rules. |

## Installation

```bash
# Bootstrap
npm create astro@latest omeretrog-website -- --template minimal --typescript strict

# Navigate into project
cd omeretrog-website

# Add Tailwind CSS v4 (official Astro integration, adds Vite plugin automatically)
npx astro add tailwind

# Add React (for interactive islands: slider, form)
npx astro add react

# Supporting libraries
npm install react-compare-slider motion

# Dev tools
npm install -D prettier prettier-plugin-astro eslint eslint-plugin-astro @typescript-eslint/eslint-plugin
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro 5 | Next.js 15 | Only if the site will evolve into a web app — authenticated areas, personalisation, server-rendered dynamic data, or heavy React component reuse across a larger engineering org. For a marketing site, Next.js ships 87 KB of JS on a blank page before any content is added; Astro ships 0. |
| Astro 5 | SvelteKit | Good choice if you want Svelte's terse syntax and smaller bundle over React islands. Roughly equivalent in performance to Astro for static sites. Downside: smaller ecosystem and fewer animation library options than React. Use if the developer prefers Svelte. |
| Tailwind CSS v4 | Tailwind CSS v3 | Do not use v3 for a new project started today. v4 is stable (4.2.x), faster, and has first-class Astro support. v3 will receive security fixes only. |
| Motion (React) | GSAP (GreenSock) | Use GSAP when animations are the *product* — complex narrative scroll experiences, SVG morphs, cinematic timelines. For a service site's reveal animations, Motion's API is simpler and the bundle footprint is 75% smaller for scroll animations. |
| Motion (React) | CSS animations | Use pure CSS for truly simple transitions (hover states, button feedback). For scroll-triggered viewport reveals and the hero entrance animation, Motion's `whileInView` eliminates manual IntersectionObserver boilerplate. |
| Formspree | Netlify Forms | Netlify Forms only works if you're deploying on Netlify and ties form infrastructure to the hosting provider. Formspree is platform-agnostic and works identically on Netlify, Vercel, or Cloudflare Pages. |
| Netlify | Vercel | Vercel's free tier prohibits commercial use. Netlify's free tier explicitly permits commercial use with a 100 GB bandwidth ceiling — appropriate for a service business site. Cloudflare Pages is also a valid alternative with unlimited bandwidth on free tier; choose it if global edge performance is a priority. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@astrojs/tailwind` (old integration) | Deprecated as of Astro 5.2. The package is no longer maintained and offers no functionality over the official Vite plugin. Using it creates a maintenance burden and conflicts with Tailwind v4's CSS-first config. | `@tailwindcss/vite` (installed automatically by `npx astro add tailwind` on Astro 5.2+) |
| Create React App | Abandoned upstream — no releases since 2022. Produces no static output; ships full client-side React bundle on first load, destroying Core Web Vitals. | Astro with React islands |
| WordPress | Adding a PHP server layer to what is fundamentally a static brochure site increases hosting cost, surface area for exploits, and maintenance overhead. Content will be managed in code for v1. | Astro with content in `.astro` files or Content Collections |
| Chakra UI / MUI / shadcn-ui | These component libraries import significant JS even for simple display components. On a dark-themed, design-led portfolio site, Tailwind utilities give full control without fighting a component library's opinionated defaults. | Tailwind CSS utilities directly; Motion for animation |
| EmailJS | Sends form data using client-side code that exposes your email service API keys in the browser bundle. Any visitor can extract the key and send arbitrary emails on your behalf. | Formspree (server-side form backend) |
| GSAP (for this scope) | GSAP is the right tool for complex animation-as-product experiences. For a service site's scroll reveals and section entrances, GSAP's API complexity and licensing model (Club GreenSock for some features) is overkill. | Motion for React |

## Stack Patterns by Variant

**If the site stays static (content managed in code, no CMS):**
- Use `.astro` files for page-level content with TypeScript frontmatter
- Use Astro Content Collections for the portfolio/work showcase entries (structured data with type safety)
- No additional database or backend needed

**If a CMS is added later:**
- Astro's Content Layer (v5 feature) supports Contentful, Sanity, and any REST/GraphQL source via adapters
- No refactor needed — swap the data source, keep the same components

**If self-hosting instead of Netlify:**
- Add `@astrojs/node` adapter: `npx astro add node`
- Run as a Node.js static file server or behind Nginx
- The static output (`dist/`) can also be hosted on any CDN without an adapter

**If a blog is added later (out of scope for v1):**
- Astro Content Collections with Markdown/MDX support this natively
- No framework change required

## Version Compatibility

| Package | Compatible With | Notes |
|---------|----------------|-------|
| astro@5.18.x | tailwindcss@4.2.x | Requires Astro 5.2+ for the `@tailwindcss/vite` Vite plugin path. Use `npx astro add tailwind` which detects the version and configures correctly. |
| astro@5.18.x | react@19.x | Requires `@astrojs/react` integration. React 19 is the current stable release; Astro's React integration explicitly supports it. |
| motion@11.x | react@19.x | Motion 11 explicitly targets React 19 with concurrent rendering support. No compatibility issues. |
| react-compare-slider@3.x | react@19.x | Peer dependency is `react >= 16`. No issues with React 19. |

## Sources

- [Astro vs Next.js (Senorit, 2026)](https://senorit.de/en/blog/astro-vs-nextjs-2025) — performance benchmark data, MEDIUM confidence (third-party benchmarks)
- [Next.js vs Astro in 2025 — Makers Den](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website) — marketing site recommendation rationale, MEDIUM confidence
- [Astro 5.0 Release Blog](https://astro.build/blog/astro-5/) — Content Layer, Server Islands, static output mode — HIGH confidence (official)
- [Astro 5.2 — Tailwind 4 Support](https://thenewstack.io/astro-5-2-brings-tailwind-4-support-and-new-features/) — confirms native Tailwind v4 Vite plugin integration — HIGH confidence
- [Tailwind CSS v4.0 official release](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, performance numbers — HIGH confidence (official)
- [Tailwind CSS v4.1 release](https://tailwindcss.com/blog/tailwindcss-v4-1) — confirms v4 is at 4.1+ with continued releases — HIGH confidence (official)
- [npm: tailwindcss](https://www.npmjs.com/package/tailwindcss) — current version 4.2.1 as of March 2026 — HIGH confidence
- [npm: astro](https://www.npmjs.com/package/astro) — current version 5.18.0 as of March 2026 — HIGH confidence
- [Motion docs — scroll animations](https://motion.dev/docs/react-scroll-animations) — scroll animation API, HIGH confidence (official)
- [GSAP vs Motion comparison](https://motion.dev/docs/gsap-vs-motion) — bundle size comparison data — MEDIUM confidence (Motion's own docs, but numbers are specific)
- [Best React before/after slider libraries (Croct, 2026)](https://blog.croct.com/post/best-react-before-after-image-comparison-slider-libraries) — react-compare-slider recommendation — MEDIUM confidence
- [Netlify vs Vercel free tier commercial use](https://www.netlify.com/guides/netlify-vs-vercel/) — commercial use policy — HIGH confidence (official Netlify docs)
- [Formspree](https://formspree.io/) — pricing/features for static form handling — HIGH confidence (official)
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/) — hydration directives, use cases — HIGH confidence (official)
- [Install Tailwind with Astro — official guide](https://tailwindcss.com/docs/guides/astro) — setup instructions — HIGH confidence (official)

---
*Stack research for: Premium service business marketing website (omeretrog-website)*
*Researched: 2026-03-04*
