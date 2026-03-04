# Architecture Research

**Domain:** Premium multi-page service business website (web migration service)
**Researched:** 2026-03-04
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │   Home   │  │ Portfolio│  │  About   │  │    Contact       │   │
│  │  /       │  │ /work    │  │ /about   │  │    /contact      │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘   │
│       │              │             │                  │             │
│  ┌────┴──────────────┴─────────────┴──────────────────┴──────────┐ │
│  │             Root Layout (Nav + Footer + theme)                 │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────┬─────────────────────────────────┘
                                   │ HTTP POST (contact form)
┌──────────────────────────────────▼─────────────────────────────────┐
│                    Form Backend (Formspree / Resend)                │
│                    Receives submissions → emails Omer               │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                    CDN / Hosting (Vercel)                           │
│    Serves pre-rendered static HTML+CSS+JS from edge nodes          │
└────────────────────────────────────────────────────────────────────┘
```

This is a **statically generated marketing site** (Next.js SSG). All pages render
at build time. The only dynamic piece is contact form submission, handled by a
third-party form service — no custom backend needed.

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Root Layout | Nav, footer, dark theme CSS variables, font loading | `app/layout.tsx` |
| Nav | Top-level page navigation, mobile hamburger menu | `components/layout/Nav.tsx` (Client Component for mobile state) |
| Footer | Links, copyright, social | `components/layout/Footer.tsx` (Server Component) |
| Hero Section | Bold value proposition, primary CTA button | `components/sections/Hero.tsx` |
| Before/After Showcase | Interactive image comparison slider | `components/sections/BeforeAfter.tsx` (Client Component — needs drag/touch events) |
| Testimonials | Client social proof cards/quotes | `components/sections/Testimonials.tsx` (Server Component — static data) |
| Contact Form | Lead capture, name/email/message, submission handler | `components/sections/ContactForm.tsx` (Client Component — form state) |
| SEO Metadata | Per-page title, description, Open Graph, structured data | `app/[page]/page.tsx` using Next.js Metadata API |

## Recommended Project Structure

```
src/
├── app/                          # Next.js App Router (routing only)
│   ├── layout.tsx                # Root layout: Nav + Footer, theme, fonts
│   ├── page.tsx                  # Home page (/)
│   ├── work/
│   │   └── page.tsx              # Portfolio/Work page (/work)
│   ├── about/
│   │   └── page.tsx              # About page (/about)
│   ├── contact/
│   │   └── page.tsx              # Contact page (/contact)
│   ├── globals.css               # Global styles, CSS variables (dark theme tokens)
│   ├── sitemap.ts                # Auto-generated sitemap.xml
│   └── robots.ts                 # robots.txt
│
├── components/
│   ├── layout/                   # Structural components used on every page
│   │   ├── Nav.tsx               # Top navigation bar
│   │   └── Footer.tsx            # Footer
│   │
│   ├── sections/                 # Page section components (one per content block)
│   │   ├── Hero.tsx              # Value prop + CTA
│   │   ├── BeforeAfter.tsx       # Before/after comparison slider
│   │   ├── Testimonials.tsx      # Client testimonials grid
│   │   ├── ContactForm.tsx       # Lead capture form
│   │   └── WorkGrid.tsx          # Portfolio case study grid
│   │
│   └── ui/                       # Reusable primitive components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── SectionHeading.tsx
│
├── content/                      # Static data (managed in code, no CMS for v1)
│   ├── testimonials.ts           # Testimonial objects (name, quote, company)
│   └── work.ts                   # Portfolio case study objects (before/after image pairs)
│
├── lib/
│   └── metadata.ts               # Shared metadata helpers (generateMetadata)
│
└── public/
    ├── images/
    │   ├── before/               # "Before" screenshot images
    │   └── after/                # "After" screenshot images
    └── og/                       # Open Graph preview images
```

### Structure Rationale

- **`components/sections/`**: Each major content block is its own file. Pages compose sections rather than putting all markup in `page.tsx`. This makes individual sections easy to iterate on.
- **`components/ui/`**: Primitives (Button, Card) are separated so design consistency is enforced from one place.
- **`content/`**: Testimonials and work items are typed TypeScript objects. No CMS for v1 — editing content means editing these files. This is appropriate for a site where Omer controls all content.
- **`public/images/before/` and `after/`**: Keeping before and after images in clearly labeled directories makes pairing them with case study data objects straightforward.
- **App Router `page.tsx` files** stay thin — they import and compose section components. This keeps routing concerns separate from UI logic.

## Architectural Patterns

### Pattern 1: Server Components by Default, Client Components Only When Needed

**What:** Next.js App Router defaults to Server Components (no JS sent to client, renders on server/build). Use `"use client"` only for components requiring interactivity (event handlers, state, browser APIs).

**When to use:** Always. Default to Server Component; add `"use client"` only when a component needs:
- `useState` / `useEffect`
- Event handlers (onClick, onDrag, onSubmit)
- Browser APIs (window, navigator)

**Trade-offs:** Server Components reduce JS bundle size and improve page speed — critical for demonstrating competence. Client Components add hydration weight. For this site, only Nav (mobile menu state), BeforeAfter slider (drag events), and ContactForm (form state) need to be Client Components. Everything else is static.

**Example:**
```tsx
// components/sections/Testimonials.tsx — Server Component (no directive needed)
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section>
      {testimonials.map((t) => (
        <blockquote key={t.id}>
          <p>{t.quote}</p>
          <cite>{t.name}, {t.company}</cite>
        </blockquote>
      ))}
    </section>
  );
}

