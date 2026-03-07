import type { Testimonial } from "../../content/testimonials";
import ScrollReveal from "../ui/ScrollReveal";
import { useLocale } from "../../i18n/LocaleContext";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

/** Extract leading number/metric from result string (e.g. "200+" from "200+ pages migrated...") */
function parseMetric(result: string): { metric: string; rest: string } | null {
  const match = result.match(/^([\d,]+\+?%?)\s+(.+)$/);
  if (match) return { metric: match[1], rest: match[2] };
  // Try "PageSpeed score improved from 34 to 98" pattern
  const scoreMatch = result.match(/(\d+)\s+to\s+(\d+)/);
  if (scoreMatch) return { metric: `${scoreMatch[1]} \u2192 ${scoreMatch[2]}`, rest: result.replace(scoreMatch[0], "").trim() };
  return null;
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const { t } = useLocale();
  return (
    <section aria-labelledby="testimonials-heading" className="py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h2
          id="testimonials-heading"
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          {t("testimonials.heading")}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => {
            const parsed = parseMetric(item.result);
            return (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <blockquote className="glass rounded-2xl p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]">
                  {/* Decorative quote mark */}
                  <span className="block text-5xl leading-none text-white/10 select-none" aria-hidden="true">"</span>

                  {/* Highlighted metric */}
                  {parsed && (
                    <p className="mb-3 text-2xl font-bold gradient-text">{parsed.metric}</p>
                  )}

                  <p className="text-text-muted">"{item.quote}"</p>
                  <footer className="mt-4">
                    <span className="font-bold">{item.clientName}</span>
                    {item.role && (
                      <span className="block text-sm text-text-muted">
                        {item.role}
                      </span>
                    )}
                    <span className="mt-1 block text-sm text-accent">
                      {item.result}
                    </span>
                  </footer>
                </blockquote>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
