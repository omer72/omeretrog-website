# Requirements: Omer Etrog Website

**Defined:** 2026-03-04
**Core Value:** Visitors immediately understand the service (old site → modern site, under an hour) and have a clear path to get started.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Site uses dark premium theme with WCAG 4.5:1 contrast ratios on all text
- [ ] **FOUND-02**: Site is fully responsive across mobile, tablet, and desktop
- [ ] **FOUND-03**: Global navigation with links to all pages (Home, Work, About, Contact)
- [ ] **FOUND-04**: Consistent footer with contact info and social links
- [ ] **FOUND-05**: Page load scores ≥90 on Lighthouse mobile performance

### Hero & Home

- [ ] **HERO-01**: Hero section with bold value proposition ("old site → modern site, under an hour")
- [ ] **HERO-02**: Primary CTA button above the fold linking to contact/booking
- [ ] **HERO-03**: Social proof teaser visible in or immediately below hero (testimonial snippet or before/after preview)
- [ ] **HERO-04**: "How It Works" section explaining the 3-step migration process

### Portfolio

- [ ] **PORT-01**: Interactive before/after image comparison slider for each portfolio item
- [ ] **PORT-02**: Before/after slider is keyboard-accessible and touch-friendly
- [ ] **PORT-03**: Portfolio items display client name, description, and transformation result
- [ ] **PORT-04**: Dedicated Work/Portfolio page composing all showcase items

### Testimonials

- [ ] **TEST-01**: Testimonials section with at least 2-3 client quotes
- [ ] **TEST-02**: Each testimonial shows client name and specific result
- [ ] **TEST-03**: Testimonials visible on home page (not buried in navigation)

### Contact & Lead Generation

- [ ] **LEAD-01**: Contact page with inquiry form (name, email, message, current site URL)
- [ ] **LEAD-02**: Form submissions delivered to Omer's email reliably (end-to-end verified)
- [ ] **LEAD-03**: Spam protection on contact form (honeypot + invisible challenge)
- [ ] **LEAD-04**: Embedded booking calendar (Calendly or Cal.com) on contact page
- [ ] **LEAD-05**: Form shows success/error confirmation states

### SEO

- [ ] **SEO-01**: Unique, keyword-targeted title and meta description on every page
- [ ] **SEO-02**: Open Graph tags and OG images for social sharing
- [ ] **SEO-03**: JSON-LD structured data (Service schema) on homepage
- [x] **SEO-04**: XML sitemap and robots.txt generated automatically
- [ ] **SEO-05**: Semantic HTML throughout (proper heading hierarchy, landmarks)

### About

- [ ] **ABOUT-01**: About page with Omer's background and expertise
- [ ] **ABOUT-02**: Professional photo or personal branding element

### Animations

- [ ] **ANIM-01**: Scroll-triggered entrance animations on section reveals
- [ ] **ANIM-02**: All animations respect `prefers-reduced-motion` media query
- [ ] **ANIM-03**: Animations use only `transform` and `opacity` (compositor-only properties)

## v2 Requirements

### Content Marketing

- **BLOG-01**: Blog section with markdown-based posts
- **BLOG-02**: Blog posts with SEO metadata and OG images

### Portfolio Enhancements

- **PORT-05**: Case studies with detailed problem/solution/outcome narratives
- **PORT-06**: Portfolio filtering by category when items exceed 8-10
- **PORT-07**: FAQ section with schema markup for rich snippets

### Pricing

- **PRICE-01**: Visible starting-from pricing on services
- **PRICE-02**: Interactive pricing calculator

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / admin panel | Content managed in code for v1; no editorial team |
| E-commerce / payments | Service is custom-quoted, not self-serve |
| Client portal / dashboard | Marketing site, not an app |
| Real-time chat widget | Overkill for lead gen; form + calendar sufficient |
| Multi-language (i18n) | Single market for v1 |
| User accounts / auth | No user-facing accounts needed |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 5 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| PORT-01 | Phase 3 | Pending |
| PORT-02 | Phase 3 | Pending |
| PORT-03 | Phase 3 | Pending |
| PORT-04 | Phase 3 | Pending |
| TEST-01 | Phase 2 | Pending |
| TEST-02 | Phase 2 | Pending |
| TEST-03 | Phase 2 | Pending |
| LEAD-01 | Phase 4 | Pending |
| LEAD-02 | Phase 4 | Pending |
| LEAD-03 | Phase 4 | Pending |
| LEAD-04 | Phase 4 | Pending |
| LEAD-05 | Phase 4 | Pending |
| SEO-01 | Phase 1 | Pending |
| SEO-02 | Phase 2 | Pending |
| SEO-03 | Phase 2 | Pending |
| SEO-04 | Phase 1 | Complete |
| SEO-05 | Phase 1 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| ABOUT-02 | Phase 2 | Pending |
| ANIM-01 | Phase 5 | Pending |
| ANIM-02 | Phase 5 | Pending |
| ANIM-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-04*
*Last updated: 2026-03-04 after research synthesis*
