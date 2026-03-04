# Roadmap: Omer Etrog Website

**Created:** 2026-03-04
**Granularity:** coarse
**Phases:** 4
**Requirements coverage:** 31/31 mapped

---

## Phase Overview

| Phase | Name | Requirements | Status |
|-------|------|-------------|--------|
| 1 | Foundation & Design System | FOUND-01, FOUND-02, FOUND-03, FOUND-04, SEO-01, SEO-04, SEO-05 | Complete |
| 2 | 3/3 | Complete   | 2026-03-04 |
| 3 | 2/2 | Complete   | 2026-03-04 |
| 4 | 3/3 | Complete   | 2026-03-04 |

---

## Phase Details

### Phase 1: Foundation & Design System

**Goal:** The site scaffold exists with a correct dark theme, responsive layout, global navigation, and SEO infrastructure — every page that follows inherits these without rework.

**Requirements:**
- FOUND-01: Site uses dark premium theme with WCAG 4.5:1 contrast ratios on all text
- FOUND-02: Site is fully responsive across mobile, tablet, and desktop
- FOUND-03: Global navigation with links to all pages (Home, Work, About, Contact)
- FOUND-04: Consistent footer with contact info and social links
- SEO-01: Unique, keyword-targeted title and meta description on every page
- SEO-04: XML sitemap and robots.txt generated automatically
- SEO-05: Semantic HTML throughout (proper heading hierarchy, landmarks)

**Success criteria:**
- [ ] Visiting any page shows the dark theme with no contrast failures (verify all text color pairs pass 4.5:1 using WebAIM Contrast Checker — ratios recorded in design tokens)
- [ ] Navigation renders correctly and links to all four pages on mobile (375px), tablet (768px), and desktop (1280px)
- [ ] Footer appears on every page with at minimum contact info and social links
- [ ] `sitemap.xml` and `robots.txt` are present and valid at the production URL
- [ ] Every page has a unique, keyword-targeted `<title>` and `<meta description>` with a meaningful `<h1>` — no placeholders

**Dependencies:** None (first phase)

**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md — Bootstrap Vite + React project with Tailwind v4 design token system and test infrastructure
- [x] 01-02-PLAN.md — Layout system (Nav, Footer, RootLayout), page stubs with SEO metadata, router, sitemap, robots.txt

**Pitfall prevention:**
- Dark theme contrast (Pitfall 1): Define all color tokens as CSS custom properties in the Tailwind v4 config with contrast ratios recorded alongside each pair before building any component. Use near-black (`#111111`) not pure black to avoid halation.
- SEO fundamentals: Wire up React 19 native `<title>`/`<meta>` metadata hoisting and vite-plugin-sitemap generation in this phase. Retrofitting SEO after content is built has HIGH recovery cost — months of lost organic traction.
- Inline style anti-pattern: Never write color values inline — all colors flow from CSS custom properties. Rebrand cost is one file, not a global find/replace.

---

### Phase 2: Core Pages & Content

**Goal:** Visitors landing on the site immediately understand the service, see evidence it works (social proof in the hero), and can navigate to an About page that establishes trust in Omer personally.

**Requirements:**
- HERO-01: Hero section with bold value proposition ("old site → modern site, under an hour")
- HERO-02: Primary CTA button above the fold linking to contact/booking
- HERO-03: Social proof teaser visible in or immediately below hero (testimonial snippet or before/after preview)
- HERO-04: "How It Works" section explaining the 3-step migration process
- TEST-01: Testimonials section with at least 2-3 client quotes
- TEST-02: Each testimonial shows client name and specific result
- TEST-03: Testimonials visible on home page (not buried in navigation)
- ABOUT-01: About page with Omer's background and expertise
- ABOUT-02: Professional photo or personal branding element
- SEO-02: Open Graph tags and OG images for social sharing
- SEO-03: JSON-LD structured data (Service schema) on homepage

**Success criteria:**
- [ ] A first-time visitor can explain what Omer does and how to get started without scrolling past the hero section
- [ ] At least one testimonial or client name is visible without scrolling on the homepage (Pitfall 6 test: first-viewport screenshot shows social proof)
- [ ] The "How It Works" 3-step section answers the question "what actually happens?" before asking visitors to commit
- [ ] Sharing any page URL in a chat app (Slack, WhatsApp) renders the correct dark-themed OG image, title, and description
- [ ] The About page presents Omer's background with a photo or personal branding element — no anonymous freelancer feel

