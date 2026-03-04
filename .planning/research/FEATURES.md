# Feature Research

**Domain:** Premium service business website — web migration service (Wix to modern)
**Researched:** 2026-03-04
**Confidence:** MEDIUM-HIGH

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = site feels amateur or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with bold value proposition | Visitors need to understand the offering in <5 seconds; every service site has one | LOW | Must clearly state: what it does, who it's for, and the speed differentiator (under an hour) |
| Clear CTA above the fold | Users expect a next-step action to be immediately visible | LOW | "Get Started" / "Book a Call" — placed in hero; repeated throughout page |
| Portfolio / work showcase | Visitors won't hire a designer they can't evaluate; this is proof of quality | MEDIUM | Before/after format is especially powerful for a migration service — shows transformation directly |
| Testimonials / social proof | High-trust purchase; strangers need other strangers' validation | LOW | Even 2–3 strong quotes convert; star ratings optional but name + photo required |
| Mobile-responsive design | >60% of web traffic is mobile; broken mobile = immediate bounce | MEDIUM | Dark theme must look intentional on mobile, not accidental |
| Fast page load performance | Users and Google both punish slow sites; a slow web dev site is disqualifying | MEDIUM | Core Web Vitals must pass; images compressed; JS minimal |
| Contact / inquiry form | The conversion goal; users expect a direct way to reach out | LOW | Name, email, message fields at minimum; clear confirmation on submit |
| Navigation with multiple pages | Multi-page sites signal professionalism; single-page feels cheap for a service business | LOW | Home, Work/Portfolio, About, Contact — 4 pages is the standard structure |
| About / who is behind this | Buyers want to know who they're paying; anonymity erodes trust | LOW | Photo, name, short bio, credibility signals |
| SEO basics (meta titles, descriptions, semantic HTML) | Without this, site is invisible to search engines | LOW | Title tags, OG tags, H1 structure; not an afterthought |

---

### Differentiators (Competitive Advantage)

Features that set the site apart from generic freelancer portfolios. Align with the core value prop: speed + quality + dark premium aesthetic.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Interactive before/after slider | Shows transformation viscerally — visitors feel the upgrade rather than read about it | MEDIUM | CSS/JS slider comparing old Wix site screenshot vs. new result; far more compelling than static side-by-side images |
| Speed-focused messaging and proof | "Under an hour" is a genuine differentiator — most migrations take days or weeks | LOW | Quantify the claim visually: timeline graphic or a "how it works in 3 steps" section |
| The site itself as portfolio piece | A dark, premium, fast-loading site is live proof of Omer's work quality | LOW | Site design IS the pitch; this is a differentiator only if executed well |
| Embedded booking calendar (Calendly or Cal.com) | Booking calendars convert 2x better than contact forms alone for service businesses; reduces back-and-forth | LOW | Embed on contact page; low-friction path to a discovery call |
| "How it works" process section | Reduces anxiety by demystifying the migration process; builds confidence in the result | LOW | 3–4 steps: "Send us your site → We migrate → You review → Done in an hour" |
| FAQ with schema markup | Reduces objection friction; FAQ schema gets rich snippets in Google, improving SEO CTR | LOW | 5–8 questions covering: cost, timeline, what happens to SEO, what platforms are supported |
| Results-focused case studies (not just screenshots) | "Client got 40% more leads after migration" is more persuasive than a pretty screenshot | MEDIUM | 1–2 deep case studies: problem, solution, outcome with measurable result |
| Visible pricing or pricing tier guide | Pricing transparency builds trust for service buyers; "contact for quote" creates friction and signals high cost anxiety | LOW | Even a starting-from price or a tiered summary reduces drop-off on contact page |
| Subtle scroll animations (entrance reveals) | Premium dark sites use motion to signal quality; static pages feel flat against competitor dark-theme agencies | MEDIUM | Use sparingly: fade-in on scroll, not parallax. Avoid motion for its own sake |

