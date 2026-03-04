# Phase 3: Portfolio Showcase - Research

**Researched:** 2026-03-04
**Domain:** React before/after slider, image optimization in Vite SPA, content data patterns
**Confidence:** HIGH

---

## Summary

Phase 3 builds the Work/Portfolio page: a dedicated page composing multiple portfolio items, each with an interactive before/after image comparison slider, client metadata, and descriptive text. The primary technical dependency is `react-compare-slider`, a purpose-built React library that handles mouse drag, keyboard arrow keys, and touch natively. No hand-rolling of slider mechanics is needed.

The stack is already established: Vite 7 + React 19 + React Router 7 + Tailwind CSS v4. The content data pattern is already set by `testimonials.ts` — a typed TypeScript file exporting an interface and a const array. The portfolio data file follows the exact same convention.

Image optimization in a Vite SPA (no Astro Image component) means static assets served from `public/` or imported through Vite's asset pipeline. For before/after screenshots the standard approach is: save optimized WebP files in `public/images/portfolio/`, serve via `<img>` with explicit `width`/`height` to prevent layout shift, and add `loading="lazy"` on all images below the fold.

**Primary recommendation:** Install `react-compare-slider`, model the portfolio data file after `testimonials.ts`, build a `PortfolioItem` component receiving typed props, and compose them on the existing `WorkPage.tsx` stub.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PORT-01 | Interactive before/after image comparison slider for each portfolio item | `react-compare-slider` v3 — `ReactCompareSlider` + `ReactCompareSliderImage`; `itemOne`/`itemTwo` accept any `ReactNode` including `<img>` |
| PORT-02 | Slider is keyboard-accessible and touch-friendly | Library ships keyboard arrow-key support and smart `onlyHandleDraggable` default (true on touch, false on pointer) — no extra code required; 44px handle target via Tailwind |
| PORT-03 | Portfolio items display client name, description, and transformation result | Data file pattern from `testimonials.ts` — `PortfolioItem` interface + const array; component receives typed props |
| PORT-04 | Dedicated Work/Portfolio page composing all showcase items | `WorkPage.tsx` stub already exists at `src/pages/WorkPage.tsx`; compose `PortfolioItem` components there |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-compare-slider | 3.x (stable) | Before/after slider | Purpose-built, keyboard + touch + screen reader support out of the box; no hand-rolling needed |
| React 19 | 19.2.0 (installed) | Component framework | Already in project |
| Tailwind CSS v4 | 4.2.1 (installed) | Styling | Already in project; use design tokens |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| ReactCompareSliderImage | bundled with react-compare-slider | Convenience `<img>` wrapper | Use for slider `itemOne`/`itemTwo`; accepts `src`, `srcSet`, `alt` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-compare-slider | img-comparison-slider (web component) | Web component version has no React-specific API; accessibility parity is lower; react-compare-slider is the React-native choice |
| react-compare-slider | Hand-rolled CSS clip-path slider | Missing keyboard nav, touch handling, aria roles — multi-day implementation with accessibility gaps |

**Installation:**
```bash
npm install react-compare-slider
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── content/
│   ├── testimonials.ts          # existing pattern to mirror
│   └── portfolio.ts             # NEW — PortfolioItem interface + data array
├── components/
│   └── work/
│       ├── PortfolioItem.tsx    # single before/after card + slider
│       └── PortfolioGrid.tsx    # layout wrapper composing all items
├── pages/
│   └── WorkPage.tsx             # existing stub — compose grid here
public/
└── images/
    └── portfolio/
        ├── liat-leshem-before.webp
        ├── liat-leshem-after.webp
        ├── bialystok-before.webp
        └── bialystok-after.webp
```

### Pattern 1: Content Data File (mirror testimonials.ts)

**What:** A typed TypeScript file in `src/content/` that exports an interface and a const array. Components import the array, receive items as props.
**When to use:** All static content — keeps data separate from presentation, enables testing with mock data.

```typescript
// src/content/portfolio.ts
// TODO: confirm written client permission before populating real screenshots

export interface PortfolioItem {
  id: string;
  clientName: string;
  role: string;
  description: string;
  result: string;
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
  permissionConfirmed: boolean; // document permission status inline
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "liat-leshem",
    clientName: "Liat Leshem",
    role: "Photographer",
    description: "Full Wix site migration preserving gallery, pricing, and contact pages.",
    result: "Launched in under 45 minutes with PageSpeed score jumping from 34 to 96.",
    beforeImage: {
      src: "/images/portfolio/liat-leshem-before.webp",
      alt: "Liat Leshem photography site before migration — slow Wix layout",
    },
    afterImage: {
      src: "/images/portfolio/liat-leshem-after.webp",
      alt: "Liat Leshem photography site after migration — fast, modern design",
    },
    permissionConfirmed: false, // TODO: obtain written permission
  },
];
```

