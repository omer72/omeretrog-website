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
| **Framework** | Vitest 2.x + React Testing Library |
| **Config file** | `vite.config.ts` (co-located test config) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 3 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | unit | `npx vitest run tests/design-tokens.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-02 | unit | `npx vitest run tests/layout.test.tsx` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-03 | unit | `npx vitest run tests/nav.test.tsx` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-04 | unit | `npx vitest run tests/layout.test.tsx` | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 1 | SEO-01 | unit | `npx vitest run tests/seo.test.tsx` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 1 | SEO-04 | smoke | `npm run build && ls dist/sitemap.xml dist/robots.txt` | ❌ W0 | ⬜ pending |
| 1-01-07 | 01 | 1 | SEO-05 | unit | `npx vitest run tests/seo.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- [ ] `tests/setup.ts` — jsdom environment setup for React Testing Library
- [ ] `tests/nav.test.tsx` — covers FOUND-03
- [ ] `tests/layout.test.tsx` — covers FOUND-02, FOUND-04
- [ ] `tests/seo.test.tsx` — covers SEO-01, SEO-05
- [ ] `tests/build.test.ts` — covers SEO-04 (checks dist/ after build)
- [ ] Add `test` config to `vite.config.ts`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark theme contrast ratios pass 4.5:1 | FOUND-01 | Requires visual contrast checker | Check each token pair with WebAIM/OddContrast |
| Responsive layout at 375/768/1280px | FOUND-02 | Requires browser viewport testing | Open site at each width, verify layout adapts |
| Mobile nav toggle works | FOUND-03 | Requires interaction testing | Tap hamburger on mobile viewport |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 3s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
