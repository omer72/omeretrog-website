import ScrollReveal from "../ui/ScrollReveal";

const stats = [
  { value: "45min", label: "Avg Migration" },
  { value: "98", label: "PageSpeed Score" },
  { value: "10+", label: "Happy Clients" },
];

export default function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Photo with glow ring */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="absolute -inset-2 rounded-2xl opacity-50 blur-xl"
              aria-hidden="true"
              style={{
                background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
              }}
            />
            <img
              src={`${import.meta.env.BASE_URL}omer-profile.png`}
              alt="Omer Etrog, web migration specialist"
              className="relative mx-auto w-full max-w-sm rounded-2xl"
            />
          </div>
        </div>

        {/* Bio content */}
        <div>
          <h1 id="about-heading" className="text-4xl font-bold md:text-5xl">
            About Omer
          </h1>

          <ScrollReveal>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              I specialize in migrating outdated Wix sites to modern, blazing-fast
              websites. If your online presence feels stuck in 2015, I turn it into
              something you're proud to share — with a modern codebase, clean
              design, and performance that actually converts visitors.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              Speed is everything. Most migrations are done in under an hour — full
              content transfer, responsive design, and a live URL you can hand to
              anyone. No drawn-out timelines, no back-and-forth that drags on for
              weeks.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              I believe every business deserves a web presence that loads fast,
              looks sharp, and works on every device. That's the standard I hold
              every project to.
            </p>

            {/* Stat counters */}
            <div className="mt-8 flex gap-6">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-xl px-5 py-4 text-center">
                  <span className="block text-2xl font-bold gradient-text">{s.value}</span>
                  <span className="mt-1 block text-xs text-text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
