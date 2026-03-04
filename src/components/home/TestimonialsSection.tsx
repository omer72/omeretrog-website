import type { Testimonial } from "../../content/testimonials";
import ScrollReveal from "../ui/ScrollReveal";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section aria-labelledby="testimonials-heading" className="py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h2
          id="testimonials-heading"
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          What Clients Say
        </h2>

        <ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <p className="text-text-muted">"{t.quote}"</p>
              <footer className="mt-4">
                <span className="font-bold">{t.clientName}</span>
                {t.role && (
                  <span className="block text-sm text-text-muted">
                    {t.role}
                  </span>
                )}
                <span className="mt-1 block text-sm text-text-muted">
                  {t.result}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
