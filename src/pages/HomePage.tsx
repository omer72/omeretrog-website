import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import JsonLd from "../components/JsonLd";
import { getTestimonials } from "../content/testimonials";
import { getSteps } from "../content/how-it-works";
import { getServiceSchema } from "../content/schema";
import { useLocale } from "../i18n/LocaleContext";

export default function HomePage() {
  const { t, locale } = useLocale();
  const testimonials = getTestimonials(locale);
  const steps = getSteps(locale);

  return (
    <>
      <title>{t("meta.home.title")}</title>
      <meta
        name="description"
        content={t("meta.home.description")}
      />
      <link rel="canonical" href="https://omer72.github.io/omeretrog-website/" />

      <HeroSection testimonialTeaser={testimonials[0]} />
      <HowItWorksSection steps={steps} />
      <TestimonialsSection testimonials={testimonials} />
      <JsonLd data={getServiceSchema(locale)} />
    </>
  );
}
