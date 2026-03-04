# Phase 4: Lead Generation, Polish & Launch - Research

**Researched:** 2026-03-04
**Domain:** Contact forms, calendar booking, scroll animations, performance optimization
**Confidence:** HIGH

## Summary

Phase 4 completes the site by adding a working contact form with spam protection, an embedded booking calendar, scroll-triggered entrance animations, and Lighthouse 90+ mobile performance. The project is a Vite + React 19 SPA deployed to Netlify, with Tailwind v4 and vitest already in place.

The two major sub-domains are (1) lead generation via form + calendar and (2) premium polish via the Motion animation library and performance tuning. These are independent and can be planned as separate waves.

For forms, Formspree `@formspree/react` is already decided as the stack (see STATE.md). The `useForm` hook + `ValidationError` component covers success/error states; the `_gotcha` honeypot field covers basic spam; Cloudflare Turnstile (`@marsidev/react-turnstile`) provides the invisible second-defense challenge. For the calendar, `react-calendly` works with React 19 without the peer-dep problems that plague `@calcom/embed-react`. For animations, wrapping the root in `<MotionConfig reducedMotion="user">` is the correct single-site global fix for ANIM-02 — no per-component guard needed. For performance, the biggest risks are third-party embed scripts (Calendly, Turnstile) blocking the main thread and enlarging the bundle; a facade pattern for Calendly and deferred loading for Turnstile mitigates this.

**Primary recommendation:** Use `@formspree/react` (useForm hook) + `_gotcha` honeypot + Cloudflare Turnstile invisible challenge; `react-calendly` InlineWidget for booking; Motion library (`motion` npm package) with `MotionConfig reducedMotion="user"` for animations; React.lazy route splitting and image `fetchpriority="high"` on hero for performance.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LEAD-01 | Contact page with inquiry form (name, email, message, current site URL) | `@formspree/react` `useForm` hook covers all fields; `ValidationError` for per-field errors |
| LEAD-02 | Form submissions delivered to Omer's email reliably (end-to-end verified) | Formspree routes submissions to configured email; requires end-to-end test in production |
| LEAD-03 | Spam protection — honeypot + invisible challenge | `_gotcha` hidden input (Formspree native) + `@marsidev/react-turnstile` invisible mode |
| LEAD-04 | Embedded booking calendar (Calendly or Cal.com) on contact page | `react-calendly` `InlineWidget` — no React 19 issues; Cal.com embed-react has React 19 peer-dep conflicts |
| LEAD-05 | Form shows success/error confirmation states | `state.succeeded` → success message; `state.errors` + `ValidationError` → inline field errors |
| ANIM-01 | Scroll-triggered entrance animations on section reveals | `motion` package `whileInView` prop + `viewport={{ once: true }}` |
| ANIM-02 | All animations respect `prefers-reduced-motion` | `<MotionConfig reducedMotion="user">` in root layout — single global declaration disables transform/layout animations when OS setting is on |
| ANIM-03 | Animations use only `transform` and `opacity` | Use only `y`/`x`/`scale` (transform) and `opacity` as animated values; never animate `height`, `width`, `margin`, `padding` |
| FOUND-05 | Page load scores >=90 on Lighthouse mobile performance | React.lazy route splitting, `loading="eager" fetchpriority="high"` on hero image, Calendly facade pattern |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @formspree/react | ^3.0.0 | React hooks for Formspree form submission | Already in project decisions; React 19 supported as of 2025-03-17 |
| motion | ^12.x | Scroll animations (formerly framer-motion) | Decided in STATE.md; same API as framer-motion, drop-in compatible |
| react-calendly | ^4.x | Calendly InlineWidget React component | No React 19 peer-dep issues; maintained package with typed props |
| @marsidev/react-turnstile | ^1.x | Cloudflare Turnstile CAPTCHA (invisible mode) | Official Cloudflare-endorsed React wrapper; invisible mode requires no user interaction |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| ValidationError (from @formspree/react) | bundled | Per-field validation error display | Use next to each form field to surface Formspree server-side errors |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-calendly | @calcom/embed-react | @calcom/embed-react pins react@^18.2 peer dep; requires --legacy-peer-deps or --force with React 19; react-calendly has no reported issues |
| Cloudflare Turnstile | hCaptcha or reCAPTCHA v3 | Turnstile is privacy-first, no user friction in invisible mode; reCAPTCHA sends data to Google |
| Formspree email delivery | Netlify Forms | Netlify Forms requires hidden static HTML form in index.html for SPA detection — more brittle; Formspree is cleaner for React SPAs |
| motion package | framer-motion | Both point to the same underlying library; `motion` is the new canonical name; `framer-motion` still works as alias |

