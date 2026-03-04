# Project Research Summary

**Project:** omeretrog-website — Omer Etrog Web Migration Service
**Domain:** Premium service business marketing website (dark theme, before/after showcase, lead generation)
**Researched:** 2026-03-04
**Confidence:** HIGH

## Executive Summary

This project is a premium multi-page marketing site for a Wix-to-modern web migration service. The research consensus is clear: build a statically generated site with Astro 5, Tailwind CSS v4, and React islands for the handful of interactive components (before/after slider, contact form). This stack delivers zero-JavaScript-by-default page loads with perfect Core Web Vitals — which is itself the most compelling demonstration of the service being sold. A slow web developer's portfolio is a disqualifying signal; a fast one is proof of skill. The architecture is intentionally minimal: four pages (Home, Work/Portfolio, About, Contact), content managed in typed TypeScript files, form submissions handled by Formspree. No backend, no CMS, no auth — anything else is scope creep for v1.

The critical differentiators for this site are the before/after image comparison showcase and speed-focused messaging around the "under an hour" migration claim. Both must be surfaced prominently — not buried in navigation. Research consistently shows that service buyers arrive skeptical and require trust signals in the first viewport, not after a long scroll. The contact page must offer both a form and an embedded booking calendar (Calendly or Cal.com) since booking calendars convert at roughly 2x the rate of forms alone for service businesses.

The primary risks are performance (animations killing Core Web Vitals on real mobile hardware), accessibility (dark theme contrast failures, inaccessible before/after slider), and SEO neglect (pretty site, invisible to search). All three are preventable if addressed at the foundation phase rather than retrofitted post-launch. The recovery cost for SEO missed at launch is rated HIGH — it requires months to recover organic traction — making it the most expensive pitfall to delay.

---

## Key Findings

### Recommended Stack

The unanimous recommendation is Astro 5 (SSG mode) with Tailwind CSS v4 and React islands. Astro ships zero JavaScript by default — interactive components like the before/after slider and contact form get React only where they need it, while the remaining ~80% of the site (hero, testimonials, headings, nav) ships pure HTML+CSS. This is the correct architecture for a content-marketing site where load speed is a trust signal in itself.