---

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem like good additions but create real problems for this site's goals.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Blog / content marketing section | "Good for SEO, thought leadership" | Adds ongoing maintenance burden; empty or stale blog signals neglect; not needed to rank for local/service searches at v1 | Add only after initial client base is established and if content strategy is intentional; PROJECT.md already calls this out of scope |
| Client portal / dashboard | "Clients could log in to check project status" | Massive scope creep for a marketing site; requires auth, backend, sessions; not what this site does | Use a shared Notion doc or email for project updates; stay static for v1 |
| Live chat widget | "Reduces friction for visitors wanting instant answers" | Most service buyers don't expect instant responses; chat widgets slow page load and look busy against a clean dark aesthetic | FAQ section handles most objections; contact form + fast reply time is sufficient |
| E-commerce / online payment | "Clients could pay upfront online" | Custom-quoted service doesn't fit a checkout model; adds backend complexity and trust overhead | Invoice via Stripe link after scoping call; no storefront needed |
| Complex portfolio filtering (by tag, industry, etc.) | "Helpful when portfolio grows large" | Over-engineering for v1 with few projects; adds JS complexity; no visitor at this stage needs to filter 5 case studies | Simple grid with hover states; add filtering only when portfolio exceeds 8–10 projects |
| Auto-playing video background in hero | "Makes it feel more dynamic and premium" | Kills page performance; mobile autoplay often blocked; can feel gimmicky vs. genuinely premium | Static dark hero with strong typography and a single subtle animation is more controlled and performant |
| Parallax scrolling effects | "Premium sites use this" | Heavy performance cost, can cause motion sickness, often feels dated; penalized by Core Web Vitals | Use scroll-reveal fade-ins instead; same premium feel, much lighter weight |

---

## Feature Dependencies

```
Hero CTA (Book a Call)
    └──requires──> Contact Page / Booking Embed
                       └──requires──> Calendly or Cal.com account

Portfolio / Before-After Showcase
    └──requires──> Completed client work (screenshots, permission)
    └──requires──> Before/After Slider Component

Case Studies
    └──requires──> Portfolio / Work Showcase
    └──enhances──> Testimonials (link quote to full case study)

FAQ with Schema
    └──enhances──> SEO Basics (schema markup layer)

Visible Pricing
    └──enhances──> Contact Page (reduces drop-off at inquiry step)

Scroll Animations
    └──requires──> JavaScript (lightweight: IntersectionObserver API)
    └──conflicts-with──> Performance Budget (must be capped — not both heavy animations AND fast load)
```

### Dependency Notes

- **Contact Page requires Booking Embed:** The CTA throughout the site points to "book a call" — the contact page must fulfill that promise with a real calendar, not just a form.
- **Case Studies require Portfolio:** You can't have deep case studies without the baseline portfolio section; portfolio is the foundation, case studies are the upgrade.
- **Scroll Animations conflict with Performance Budget:** Both are desirable, but animations must be CSS-first or minimal-JS to avoid failing Core Web Vitals. Can't have elaborate motion effects AND a sub-2s load time without careful engineering.
- **FAQ enhances SEO Basics:** Adding FAQ schema is a low-effort SEO multiplier that requires the baseline meta/semantic HTML work to already be done.

---

## MVP Definition

### Launch With (v1)

Minimum needed to convert a visitor who found the site via search or referral.

- [ ] Hero section with value proposition and CTA — the site's single most important conversion element
- [ ] Before/after portfolio showcase — proof of quality; without this, there is nothing to sell
- [ ] Testimonials (2–3 minimum) — required trust layer for a high-consideration purchase
- [ ] "How it works" process section — reduces anxiety about the migration process
- [ ] Contact page with inquiry form AND embedded booking calendar — dual path for different buyer preferences
- [ ] About section — establishes who Omer is; anonymous freelancers don't get hired
- [ ] Mobile-responsive, fast-loading implementation — non-negotiable table stakes
- [ ] SEO basics (meta, OG tags, semantic HTML) — ensures site is findable

