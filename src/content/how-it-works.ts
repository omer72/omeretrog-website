export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: "share" | "code" | "rocket";
}

import type { Locale } from "../i18n/translations";

const stepsEn: HowItWorksStep[] = [
  {
    step: 1,
    title: "Share your current site",
    description:
      "Send me the link to your existing Wix site. I'll review the content, structure, and design to plan the migration.",
    icon: "share",
  },
  {
    step: 2,
    title: "We migrate everything",
    description:
      "I transfer all your content \u2014 text, images, pages \u2014 into a fast, modern codebase built with current best practices.",
    icon: "code",
  },
  {
    step: 3,
    title: "Launch your new site",
    description:
      "Your brand-new site goes live on a blazing-fast host. Same content, dramatically better performance and design.",
    icon: "rocket",
  },
];

const stepsHe: HowItWorksStep[] = [
  {
    step: 1,
    title: "\u05E9\u05EA\u05E4\u05D5 \u05D0\u05EA \u05D4\u05D0\u05EA\u05E8 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9",
    description:
      "\u05E9\u05DC\u05D7\u05D5 \u05DC\u05D9 \u05D0\u05EA \u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D0\u05EA\u05E8 \u05D4\u05D5\u05D9\u05E7\u05E1 \u05E9\u05DC\u05DB\u05DD. \u05D0\u05E1\u05E7\u05D5\u05E8 \u05D0\u05EA \u05D4\u05EA\u05D5\u05DB\u05DF, \u05D4\u05DE\u05D1\u05E0\u05D4 \u05D5\u05D4\u05E2\u05D9\u05E6\u05D5\u05D1 \u05DC\u05EA\u05DB\u05E0\u05D5\u05DF \u05D4\u05D4\u05E2\u05D1\u05E8\u05D4.",
    icon: "share",
  },
  {
    step: 2,
    title: "\u05D0\u05E0\u05D7\u05E0\u05D5 \u05DE\u05E2\u05D1\u05D9\u05E8\u05D9\u05DD \u05D4\u05DB\u05DC",
    description:
      "\u05D0\u05E0\u05D9 \u05DE\u05E2\u05D1\u05D9\u05E8 \u05D0\u05EA \u05DB\u05DC \u05D4\u05EA\u05D5\u05DB\u05DF \u05E9\u05DC\u05DB\u05DD \u2014 \u05D8\u05E7\u05E1\u05D8, \u05EA\u05DE\u05D5\u05E0\u05D5\u05EA, \u05D3\u05E4\u05D9\u05DD \u2014 \u05DC\u05E7\u05D5\u05D3 \u05DE\u05D4\u05D9\u05E8 \u05D5\u05DE\u05D5\u05D3\u05E8\u05E0\u05D9 \u05D4\u05D1\u05E0\u05D5\u05D9 \u05DC\u05E4\u05D9 \u05D4\u05E1\u05D8\u05E0\u05D3\u05E8\u05D8\u05D9\u05DD \u05D4\u05E2\u05D3\u05DB\u05E0\u05D9\u05D9\u05DD \u05D1\u05D9\u05D5\u05EA\u05E8.",
    icon: "code",
  },
  {
    step: 3,
    title: "\u05DE\u05E9\u05D9\u05E7\u05D9\u05DD \u05D0\u05EA \u05D4\u05D0\u05EA\u05E8 \u05D4\u05D7\u05D3\u05E9",
    description:
      "\u05D4\u05D0\u05EA\u05E8 \u05D4\u05D7\u05D3\u05E9 \u05E9\u05DC\u05DB\u05DD \u05E2\u05D5\u05DC\u05D4 \u05DC\u05D0\u05D5\u05D5\u05D9\u05E8 \u05E2\u05DC \u05D0\u05D7\u05E1\u05D5\u05DF \u05DE\u05D4\u05D9\u05E8. \u05D0\u05D5\u05EA\u05D5 \u05EA\u05D5\u05DB\u05DF, \u05D1\u05D9\u05E6\u05D5\u05E2\u05D9\u05DD \u05D5\u05E2\u05D9\u05E6\u05D5\u05D1 \u05D8\u05D5\u05D1\u05D9\u05DD \u05D1\u05DE\u05D9\u05D5\u05D7\u05D3 \u05D9\u05D5\u05EA\u05E8.",
    icon: "rocket",
  },
];

export const steps = stepsEn;

export function getSteps(locale: Locale): HowItWorksStep[] {
  return locale === "he" ? stepsHe : stepsEn;
}
