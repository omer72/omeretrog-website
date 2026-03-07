import ContactForm from "../components/contact/ContactForm";
import CalendlyEmbed from "../components/contact/CalendlyEmbed";
import { useLocale } from "../i18n/LocaleContext";

export default function ContactPage() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="contact-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:px-8"
    >
      <title>{t("contact.title")}</title>
      <meta
        name="description"
        content={t("contact.description")}
      />
      <link rel="canonical" href="https://omer72.github.io/omeretrog-website/contact" />

      <h1
        id="contact-heading"
        className="text-4xl font-bold md:text-5xl"
      >
        {t("contact.heading")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-text-muted">
        {t("contact.subtitle")}
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-accent">{t("contact.sendMessage")}</h2>
          <ContactForm />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-accent">{t("contact.bookACall")}</h2>
          <CalendlyEmbed url="https://calendly.com/omer72/30min" />
        </div>
      </div>
    </section>
  );
}