### Add After Validation (v1.x)

Add once first clients have been converted and feedback gathered.

- [ ] FAQ section with schema markup — add when same questions keep appearing in sales calls
- [ ] Visible pricing or starting-from guide — add when drop-off at contact stage is observed
- [ ] Results-focused case studies — add when 1–2 clients consent to sharing measurable outcomes
- [ ] Scroll animations / entrance reveals — polish pass after core content is validated

### Future Consideration (v2+)

Defer until there's a clear business reason to build.

- [ ] Blog / content marketing — only if committing to ongoing content production
- [ ] Portfolio filtering — only when portfolio exceeds 8–10 projects
- [ ] Pricing calculator / interactive quote tool — only if high volume of leads requires automation

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero with value prop + CTA | HIGH | LOW | P1 |
| Before/after portfolio showcase | HIGH | MEDIUM | P1 |
| Testimonials | HIGH | LOW | P1 |
| Contact page + booking calendar | HIGH | LOW | P1 |
| Mobile responsiveness | HIGH | MEDIUM | P1 |
| Performance (Core Web Vitals) | HIGH | MEDIUM | P1 |
| SEO basics | HIGH | LOW | P1 |
| About section | MEDIUM | LOW | P1 |
| "How it works" process section | MEDIUM | LOW | P1 |
| FAQ with schema | MEDIUM | LOW | P2 |
| Visible pricing / starting-from | MEDIUM | LOW | P2 |
| Case studies (deep-dive) | HIGH | MEDIUM | P2 |
| Scroll animations | LOW | MEDIUM | P2 |
| Blog / content section | LOW | HIGH | P3 |
| Portfolio filtering | LOW | MEDIUM | P3 |
| Interactive pricing calculator | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | Generic Freelancer Sites | Design Agency Sites | Recommended Approach |
|---------|--------------------------|---------------------|----------------------|
| Portfolio presentation | Static image grid | Case study format with problem/solution/result | Before/after slider for migration-specific proof; 1–2 deep case studies once client consent obtained |
| Pricing visibility | "Contact for a quote" (common) | Ranges or package tiers | Show a starting-from price or a simple package summary to reduce friction |
| Social proof | Text testimonials only | Video testimonials, logos, case studies | Text testimonials with name and photo for v1; client logos if permission granted |
| Booking mechanism | Contact form only | Embedded calendar (Calendly) | Calendly or Cal.com embedded on contact page; form as fallback |
| Process communication | None or buried FAQ | Prominent "How we work" section | Prominent 3-step process section near hero (critical for a migration service where process is the product) |
| Performance | Often mediocre (heavy WordPress) | Varies widely | Fast-loading static site is itself a trust signal for a web developer |

---

## Sources

- [High-End Website Design: Key Elements — Digital Silk](https://www.digitalsilk.com/digital-trends/high-end-website-design/) — design patterns for premium service sites
- [How to Build a Web Design Portfolio That Converts — Content Snare](https://contentsnare.com/web-design-portfolio/) — client conversion best practices
- [Booking Software vs Forms: Conversion Rates — Booxi](https://www.booxi.com/blog/appointment-scheduling-software-vs-booking-forms) — booking calendar conversion data
- [Pricing Transparency for Service Businesses — PricingLink](https://pricinglink.com/blog/2025-post/transparency-in-pricing-building-client-trust-2025/) — pricing page trust signal research
- [Social Proof on Websites — Orbit Media](https://www.orbitmedia.com/blog/social-proof-web-design/) — placement and format guidance
- [Web Design Trends 2026 — TheeDigital](https://www.theedigital.com/blog/web-design-trends) — current visual and UX patterns
- [Trust Signals in Web Design — Brand Vision](https://www.brandvm.com/post/trust-signals-web-design) — what builds credibility at point of conversion

---
*Feature research for: Omer Etrog — Web Migration Service Website*
*Researched: 2026-03-04*