**Dependencies:** Phase 1 (layout, design tokens, nav/footer, metadata system)

**Plans:** 3/3 plans complete

Plans:
- [ ] 02-01-PLAN.md — Content data files, TypeScript interfaces, JsonLd component, and static OG tags
- [ ] 02-02-PLAN.md — HomePage section components (Hero, HowItWorks, Testimonials) + JSON-LD wiring + tests
- [ ] 02-03-PLAN.md — About page content, photo/branding element, and tests

**Pitfall prevention:**
- Trust signals too late (Pitfall 6): The hero section must contain a before/after preview teaser OR a testimonial snippet — not just a headline and CTA. Sequence: hero claim → immediate evidence → CTA.
- Multiple competing CTAs: One primary CTA per viewport section. The booking CTA in the hero links to the Contact page; all other CTAs are visually subordinate.
- Content data structure: Define TypeScript interfaces for `Testimonial` and content files before building components. Changing data shape after components are built requires component refactoring — do it once, do it first.

---

### Phase 3: Portfolio Showcase

**Goal:** Prospective clients can see real before/after transformations of Omer's work, interact with the comparison slider by mouse, keyboard, and touch, and understand the context of each transformation.

**Requirements:**
- PORT-01: Interactive before/after image comparison slider for each portfolio item
- PORT-02: Before/after slider is keyboard-accessible and touch-friendly
- PORT-03: Portfolio items display client name, description, and transformation result
- PORT-04: Dedicated Work/Portfolio page composing all showcase items

**Success criteria:**
- [ ] The before/after slider moves in response to mouse drag, arrow key input (when focused), and touch drag on a real mobile device
- [ ] A screen reader user hears a meaningful label when focused on the slider (e.g., "Drag to compare before and after website versions") and can control it with arrow keys
- [ ] Every portfolio item shows client name, a brief description of what changed, and the transformation outcome
- [ ] The Work page is reachable from the global nav and composes all portfolio items in a coherent layout
- [ ] Before/after images load optimized — no raw `<img>` tags serving full-resolution screenshots

**Dependencies:** Phase 1 (layout, image optimization), Phase 2 (data file structure)

**Pitfall prevention:**
- Slider accessibility (Pitfall 3): Implement slider control using a native `<input type="range">` under the `react-compare-slider` handle. Ensure 44x44px touch target on the drag handle. Set `touch-action: pan-y` on container, `touch-action: none` on handle to prevent scroll/drag conflicts on mobile.
- Client permission: Obtain written permission from each client before displaying their site. Document permission in a comment in the content data file. Use placeholder screenshots for any client not yet confirmed.
- Research flag: Verify react-compare-slider accepts standard `<img>` elements as image source.

**Plans:** 2/2 plans complete

Plans:
- [ ] 03-01-PLAN.md — Content data file, PortfolioItem component with slider, and unit tests (PORT-01, PORT-02, PORT-03)
- [ ] 03-02-PLAN.md — WorkPage composition with portfolio items and visual verification (PORT-04)
---

### Phase 4: Lead Generation, Polish & Launch

**Goal:** Visitors who are ready to hire Omer can contact him via a working form or book directly from a calendar, the site has scroll animations that feel premium on real mobile devices, and every page scores 90+ on Lighthouse mobile performance.

**Requirements:**
- LEAD-01: Contact page with inquiry form (name, email, message, current site URL)
- LEAD-02: Form submissions delivered to Omer's email reliably (end-to-end verified)
- LEAD-03: Spam protection on contact form (honeypot + invisible challenge)
- LEAD-04: Embedded booking calendar (Calendly or Cal.com) on contact page
- LEAD-05: Form shows success/error confirmation states
- ANIM-01: Scroll-triggered entrance animations on section reveals
- ANIM-02: All animations respect `prefers-reduced-motion` media query
- ANIM-03: Animations use only `transform` and `opacity` (compositor-only properties)
- FOUND-05: Page load scores >=90 on Lighthouse mobile performance