### Pattern 2: PortfolioItem Component

**What:** A single card component that renders the slider, client metadata, and result. Receives a `PortfolioItem` prop — never imports data directly.
**When to use:** Every portfolio showcase card.

```tsx
// src/components/work/PortfolioItem.tsx
// Source: react-compare-slider README (github.com/nerdyman/react-compare-slider)

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import type { PortfolioItem as PortfolioItemType } from "../../content/portfolio";

interface Props {
  item: PortfolioItemType;
}

export default function PortfolioItem({ item }: Props) {
  return (
    <article aria-label={`Portfolio: ${item.clientName}`} className="flex flex-col gap-4">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={item.beforeImage.src}
            alt={item.beforeImage.alt}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={item.afterImage.src}
            alt={item.afterImage.alt}
          />
        }
        aria-label={`Drag to compare before and after website for ${item.clientName}`}
        className="rounded-lg overflow-hidden"
      />
      <div>
        <h2 className="text-xl font-semibold">{item.clientName}</h2>
        <p className="text-sm text-text-muted">{item.role}</p>
        <p className="mt-2 text-text-muted">{item.description}</p>
        <p className="mt-1 font-medium text-accent">{item.result}</p>
      </div>
    </article>
  );
}
```

### Pattern 3: WorkPage Composition

**What:** Thin composer — imports data and `PortfolioItem`, maps over array. Matches the existing `HomePage.tsx` thin-composer pattern (25 lines, documented in STATE.md).

```tsx
// src/pages/WorkPage.tsx — expand the existing stub
import { portfolioItems } from "../content/portfolio";
import PortfolioItem from "../components/work/PortfolioItem";

export default function WorkPage() {
  return (
    <section aria-labelledby="work-heading" className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <title>Portfolio | Omer Etrog Web Migration</title>
      {/* existing meta tags preserved */}
      <h1 id="work-heading" className="text-4xl font-bold md:text-5xl">
        Before &amp; After
      </h1>
      <p className="mt-6 text-lg text-text-muted">
        Real website transformations — see how outdated Wix sites become modern,
        high-performance websites with all content preserved.
      </p>
      <div className="mt-12 grid gap-16">
        {portfolioItems.map((item) => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
```

### Anti-Patterns to Avoid

- **Importing data inside a component directly:** Components import from content files and are untestable without the live data. Always pass data as props from the page composer.
- **Raw full-resolution PNG screenshots:** Serving unoptimized screenshots will tank Lighthouse. Save as WebP at display resolution (max 1200px wide) before committing to `public/`.
- **Relying solely on slider for image meaning:** Both `beforeImage.alt` and `afterImage.alt` must be descriptive — a screen reader user who cannot use the slider still needs to understand what changed.
- **Using `display:none` to hide placeholder content:** If client permission is not yet confirmed, render a styled placeholder card rather than hiding broken image paths.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Before/after slider mechanics | Custom CSS clip-path + mouse/touch event handler | `react-compare-slider` | Keyboard support, touch events, aria roles, screen reader announcement — all handled; custom build is 3-5 days and still misses edge cases |
| Image alt text for slider | Skip alt on `ReactCompareSliderImage` | Always provide `alt` prop | Library renders `<img>` — missing alt is a WCAG 1.1.1 failure |
| Permission tracking | External spreadsheet | `permissionConfirmed` boolean in data file | Inline in code, visible in PR review, no external dependency |

**Key insight:** `react-compare-slider` handles the entire interaction model — drag, touch, keyboard arrow keys, and screen reader role. The only customization needed is styling the handle and providing meaningful `aria-label` on the `ReactCompareSlider` element.

---

## Common Pitfalls

### Pitfall 1: Missing aria-label on ReactCompareSlider

**What goes wrong:** The slider renders as an unlabeled interactive element. Screen reader announces "slider" with no context.
**Why it happens:** Library ships keyboard/role support but cannot know the content-specific label.
**How to avoid:** Always pass `aria-label="Drag to compare before and after website for [ClientName]"` directly on the `<ReactCompareSlider>` component.
**Warning signs:** axe DevTools flags "Form element has no label" or "Interactive element has no accessible name".

