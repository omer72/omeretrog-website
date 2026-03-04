export default function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Photo / placeholder */}
        <div>
          {/* TODO: Replace src with "/omer.jpg" when real photo is available */}
          <img
            src="/omer-placeholder.svg"
            alt="Omer Etrog, web migration specialist"
            className="mx-auto w-full max-w-sm rounded-2xl"
          />
        </div>

        {/* Bio content */}
        <div>
          <h1 id="about-heading" className="text-4xl font-bold md:text-5xl">
            About Omer
          </h1>

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
        </div>
      </div>
    </section>
  );
}
