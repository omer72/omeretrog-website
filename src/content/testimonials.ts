// TODO: replace with real client quotes once permission obtained

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  result: string;
  role?: string;
}

import type { Locale } from "../i18n/translations";

const testimonialsEn: Testimonial[] = [
  {
    id: "liat-leshem",
    quote:
      "I couldn't believe how fast the whole process was. My old Wix site felt like a relic \u2014 now it loads instantly and looks incredible.",
    clientName: "Liat Leshem",
    result: "Full Wix migration + launch in under 45 minutes",
    role: "Photographer",
  },
  {
    id: "bialystok-association",
    quote:
      "We had years of content trapped in an outdated builder. Omer moved everything over and the new site is night and day.",
    clientName: "Bialystok Association",
    result: "200+ pages migrated with zero content loss",
    role: "Non-profit Organization",
  },
  {
    id: "tel-aviv-studio",
    quote:
      "Our Google ranking jumped within weeks of launching the new site. The speed difference alone was worth it.",
    clientName: "Tel Aviv Design Studio",
    result: "PageSpeed score improved from 34 to 98",
    role: "Design Agency",
  },
];

const testimonialsHe: Testimonial[] = [
  {
    id: "liat-leshem",
    quote:
      "\u05DC\u05D0 \u05D4\u05D0\u05DE\u05E0\u05EA\u05D9 \u05DB\u05DE\u05D4 \u05DE\u05D4\u05E8 \u05D4\u05D9\u05D4 \u05DB\u05DC \u05D4\u05EA\u05D4\u05DC\u05D9\u05DA. \u05D0\u05EA\u05E8 \u05D4\u05D5\u05D9\u05E7\u05E1 \u05D4\u05D9\u05E9\u05DF \u05E9\u05DC\u05D9 \u05D4\u05E8\u05D2\u05D9\u05E9 \u05DB\u05DE\u05D5 \u05E9\u05E8\u05D9\u05D3 \u2014 \u05E2\u05DB\u05E9\u05D9\u05D5 \u05D4\u05D5\u05D0 \u05E0\u05D8\u05E2\u05DF \u05D1\u05E8\u05D2\u05E2 \u05D5\u05E0\u05E8\u05D0\u05D4 \u05DE\u05D3\u05D4\u05D9\u05DD.",
    clientName: "\u05DC\u05D9\u05D0\u05EA \u05DC\u05E9\u05DD",
    result: "\u05D4\u05E2\u05D1\u05E8\u05EA \u05D5\u05D9\u05E7\u05E1 \u05DE\u05DC\u05D0\u05D4 + \u05D4\u05E9\u05E7\u05D4 \u05EA\u05D5\u05DA 45 \u05D3\u05E7\u05D5\u05EA",
    role: "\u05E6\u05DC\u05DE\u05EA",
  },
  {
    id: "bialystok-association",
    quote:
      "\u05D4\u05D9\u05D5 \u05DC\u05E0\u05D5 \u05E9\u05E0\u05D9\u05DD \u05E9\u05DC \u05EA\u05D5\u05DB\u05DF \u05DB\u05DC\u05D5\u05D0 \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05D9\u05D5\u05E9\u05E0\u05EA. \u05E2\u05D5\u05DE\u05E8 \u05D4\u05E2\u05D1\u05D9\u05E8 \u05D4\u05DB\u05DC \u05D5\u05D4\u05D0\u05EA\u05E8 \u05D4\u05D7\u05D3\u05E9 \u05D4\u05D5\u05D0 \u05E9\u05DE\u05D9\u05DD \u05D5\u05D0\u05E8\u05E5.",
    clientName: "\u05E2\u05DE\u05D5\u05EA\u05EA \u05D1\u05D9\u05D0\u05DC\u05D9\u05E1\u05D8\u05D5\u05E7",
    result: "200+ \u05D3\u05E4\u05D9\u05DD \u05D4\u05D5\u05E2\u05D1\u05E8\u05D5 \u05DC\u05DC\u05D0 \u05D0\u05D9\u05D1\u05D5\u05D3 \u05EA\u05D5\u05DB\u05DF",
    role: "\u05E2\u05DE\u05D5\u05EA\u05D4",
  },
  {
    id: "tel-aviv-studio",
    quote:
      "\u05D4\u05D3\u05D9\u05E8\u05D5\u05D2 \u05E9\u05DC\u05E0\u05D5 \u05D1\u05D2\u05D5\u05D2\u05DC \u05E7\u05E4\u05E5 \u05EA\u05D5\u05DA \u05E9\u05D1\u05D5\u05E2\u05D5\u05EA \u05DE\u05D4\u05E9\u05E7\u05EA \u05D4\u05D0\u05EA\u05E8 \u05D4\u05D7\u05D3\u05E9. \u05D4\u05E4\u05E8\u05E9 \u05D1\u05DE\u05D4\u05D9\u05E8\u05D5\u05EA \u05DC\u05D1\u05D3\u05D5 \u05D4\u05D9\u05D4 \u05E9\u05D5\u05D5\u05D4.",
    clientName: "\u05E1\u05D8\u05D5\u05D3\u05D9\u05D5 \u05E2\u05D9\u05E6\u05D5\u05D1 \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1",
    result: "\u05E6\u05D9\u05D5\u05DF PageSpeed \u05E2\u05DC\u05D4 \u05DE-34 \u05DC-98",
    role: "\u05E1\u05D5\u05DB\u05E0\u05D5\u05EA \u05E2\u05D9\u05E6\u05D5\u05D1",
  },
];

export const testimonials = testimonialsEn;

export function getTestimonials(locale: Locale): Testimonial[] {
  return locale === "he" ? testimonialsHe : testimonialsEn;
}