// components/sections/ContactForm.tsx — Client Component (needs form state)
"use client";
import { useForm } from "@formspree/react";

export function ContactForm() {
  const [state, handleSubmit] = useForm("your-form-id");
  // ...
}
```

### Pattern 2: Static Data in TypeScript Content Files

**What:** Testimonials, work case studies, and any other site content are defined as typed TypeScript arrays/objects in `content/`. No database, no CMS, no API calls at runtime.

**When to use:** Appropriate for v1 of a marketing site where content changes infrequently and Omer is the sole author. Content edits are code deploys — which is fine for a solo service provider.

**Trade-offs:** Extremely simple, zero runtime cost, fully type-safe. The downside is that adding a new case study requires editing code and deploying. This is the correct trade-off for v1; a headless CMS can replace it later without changing component architecture (components just receive typed props regardless of source).

**Example:**
```typescript
// content/work.ts
export interface WorkItem {
  id: string;
  clientName: string;
  description: string;
  beforeImage: string;   // path relative to /public
  afterImage: string;
}

export const workItems: WorkItem[] = [
  {
    id: "plumber-co",
    clientName: "Smith Plumbing",
    description: "Old Wix site converted to modern dark-themed site",
    beforeImage: "/images/before/smith-plumbing.jpg",
    afterImage: "/images/after/smith-plumbing.jpg",
  },
];
```

### Pattern 3: Third-Party Form Backend (No Custom API Route)

**What:** Contact form submissions POST directly to Formspree (or similar). No custom `app/api/contact/route.ts` needed. Formspree delivers submissions to Omer's email, provides spam filtering, and stores submissions.

**When to use:** For a marketing site with no backend. Custom API routes add complexity without benefit here.

**Trade-offs:** Formspree free tier allows 50 submissions/month — more than enough for lead volume on a solo service site. The trade-off is vendor dependency, but the integration is shallow (one `useForm` hook call) and swappable. Resend (email API) is an alternative if Omer wants to own the full submission flow via a Next.js Route Handler — but requires more setup.

## Data Flow

### Request Flow (Page Load)

```
User visits /work
    ↓
Vercel CDN serves pre-rendered HTML (built at deploy time)
    ↓
Browser renders HTML → hydrates interactive Client Components only
    ↓
Nav (mobile toggle), BeforeAfter slider become interactive
    ↓
Testimonials, WorkGrid, Hero — no JS, already fully rendered
```

### Contact Form Submission Flow

```
User fills ContactForm → clicks Submit
    ↓
ContactForm (Client Component) calls handleSubmit(e)
    ↓
@formspree/react POSTs to https://formspree.io/f/{id}
    ↓
Formspree validates, spam-filters
    ↓
Formspree sends email notification to Omer
    ↓
Formspree returns success/error JSON
    ↓
