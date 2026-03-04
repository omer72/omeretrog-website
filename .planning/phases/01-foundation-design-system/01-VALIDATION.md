---
phase: 1
slug: foundation-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — new Astro project; build smoke test + axe-cli |
| **Config file** | Wave 0 installs axe-cli |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && ls dist/sitemap-index.xml dist/robots.txt` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + manual browser checks at 375px / 768px / 1280px
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | manual | WebAIM Contrast Checker on each token pair | N/A | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-02 | manual | Browser DevTools viewport resize | N/A | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-03 | smoke | `npm run build` + manual nav verify | N/A | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-04 | smoke | `npm run build` + manual footer verify | N/A | ⬜ pending |
| 1-01-05 | 01 | 1 | SEO-01 | automated | `npm run build && grep -r '<title>' dist/` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 1 | SEO-04 | automated | `npm run build && ls dist/sitemap-index.xml dist/robots.txt` | ❌ W0 | ⬜ pending |
| 1-01-07 | 01 | 1 | SEO-05 | automated | `npx axe-cli dist/index.html` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Install `@axe-core/cli` as dev dependency for automated accessibility checks
- [ ] Create `scripts/verify-seo.sh` — build + grep for `<title>` uniqueness across pages
- [ ] Verify `npm run build && ls dist/sitemap-index.xml dist/robots.txt` passes

*Existing infrastructure covers remaining phase requirements via manual verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| All text color pairs pass WCAG 4.5:1 | FOUND-01 | Requires visual comparison against token table | Check each token pair with WebAIM Contrast Checker; verify ratios ≥ 4.5:1 |
| Responsive layout at 3 breakpoints | FOUND-02 | Requires browser viewport testing | Open site at 375px, 768px, 1280px; verify layout adapts correctly |
| Mobile nav toggle works | FOUND-03 | Requires interaction testing | Tap hamburger menu on mobile viewport; verify menu opens/closes |
| Footer on all pages | FOUND-04 | Requires multi-page visual check | Navigate to each of 4 pages; verify footer present with contact info |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
