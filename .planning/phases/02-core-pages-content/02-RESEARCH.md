# Phase 2: Core Pages & Content - Research

**Researched:** 2026-03-04
**Domain:** React SPA content composition, Open Graph / JSON-LD SEO, TypeScript data files, Tailwind v4 dark section layouts
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Hero section with bold value proposition ("old site → modern site, under an hour") | Section component pattern + TypeScript content file |
| HERO-02 | Primary CTA button above the fold linking to contact/booking | Tailwind v4 button variant pattern |
| HERO-03 | Social proof teaser visible in or immediately below hero (testimonial snippet or before/after preview) | Testimonial data file + inline teaser component |
| HERO-04 | "How It Works" section explaining the 3-step migration process | Static step data array pattern |
| TEST-01 | Testimonials section with at least 2-3 client quotes | `Testimonial[]` TypeScript interface + card grid |
| TEST-02 | Each testimonial shows client name and specific result | Data shape defined in content file |
| TEST-03 | Testimonials visible on home page (not buried in navigation) | HomePage section composition order |
| ABOUT-01 | About page with Omer's background and expertise | Thin page + content file |
| ABOUT-02 | Professional photo or personal branding element | Static asset in `public/` or `src/assets/` |
| SEO-02 | Open Graph tags and OG images for social sharing | Static OG image in `public/` + `index.html` + React 19 `<meta>` per-page |
| SEO-03 | JSON-LD structured data (Service schema) on homepage | `dangerouslySetInnerHTML` script component pattern |
</phase_requirements>

---

## Summary

Phase 2 builds on the Phase 1 scaffold (RootLayout, Nav, Footer, 4 page stubs, design tokens, 29 passing tests) to fill in real content. The work divides into three areas: (1) composing section components on HomePage (Hero, HowItWorks, Testimonials), (2) building out AboutPage with personal content and photo, and (3) implementing OG tags and JSON-LD structured data for SEO.

The most important architectural decision for this phase is defining TypeScript interfaces and data files **before** building any section component. The interfaces (`Testimonial`, `HowItWorksStep`) form the contract that section components accept as props. Getting the data shape wrong and fixing it after components are built costs component refactors in every consuming location.

The most technically nuanced area is SEO-02 (Open Graph) and SEO-03 (JSON-LD). The project is a Vite SPA with a single `index.html`. Social media crawlers (Facebook, Slack, WhatsApp link preview) do not execute JavaScript — they read the raw HTML. React 19's `<meta>` hoisting works at runtime via JavaScript, not at build time in static HTML. This creates a split strategy: a **single static OG image** for the entire site placed in `index.html` satisfies the immediate SEO-02 requirement without SSR. Per-page dynamic OG images require either a separate build step or Netlify Edge Functions — both are out of scope for Phase 2. JSON-LD is injected via a `JsonLd` component using `dangerouslySetInnerHTML`, which React renders into the DOM; Google's crawler does execute JavaScript so JSON-LD via client-side rendering is acceptable.

**Primary recommendation:** Define data interfaces first, compose homepage sections from left-to-right on the file system (data → component → page), add static OG tags to `index.html`, inject JSON-LD inline on HomePage with XSS-safe serialization.

---

## Standard Stack

### Core (already installed — no new installs needed for content work)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.0 | Component rendering + native `<title>`/`<meta>` hoisting | Already installed; React 19 native metadata removes need for react-helmet |
| React Router | 7.13.1 | Route-based page rendering | Already wired in router.tsx |
| Tailwind CSS | 4.2.1 | Section layouts, card grids, responsive utility classes | Design tokens already defined in index.css |
| TypeScript | 5.9.3 | Typed content interfaces, type-safe props | Already configured |
| Vitest + RTL | 4.0.18 + 16.x | Component tests for new sections | Already configured in vite.config.ts |

### No New Runtime Dependencies Needed
Phase 2 content work (section components + data files + SEO tags) requires zero new `npm install` dependencies. All needed tools are already present.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static OG image in index.html | Dynamic OG images via Netlify Edge Functions | Edge Functions add complexity, Netlify account config, deployment dependency — overkill when a single site-level OG image satisfies SEO-02 |
| `dangerouslySetInnerHTML` for JSON-LD | `react-safe-json-ld` npm package | The package adds a dependency for ~5 lines of code; the inline sanitized pattern is sufficient |
| React 19 native `<meta>` per-page | react-helmet-async | react-helmet-async is the safer choice if `property` attribute support is confirmed needed (OG tags use `property=`, not `name=`); however React 19 `<meta>` supports `property` as a pass-through HTML attribute even though official docs don't list it — see pitfall below |

