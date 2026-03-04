export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: "share" | "code" | "rocket";
}

export const steps: HowItWorksStep[] = [
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
      "I transfer all your content — text, images, pages — into a fast, modern codebase built with current best practices.",
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
