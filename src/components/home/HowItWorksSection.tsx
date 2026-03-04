import type { HowItWorksStep } from "../../content/how-it-works";

interface HowItWorksSectionProps {
  steps: HowItWorksStep[];
}

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-surface-alt py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h2
          id="how-it-works-heading"
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <span className="text-4xl font-bold text-accent">{s.step}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-text-muted">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
