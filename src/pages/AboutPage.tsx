import AboutHero from "../components/about/AboutHero";
import { useLocale } from "../i18n/LocaleContext";

export default function AboutPage() {
  const { t } = useLocale();
  return (
    <>
      <title>{t("about.title")}</title>
      <meta
        name="description"
        content={t("about.description")}
      />
      <link rel="canonical" href="https://omer72.github.io/omeretrog-website/about" />
      <AboutHero />
    </>
  );
}
