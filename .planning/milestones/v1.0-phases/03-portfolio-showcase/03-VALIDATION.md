---
phase: 3
slug: portfolio-showcase
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 3 — Validation Strategy

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library (from Phase 1) |
| **Quick run command** | `npx vitest run tests/portfolio-item.test.tsx tests/work-page.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

## Sampling Rate

- **After every task commit:** `npx vitest run`
- **After every plan wave:** `npx vitest run --reporter=verbose`
- **Max feedback latency:** 5 seconds

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | PORT-01 | unit | `npx vitest run tests/portfolio-item.test.tsx` | ❌ W0 | ⬜ pending |
| 3-01-02 | 01 | 1 | PORT-02 | unit | `npx vitest run tests/portfolio-item.test.tsx` | ❌ W0 | ⬜ pending |
| 3-01-03 | 01 | 1 | PORT-03 | unit | `npx vitest run tests/portfolio-item.test.tsx` | ❌ W0 | ⬜ pending |
| 3-01-04 | 01 | 1 | PORT-04 | unit | `npx vitest run tests/work-page.test.tsx` | ❌ W0 | ⬜ pending |

## Wave 0 Requirements

- [ ] `tests/portfolio-item.test.tsx` — covers PORT-01, PORT-02, PORT-03
- [ ] `tests/work-page.test.tsx` — covers PORT-04

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Touch drag works on mobile | PORT-02 | Requires real device | Drag slider handle on phone |
| Images load optimized (<150KB) | PORT-01 | Requires network inspection | Check DevTools Network tab |

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
