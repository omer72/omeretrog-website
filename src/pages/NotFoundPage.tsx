import { Link } from "react-router";
import { useLocale } from "../i18n/LocaleContext";

export default function NotFoundPage() {
  const { t } = useLocale();
  return (
    <section aria-labelledby="notfound-heading" className="mx-auto max-w-4xl px-4 py-16 md:px-8 text-center">
      <title>{t("notFound.title")}</title>

      <h1 id="notfound-heading" className="text-4xl font-bold md:text-5xl">
        {t("notFound.heading")}
      </h1>
      <p className="mt-6 text-lg text-text-muted">
        {t("notFound.message")}
      </p>
      <Link
        to="/"
        className="mt-8 inline-block text-accent hover:text-accent-hover transition-colors font-semibold"
      >
        {t("notFound.backHome")}
      </Link>
    </section>
  );
}