**Core technologies:**
- **Astro 5.18.x**: Site framework and SSG — zero-JS-by-default, Islands architecture, first-class Tailwind v4 support via `npx astro add tailwind`
- **Tailwind CSS 4.2.x**: Styling — CSS-first config, 5x faster builds than v3, dark theme via CSS custom properties, native Astro integration
- **React 19.x**: Interactive islands only — before/after slider, contact form; not the whole-page renderer
- **Motion (formerly Framer Motion) 11.x**: Scroll animations and entrance reveals — `whileInView` API, smaller bundle than GSAP for this scope
- **react-compare-slider 3.x**: Before/after image comparison — most-maintained library, responsive, zero dependencies
- **Formspree**: Contact form backend — handles POST, email delivery, spam filtering; no server code; free tier (50 submissions/month) sufficient for v1
- **Netlify**: Hosting — free tier explicitly permits commercial use (Vercel's does not)

**Avoid:** Next.js (87 KB JS on blank page, overkill for a static site), GSAP (complex API, licensing), EmailJS (exposes credentials client-side), component libraries like Chakra/MUI (JS overhead, fights dark theme control).

**Note on architecture research:** The ARCHITECTURE.md file was researched against Next.js App Router conventions (component names like `page.tsx`, `app/` directory structure). The component responsibilities and build order described there are directly applicable — only the file paths differ in Astro (`src/pages/` instead of `app/`, `.astro` files instead of `.tsx` pages). The patterns (thin page files composing section components, static content in TypeScript files, third-party form backend) apply identically.

### Expected Features

The feature landscape is well-defined for a service business marketing site. The "under an hour" migration claim is a genuine differentiator that most competitors lack — it must be quantified visually (timeline graphic, "How It Works" 3-step section) rather than just stated.

**Must have (table stakes — P1):**
- Hero section with bold value proposition and CTA — converts visitors in <5 seconds or they leave
- Before/after portfolio showcase — the product's proof of quality; nothing to sell without it
- Testimonials (minimum 2–3 with name, photo, and specific result) — required trust layer for high-consideration purchase
- "How It Works" process section — demystifies migration; critical when the process itself is the product
- Contact page with inquiry form AND embedded booking calendar — dual path; calendar converts 2x over form alone
- About section — anonymous freelancers don't get hired
- Mobile-responsive, fast-loading implementation — non-negotiable
- SEO basics (meta titles, descriptions, OG tags, semantic HTML, sitemap) — ensures site is findable

**Should have (differentiators — add after initial validation):**
- FAQ with schema markup — handles objections; FAQ schema earns rich snippets in search results
- Visible starting-from pricing — reduces drop-off at contact stage; "contact for quote" signals anxiety
- Results-focused case studies (problem, solution, measurable outcome) — 1–2 deep case studies convert better than screenshot grids
- Scroll animations and entrance reveals — premium feel; add as a polish pass after content is validated

**Defer to v2+:**
- Blog / content marketing — maintenance burden; empty blogs signal neglect
- Portfolio filtering — over-engineering for fewer than 8–10 projects
- Interactive pricing calculator — only if lead volume justifies automation

### Architecture Approach

The architecture is a statically generated four-page site. All pages render at build time. The only runtime network call is the contact form POST to Formspree. Content (testimonials, portfolio case studies) lives in typed TypeScript files imported by components at build time — no database, no CMS, no API. This structure is appropriate for v1 and can evolve: Astro's Content Layer (v5 feature) supports headless CMS sources via adapters without changing component interfaces.

**Major components:**
1. **Root Layout** — Nav, Footer, dark theme CSS custom properties, font loading; every page inherits this
2. **Hero Section** — Value proposition, primary CTA, supporting social proof teaser; highest-priority conversion element
3. **Before/After Showcase (React island)** — Interactive image comparison using react-compare-slider; requires `client:load` Astro directive; the portfolio's centrepiece
4. **Testimonials** — Static grid from TypeScript content file; no JS needed
5. **Contact Form (React island)** — Formspree-backed form with honeypot spam protection and booking calendar embed
6. **SEO Metadata** — Per-page title, description, OG tags, JSON-LD structured data; defined in each `.astro` page file

**Build order (from architecture research):**
1. Root layout + global CSS (dark theme tokens, typography)
2. Nav + Footer
3. Home page Hero section
4. Content data files (`src/content/work.ts`, `src/content/testimonials.ts`)
5. Before/After showcase component (most technically complex; isolate first)
6. Testimonials section
7. Work/Portfolio page
8. Contact form + Formspree integration
9. SEO metadata + sitemap
10. Responsive polish + Lighthouse audit

### Critical Pitfalls

1. **Dark theme contrast failures** — Gray text values like `#9B9B9B` on dark backgrounds look premium but fail WCAG 4.5:1 contrast. Avoid: define all color tokens with contrast ratios recorded before building any component; use WebAIM Contrast Checker, not eye-test. Background: near-black (`#111111`, `#121212`) not pure black (reduces halation for astigmatism).

2. **Animation performance on real mobile hardware** — Scroll animations and entrance effects that look smooth on a dev MacBook stutter on mid-range Android phones. Avoid: animate only `transform` and `opacity` (compositor-only), limit simultaneous animations to 5–10 elements, test with Chrome DevTools CPU throttled at 4x slowdown, implement `prefers-reduced-motion` media query (accessibility requirement, not optional).

3. **Before/after slider inaccessible to keyboard and touch** — Mouse-drag-only sliders are unusable by keyboard users and broken on mobile where drag conflicts with scroll. Avoid: implement slider control as a native `<input type="range">` for free keyboard accessibility (arrow keys, focus); ensure 44×44px touch target on handle; add `touch-action: pan-y` / `touch-action: none` to separate drag from scroll.

4. **Contact form leaking leads to spam** — Bots crawl all forms regardless of site size; unprotected inboxes flood within days of launch. Avoid: honeypot field as first layer, Cloudflare Turnstile (invisible, free) as second; keep form to 3–4 fields; verify form actually sends email end-to-end before launch (most commonly missed pre-launch test).

5. **SEO fundamentals skipped** — Generic title tags, missing meta descriptions, no structured data, no sitemap. Recovery after launch is rated HIGH cost (months to recover organic traction). Avoid: write keyword-targeted titles and descriptions per page before writing any component code; add JSON-LD `Service` schema on homepage; submit sitemap to Google Search Console on launch day.

6. **Trust signals placed too late in page flow** — Testimonials buried at the bottom, portfolio only on a separate page, hero claims unsupported above the fold. Avoid: every bold claim must be followed within one viewport by evidence; surface a before/after preview and at least one testimonial in or immediately below the hero.

---

## Implications for Roadmap

Based on combined research, the natural phase structure follows two principles: (1) dependencies must resolve before consumers, and (2) pitfall prevention must be baked into the phase that introduces the risk — not deferred to a "quality pass" at the end.

### Phase 1: Foundation and Design System

**Rationale:** Everything else depends on this. Dark theme color tokens, typography scale, and spacing must be locked before any component is built. This is also the highest-leverage pitfall prevention point — contrast ratios baked into tokens now prevent accessibility rework on every component later.

**Delivers:** Astro project scaffold, Tailwind CSS v4 configured with dark theme CSS custom properties, typography system, base layout (Nav + Footer), SEO infrastructure (metadata helpers, sitemap config, robots.txt).

**Addresses:** SEO basics (Pitfall 5 — cannot be retrofitted cleanly), dark theme contrast (Pitfall 1 — prevents cascade of failures across all components), site navigation structure.

**Avoids:** Inline style color values (creates global find/replace problem later), contrast failures discovered post-launch (HIGH recovery cost for some, MEDIUM for others).

**Research flag:** Standard patterns — skip phase research. Astro + Tailwind v4 setup is well-documented with official guides.

### Phase 2: Core Pages and Content Infrastructure

**Rationale:** Content data shapes must be defined before components that consume them. The architecture's build order explicitly calls this out: define `work.ts` and `testimonials.ts` types before building BeforeAfter or Testimonials components.

**Delivers:** TypeScript content files for portfolio items and testimonials, Home page structure (Hero, Testimonials, How It Works sections), About page, all page-level SEO metadata filled in.

**Addresses:** Hero with value proposition and CTA (P1), About section (P1), "How It Works" process section (P1), Testimonials (P1), trust signal placement (Pitfall 6 — sequencing trust signals close to claims in hero).

**Avoids:** Anti-pattern of writing all markup in the page file (keep page files thin, compose section components).

**Research flag:** Standard patterns — skip phase research. Section composition and TypeScript content files are established Astro patterns.

### Phase 3: Portfolio Showcase

**Rationale:** The before/after showcase is the most technically complex component and the site's primary conversion tool. It requires isolated development and thorough accessibility and touch testing — which cannot be bolted on at the end.

**Delivers:** Before/After slider (React island using react-compare-slider), Work/Portfolio page composing showcase with real client content, before/after image assets at correct dimensions.

**Addresses:** Interactive before/after portfolio showcase (P1, core differentiator), client permission documentation (must be resolved before any client site appears publicly).

**Avoids:** Accessibility failure on slider (Pitfall 3 — implement `<input type="range">` control layer, 44×44px touch target, `touch-action` settings from day one), unoptimized before/after images (use Astro `<Image />` component for all portfolio images), client screenshot usage without permission (legal/relationship risk).

**Research flag:** Needs attention during planning — verify react-compare-slider's API supports Astro's `<Image />` component as the image source (not just plain URLs). If it doesn't, a wrapper component is needed.

### Phase 4: Lead Generation and Contact

**Rationale:** The contact flow is the conversion goal of the entire site. It depends on the Formspree account being set up and tested end-to-end — which cannot be verified without a real form POST. This is also where the most common "looks done but isn't" failures occur.

**Delivers:** Contact page with form and embedded Calendly/Cal.com booking calendar, Formspree integration with honeypot spam protection, end-to-end form delivery verified in production, form success/error confirmation states.

**Addresses:** Contact / inquiry form (P1), embedded booking calendar (differentiator), spam protection (Pitfall 4 — honeypot + Cloudflare Turnstile), form delivery reliability (test before launch, not after).

**Avoids:** Single email delivery point with no backup, reCAPTCHA v2 friction (use Cloudflare Turnstile instead), form with more than 4 required fields (reduces completion rate).

**Research flag:** Standard patterns — Formspree + Astro integration is documented. Calendly embed is a script tag. No deep research needed.

### Phase 5: Animations and Performance

**Rationale:** Scroll animations and entrance reveals are a polish layer, not a structural layer. Building them last means they're applied to stable, validated content — and the performance budget can be enforced against a measurable baseline.

**Delivers:** Scroll-triggered entrance animations (Motion `whileInView`) on section reveals, hero entrance animation, `prefers-reduced-motion` implementation, Lighthouse performance audit (target: ≥90 mobile with CPU 4x throttle), Open Graph images generated and verified.

**Addresses:** Scroll animations (P2 differentiator), premium dark site motion feel.

**Avoids:** Animation performance jank (Pitfall 2 — `transform`/`opacity` only, 5–10 simultaneous animations max, 4x CPU throttle test), missing `prefers-reduced-motion` (accessibility failure), hero LCP delayed by animation (set hero image to `loading="eager"` / `fetchpriority="high"`).

**Research flag:** Standard patterns for Motion `whileInView`. However, performance budget enforcement on real mobile hardware requires manual testing — plan for CPU-throttled Lighthouse runs, not just desktop scores.

### Phase 6: Validation and Launch Readiness

**Rationale:** A final integrated pass catches the "looks done but isn't" issues that are invisible during component-by-component development but embarrassing in production.

**Delivers:** End-to-end checklist verification, Google Search Console sitemap submission, OG image share test (verify in Slack/WhatsApp preview), mobile navigation tested on real device, contrast ratios verified with automated axe-core audit, form spam bypass test.

**Addresses:** "Looks done but isn't" checklist from PITFALLS.md.

**Avoids:** Launching with broken OG previews, form that looks complete but doesn't deliver email, animations that fire when `prefers-reduced-motion` is enabled, hero image lazy-loaded (delays LCP).

**Research flag:** No research needed — this is a testing and verification phase.

---

### Phase Ordering Rationale

- **Foundation first** because color tokens and layout structure are dependencies of every other component — changing them after components are built creates rework across the codebase.
- **Content infrastructure before components** because TypeScript interfaces (`WorkItem`, `Testimonial`) define the contract that section components accept as props — reversing this order means components get refactored when data shapes change.
- **Portfolio showcase isolated in its own phase** because it's the most technically complex and accessibility-sensitive component — embedding it inside a broader page-build phase would rush the accessibility work.
- **Animations last** because they're purely additive — a site without animations still functions and converts; animations that break Core Web Vitals actively hurt conversion.
- **Performance audit in animations phase, not launch phase** — catching performance problems during the animation build phase (when the cause is fresh) is cheaper than discovering them at the end of the project.

---

### Research Flags

**Needs attention during planning:**
- **Phase 3 (Portfolio Showcase):** Verify react-compare-slider accepts Astro's `<Image />` component (not raw `<img>` tags or plain URL strings) as the before/after image source. If not, a thin wrapper component is needed to avoid unoptimized images.
- **Phase 4 (Lead Generation):** Confirm Calendly/Cal.com embed script is compatible with Astro's partial hydration model — embedding a third-party script in a static Astro page may require an `<is:inline>` script tag or a client island wrapper.

**Standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** Astro + Tailwind v4 setup is officially documented with a single `npx astro add tailwind` command.
- **Phase 2 (Core Pages):** Section component composition is idiomatic Astro; TypeScript content files are a standard Astro Content Collections pattern.
- **Phase 5 (Animations):** Motion `whileInView` for scroll reveals is well-documented and the canonical approach for React islands in Astro.
- **Phase 6 (Launch Readiness):** Testing and verification — no research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core decisions verified against official docs (Astro, Tailwind, Motion). Version compatibility table confirmed. Two commercial comparisons corroborate Astro over Next.js for marketing sites. |
| Features | MEDIUM-HIGH | Feature landscape well-established for service business marketing sites. Booking calendar conversion data sourced from a single vendor (Booxi) — treat as directional, not precise. Competitive analysis is observational. |
| Architecture | MEDIUM | Architecture research was conducted against Next.js App Router conventions, not Astro. The component responsibilities and patterns apply directly, but the file paths and directives (`app/layout.tsx` vs. Astro layouts, `"use client"` vs. `client:load`) must be translated to Astro idioms during planning. This is a known gap, not an unknown. |
| Pitfalls | HIGH | Pitfalls sourced from official accessibility specs (WCAG), official web.dev performance guides, and multiple independent sources. The `prefers-reduced-motion` and contrast ratio guidance is WCAG-normative. |

**Overall confidence:** HIGH

### Gaps to Address

- **Architecture file uses Next.js conventions:** ARCHITECTURE.md describes Next.js App Router structure. During roadmap creation, file paths and React-specific directives should be mapped to Astro equivalents. The patterns (thin pages, section components, TypeScript content files, third-party form backend) translate directly — only the syntax differs.
- **react-compare-slider + Astro Image compatibility:** Not explicitly verified. Must check whether the library accepts a React `<img>` element node or only a URL string as the image source. Resolution: check npm package source or run a quick prototype in Phase 3.
- **Calendly embed in Astro:** Third-party script embeds in Astro require either `<script is:inline>` or a dedicated client island. Not verified during research. Resolution: check Astro docs for third-party script embedding during Phase 4 planning.
- **Actual client content availability:** Portfolio phase depends on having completed client work with screenshots and written permission. If client work is not yet available at build time, placeholder content strategy is needed for v1 launch.

---

## Sources

### Primary (HIGH confidence)
- [Astro 5.0 Release Blog](https://astro.build/blog/astro-5/) — Content Layer, Islands architecture, SSG output
- [Astro 5.2 Tailwind 4 Support](https://thenewstack.io/astro-5-2-brings-tailwind-4-support-and-new-features/) — native Vite plugin integration confirmed
- [Tailwind CSS v4.0 official release](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, performance numbers
- [npm: astro](https://www.npmjs.com/package/astro) — version 5.18.0 confirmed current as of March 2026
- [npm: tailwindcss](https://www.npmjs.com/package/tailwindcss) — version 4.2.1 confirmed current as of March 2026
- [Motion docs — scroll animations](https://motion.dev/docs/react-scroll-animations) — `whileInView` API
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/) — hydration directives
- [Formspree](https://formspree.io/) — pricing and free tier limits
- [Netlify vs Vercel commercial use](https://www.netlify.com/guides/netlify-vs-vercel/) — commercial use policy
- [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) — accessibility requirement
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — WCAG 4.5:1 standard
- [Next.js App Router Project Structure — Official Docs](https://nextjs.org/docs/app/getting-started/project-structure) — architecture patterns (translated to Astro)
- [Formspree — Next.js guide](https://formspree.io/guides/nextjs/) — form integration pattern

### Secondary (MEDIUM confidence)
- [Astro vs Next.js — Senorit (2026)](https://senorit.de/en/blog/astro-vs-nextjs-2025) — third-party benchmark data
- [Best React before/after image comparison slider libraries — Croct (2026)](https://blog.croct.com/post/best-react-before-after-image-comparison-slider-libraries) — react-compare-slider recommendation
- [Booking Software vs Forms: Conversion Rates — Booxi](https://www.booxi.com/blog/appointment-scheduling-software-vs-booking-forms) — 2x conversion claim
- [Pricing Transparency for Service Businesses — PricingLink](https://pricinglink.com/blog/2025-post/transparency-in-pricing-building-client-trust-2025/) — pricing page trust signal research
- [GSAP vs Motion — motion.dev](https://motion.dev/docs/gsap-vs-motion) — bundle size comparison (Motion's own docs, directional)
- [10 Dark Mode UI Best Practices — designstudiouiux.com](https://www.designstudiouiux.com/blog/dark-mode-ui-design-best-practices/) — dark theme design guidance
- [Building an accessible image comparison web component — Cloud Four](https://cloudfour.com/thinks/building-an-accessible-image-comparison-web-component/) — `<input type="range">` slider pattern
- [10 Common Next.js Mistakes That Hurt Core Web Vitals — Pagepro](https://pagepro.co/blog/common-nextjs-mistakes-core-web-vitals/) — performance pitfalls
- [Form Spam Prevention 2025 — Topmost Labs](https://topmostlabs.com/form-spam-prevention-small-businesses-2025-strategies/) — honeypot and Turnstile approach

---

*Research completed: 2026-03-04*
*Ready for roadmap: yes*