### Pitfall 2: Touch scroll vs. slider drag conflict on mobile

**What goes wrong:** Vertical scroll and horizontal slider drag conflict — user trying to scroll the page accidentally moves the slider.
**Why it happens:** Both gestures use `touchmove` events on overlapping elements.
**How to avoid:** `react-compare-slider` `onlyHandleDraggable` defaults to `true` on touch devices, meaning only dragging the handle moves the slider — this is the safe default. Do NOT override it to `false` on touch devices.
**Warning signs:** QA on a real iPhone shows page scroll triggering slider movement.

### Pitfall 3: Layout shift from images without explicit dimensions

**What goes wrong:** Before/after images pop in with height: auto causing cumulative layout shift (CLS), failing Lighthouse.
**Why it happens:** Browser doesn't know image dimensions before fetch without explicit `width`/`height` attributes.
**How to avoid:** Always set `width` and `height` on `ReactCompareSliderImage` matching the actual file dimensions (or set a consistent aspect ratio wrapper with Tailwind `aspect-video` or `aspect-[16/9]`).
**Warning signs:** Lighthouse reports CLS > 0.1.

### Pitfall 4: Displaying client sites without permission

**What goes wrong:** Legal and trust exposure from using screenshots without written consent.
**Why it happens:** Overlooked during development when using placeholder images.
**How to avoid:** `permissionConfirmed: boolean` field in each `PortfolioItem` data entry documents status inline. If `false`, render a placeholder card. Obtain written permission before toggling to `true` and swapping in real screenshots.
**Warning signs:** STATE.md already lists this as a pending todo — do not mark PORT-01 complete until permission is confirmed or a placeholder strategy is explicitly documented.

### Pitfall 5: Image file size killing performance

**What goes wrong:** Raw screenshots from browsers are often 1-3MB PNG files. Two per portfolio item = 6MB+ on the Work page.
**Why it happens:** Vite serves `public/` as-is — no automatic image optimization.
**How to avoid:** Export screenshots at display resolution (max 1200px wide) as WebP before saving to `public/images/portfolio/`. Target < 150KB per image. Use `loading="lazy"` on all portfolio images (they are below the fold).
**Warning signs:** Lighthouse flags "Serve images in next-gen formats" or "Properly size images".

---

## Code Examples

### Basic slider usage (from react-compare-slider README)

```tsx
// Source: github.com/nerdyman/react-compare-slider README
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

<ReactCompareSlider
  itemOne={<ReactCompareSliderImage src="before.webp" alt="Before" />}
  itemTwo={<ReactCompareSliderImage src="after.webp" alt="After" />}
/>
```

### With keyboard increment and aria-label

```tsx
<ReactCompareSlider
  itemOne={<ReactCompareSliderImage src={item.beforeImage.src} alt={item.beforeImage.alt} />}
  itemTwo={<ReactCompareSliderImage src={item.afterImage.src} alt={item.afterImage.alt} />}
  keyboardIncrement="5%"
  aria-label={`Drag to compare before and after website for ${item.clientName}`}
/>
```

### Image with layout shift prevention

```tsx
// Wrap in aspect-ratio container to prevent CLS when exact px dimensions unknown
<div className="aspect-video w-full overflow-hidden rounded-lg">
  <ReactCompareSlider
    itemOne={
      <ReactCompareSliderImage
        src={item.beforeImage.src}
        alt={item.beforeImage.alt}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src={item.afterImage.src}
        alt={item.afterImage.alt}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    }
    aria-label={`Drag to compare before and after website for ${item.clientName}`}
  />
</div>
```

### Placeholder card (permission not yet confirmed)

