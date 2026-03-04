# Omer Etrog — Website

## What This Is

A premium, dark-themed multi-page website for Omer Etrog's web migration service. The site showcases the core offering — converting old static Wix sites into modern, sleek websites with all content migrated in under an hour. It targets small businesses and individuals with outdated sites who want a fast, high-quality upgrade.

## Core Value

Visitors immediately understand the service (old site → modern site, under an hour) and have a clear path to get started.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Multi-page site with dark, premium aesthetic
- [ ] Hero/landing section with bold value proposition and CTA
- [ ] Before/after showcase of site transformations
- [ ] Testimonials section with client social proof
- [ ] Contact/booking page for lead generation
- [ ] Fast, modern, SEO-friendly implementation
- [ ] Responsive design (mobile + desktop)

### Out of Scope

- Blog/content marketing — not needed for v1, can add later
- E-commerce/payments — service is custom-quoted, not self-serve
- Client portal/dashboard — out of scope for a marketing site
- CMS/admin panel — content will be managed in code for v1

## Context

- Omer runs a service converting old static Wix sites to modern websites
- Key differentiator: speed — full migration in under an hour
- Target audience: small businesses and individuals with outdated websites
- The site itself should demonstrate the quality Omer delivers (dark, premium, sleek)
- Multi-page structure: Home, Portfolio/Work, About, Contact (at minimum)

## Constraints

- **Aesthetic**: Dark theme, premium feel — the site IS the portfolio
- **Performance**: Must be fast-loading to demonstrate competence
- **SEO**: Needs to rank for local/service-related searches

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Multi-page over single-page | Better SEO, room to grow, professional feel | Confirmed |
| Dark & premium theme | Communicates high-end service quality | Confirmed |
| Vite + React + React Router | User preference — not Astro. SPA with client-side routing | Confirmed |
| Tailwind CSS v4 | Styling system with dark theme tokens | Confirmed |
| Netlify hosting | Free tier permits commercial use | Confirmed |

---
*Last updated: 2026-03-04 after stack change to Vite + React*