ContactForm updates UI state (success message or error)
```

### Key Data Flows

1. **Content to page:** TypeScript objects in `content/` are imported directly by Server Components at build time. Zero runtime cost.
2. **Images (before/after):** Next.js `<Image>` component serves optimized, responsive images from `/public/images/`. The comparison slider positions two `<Image>` elements using CSS clip-path or absolute positioning with overflow hidden, controlled by a drag position state.
3. **SEO metadata:** Each `page.tsx` exports a `generateMetadata()` function. Next.js collects these at build time and injects the correct `<title>`, `<meta>`, and Open Graph tags into each page's HTML.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k visitors/mo | Current architecture is fine. Vercel free tier handles this. |
| 1k-10k visitors/mo | Still fine. Add Cloudflare for caching if Vercel costs become a concern. |
| 10k+ visitors/mo | Consider image CDN (Cloudinary) if before/after image library grows large. Content should move to a headless CMS (Sanity, Contentlayer) at this scale to avoid code deploys for every content update. |

### Scaling Priorities

1. **First bottleneck:** Image weight. Before/after screenshots can be large. Next.js `<Image>` handles WebP conversion and lazy loading automatically — use it for all images from day one.
2. **Second bottleneck:** Content authoring. When Omer needs to add case studies frequently, editing TypeScript files and deploying becomes friction. Swap `content/` for a headless CMS at that point; component interfaces don't change.

## Anti-Patterns

### Anti-Pattern 1: Putting All Page Content in `page.tsx`

**What people do:** Write all JSX markup (hero, testimonials, contact form) directly inside `app/page.tsx`.

**Why it's wrong:** The file becomes hundreds of lines long, impossible to navigate, and sections can't be reused across pages. It mixes routing concerns with UI.

**Do this instead:** Keep `page.tsx` as a thin composer. Import section components: `<Hero />`, `<BeforeAfter />`, `<Testimonials />`.

### Anti-Pattern 2: Making Everything a Client Component

**What people do:** Add `"use client"` to every component "to be safe" or because of a vague error about hooks.

**Why it's wrong:** Client Components are hydrated in the browser, adding JavaScript weight and slowing the site. For a service business site, bundle size directly signals performance competence.

**Do this instead:** Start with Server Components. Only add `"use client"` when the specific component needs browser interactivity. If a parent needs to be a Client Component but a child doesn't require interactivity, pass the child as a prop/slot to keep it server-rendered.

### Anti-Pattern 3: Building a Custom Form API Before Validating Lead Volume

**What people do:** Build a custom `route.ts` form handler, wire up email sending with Nodemailer or Resend, manage error handling and rate limiting.

**Why it's wrong:** Overengineering for a site that will receive tens of form submissions per month. Custom form infrastructure takes hours and adds an ongoing maintenance surface.

**Do this instead:** Use Formspree. If Omer later needs custom logic (CRM integration, lead scoring), swap to a Resend-backed Route Handler once there's a reason to.

### Anti-Pattern 4: Skipping `next/image` for Before/After Screenshots

**What people do:** Use raw `<img>` tags for before/after showcase images because the comparison slider library handles the rendering.

**Why it's wrong:** Unoptimized images are the single largest performance risk for this type of site. The before/after screenshots will be the heaviest assets. Serving full-resolution PNGs destroys Lighthouse scores.

**Do this instead:** Use Next.js `<Image>` with `fill` layout inside the comparison slider container, or pre-generate WebP versions. Most React comparison slider libraries accept a rendered `<Image>` node rather than a plain URL.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Formspree | `@formspree/react` useForm hook in ContactForm | Free tier: 50 submissions/month. No backend needed. Spam filtering included. |
| Vercel | Git push → auto deploy → CDN distribution | Natural deployment target for Next.js. Free tier generous for marketing sites. |
| Google Analytics / Plausible | Script tag in root layout or `<Script>` component | Add after launch. Plausible is privacy-friendly and avoids GDPR complexity. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `content/` → Section Components | Direct TypeScript import (no API) | Build-time only. Components receive typed props. |
| Section Components → `page.tsx` | Component composition (JSX import) | Pages are thin; sections are self-contained. |
| ContactForm → Formspree | HTTP POST via `@formspree/react` hook | Only runtime network call on the entire site. |
| Nav → all pages | Next.js `<Link>` for client-side navigation | Prefetching is automatic; no config needed. |

## Suggested Build Order

Build in this order to avoid blocked work:

1. **Root layout + global CSS (dark theme tokens, typography)** — Everything else depends on this. Establishes color palette, font, and spacing scale.
2. **Nav + Footer** — Present on every page. Build once, used everywhere.
3. **Home page: Hero section** — Fastest to build, highest-value content. Establishes tone.
4. **Content data files** (`content/work.ts`, `content/testimonials.ts`) — Define data shapes before building the components that consume them.
5. **Before/After showcase component** — Most technically interesting component; isolate and get working before integrating into pages.
6. **Testimonials section** — Simple grid of static data; builds quickly.
7. **Work/Portfolio page** — Composes BeforeAfter + WorkGrid with real data.
8. **Contact form** — Requires Formspree account setup; save for when core pages are done.
9. **SEO metadata + sitemap** — Polish pass; add `generateMetadata()` to each page and generate sitemap.
10. **Responsive polish + performance audit** — Final pass with mobile viewport testing and Lighthouse.

## Sources

- [Next.js App Router Project Structure — Official Docs (updated 2026-02-27)](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Layouts and Pages — Official Docs](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Building a Smooth Image Comparison Slider in Next.js — Medium](https://medium.com/@abiodunjayb/building-a-smooth-image-comparison-slider-in-next-js-f4022cecc74b)
- [react-before-after-slider-component — npm](https://www.npmjs.com/package/react-before-after-slider-component)
- [Best React before/after image comparison slider libraries — Croct Blog](https://blog.croct.com/post/best-react-before-after-image-comparison-slider-libraries)
- [Building Contact Forms for Next.js Sites with Formspree — Netlify](https://www.netlify.com/blog/nextjs-react-forms-formspree/)
- [React Forms with Next.js — Formspree Official Guide](https://formspree.io/guides/nextjs/)
- [Structured Data for Service Businesses — Schema.org / SEJ](https://www.searchenginejournal.com/how-to-use-schema-for-local-seo-a-complete-guide/294973/)

---
*Architecture research for: Premium multi-page service business website (omeretrog-website)*
*Researched: 2026-03-04*
