import { Link } from "react-router";
import type { Testimonial } from "../../content/testimonials";

interface HeroSectionProps {
  testimonialTeaser: Testimonial;
}

export default function HeroSection({ testimonialTeaser }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Gradient background orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4"
        aria-hidden="true"
        style={{
          width: "800px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(99,140,255,0.15) 0%, rgba(140,80,255,0.08) 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
        {/* Badge pill */}
        <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm">
          Web Migration Specialist
        </span>

        <h1
          id="hero-heading"
          className="text-5xl font-bold leading-tight md:text-6xl"
        >
          Your old site, rebuilt modern{" "}
          <span className="gradient-text">in under an hour</span>
        </h1>

        <p className="mt-6 text-lg text-text-muted">
          Outdated Wix site holding you back? Get a blazing-fast, modern website
          with all your content migrated — fully launched in under an hour.
        </p>

        <Link
          to="/contact"
          className="gradient-btn mt-8 inline-block rounded-lg px-6 py-3 font-semibold text-white"
        >
          Get Started
        </Link>

        {/* Glass testimonial teaser */}
        <blockquote className="glass mt-10 rounded-xl p-5">
          <p className="text-sm text-text-muted">"{testimonialTeaser.quote}"</p>
          <footer className="mt-2 text-sm font-medium">
            {testimonialTeaser.clientName}
            {testimonialTeaser.role && (
              <span className="text-text-muted"> — {testimonialTeaser.role}</span>
            )}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