**Installation:**
```bash
npm install @formspree/react motion react-calendly @marsidev/react-turnstile
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   └── ContactPage.tsx          # Thin composer: imports ContactForm + CalendlyEmbed
├── components/
│   └── contact/
│       ├── ContactForm.tsx       # @formspree/react useForm, honeypot, Turnstile
│       ├── CalendlyEmbed.tsx     # react-calendly InlineWidget wrapper
│       └── CalendlyFacade.tsx    # Static CTA shown before Calendly loads
└── components/
    └── ui/
        └── ScrollReveal.tsx      # Reusable motion.div whileInView wrapper
```

### Pattern 1: Contact Form with Formspree + Honeypot + Turnstile

**What:** `useForm` hook handles submission state; `_gotcha` hidden input silently filters basic bots; Turnstile invisible widget provides machine-learning second defense.

**When to use:** Every form submission requiring email delivery.

**Example:**
```typescript
// Source: https://formspree.io/library/react/ + https://github.com/marsidev/react-turnstile
import { useForm, ValidationError } from "@formspree/react";
import { Turnstile } from "@marsidev/react-turnstile";

export function ContactForm() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");

  if (state.succeeded) {
    return (
      <p role="status">
        Thanks! Omer will be in touch within 24 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot: hidden via CSS opacity, NOT display:none (bots detect display:none) */}
      <input
        type="text"
        name="_gotcha"
        style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" required />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required />
      <ValidationError field="email" prefix="Email" errors={state.errors} />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required />
      <ValidationError field="message" prefix="Message" errors={state.errors} />

      <label htmlFor="currentSite">Current site URL</label>
      <input id="currentSite" type="url" name="currentSite" />

      {/* Invisible Turnstile — renders hidden challenge, injects cf-turnstile-response */}
      <Turnstile
        siteKey="YOUR_TURNSTILE_SITE_KEY"
        options={{ size: "invisible" }}
      />

      <button type="submit" disabled={state.submitting}>
        {state.submitting ? "Sending…" : "Send Message"}
      </button>

      {state.errors && Object.keys(state.errors).length > 0 && (
        <p role="alert" className="text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
```

### Pattern 2: Calendly Facade (Performance-Safe Embed)

**What:** Show a static CTA button initially. Only load the full Calendly script and replace with InlineWidget after user clicks. Prevents ~200 KB of JS from blocking LCP.

**When to use:** Any page where Calendly is "below the fold" or in a secondary tab/section.

**Example:**
```typescript
// Source: https://web.dev/articles/embed-best-practices + https://github.com/tcampb/react-calendly
import { useState } from "react";
import { InlineWidget } from "react-calendly";

export function CalendlyEmbed({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="rounded-lg border border-white/10 p-8 text-center">
        <p className="mb-4 text-text-muted">Prefer to book a time directly?</p>
        <button
          onClick={() => setLoaded(true)}
          className="btn-primary"
        >
          Open Booking Calendar
        </button>
      </div>
    );
  }

  return (
    <InlineWidget
      url={url}
      styles={{ height: "700px" }}
      pageSettings={{ backgroundColor: "111111", textColor: "ffffff", primaryColor: "6366f1" }}
    />
  );
}
```

### Pattern 3: Scroll Reveal Component

**What:** Reusable wrapper that uses `motion.div` with `whileInView` for entrance animations. Must only animate `transform` (y/x/scale) and `opacity` — no layout properties.

**When to use:** Wrap any section reveal. Apply once per section, not per element, to stay under the 10 simultaneous animated elements limit.

