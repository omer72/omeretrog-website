import { Link } from "react-router";
import type { Testimonial } from "../../content/testimonials";

interface HeroSectionProps {
  testimonialTeaser: Testimonial;
}

export default function HeroSection({ testimonialTeaser }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32"
    >
      <h1
        id="hero-heading"
        className="text-5xl font-bold leading-tight md:text-6xl"
      >
        Your old site, rebuilt modern{" "}
        <span className="text-accent">in under an hour</span>
      </h1>

      <p className="mt-6 text-lg text-text-muted">
        Outdated Wix site holding you back? Get a blazing-fast, modern website
        with all your content migrated — fully launched in under an hour.
      </p>

      <Link
        to="/contact"
        className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-bg transition-colors hover:bg-accent-hover"
      >
        Get Started
      </Link>

      <blockquote className="mt-10 border-l-2 border-border pl-4">
        <p className="text-sm text-text-muted">"{testimonialTeaser.quote}"</p>
        <footer className="mt-1 text-sm font-medium">
          {testimonialTeaser.clientName}
          {testimonialTeaser.role && (
            <span className="text-text-muted"> — {testimonialTeaser.role}</span>
          )}
        </footer>
      </blockquote>
    </section>
  );
}
