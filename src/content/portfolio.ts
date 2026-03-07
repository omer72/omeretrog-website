export interface PortfolioItem {
  id: string;
  clientName: string;
  role: string;
  description: string;
  result: string;
  beforeImage?: { src: string; alt: string };
  afterImage?: { src: string; alt: string };
  image?: { src: string; alt: string };
  liveUrl?: string;
  permissionConfirmed: boolean;
}

const base = import.meta.env.BASE_URL;

import type { Locale } from "../i18n/translations";

const portfolioItemsEn: PortfolioItem[] = [
  {
    id: "appcard-parking",
    clientName: "Smart Parking",
    role: "Parking Management Platform",
    description:
      "Built a premium marketing site for an advanced parking management system \u2014 glassmorphism design, animated sections, and mobile-first responsive layout.",
    result: "98 PageSpeed score, fully responsive premium design",
    image: {
      src: `${base}images/portfolio/appcard-parking.webp`,
      alt: "AppCard Parking \u2014 premium marketing site with glassmorphism design",
    },
    liveUrl: "https://chaniya-appcard.netlify.app/",
    permissionConfirmed: true,
  },
  {
    id: "liat-leshem",
    clientName: "Liat Leshem",
    role: "Voice Artist | Actress | Presenter",
    description:
      "Full Wix site migration preserving demo reels, bio, and contact pages.",
    result:
      "Launched in under 45 minutes with PageSpeed score jumping from 34 to 96.",
    beforeImage: {
      src: `${base}images/portfolio/liat-leshem-before.webp`,
      alt: "Liat Leshem voice artist website before migration \u2014 original Wix design",
    },
    afterImage: {
      src: `${base}images/portfolio/liat-leshem-after.webp`,
      alt: "Liat Leshem voice artist website after migration \u2014 modern, fast design",
    },
    permissionConfirmed: true,
  },
  {
    id: "bialystok-association",
    clientName: "Bialystok Association",
    role: "Non-profit Organization",
    description:
      "200+ pages of historical content migrated from an outdated builder.",
    result: "Modern, accessible site with zero content loss and instant page loads.",
    beforeImage: {
      src: `${base}images/portfolio/bialystok-before.webp`,
      alt: "Bialystok Association website before migration \u2014 outdated builder design",
    },
    afterImage: {
      src: `${base}images/portfolio/bialystok-after.webp`,
      alt: "Bialystok Association website after migration \u2014 clean, accessible modern design",
    },
    permissionConfirmed: true,
  },
];

