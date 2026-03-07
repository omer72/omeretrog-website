import { getPortfolioItems } from "../content/portfolio";
import PortfolioItem from "../components/work/PortfolioItem";
import { useLocale } from "../i18n/LocaleContext";

export default function WorkPage() {
  const { t, locale } = useLocale();
  const items = getPortfolioItems(locale);

  return (
    <section aria-labelledby="work-heading" className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <title>{t("work.title")}</title>
      <meta
        name="description"
        content={t("work.description")}
      />
      <link rel="canonical" href="https://omer72.github.io/omeretrog-website/work" />

      <h1 id="work-heading" className="text-4xl font-bold md:text-5xl">
        {t("work.heading")}
      </h1>
      <p className="mt-6 text-lg text-text-muted">
        {t("work.subtitle")}
      </p>

      <div className="mt-12 grid gap-16">
        {items.map((item) => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
