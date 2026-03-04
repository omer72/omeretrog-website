---
phase: 04-lead-generation-polish-launch
plan: 02
subsystem: ui
tags: [motion, react, animation, scroll-reveal, intersection-observer, accessibility]

# Dependency graph
requires:
  - phase: 03-portfolio-showcase
    provides: PortfolioItem, WorkPage, AboutHero components that need animation wrappers
provides:
  - "ScrollReveal reusable component animating opacity+y only (compositor-safe)"
  - "MotionConfig reducedMotion='user' wrapping entire app in RootLayout"
  - "Scroll-triggered entrance animations on HowItWorks, Testimonials, AboutHero, PortfolioItem sections"
  - "IntersectionObserver polyfill in test setup for jsdom compatibility"
affects: [any phase adding new content sections — should use ScrollReveal pattern]

# Tech tracking
tech-stack:
  added: [motion (motion/react), motion-dom, motion-utils]
  patterns: [ScrollReveal wrapper component, MotionConfig global config, whileInView entrance animation, viewport once:true pattern]

key-files:
  created:
    - src/components/ui/ScrollReveal.tsx
    - tests/scroll-reveal.test.tsx
  modified:
    - src/components/layout/RootLayout.tsx
    - src/components/home/HowItWorksSection.tsx
    - src/components/home/TestimonialsSection.tsx
    - src/components/about/AboutHero.tsx
    - src/components/work/PortfolioItem.tsx
    - tests/layout.test.tsx
    - tests/setup.ts

key-decisions:
  - "ScrollReveal uses only opacity and y (transform) — never layout properties — for compositor-safety"
  - "MotionConfig reducedMotion='user' wraps outermost div in RootLayout, not inside it, for global scope"
  - "Hero section intentionally excluded from ScrollReveal — above-fold LCP element must not be delayed"
  - "Section headings (h1, h2) kept outside ScrollReveal for immediate landmark navigation visibility"
  - "IntersectionObserver polyfill added to tests/setup.ts alongside existing ResizeObserver polyfill"
  - "motion-dom and motion-utils packages reinstalled after npm install motion corrupted them"

patterns-established:
  - "ScrollReveal pattern: wrap content inside section (not the section itself) to preserve semantic landmarks"
  - "One ScrollReveal per section: keeps animated elements under 10 per page"
  - "viewport={{ once: true, amount: 0.15 }}: animations play once when 15% of element is visible"

requirements-completed: [ANIM-01, ANIM-02, ANIM-03]

# Metrics
duration: 5min
completed: 2026-03-04
---

# Phase 04 Plan 02: Scroll Animation Polish Summary

**Compositor-safe fade-up scroll animations via Motion library with global OS reduced-motion support and reusable ScrollReveal component wrapping all major content sections**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-04T12:00:41Z
- **Completed:** 2026-03-04T12:05:41Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Created `ScrollReveal` reusable component using `motion.div` with `whileInView` entrance (opacity 0->1, y 24->0), playing once at 15% viewport threshold
- Added `MotionConfig reducedMotion="user"` to `RootLayout` — all motion respects OS accessibility preferences automatically
- Applied `ScrollReveal` to HowItWorksSection, TestimonialsSection, AboutHero (bio content), and PortfolioItem (each item independently)
- Hero section deliberately excluded (LCP element, must be immediate)
- All 73 tests pass; new tests verify animation prop constraints and MotionConfig presence

## Task Commits

Each task was committed atomically:

1. **Task 1: ScrollReveal component + MotionConfig + tests (TDD)** - `57b616b` (feat)
2. **Task 2: Apply ScrollReveal to all page sections** - `202c60c` (feat)

**Plan metadata:** (docs commit follows)

_Note: Task 1 used TDD — tests written first (RED), then implementation (GREEN)._

## Files Created/Modified
- `src/components/ui/ScrollReveal.tsx` - Reusable motion.div wrapper: initial {opacity:0, y:24}, whileInView {opacity:1, y:0}, viewport once:true
- `src/components/layout/RootLayout.tsx` - Added MotionConfig reducedMotion="user" as outermost wrapper
- `src/components/home/HowItWorksSection.tsx` - Steps grid wrapped in ScrollReveal (h2 outside)
- `src/components/home/TestimonialsSection.tsx` - Cards container wrapped in ScrollReveal (h2 outside)
- `src/components/about/AboutHero.tsx` - Bio paragraphs wrapped in ScrollReveal (h1 outside)
- `src/components/work/PortfolioItem.tsx` - Each article wrapped in ScrollReveal (each item animates independently)
- `tests/scroll-reveal.test.tsx` - Tests for animation prop constraints (only opacity+y, no layout props)
- `tests/layout.test.tsx` - Added test asserting MotionConfig reducedMotion="user" present
- `tests/setup.ts` - Added IntersectionObserver polyfill for jsdom compatibility

## Decisions Made
- Hero section excluded from ScrollReveal — it's the LCP element and must not be delayed
- Section headings (h1/h2) kept outside ScrollReveal so screen readers and landmark navigation see them immediately
- `viewport={{ once: true }}` — animations play only once, not on every scroll cycle
- `amount: 0.15` — animation triggers when 15% of element enters viewport (low threshold for natural feel)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed corrupted motion-dom and motion-utils packages**
- **Found during:** Task 2 (Apply ScrollReveal to sections — running full test suite)
- **Issue:** `npm install motion` during parallel plan execution corrupted `motion-dom` and `motion-utils` (removed their package.json files), causing `framer-motion` (used by `react-compare-slider`) to fail with ERR_MODULE_NOT_FOUND
- **Fix:** Ran `npm install motion-dom@12.34.5 motion-utils@12.29.2` explicitly to restore proper package installations
- **Files modified:** package.json, package-lock.json
- **Verification:** portfolio-item.test.tsx passes (9/9 tests)
- **Committed in:** `202c60c` (Task 2 commit)

**2. [Rule 2 - Missing Critical] Added IntersectionObserver polyfill to test setup**
- **Found during:** Task 2 (portfolio-item tests after ScrollReveal wrapping)
- **Issue:** jsdom doesn't implement `IntersectionObserver`, which Motion's `whileInView` uses internally. Adding ScrollReveal to PortfolioItem broke all 9 portfolio-item tests
- **Fix:** Added `IntersectionObserver` polyfill to `tests/setup.ts` alongside existing `ResizeObserver` polyfill
- **Files modified:** tests/setup.ts
- **Verification:** All 73 tests pass after polyfill added
- **Committed in:** `202c60c` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 missing critical test infrastructure)
**Impact on plan:** Both auto-fixes necessary for correctness. No scope creep.

## Issues Encountered
- Pre-existing build failure in `tests/build-outputs.test.ts` due to TypeScript error in `ContactForm.tsx` (from Plan 04-01). This is out of scope and logged as a pre-existing issue — the build-outputs tests were already skipped before our changes.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Scroll animations fully implemented and tested across all content sections
- Motion library properly configured with reduced-motion accessibility support
- Ready for Phase 4's remaining plans (CTA, launch)
- Pre-existing TS build error in ContactForm.tsx needs resolution before shipping

---
*Phase: 04-lead-generation-polish-launch*
*Completed: 2026-03-04*