**Example:**
```typescript
// Source: https://motion.dev/docs/react-motion-component
import { motion } from "motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern 4: Global Reduced Motion via MotionConfig

**What:** Wrap the root layout in `<MotionConfig reducedMotion="user">`. This single declaration automatically disables transform/layout animations across ALL child motion components when the OS "Reduce Motion" setting is active. Opacity animations continue so content still appears.

**When to use:** Apply once at `RootLayout` level — do not repeat per-component.

**Example:**
```typescript
// Source: https://motion.dev/docs/react-motion-config
// Apply in src/components/layout/RootLayout.tsx
import { MotionConfig } from "motion/react";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* ... rest of layout ... */}
      {children}
    </MotionConfig>
  );
}
```

### Anti-Patterns to Avoid

- **`display: none` on honeypot field:** Sophisticated bots check for `display:none` and skip filling the field. Use `opacity: 0` + `position: absolute` + `pointer-events: none` instead.
- **Animating layout properties:** Never use `height`, `width`, `margin`, `padding`, `top`, `left` in `initial`/`animate`/`whileInView`. These force layout recalculation and will fail ANIM-03. Only `transform` (y, x, scale, rotate) and `opacity`.
- **Loading Calendly unconditionally on page mount:** The Calendly embed is ~200-400 KB JS that blocks the main thread. Always use a facade/click-to-load pattern.
- **Multiple `MotionConfig` declarations:** One at root is sufficient; nesting multiple `MotionConfig` wrappers creates unnecessary React tree overhead.
- **Not wrapping `@marsidev/react-turnstile` in form:** The Turnstile widget auto-injects `cf-turnstile-response` as a hidden input — it must be inside the `<form>` element for it to submit with the form data.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery | Custom serverless function + nodemailer | @formspree/react | Spam filters, rate limiting, retry logic, DKIM/SPF setup — all handled |
| Spam bot detection | Custom header analysis | _gotcha + Turnstile | Bots evolve; Cloudflare ML stays current; honeypot alone is insufficient for AI bots |
| Form success/error state | useState + fetch | useForm from @formspree/react | Handles race conditions, double-submit prevention, server-side validation errors |
| Scroll intersection detection | IntersectionObserver useEffect | motion whileInView | MotionConfig propagates reducedMotion automatically; manual IO doesn't |
| Booking UI | Custom date picker | react-calendly | Calendar availability sync, timezone handling, confirmation emails — solved problems |

**Key insight:** Form handling and calendar booking are deceptively complex back-end coordination problems. The established services (Formspree, Calendly) handle email deliverability, spam, timezone sync, and confirmation workflows that would each take days to replicate correctly.

## Common Pitfalls

### Pitfall 1: Turnstile Token Not Submitted with Form
**What goes wrong:** Form submits but Formspree or server rejects it because `cf-turnstile-response` is missing.
**Why it happens:** `<Turnstile>` component must be rendered inside the `<form>` element — it injects a hidden input. If rendered outside, the token is not in the FormData.
**How to avoid:** Always place `<Turnstile>` as a child of `<form>`, not a sibling.
**Warning signs:** "Missing Turnstile token" errors in Formspree dashboard submissions.

### Pitfall 2: Calendly Script Blocks LCP
**What goes wrong:** Lighthouse mobile score drops below 90 because Calendly's JS bundle delays First Contentful Paint.
**Why it happens:** `react-calendly` loads `https://assets.calendly.com/assets/external/widget.js` on component mount. If InlineWidget is rendered on page load, this script blocks the main thread.
**How to avoid:** Use facade pattern — only render InlineWidget after user interaction. Alternatively, put Calendly in a separate route or below a `React.lazy` boundary.
**Warning signs:** Lighthouse "Reduce the impact of third-party code" audit flagging assets.calendly.com.

### Pitfall 3: Animations Trigger Layout (ANIM-03 Violation)
**What goes wrong:** DevTools shows non-compositor-layer animation; jank on mobile.
**Why it happens:** Using `height: 0 → "auto"`, `opacity + left: -20px → 0`, or Tailwind classes that change layout in animation callbacks.
**How to avoid:** Only pass `y`, `x`, `scale`, `rotate`, `opacity`, `filter` to `initial`/`animate`/`whileInView`. Verify with Chrome DevTools > Performance > Layers panel — animated elements should show a separate compositor layer.
**Warning signs:** Janky scroll on low-end devices; DevTools reports "Avoid non-composited animations."

