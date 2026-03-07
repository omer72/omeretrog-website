import type { Locale } from "../i18n/translations";

export function getServiceSchema(locale: Locale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "he" ? "\u05D4\u05E2\u05D1\u05E8\u05EA \u05D0\u05EA\u05E8\u05D9\u05DD \u05DE\u05D5\u05D3\u05E8\u05E0\u05D9\u05EA" : "Modern Web Migration",
    description:
      locale === "he"
        ? "\u05D4\u05E4\u05DB\u05D5 \u05D0\u05EA \u05D0\u05EA\u05E8 \u05D4\u05D5\u05D9\u05E7\u05E1 \u05D4\u05DE\u05D9\u05D5\u05E9\u05DF \u05DC\u05D0\u05EA\u05E8 \u05DE\u05D4\u05D9\u05E8 \u05D5\u05DE\u05D5\u05D3\u05E8\u05E0\u05D9. \u05D4\u05E2\u05D1\u05E8\u05EA \u05EA\u05D5\u05DB\u05DF \u05DE\u05DC\u05D0\u05D4 \u05EA\u05D5\u05DA \u05E4\u05D7\u05D5\u05EA \u05DE\u05E9\u05E2\u05D4."
        : "Transform your outdated Wix site into a fast, modern website. Full content migration in under an hour.",
    provider: {
      "@type": "Person",
      name: locale === "he" ? "\u05E2\u05D5\u05DE\u05E8 \u05D0\u05EA\u05E8\u05D5\u05D2" : "Omer Etrog",
      url: "https://omer72.github.io/omeretrog-website/",
    },
    serviceType: locale === "he" ? "\u05E4\u05D9\u05EA\u05D5\u05D7 \u05D0\u05EA\u05E8\u05D9\u05DD" : "Web Development",
    url: "https://omer72.github.io/omeretrog-website/",
  };
}