const portfolioItemsHe: PortfolioItem[] = [
  {
    id: "appcard-parking",
    clientName: "Smart Parking",
    role: "\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05EA \u05E0\u05D9\u05D4\u05D5\u05DC \u05D7\u05E0\u05D9\u05D5\u05DF",
    description:
      "\u05D1\u05E0\u05D9\u05D9\u05EA \u05D0\u05EA\u05E8 \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9 \u05E4\u05E8\u05D9\u05DE\u05D9\u05D5\u05DD \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA \u05E0\u05D9\u05D4\u05D5\u05DC \u05D7\u05E0\u05D9\u05D5\u05DF \u05DE\u05EA\u05E7\u05D3\u05DE\u05EA \u2014 \u05E2\u05D9\u05E6\u05D5\u05D1 glassmorphism, \u05D0\u05E0\u05D9\u05DE\u05E6\u05D9\u05D5\u05EA \u05D5\u05E8\u05E1\u05E4\u05D5\u05E0\u05E1\u05D9\u05D1\u05D9\u05D5\u05EA \u05DE\u05DC\u05D0\u05D4.",
    result: "\u05E6\u05D9\u05D5\u05DF PageSpeed 98, \u05E2\u05D9\u05E6\u05D5\u05D1 \u05E4\u05E8\u05D9\u05DE\u05D9\u05D5\u05DD \u05E8\u05E1\u05E4\u05D5\u05E0\u05E1\u05D9\u05D1\u05D9 \u05DE\u05DC\u05D0",
    image: {
      src: `${base}images/portfolio/appcard-parking.webp`,
      alt: "AppCard Parking \u2014 \u05D0\u05EA\u05E8 \u05E9\u05D9\u05D5\u05D5\u05E7\u05D9 \u05E4\u05E8\u05D9\u05DE\u05D9\u05D5\u05DD \u05E2\u05DD \u05E2\u05D9\u05E6\u05D5\u05D1 glassmorphism",
    },
    liveUrl: "https://chaniya-appcard.netlify.app/",
    permissionConfirmed: true,
  },
  {
    id: "liat-leshem",
    clientName: "\u05DC\u05D9\u05D0\u05EA \u05DC\u05E9\u05DD",
    role: "\u05D0\u05DE\u05E0\u05D9\u05EA \u05E7\u05D5\u05DC | \u05E9\u05D7\u05E7\u05E0\u05D9\u05EA | \u05DE\u05E0\u05D7\u05D4",
    description:
      "\u05D4\u05E2\u05D1\u05E8\u05EA \u05D0\u05EA\u05E8 \u05D5\u05D9\u05E7\u05E1 \u05DE\u05DC\u05D0\u05D4 \u05DB\u05D5\u05DC\u05DC \u05E1\u05E8\u05D8\u05D5\u05E0\u05D9 \u05D4\u05D3\u05D2\u05DE\u05D4, \u05D1\u05D9\u05D5\u05D2\u05E8\u05E4\u05D9\u05D4 \u05D5\u05D3\u05E4\u05D9 \u05E7\u05E9\u05E8.",
    result:
      "\u05D4\u05D5\u05E9\u05E7 \u05EA\u05D5\u05DA 45 \u05D3\u05E7\u05D5\u05EA \u05E2\u05DD \u05E6\u05D9\u05D5\u05DF PageSpeed \u05E9\u05E7\u05E4\u05E5 \u05DE-34 \u05DC-96.",
    beforeImage: {
      src: `${base}images/portfolio/liat-leshem-before.webp`,
      alt: "\u05D0\u05EA\u05E8 \u05DC\u05D9\u05D0\u05EA \u05DC\u05E9\u05DD \u05DC\u05E4\u05E0\u05D9 \u05D4\u05D4\u05E2\u05D1\u05E8\u05D4 \u2014 \u05E2\u05D9\u05E6\u05D5\u05D1 \u05D5\u05D9\u05E7\u05E1 \u05DE\u05E7\u05D5\u05E8\u05D9",
    },
    afterImage: {
      src: `${base}images/portfolio/liat-leshem-after.webp`,
      alt: "\u05D0\u05EA\u05E8 \u05DC\u05D9\u05D0\u05EA \u05DC\u05E9\u05DD \u05D0\u05D7\u05E8\u05D9 \u05D4\u05D4\u05E2\u05D1\u05E8\u05D4 \u2014 \u05E2\u05D9\u05E6\u05D5\u05D1 \u05DE\u05D5\u05D3\u05E8\u05E0\u05D9 \u05D5\u05DE\u05D4\u05D9\u05E8",
    },
    permissionConfirmed: true,
  },
  {
    id: "bialystok-association",
    clientName: "\u05E2\u05DE\u05D5\u05EA\u05EA \u05D1\u05D9\u05D0\u05DC\u05D9\u05E1\u05D8\u05D5\u05E7",
    role: "\u05E2\u05DE\u05D5\u05EA\u05D4",
    description:
      "200+ \u05D3\u05E4\u05D9\u05DD \u05E9\u05DC \u05EA\u05D5\u05DB\u05DF \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9 \u05D4\u05D5\u05E2\u05D1\u05E8\u05D5 \u05DE\u05DE\u05E2\u05E8\u05DB\u05EA \u05DE\u05D9\u05D5\u05E9\u05E0\u05EA.",
    result: "\u05D0\u05EA\u05E8 \u05DE\u05D5\u05D3\u05E8\u05E0\u05D9 \u05D5\u05E0\u05D2\u05D9\u05E9 \u05DC\u05DC\u05D0 \u05D0\u05D9\u05D1\u05D5\u05D3 \u05EA\u05D5\u05DB\u05DF \u05D5\u05E2\u05DD \u05D8\u05E2\u05D9\u05E0\u05D4 \u05DE\u05D9\u05D9\u05D3\u05D9\u05EA.",
    beforeImage: {
      src: `${base}images/portfolio/bialystok-before.webp`,
      alt: "\u05D0\u05EA\u05E8 \u05E2\u05DE\u05D5\u05EA\u05EA \u05D1\u05D9\u05D0\u05DC\u05D9\u05E1\u05D8\u05D5\u05E7 \u05DC\u05E4\u05E0\u05D9 \u05D4\u05D4\u05E2\u05D1\u05E8\u05D4 \u2014 \u05E2\u05D9\u05E6\u05D5\u05D1 \u05DE\u05D9\u05D5\u05E9\u05DF",
    },
    afterImage: {
      src: `${base}images/portfolio/bialystok-after.webp`,
      alt: "\u05D0\u05EA\u05E8 \u05E2\u05DE\u05D5\u05EA\u05EA \u05D1\u05D9\u05D0\u05DC\u05D9\u05E1\u05D8\u05D5\u05E7 \u05D0\u05D7\u05E8\u05D9 \u05D4\u05D4\u05E2\u05D1\u05E8\u05D4 \u2014 \u05E2\u05D9\u05E6\u05D5\u05D1 \u05E0\u05E7\u05D9 \u05D5\u05DE\u05D5\u05D3\u05E8\u05E0\u05D9",
    },
    permissionConfirmed: true,
  },
];

export const portfolioItems = portfolioItemsEn;

export function getPortfolioItems(locale: Locale): PortfolioItem[] {
  return locale === "he" ? portfolioItemsHe : portfolioItemsEn;
}