### Pitfall 4: `prefers-reduced-motion` Not Respected at Root
**What goes wrong:** ANIM-02 fails — OS "Reduce Motion" on, but site still animates.
**Why it happens:** `MotionConfig` `reducedMotion` defaults to `"never"` — it does NOT auto-respect the OS setting unless explicitly set to `"user"`.
**How to avoid:** Set `<MotionConfig reducedMotion="user">` in `RootLayout.tsx`.
**Warning signs:** Toggle "Reduce Motion" in macOS/iOS System Preferences; animations continue playing.

### Pitfall 5: End-to-End Email Delivery Not Verified
**What goes wrong:** LEAD-02 fails in production — submissions arrive on Formspree but email is not delivered.
**Why it happens:** Formspree email routing requires configuration of the destination email in the dashboard. Test submissions in localhost use Formspree test mode which does not deliver email.
**How to avoid:** After deploying to Netlify, submit a real form with real data and verify receipt in inbox (including spam folder). Configure a backup notification (Formspree supports Slack webhook as secondary notification).
**Warning signs:** Formspree dashboard shows "Accepted" but no email received.

### Pitfall 6: @calcom/embed-react React 19 Peer Dep Conflict
**What goes wrong:** `npm install @calcom/embed-react` fails with `ERESOLVE` because it pins `react@^18.2.0`.
**Why it happens:** The package has not updated its peer dependency to support React 19.
**How to avoid:** Use `react-calendly` instead. If Cal.com is required, use `--legacy-peer-deps` and accept the risk, or use the raw iframe embed without a wrapper package.
**Warning signs:** npm install fails with ERESOLVE peer dependency error.

