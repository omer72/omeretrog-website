---
phase: 4
slug: lead-generation-polish-launch
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.x + @testing-library/react 16.x |
| **Config file** | vite.config.ts (test.environment = "jsdom") |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | LEAD-01 | unit | `npx vitest run tests/contact-page.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | LEAD-03 | unit | `npx vitest run tests/contact-form.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | LEAD-05 | unit | `npx vitest run tests/contact-form.test.tsx` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | LEAD-04 | unit | `npx vitest run tests/calendly-embed.test.tsx` | ❌ W0 | ⬜ pending |
| 04-03-01 | 03 | 2 | ANIM-01 | unit | `npx vitest run tests/scroll-reveal.test.tsx` | ❌ W0 | ⬜ pending |
| 04-03-02 | 03 | 2 | ANIM-02 | unit | `npx vitest run tests/layout.test.tsx` | ✅ (update) | ⬜ pending |
| 04-03-03 | 03 | 2 | ANIM-03 | unit | `npx vitest run tests/scroll-reveal.test.tsx` | ❌ W0 | ⬜ pending |
| 04-04-01 | 04 | 3 | LEAD-02 | manual | — | Manual only | ⬜ pending |
| 04-04-02 | 04 | 3 | FOUND-05 | manual + CI | `npx lighthouse` | Manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/contact-page.test.tsx` — stubs for LEAD-01 (ContactPage field presence)
- [ ] `tests/contact-form.test.tsx` — stubs for LEAD-03, LEAD-05 (honeypot, success/error states)
- [ ] `tests/calendly-embed.test.tsx` — stubs for LEAD-04 (facade toggle behavior)
- [ ] `tests/scroll-reveal.test.tsx` — stubs for ANIM-01, ANIM-03 (ScrollReveal component)
- [ ] `tests/layout.test.tsx` — add assertion for MotionConfig reducedMotion="user" (ANIM-02)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Email delivery end-to-end | LEAD-02 | Requires real Formspree submission + inbox check | Submit form on deployed site, verify email arrives within 2 min |
| Lighthouse mobile score >=90 | FOUND-05 | Requires deployed URL + real browser audit | Run `npx lighthouse <url> --preset=mobile`, check Performance score |
| Spam honeypot silently fails | LEAD-03 | Requires real Formspree endpoint behavior | Fill honeypot field, submit, verify no error shown and no email delivered |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
