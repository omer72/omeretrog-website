# Omer Etrog — Website

## What This Is

A premium, dark-themed multi-page website for Omer Etrog's web migration service — converting old static Wix sites into modern, sleek websites with all content migrated in under an hour. Built as a Vite + React 19 SPA with Tailwind CSS v4, deployed on Netlify.

## Core Value

Visitors immediately understand the service (old site → modern site, under an hour) and have a clear path to get started.

## Requirements

### Validated

- ✓ Multi-page site with dark, premium aesthetic — v1.0
- ✓ Hero/landing section with bold value proposition and CTA — v1.0
- ✓ Before/after showcase of site transformations — v1.0
- ✓ Testimonials section with client social proof — v1.0
- ✓ Contact/booking page for lead generation — v1.0
- ✓ Fast, modern, SEO-friendly implementation — v1.0
- ✓ Responsive design (mobile + desktop) — v1.0
- ✓ Scroll animations with reduced-motion respect — v1.0
- ✓ Spam protection (honeypot + Turnstile) — v1.0
- ✓ React.lazy code splitting for performance — v1.0

### Active

(None — define with next milestone)

### Out of Scope

- Blog/content marketing — not needed for v1, can add later
- E-commerce/payments — service is custom-quoted, not self-serve
- Client portal/dashboard — out of scope for a marketing site
- CMS/admin panel — content managed in code for v1
- Real-time chat widget — form + calendar sufficient for lead gen

## Context

Shipped v1.0 with 907 LOC TypeScript/TSX/CSS, 78 tests.
Tech stack: Vite 6, React 19, React Router 7, Tailwind CSS v4, Motion, Formspree, Netlify.

**Current state:** All 4 pages functional (Home, Work, About, Contact). Portfolio items show placeholder cards pending written client permission. Contact form requires Formspree + Turnstile env vars on Netlify for production.

**Known issues:**
- Portfolio clients (Liat Leshem, Bialystok Association) need written permission before screenshots can be displayed
- LEAD-02 (email delivery) and FOUND-05 (Lighthouse 90+) approved but need post-deploy production verification

## Constraints

- **Aesthetic**: Dark theme, premium feel — the site IS the portfolio
- **Performance**: Must be fast-loading to demonstrate competence
- **SEO**: Needs to rank for local/service-related searches

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Multi-page over single-page | Better SEO, room to grow, professional feel | ✓ Good |
| Dark & premium theme | Communicates high-end service quality | ✓ Good |
| Vite + React + React Router | User preference — SPA with client-side routing | ✓ Good |
| Tailwind CSS v4 @theme | Design tokens as CSS custom properties, not legacy config | ✓ Good |
| Netlify hosting | Free tier permits commercial use | ✓ Good |
| Near-black #111111 over pure black | Reduces halation, premium feel | ✓ Good |
| React 19 native meta hoisting | No react-helmet dependency needed | ✓ Good |
| Thin composer pattern | Pages are <30 lines, import from data files, testable | ✓ Good |
| Facade pattern for Calendly | Saves ~200KB JS from blocking page load | ✓ Good |
| MotionConfig at root | Single-point reduced-motion respect for all animations | ✓ Good |
| React.lazy route splitting | Contact page heaviest JS isolated from initial bundle | ✓ Good |

---
*Last updated: 2026-03-04 after v1.0 milestone*
