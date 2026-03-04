import type { HowItWorksStep } from "../../content/how-it-works";
import ScrollReveal from "../ui/ScrollReveal";

interface HowItWorksSectionProps {
  steps: HowItWorksStep[];
}

function StepIcon({ icon }: { icon: HowItWorksStep["icon"] }) {
  const cls = "h-6 w-6 text-accent";
  switch (icon) {
    case "share":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364l1.757 1.757" />
        </svg>
      );
    case "code":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      );
    case "rocket":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      );
  }
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
          {steps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.12}>
              <div className="glass rounded-2xl p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]">
                <StepIcon icon={s.icon} />
                <span className="mt-3 block text-4xl font-bold gradient-text">{s.step}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-text-muted">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
