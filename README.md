# Omer Etrog — Web Migration Service

A premium, dark-themed website for Omer Etrog's web migration service — converting outdated Wix sites into modern, blazing-fast websites with all content migrated in under an hour.

## Live Site

Deployed on Netlify.

## Tech Stack

- **Vite 6** — Build tool
- **React 19** — UI framework
- **React Router 7** — Client-side routing
- **Tailwind CSS v4** — Styling with `@theme` design tokens
- **Motion** — Scroll animations with reduced-motion respect
- **Formspree** — Contact form backend
- **Cloudflare Turnstile** — Spam protection
- **Netlify** — Hosting

## Pages

- **Home** — Hero with value proposition, testimonials, "How It Works" explainer
- **Work** — Before/after portfolio with interactive compare sliders
- **About** — Omer's background and expertise
- **Contact** — Lead generation form + Calendly booking embed

## Features

- Dark premium aesthetic with WCAG 4.5:1 contrast ratios
- Interactive before/after sliders (drag, keyboard, touch accessible)
- Scroll-triggered animations (compositor-safe, reduced-motion aware)
- React.lazy route splitting for performance
- Honeypot + Turnstile spam protection
- JSON-LD structured data for SEO
- Responsive design (mobile + desktop)

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

## Environment Variables (Production)

| Variable | Purpose |
|----------|---------|
| `VITE_FORMSPREE_FORM_ID` | Formspree form endpoint |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile widget |

## License

All rights reserved.