**Success criteria:**
- [ ] Submitting the contact form with real data results in an email arriving in Omer's inbox within 2 minutes (test with a real production submission before launch — not just local dev)
- [ ] Submitting the form with the honeypot field filled silently fails with no error shown to the user (spam bot test)
- [ ] The contact page offers both the inquiry form and the embedded booking calendar — two clear paths to getting started
- [ ] Enabling "Reduce Motion" in OS accessibility settings causes all scroll animations to be suppressed
- [ ] Every page scores >=90 on Lighthouse mobile performance with CPU throttled at 4x slowdown in Chrome DevTools (not just desktop score)
- [ ] Scroll animations on section reveals move only `transform` and `opacity` — verified by checking DevTools compositor layers

**Dependencies:** Phase 1 (layout, design system), Phases 2 and 3 (stable content to animate)

**Plans:** 3/3 plans complete

Plans:
- [ ] 04-01-PLAN.md — Contact form with Formspree, honeypot, Turnstile spam protection, Calendly embed, and success/error states (LEAD-01, LEAD-03, LEAD-04, LEAD-05)
- [ ] 04-02-PLAN.md — ScrollReveal component, MotionConfig reduced-motion support, scroll animations on all sections (ANIM-01, ANIM-02, ANIM-03)
- [ ] 04-03-PLAN.md — React.lazy route splitting, LCP optimization, Lighthouse 90+ verification, end-to-end email delivery test (FOUND-05, LEAD-02)

**Pitfall prevention:**
- Form spam and delivery failure (Pitfall 4): Honeypot field hidden via CSS opacity (not `display:none` — bots detect that). Layer Cloudflare Turnstile as invisible second defense. Test form end-to-end in production — this is the single most commonly missed pre-launch item.
- Animation performance on mobile (Pitfall 2): Only animate `transform` and `opacity`. Limit simultaneous animated elements to 10 maximum. Hero LCP image must have `loading="eager"` and `fetchpriority="high"` — never lazy-load the LCP element. Test at CPU 4x throttle, not just native speed.
- Calendly embed in React SPA: Third-party script embeds may need a React wrapper component with useEffect for script injection. Test the embed pattern during planning.
- Single email delivery point: Configure at minimum a backup notification (e.g., Formspree's email + a secondary notification email or webhook to Google Sheets). Never rely on a single delivery path.

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 2/2 | Complete | 2026-03-04 |
| 2. Core Pages & Content | 0/3 | Not started | - |
| 3. Portfolio Showcase | 0/2 | In progress | - |
| 4. Lead Generation, Polish & Launch | 0/3 | Not started | - |

---

## Coverage Validation

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | 1 | Complete |
| FOUND-02 | 1 | Complete |
| FOUND-03 | 1 | Complete |
| FOUND-04 | 1 | Complete |
| FOUND-05 | 4 | Pending |
| SEO-01 | 1 | Complete |
| SEO-04 | 1 | Complete |
| SEO-05 | 1 | Complete |
| HERO-01 | 2 | Pending |
| HERO-02 | 2 | Pending |
| HERO-03 | 2 | Pending |
| HERO-04 | 2 | Pending |
| TEST-01 | 2 | Pending |
| TEST-02 | 2 | Pending |
| TEST-03 | 2 | Pending |
| ABOUT-01 | 2 | Pending |
| ABOUT-02 | 2 | Pending |
| SEO-02 | 2 | Pending |
| SEO-03 | 2 | Pending |
| PORT-01 | 3 | Pending |
| PORT-02 | 3 | Pending |
| PORT-03 | 3 | Pending |
| PORT-04 | 3 | Pending |
| LEAD-01 | 4 | Pending |
| LEAD-02 | 4 | Pending |
| LEAD-03 | 4 | Pending |
| LEAD-04 | 4 | Pending |
| LEAD-05 | 4 | Pending |
| ANIM-01 | 4 | Pending |
| ANIM-02 | 4 | Pending |
| ANIM-03 | 4 | Pending |

**Mapped:** 31/31 requirements — coverage complete.

---

*Roadmap created: 2026-03-04*
*Stack: Vite 6 + React 19 + React Router 7 + Tailwind CSS v4 + Netlify*
