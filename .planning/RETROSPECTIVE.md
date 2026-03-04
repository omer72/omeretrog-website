# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-04
**Phases:** 4 | **Plans:** 10 | **Sessions:** 1

### What Was Built
- Premium dark-themed 4-page website (Home, Work, About, Contact)
- Design system with Tailwind v4 @theme tokens and WCAG-compliant contrast ratios
- Interactive before/after portfolio with react-compare-slider (placeholder cards pending client permission)
- Contact form with Formspree, honeypot + Turnstile spam protection, Calendly facade embed
- Scroll-triggered animations (compositor-safe) with global reduced-motion respect
- React.lazy code splitting isolating Contact page's heavy dependencies

### What Worked
- **Thin composer pattern**: Pages stayed under 30 lines, data files separate from components — made testing straightforward and kept components reusable
- **TDD approach**: Writing tests first caught integration issues early (e.g., Formspree SubmissionError type mismatch)
- **Wave-based parallel execution**: Plans 04-01 and 04-02 ran simultaneously, saving significant time
- **Facade pattern for Calendly**: Deferred ~200KB JS load, protecting Lighthouse score without sacrificing functionality
- **Research-first planning**: HIGH confidence research meant zero major pivots during execution

### What Was Inefficient
- **Parallel npm install conflicts**: Plans 04-01 and 04-02 both installed `motion` — corrupted node_modules, required reinstall
- **ROADMAP.md progress table drift**: Coverage validation table and progress table fell out of sync with actual completion status during multi-phase execution
- **TS error slipped through 04-01**: `state.errors.length` on a non-array type — caught by build test but should have been caught in plan execution

### Patterns Established
- `MotionConfig reducedMotion="user"` at app root — single-point animation accessibility
- Facade pattern for third-party embeds — click-to-load preserves performance
- ResizeObserver + IntersectionObserver polyfills in test setup for jsdom compatibility
- Mock heavy libraries (react-compare-slider) at page-level tests to isolate composition logic

### Key Lessons
1. When parallel agents install the same npm package, the second install can corrupt the first — coordinate shared dependencies in a pre-wave step
2. Formspree's `state.errors` is a `SubmissionError` object, not an array — always check library types before assuming standard JS patterns
3. Hero section should be excluded from scroll animations — it's the LCP element and above the fold

### Cost Observations
- Model mix: ~10% opus (orchestrator), ~90% sonnet (executors, verifiers, planners)
- Sessions: 1 (entire v1.0 built in a single day)
- Notable: Wave parallelization cut Phase 4 execution time roughly in half

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 1 | 4 | Initial build — established patterns |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.0 | 78 | — | 6 (formspree, motion, react-calendly, turnstile, compare-slider, react-router) |

### Top Lessons (Verified Across Milestones)

1. Research-first planning eliminates major pivots during execution
2. Thin composer pages + typed props = easy testing and maintenance
