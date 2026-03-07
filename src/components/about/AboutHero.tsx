import ScrollReveal from "../ui/ScrollReveal";
import { useLocale } from "../../i18n/LocaleContext";

export default function AboutHero() {
  const { t } = useLocale();

  const stats = [
    { value: "45min", label: t("about.statMigration") },
    { value: "98", label: t("about.statPageSpeed") },
    { value: "10+", label: t("about.statClients") },
  ];

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
            {t("about.heading")}
          </h1>

          <ScrollReveal>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              {t("about.bio1")}
            </p>

            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              {t("about.bio2")}
            </p>

            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              {t("about.bio3")}
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
