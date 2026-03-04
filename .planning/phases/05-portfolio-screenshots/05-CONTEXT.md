# Phase 5: Portfolio Screenshots - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace placeholder portfolio cards with real before/after screenshots for Liat Leshem and Bialystok Association. The compare slider component, data model, and image paths are already built — this phase is about getting the right images in place, optimized, and activating the `permissionConfirmed` flags.

</domain>

<decisions>
## Implementation Decisions

### Screenshot capture
- Capture homepage above-the-fold (hero section and nav) for each site
- Viewport width: 1440px for capture
- Page content only — no browser chrome (address bar, tabs)
- Same viewport size for both before and after screenshots of each client

### Image dimensions & quality
- Output WebP at 1280px wide, height auto-calculated for 16:9 (720px)
- Single resolution — no retina/2x versions
- WebP compression quality: 80%
- Pre-crop images to exactly 16:9 before serving — no reliance on CSS object-fit cropping

### Before site sourcing
- User will provide existing PNG screenshot files
- Claude converts provided PNGs to optimized WebP
- Claude assesses each image and crops/cleans as needed to fit 16:9

### After site sourcing
- User will provide image files (PNG/JPEG) for the after state
- Claude converts to optimized WebP with same specs as before images
- Before and after screenshots for the same client must show the same page/section for a fair slider comparison

### Claude's Discretion
- Exact cropping coordinates when fitting to 16:9
- Image processing toolchain (sharp, cwebp, etc.)
- Whether to add any image loading optimization (lazy loading, blur placeholder)

</decisions>

<specifics>
## Specific Ideas

- Before and after should show the same page/section (homepage hero) so the slider comparison is immediately clear
- Screenshots should be clean — just the website content, no browser UI distracting from the design comparison
- User provides source images as files dropped into the project; Claude handles all conversion and optimization

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ReactCompareSlider` already imported and wired in `PortfolioItem.tsx` — slider component is ready
- `PortfolioItem` component handles both placeholder (permissionConfirmed=false) and active (permissionConfirmed=true) states
- `ScrollReveal` component wraps portfolio items for scroll animations

### Established Patterns
- Portfolio data lives in `src/content/portfolio.ts` — image paths already defined
- Image paths: `/images/portfolio/{client}-before.webp` and `{client}-after.webp`
- 16:9 container via `aspect-video` Tailwind class with `overflow-hidden rounded-lg`
- `objectFit: "cover"` on slider images — but pre-cropping to 16:9 means no cropping loss

### Integration Points
- Place optimized WebP files in `public/images/portfolio/` (directory exists, currently empty)
- Flip `permissionConfirmed: true` in `src/content/portfolio.ts` for each client
- No component changes needed — PortfolioItem already renders the slider when flag is true

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-portfolio-screenshots*
*Context gathered: 2026-03-04*