**Installation:**
```bash
# No new installs needed for Phase 2
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/                  # TypeScript data files — define before components
│   ├── testimonials.ts       # Testimonial[] data
│   └── how-it-works.ts       # HowItWorksStep[] data
├── components/
│   ├── layout/               # Already exists (Nav, Footer, RootLayout)
│   ├── home/                 # New: section components for HomePage
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── TestimonialsSection.tsx
│   └── about/                # New: About page component(s)
│       └── AboutHero.tsx
├── pages/
│   ├── HomePage.tsx          # Thin composer: imports + sequences sections
│   ├── AboutPage.tsx         # Thin composer: imports + renders AboutHero
│   └── ...                   # Other stubs unchanged
public/
└── og-image.jpg              # Static 1200x630 OG image for social sharing
```

### Pattern 1: Data File Before Component
**What:** Define a TypeScript interface and export a typed array of content from a `src/content/` file. Import it in the section component as a prop or directly.
**When to use:** All repeated content (testimonials, process steps) — anything that would be hardcoded into JSX.
**Example:**
```typescript
// src/content/testimonials.ts
export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  result: string;        // specific measurable result (satisfies TEST-02)
  role?: string;         // optional: "Owner, Liat Leshem Photography"
}

export const testimonials: Testimonial[] = [
  {
    id: "liat",
    quote: "My new site looks completely professional. Couldn't believe it was done so fast.",
    clientName: "Liat Leshem",
    result: "Full Wix migration + launch in under 45 minutes",
    role: "Owner, Liat Leshem Photography",
  },
  // ... 2-3 total
];
```

### Pattern 2: Thin Page Composer
**What:** Page files (HomePage.tsx, AboutPage.tsx) stay thin — they set SEO metadata, import section components, and sequence them. No content or styling logic in the page file.
**When to use:** Every page file.
**Example:**
```tsx
// src/pages/HomePage.tsx
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import { testimonials } from "../content/testimonials";
import { steps } from "../content/how-it-works";
import JsonLd from "../components/JsonLd";
import { serviceSchema } from "../content/schema";

export default function HomePage() {
  return (
    <>
      <title>Omer Etrog | Modern Web Migration in Under an Hour</title>
      <meta name="description" content="Transform your outdated Wix site..." />
      <link rel="canonical" href="https://omeretrog.com/" />
      <JsonLd data={serviceSchema} />

      <HeroSection testimonialTeaser={testimonials[0]} />
      <HowItWorksSection steps={steps} />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
```