### Pitfall 7: Honeypot Field Filled by Browser Autofill
**What goes wrong:** Legitimate users get silently rejected because Chrome autofills the hidden honeypot.
**Why it happens:** Browsers may autofill hidden fields if they have common names like "name" or "email".
**How to avoid:** Name the honeypot `_gotcha` (Formspree's expected name) and add `autocomplete="off"` + `aria-hidden="true"` + `tabIndex={-1}`. Never give it a name browsers recognize (name, email, phone).
**Warning signs:** Users report submitting the form but never receiving a response.

## Code Examples

Verified patterns from official sources:

### Formspree useForm Full API
```typescript
// Source: https://formspree.io/library/react/
import { useForm, ValidationError } from "@formspree/react";

const [state, handleSubmit] = useForm("FORM_ID");
// state.submitting: boolean — true while request is in flight
// state.succeeded: boolean — true after successful submission
// state.errors:   array   — server-side validation errors per field

// Per-field error display:
<ValidationError field="email" prefix="Email" errors={state.errors} />
// Renders nothing if no error for that field; renders error text if present
```

### Motion whileInView with viewport once
```typescript
// Source: https://motion.dev/docs/react-motion-component (motion package v12)
import { motion } from "motion/react";

<motion.section
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }}
  transition={{ duration: 0.45, ease: "easeOut" }}
>
  {children}
</motion.section>
// viewport.once: true — fires only first time element enters viewport, never replays
// viewport.amount: 0.1 — triggers when 10% of element is visible (good for sections)
```

### MotionConfig Global Reduced Motion
```typescript
// Source: https://motion.dev/docs/react-motion-config
import { MotionConfig } from "motion/react";

// In RootLayout.tsx — wraps entire app
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
// "user" — reads OS prefers-reduced-motion; disables transform/layout animations when set
// "always" — always reduce (useful for testing)
// "never" — default, does not respect OS setting
```

### Turnstile Invisible Mode
```typescript
// Source: https://github.com/marsidev/react-turnstile
import { Turnstile } from "@marsidev/react-turnstile";

// Inside <form> element:
<Turnstile
  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  options={{ size: "invisible" }}
  // No visible widget rendered; auto-executes challenge on page load
  // Injects hidden <input name="cf-turnstile-response"> into parent form
/>
// Token expires after 300 seconds; each token validates once
```

### React.lazy Route Splitting (Performance)
```typescript
// Source: https://react.dev/reference/react/lazy
import { lazy, Suspense } from "react";

const ContactPage = lazy(() => import("./pages/ContactPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));

// In router:
<Route path="/contact" element={
  <Suspense fallback={<div aria-label="Loading..." />}>
    <ContactPage />
  </Suspense>
} />
// Calendly embed only loads when /contact is visited
```

### Hero Image Prioritization (LCP)
```html
<!-- Source: https://web.dev/articles/optimize-lcp -->
<!-- In hero section — ensures hero image does not compete with other resources -->
<img
  src="/hero-image.webp"
  alt="..."
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| framer-motion package | motion package (same API) | Nov 2024 | Import from "motion/react" instead of "framer-motion"; backward compatible |
| MotionConfig per-component reducedMotion | MotionConfig once at root | Motion v10+ | One wrapper handles all children; no per-component guard needed |
| @calcom/embed-react | react-calendly (for React 19 projects) | 2024-ongoing | Cal.com embed has unresolved React 19 peer dep issues |
| reCAPTCHA v2/v3 | Cloudflare Turnstile invisible | 2022-present | No Google data sharing; invisible mode = no user friction |
| Netlify Forms hidden form trick | Formspree @formspree/react useForm | Formspree v3 2025 | Cleaner API; no index.html form scaffolding required |

**Deprecated/outdated:**
- `display: none` on honeypot field: Bots detect it; use `opacity: 0 + position: absolute` instead.
- `useReducedMotion` per-component: Superseded by `MotionConfig reducedMotion="user"` global declaration for most use cases.
- Calendly window.Calendly.initInlineWidget() pattern: Still works but react-calendly InlineWidget is the React-idiomatic way.

## Open Questions

1. **Formspree Form ID availability**
   - What we know: A Formspree form must be created in the dashboard to get a hashid
   - What's unclear: Whether Omer has already created a Formspree form or needs to sign up
   - Recommendation: Wave 0 task — create Formspree account, create form, add `VITE_FORMSPREE_FORM_ID` to Netlify env vars

2. **Turnstile Site Key provisioning**
   - What we know: Cloudflare Turnstile requires domain registration and a site key
   - What's unclear: Whether Omer's Cloudflare account already has Turnstile enabled for omeretrog.com
   - Recommendation: Wave 0 task — register domain in Cloudflare Turnstile dashboard, add `VITE_TURNSTILE_SITE_KEY` to Netlify env vars; use Turnstile test key (1x00000000000000000000AA) during development

3. **Calendly Account URL**
   - What we know: react-calendly InlineWidget requires a Calendly scheduling URL prop
   - What's unclear: Whether Omer has an active Calendly account and what his scheduling URL is
   - Recommendation: Hardcode the URL as a constant in CalendlyEmbed.tsx; get from Omer before shipping

4. **Animation scope for ANIM-01 — which sections**
   - What we know: Requirement says "scroll-triggered entrance animations on section reveals"
   - What's unclear: Which sections get scroll reveal (all? or only home page sections?)
   - Recommendation: Apply ScrollReveal to all major sections on HomePage (HowItWorks, Testimonials), WorkPage (portfolio items), AboutPage (content blocks), and the ContactPage form — reasonable default for a polish pass

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.x + @testing-library/react 16.x |
| Config file | vite.config.ts (test.environment = "jsdom") |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LEAD-01 | ContactPage renders form with all required fields (name, email, message, currentSite) | unit | `npx vitest run tests/contact-page.test.tsx` | Wave 0 |
| LEAD-03 | Honeypot input rendered with `_gotcha` name, opacity 0, aria-hidden, tabIndex -1 | unit | `npx vitest run tests/contact-form.test.tsx` | Wave 0 |
| LEAD-05 | Form renders success state when state.succeeded is true | unit (mock useForm) | `npx vitest run tests/contact-form.test.tsx` | Wave 0 |
| LEAD-05 | Form renders error state when state.errors is non-empty | unit (mock useForm) | `npx vitest run tests/contact-form.test.tsx` | Wave 0 |
| LEAD-04 | CalendlyEmbed renders facade button by default; renders InlineWidget after click | unit | `npx vitest run tests/calendly-embed.test.tsx` | Wave 0 |
| ANIM-01 | ScrollReveal renders children inside a motion.div with whileInView prop | unit | `npx vitest run tests/scroll-reveal.test.tsx` | Wave 0 |
| ANIM-02 | RootLayout wraps children with MotionConfig reducedMotion="user" | unit | `npx vitest run tests/layout.test.tsx` | Exists (update needed) |
| ANIM-03 | ScrollReveal initial/whileInView only uses opacity and y (no layout props) | unit (snapshot or prop assertion) | `npx vitest run tests/scroll-reveal.test.tsx` | Wave 0 |
| LEAD-02 | Email delivery end-to-end: submit real form, email arrives in inbox | manual | — | Manual only — production test |
| FOUND-05 | Lighthouse mobile score >=90 on all pages | manual + CI | `npx lighthouse https://omeretrog.com --preset=mobile` | Manual — requires deployed URL |

### Sampling Rate
- **Per task commit:** `npx vitest run`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green + manual LEAD-02 email delivery verified + Lighthouse 90+ confirmed before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/contact-page.test.tsx` — covers LEAD-01 (ContactPage field presence)
- [ ] `tests/contact-form.test.tsx` — covers LEAD-03, LEAD-05 (ContactForm unit tests with mocked useForm)
- [ ] `tests/calendly-embed.test.tsx` — covers LEAD-04 (facade toggle behavior)
- [ ] `tests/scroll-reveal.test.tsx` — covers ANIM-01, ANIM-03 (ScrollReveal component)
- [ ] `tests/layout.test.tsx` already exists — add assertion that MotionConfig with reducedMotion="user" is rendered (ANIM-02)
- [ ] Env vars: `VITE_FORMSPREE_FORM_ID`, `VITE_TURNSTILE_SITE_KEY` in `.env.local` for development; add to Netlify environment settings for production

## Sources

### Primary (HIGH confidence)
- https://formspree.io/library/react/ — useForm API, state.succeeded, state.errors, ValidationError
- https://github.com/marsidev/react-turnstile — Turnstile React wrapper, invisible mode, siteKey prop
- https://github.com/tcampb/react-calendly — InlineWidget props, react-calendly API
- https://motion.dev/docs/react-motion-config — MotionConfig reducedMotion="user" API
- https://motion.dev/docs/react-motion-component — whileInView, viewport options
- https://web.dev/articles/embed-best-practices — Facade pattern for third-party embeds

### Secondary (MEDIUM confidence)
- https://help.formspree.io/hc/en-us/articles/360013580813-Honeypot-spam-filtering — _gotcha field name, CSS opacity trick
- https://help.calendly.com/hc/en-us/articles/31644195810199 — Official Calendly React embed guide (useEffect pattern)
- https://github.com/calcom/cal.com/issues/20814 — Cal.com React 19 peer dep issue (unresolved)
- https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript — Third-party script performance impact
- https://formspree.io/changelog — Formspree React 19 support added 2025-02-24

### Tertiary (LOW confidence)
- WebSearch results on Lighthouse 90+ for React SPAs — general best practices, not verified against this specific project configuration

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Formspree and react-calendly confirmed from official docs; Motion API confirmed from motion.dev; Turnstile from GitHub
- Architecture: HIGH — Patterns derived from official docs and verified examples
- Pitfalls: HIGH — Honeypot display:none trap confirmed; Cal.com React 19 issue confirmed via GitHub issues; Turnstile-in-form requirement from docs
- Performance: MEDIUM — General Lighthouse/SPA guidance verified; specific Calendly KB numbers are MEDIUM (single source)

**Research date:** 2026-03-04
**Valid until:** 2026-04-03 (Formspree/Motion/react-calendly are stable; Turnstile API stable; re-verify if Cal.com releases React 19 support)