```tsx
// Render when permissionConfirmed === false
<article className="flex flex-col gap-4 opacity-60" aria-label={`Portfolio: ${item.clientName} (coming soon)`}>
  <div className="aspect-video w-full rounded-lg bg-surface flex items-center justify-center">
    <p className="text-text-muted text-sm">Portfolio item coming soon</p>
  </div>
  <div>
    <h2 className="text-xl font-semibold">{item.clientName}</h2>
    <p className="text-sm text-text-muted">{item.role}</p>
  </div>
</article>
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4 + React Testing Library 16 |
| Config file | `vite.config.ts` (test block, jsdom environment) |
| Quick run command | `npx vitest run tests/work-page.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PORT-01 | ReactCompareSlider renders for each portfolio item | unit | `npx vitest run tests/portfolio-item.test.tsx` | Wave 0 |
| PORT-02 | Slider has accessible name (aria-label); handle is focusable | unit | `npx vitest run tests/portfolio-item.test.tsx` | Wave 0 |
| PORT-03 | clientName, description, result render in DOM | unit | `npx vitest run tests/portfolio-item.test.tsx` | Wave 0 |
| PORT-04 | WorkPage renders all portfolioItems; correct h1; page title | unit | `npx vitest run tests/work-page.test.tsx` | Wave 0 |

Note: `react-compare-slider` renders an `<input type="range">` internally. In jsdom this renders correctly and can be queried with `getByRole('slider')`. The aria-label set on `ReactCompareSlider` propagates to the underlying range input.

### Wave 0 Gaps

- [ ] `tests/portfolio-item.test.tsx` — covers PORT-01, PORT-02, PORT-03
- [ ] `tests/work-page.test.tsx` — covers PORT-04
- [ ] Mock image assets: jsdom does not load images; tests assert on src/alt strings, not rendered pixels

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom CSS clip-path sliders | react-compare-slider with built-in a11y | ~2020 onward | Keyboard + touch + screen reader handled by library |
| PNG screenshots in `src/assets/` (Vite bundled) | WebP in `public/` (served as-is) | Vite 3+ | Public dir assets skip bundler hash — stable URLs, no import boilerplate |
| `img-comparison-slider` web component | `react-compare-slider` React library | — | React-native API, TypeScript types, no web component wrapper needed |

---

## Open Questions

1. **Client permission status**
   - What we know: Both liat-leshem and bialystok are flagged as pending permission in STATE.md
   - What's unclear: Whether permission will arrive before Phase 3 implementation
   - Recommendation: Build with `permissionConfirmed` boolean in data file; render placeholder card when `false`. This unblocks implementation and is correct behavior for launch regardless.

2. **react-compare-slider v4 beta stability**
   - What we know: v4 is in beta; v3 is the current stable release
   - What's unclear: Whether v4 introduces breaking API changes
   - Recommendation: Use v3 stable (`npm install react-compare-slider` with no beta tag). The v3 API is sufficient for all PORT requirements.

3. **Screenshot creation workflow**
   - What we know: No screenshots exist yet; client sites are at liatleshem.netlify.app and bialystoksite.netlify.app
   - What's unclear: Whether Omer will capture these or they need to be included in the plan tasks
   - Recommendation: Plan should include a task for capturing and optimizing screenshots as WebP, even if the content is placeholder text.

---

## Sources

### Primary (HIGH confidence)
- github.com/nerdyman/react-compare-slider README — API props, keyboard support, touch behavior, ReactCompareSliderImage usage
- `/Users/omere/projects/omeretrog-website/src/content/testimonials.ts` — data file pattern to mirror
- `/Users/omere/projects/omeretrog-website/package.json` — confirmed installed versions
- `/Users/omere/projects/omeretrog-website/src/pages/WorkPage.tsx` — existing stub to expand
- `/Users/omere/projects/omeretrog-website/vite.config.ts` — test config, jsdom environment confirmed
- `.planning/STATE.md` — client permission pending todos documented

### Secondary (MEDIUM confidence)
- react-compare-slider README note: "Screen reader and keyboard support out of the box" — not verified against source code but stated in official docs
- aria-label prop on ReactCompareSlider — confirmed accepted via README prop table; propagation to underlying `<input type="range">` inferred from standard React behavior (MEDIUM — source code not read directly)

### Tertiary (LOW confidence)
- `onlyHandleDraggable` smart default behavior on touch vs. pointer — described in README but touch conflict behavior in practice not verified on real device

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — react-compare-slider README read directly; package versions confirmed from package.json
- Architecture: HIGH — mirrors established testimonials.ts pattern already in the codebase
- Pitfalls: MEDIUM — library-specific pitfalls from README; image optimization from Vite docs general knowledge
- Validation: HIGH — test infrastructure (vitest + jsdom + RTL) confirmed from vite.config.ts and tests/ directory

**Research date:** 2026-03-04
**Valid until:** 2026-09-04 (stable library; re-verify if react-compare-slider v4 goes stable)