### Pattern 3: Static OG Image in index.html
**What:** Place a single 1200x630px OG image in `public/og-image.jpg`. Add the OG meta tags statically to `index.html`. This satisfies SEO-02 for social link previews without requiring SSR.
**When to use:** For a Vite SPA where social crawlers don't execute JavaScript.
**Example:**
```html
<!-- index.html <head> — add after existing meta tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://omeretrog.com/" />
<meta property="og:title" content="Omer Etrog | Modern Web Migration in Under an Hour" />
<meta property="og:description" content="Transform your outdated Wix site into a fast, modern website. Full content migration in under an hour." />
<meta property="og:image" content="https://omeretrog.com/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://omeretrog.com/og-image.jpg" />
```
**Note:** Per-page OG titles can be added with React 19 `<meta property="og:title">` in each page component as a progressive enhancement (crawlers that do execute JS will see them; crawlers that don't will see the index.html fallback).

### Pattern 4: JSON-LD Service Schema Component
**What:** A reusable `JsonLd` component that injects structured data using `dangerouslySetInnerHTML` with XSS-safe serialization. Not hoisted by React to `<head>` — renders inline in `<main>` which is valid and crawlable.
**When to use:** On any page requiring structured data (SEO-03 requires Service schema on homepage).
**Example:**
```tsx
// src/components/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
```

```typescript
// src/content/schema.ts
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Wix to Modern Website Migration",
  "provider": {
    "@type": "Person",
    "name": "Omer Etrog",
    "url": "https://omeretrog.com"
  },
  "description": "Complete Wix site migration to a modern, fast website. Full content transfer in under an hour.",
  "serviceType": "Web Development",
  "areaServed": "Worldwide",
  "url": "https://omeretrog.com"
};
```

### Pattern 5: "How It Works" Step Data
**What:** Static 3-step data array drives the HowItWorksSection without hardcoding text in JSX.
**Example:**
```typescript
// src/content/how-it-works.ts
export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export const steps: HowItWorksStep[] = [
  { step: 1, title: "Share your current site", description: "Send us your existing Wix URL. We audit the structure, content, and assets." },
  { step: 2, title: "We migrate everything", description: "All pages, images, text, and links transferred to a modern codebase — in under an hour." },
  { step: 3, title: "Launch your new site", description: "Your domain, your content, same-day deployment on fast, reliable infrastructure." },
];
```

### Anti-Patterns to Avoid
- **Hardcoded content in JSX:** Never write testimonial quotes, step descriptions, or bio text directly in component JSX. If the content needs to change, it should be a data file edit, not a component edit.
- **`useEffect` for JSON-LD injection:** Deferred-to-client JSON-LD is invisible to non-JS crawlers. Use the `dangerouslySetInnerHTML` pattern rendered synchronously in JSX.
- **Multiple equal-weight CTAs on a single viewport section:** One primary CTA per section. The hero CTA links to Contact; all subsequent CTAs are visually subordinate (ghost button or text link style).
- **Anonymous About page:** "I build websites" with no photo and no name recognition. The About page must have a real photo and specific background (satisfies ABOUT-02 and builds trust for high-consideration service purchase).
- **Social proof hidden below the fold:** The first viewport of the homepage must contain either a testimonial teaser or a before/after preview — not just a headline and CTA button (trust-signal placement requirement from ROADMAP.md).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG image generation | Custom canvas/sharp build script | Static 1200x630 JPG in `public/` for v1 | Dynamic OG images are Phase 4+ complexity; a static site-level image satisfies SEO-02 for launch |
| JSON-LD serialization safety | Custom escaping logic | `JSON.stringify(data).replace(/</g, "\\u003c")` (one-liner, proven) | This is the standard pattern used in production across Next.js, Remix, and plain React |
| Content management UI | Admin panel / CMS | TypeScript data files in `src/content/` | CMS is explicitly out of scope for v1 (per PROJECT.md); typed TS files give IDE autocomplete and compile-time validation |
| Head metadata management | react-helmet-async | React 19 native `<title>` + `<meta>` hoisting | react-helmet-async solves a problem React 19 now handles natively; adding it would be a regression |
| Component-level OG routing | Per-page SSR / Netlify Functions | Static `index.html` OG tags (fallback) + React 19 `<meta property>` (progressive enhancement) | SSR is out of scope and unnecessary for a single-domain marketing site |

**Key insight:** Phase 2 is primarily a content-assembly problem, not a technical problem. The infrastructure (router, layout, tokens, tests) is done. The remaining work is composing section components from typed data.

---

## Common Pitfalls

### Pitfall 1: Open Graph `property` vs `name` Attribute
**What goes wrong:** React 19's official `<meta>` documentation only lists `name`, `charset`, `httpEquiv`, and `itemProp` as recognized props. Open Graph tags use `property="og:title"` (not `name`). Developers assume React 19 can't handle OG tags natively.
**Why it happens:** The official docs list the "known" props but React 19's `<meta>` passes through all HTML attributes — `property` works as an unrecognized-but-valid passthrough. However, this is not documented behavior and may not be stable.
**How to avoid:** For maximum safety, add the critical OG tags (og:image, og:title, og:description) statically to `index.html`. Use React 19 `<meta property="og:title">` per-page only as a progressive enhancement — crawlers that execute JS get updated values, crawlers that don't get the fallback.
**Warning signs:** Slack/WhatsApp link preview shows wrong title or no image after deploy.

### Pitfall 2: Social Crawlers Don't Execute JavaScript
**What goes wrong:** OG tags added dynamically via React (even using React 19 hoisting) are invisible to Facebook scraper, WhatsApp, Slack, and iMessage link preview — these fetch raw HTML.
**Why it happens:** SPA architecture means the initial HTML response is a near-empty shell. The JavaScript that populates `<head>` runs after the crawler has already parsed and discarded the document.
**How to avoid:** Put all OG tags that must be visible to social crawlers in `index.html` directly. Accept that a SPA without per-route prerendering has one OG image/title for all URLs.
**Warning signs:** Test with [opengraph.xyz](https://www.opengraph.xyz) — if it shows wrong data, the static `index.html` OG tags are missing or wrong.

### Pitfall 3: JSON-LD XSS via Untrusted Strings
**What goes wrong:** If any content in the JSON-LD data contains `</script>`, it closes the script tag early and allows injection.
**Why it happens:** `JSON.stringify` does not escape `<` by default.
**How to avoid:** Always replace `<` with `\u003c` in the serialized string: `JSON.stringify(data).replace(/</g, "\\u003c")`.
**Warning signs:** JSON-LD content that includes HTML, URLs with parameters, or user-supplied strings.

### Pitfall 4: Testimonial Data Without Specific Results (TEST-02 Failure)
**What goes wrong:** Testimonials say "Great service!" with no specifics. TEST-02 requires "client name and specific result."
**Why it happens:** Placeholder content gets shipped.
**How to avoid:** The `Testimonial` TypeScript interface must include a non-optional `result: string` field. If the field is required in the type, it cannot be omitted from the data file without a compile error.
**Warning signs:** TypeScript compile errors in `content/testimonials.ts` if `result` is missing.

### Pitfall 5: Page Files Growing Fat
**What goes wrong:** All section markup ends up in `HomePage.tsx` as one large JSX blob. Adding the About page follows the same pattern. The file becomes unreadable and untestable.
**Why it happens:** It feels faster to put everything in one place.
**How to avoid:** Keep each section in its own file in `src/components/home/`. HomePage.tsx should be under ~40 lines. Each section component receives its data via props, not by importing data files directly (makes them testable with mock data).
**Warning signs:** HomePage.tsx exceeds 100 lines.

### Pitfall 6: About Page Feels Anonymous
**What goes wrong:** About page shows generic copy with no photo, no specific background detail, no personality. Service buyers don't hire nameless web developers.
**Why it happens:** Writing about yourself is uncomfortable; placeholder copy ships.
**How to avoid:** ABOUT-02 explicitly requires "professional photo or personal branding element." This is a deployment blocker — don't mark Phase 2 complete without it. A real `.jpg` in `public/` or `src/assets/` is required.
**Warning signs:** ABOUT-02 checkbox is not ticked, or the AboutPage renders an `<img>` with an empty or placeholder `src`.

---

## Code Examples

Verified patterns from established React + Vitest testing practices:

### Testing a Section Component with Mock Data
```tsx
// tests/testimonials-section.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TestimonialsSection from "../src/components/home/TestimonialsSection";
import type { Testimonial } from "../src/content/testimonials";

const mockTestimonials: Testimonial[] = [
  { id: "t1", quote: "Amazing result.", clientName: "Jane Doe", result: "Site live in 40 minutes" },
  { id: "t2", quote: "Fast and professional.", clientName: "John Smith", result: "Full Wix migration complete" },
];

describe("TestimonialsSection", () => {
  it("renders all testimonial quotes", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    expect(screen.getByText("Amazing result.")).toBeInTheDocument();
    expect(screen.getByText("Fast and professional.")).toBeInTheDocument();
  });

  it("shows client name for each testimonial", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("shows specific result for each testimonial", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    expect(screen.getByText("Site live in 40 minutes")).toBeInTheDocument();
  });
});
```

### Testing Hero Section CTA (HERO-02)
```tsx
// tests/hero-section.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HeroSection from "../src/components/home/HeroSection";

it("renders primary CTA linking to /contact", () => {
  render(
    <MemoryRouter>
      <HeroSection testimonialTeaser={mockTestimonial} />
    </MemoryRouter>
  );
  const cta = screen.getByRole("link", { name: /get started|book|contact/i });
  expect(cta).toHaveAttribute("href", "/contact");
});
```

### JsonLd Component
```tsx
// src/components/JsonLd.tsx — safe injection pattern
interface JsonLdProps {
  data: Record<string, unknown>;
}
export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
```

### Tailwind v4 Hero Layout using Design Tokens
```tsx
// Pattern: full-viewport hero with primary CTA + muted teaser
// Uses existing tokens: bg-bg, text-text, text-text-muted, text-accent, bg-accent
<section className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
  <h1 className="text-5xl font-bold leading-tight md:text-6xl">
    Your old site, rebuilt modern —{" "}
    <span className="text-accent">in under an hour</span>
  </h1>
  <p className="mt-6 max-w-2xl text-lg text-text-muted">
    Full Wix content migration. Fast. No content lost.
  </p>
  <Link
    to="/contact"
    className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-bg transition-colors hover:bg-accent-hover"
  >
    Get started
  </Link>
</section>
```

### HowItWorks 3-Column Grid
```tsx
// Pattern: ordered steps with number accent, responsive grid
<section className="bg-surface-alt py-20">
  <div className="mx-auto max-w-5xl px-4 md:px-8">
    <h2 className="text-3xl font-bold text-center">How It Works</h2>
    <ol className="mt-12 grid gap-8 md:grid-cols-3">
      {steps.map((s) => (
        <li key={s.step} className="rounded-xl border border-border bg-surface p-6">
          <span className="text-4xl font-bold text-accent">{s.step}</span>
          <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
          <p className="mt-2 text-text-muted">{s.description}</p>
        </li>
      ))}
    </ol>
  </div>
</section>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| react-helmet / react-helmet-async for `<title>` and `<meta>` | React 19 native `<title>` + `<meta>` hoisting | React 19.0 (Dec 2024) | No library needed for per-page title and standard meta tags |
| Manual `useEffect` DOM manipulation for metadata | Declarative JSX-based hoisting | React 19.0 | Simpler, no cleanup required |
| Static content hardcoded in JSX | TypeScript `src/content/` data files with interfaces | Established pattern | Enables compile-time validation, easy content updates |
| react-safe-json-ld package for JSON-LD | Inline `dangerouslySetInnerHTML` + `\u003c` escaping | Established pattern | Saves a dependency for a trivial amount of code |

**Deprecated/outdated:**
- `react-helmet`: Deprecated; React 19 handles what it solved. Do not install.
- `document.title = "..."` in `useEffect`: Replaced by React 19 `<title>` hoisting. Avoid.

---

## Open Questions

1. **React 19 `<meta property="">` passthrough stability**
   - What we know: React 19's `<meta>` accepts `property` as a passthrough HTML attribute even though it's not listed in official docs. It hoists to `<head>` as expected in practice.
   - What's unclear: Whether this is stable and intentional, or an implementation artifact that could change.
   - Recommendation: Use `index.html` static OG tags as the primary source of truth. Use React 19 `<meta property>` per-page as a progressive enhancement only. If stability matters, add react-helmet-async as an escape hatch (but don't install it unless needed).

2. **Content availability for testimonials**
   - What we know: Clients liatleshem.netlify.app and bialystoksite.netlify.app are the two real examples. Permission to use their sites publicly is a pending todo (per STATE.md).
   - What's unclear: Whether Omer has 2-3 ready quotes with specific results and client names.
   - Recommendation: Define the TypeScript `Testimonial` interface with `result` as a required field. If real client quotes aren't available, use placeholder names/results with a `// TODO: replace with real client permission` comment. The structure must be correct even if content is placeholder.

3. **About page photo**
   - What we know: ABOUT-02 requires a professional photo or personal branding element.
   - What's unclear: Whether a photo asset exists and is ready to include.
   - Recommendation: Plan for a local asset in `public/omer.jpg` (or `src/assets/omer.jpg`). If the photo doesn't exist at implementation time, use a dark-themed geometric placeholder with initials "OE" — but mark ABOUT-02 as incomplete until a real photo is present.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + React Testing Library 16.x |
| Config file | `vite.config.ts` (test block, environment: jsdom) |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero section renders value proposition h1 | unit | `npx vitest run tests/hero-section.test.tsx` | ❌ Wave 0 |
| HERO-02 | Primary CTA link points to /contact | unit | `npx vitest run tests/hero-section.test.tsx` | ❌ Wave 0 |
| HERO-03 | Testimonial teaser visible in/below hero | unit | `npx vitest run tests/hero-section.test.tsx` | ❌ Wave 0 |
| HERO-04 | HowItWorks section renders 3 steps | unit | `npx vitest run tests/how-it-works-section.test.tsx` | ❌ Wave 0 |
| TEST-01 | TestimonialsSection renders minimum 2 testimonials | unit | `npx vitest run tests/testimonials-section.test.tsx` | ❌ Wave 0 |
| TEST-02 | Each testimonial shows clientName + result | unit | `npx vitest run tests/testimonials-section.test.tsx` | ❌ Wave 0 |
| TEST-03 | TestimonialsSection is imported in HomePage | unit | `npx vitest run tests/home-page.test.tsx` | ❌ Wave 0 |
| ABOUT-01 | AboutPage renders background h1 and body text | unit | `npx vitest run tests/about-page.test.tsx` | ❌ Wave 0 |
| ABOUT-02 | AboutPage renders an img element | unit | `npx vitest run tests/about-page.test.tsx` | ❌ Wave 0 |
| SEO-02 | index.html contains og:image meta tag | manual | Verify with `opengraph.xyz` after deploy | N/A |
| SEO-03 | HomePage renders script[type=application/ld+json] | unit | `npx vitest run tests/home-page.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run`
- **Per wave merge:** `npx vitest run --reporter=verbose`
- **Phase gate:** Full suite green (all 29 existing + new Phase 2 tests) before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/hero-section.test.tsx` — covers HERO-01, HERO-02, HERO-03
- [ ] `tests/how-it-works-section.test.tsx` — covers HERO-04
- [ ] `tests/testimonials-section.test.tsx` — covers TEST-01, TEST-02
- [ ] `tests/home-page.test.tsx` — covers TEST-03, SEO-03
- [ ] `tests/about-page.test.tsx` — covers ABOUT-01, ABOUT-02

---

## Sources

### Primary (HIGH confidence)
- [React 19 `<meta>` component docs](https://react.dev/reference/react-dom/components/meta) — supported props (name, httpEquiv, charset, itemProp); hoisting behavior confirmed
- [React 19 `<script>` component docs](https://react.dev/reference/react-dom/components/script) — inline scripts NOT hoisted to `<head>` (only async src scripts are); `dangerouslySetInnerHTML` approach required for JSON-LD
- [React v19 release blog](https://react.dev/blog/2024/12/05/react-19) — Document Metadata feature overview
- Phase 1 codebase inspection — confirmed React 19.2, Tailwind v4.2, Vitest 4.0.18, 29 passing tests, design tokens in `src/styles/index.css`

### Secondary (MEDIUM confidence)
- [LogRocket: Guide to React 19 Document Metadata](https://blog.logrocket.com/guide-react-19-new-document-metadata-feature/) — practical OG tag limitations in SPA context
- [LogRocket: Improving React SEO with structured data](https://blog.logrocket.com/improving-react-seo-structured-data/) — JSON-LD dangerouslySetInnerHTML pattern
- [DEV: SEO Optimization for React + Vite Apps](https://dev.to/ali_dz/optimizing-seo-in-a-react-vite-project-the-ultimate-guide-3mbh) — confirmed per-page OG approach using react-helmet-async; alternative: static index.html OG
- [DEV: Simple SEO fix for Vite/React SPAs](https://dev.to/msveshnikov/simple-seo-fix-for-vitereact-spas-without-switching-to-nextremix-pe0) — static per-route prerendering approach (not used here, but confirms limitation)

### Tertiary (LOW confidence)
- Multiple Medium articles on React 19 metadata — directionally consistent, not cross-verified against official docs individually

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed from installed package.json; no new dependencies needed
- Architecture patterns: HIGH — data-file + thin-page pattern is established React best practice; confirmed by project ROADMAP.md and SUMMARY.md
- OG / JSON-LD pitfalls: HIGH — crawler JavaScript limitation is a well-documented SPA constraint confirmed by multiple independent sources and React official docs on script hoisting
- Test patterns: HIGH — Vitest + RTL already configured and running; patterns follow existing tests in codebase

**Research date:** 2026-03-04
**Valid until:** 2026-09-04 (stable stack; 6-month window appropriate for React 19 + Tailwind v4)
