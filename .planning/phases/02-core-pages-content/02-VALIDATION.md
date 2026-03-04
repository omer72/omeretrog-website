---
phase: 2
slug: core-pages-content
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library (from Phase 1) |
| **Config file** | `vite.config.ts` (test block) |
| **Quick run command** | `npx vitest run` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 1 | HERO-01 | unit | `npx vitest run tests/hero-section.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-02 | 01 | 1 | HERO-02 | unit | `npx vitest run tests/hero-section.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-03 | 01 | 1 | HERO-03 | unit | `npx vitest run tests/hero-section.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-04 | 01 | 1 | HERO-04 | unit | `npx vitest run tests/how-it-works-section.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-05 | 01 | 1 | TEST-01 | unit | `npx vitest run tests/testimonials-section.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-06 | 01 | 1 | TEST-02 | unit | `npx vitest run tests/testimonials-section.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-07 | 01 | 1 | TEST-03 | unit | `npx vitest run tests/home-page.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-08 | 01 | 1 | ABOUT-01 | unit | `npx vitest run tests/about-page.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-09 | 01 | 1 | ABOUT-02 | unit | `npx vitest run tests/about-page.test.tsx` | ❌ W0 | ⬜ pending |
| 2-01-10 | 01 | 1 | SEO-02 | manual | Verify OG tags in index.html | N/A | ⬜ pending |
| 2-01-11 | 01 | 1 | SEO-03 | unit | `npx vitest run tests/home-page.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/hero-section.test.tsx` — covers HERO-01, HERO-02, HERO-03
- [ ] `tests/how-it-works-section.test.tsx` — covers HERO-04
- [ ] `tests/testimonials-section.test.tsx` — covers TEST-01, TEST-02
- [ ] `tests/home-page.test.tsx` — covers TEST-03, SEO-03
- [ ] `tests/about-page.test.tsx` — covers ABOUT-01, ABOUT-02

*Existing 29 tests from Phase 1 continue to pass unchanged.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| OG image renders in social share | SEO-02 | Requires external crawler | Share URL in Slack/WhatsApp, verify preview |
| About page photo renders correctly | ABOUT-02 | Requires visual check | Open /about, verify image displays |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
