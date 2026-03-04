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

export const portfolioItems: PortfolioItem[] = [
  {
    id: "appcard-parking",
    clientName: "AppCard Parking",
    role: "Parking Management Platform",
    description:
      "Built a premium marketing site for an advanced parking management system — glassmorphism design, animated sections, and mobile-first responsive layout.",
    result: "98 PageSpeed score, fully responsive premium design",
    image: {
      src: "/images/portfolio/appcard-parking.webp",
      alt: "AppCard Parking — premium marketing site with glassmorphism design",
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
      src: "/images/portfolio/liat-leshem-before.webp",
      alt: "Liat Leshem voice artist website before migration — original Wix design",
    },
    afterImage: {
      src: "/images/portfolio/liat-leshem-after.webp",
      alt: "Liat Leshem voice artist website after migration — modern, fast design",
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
      src: "/images/portfolio/bialystok-before.webp",
      alt: "Bialystok Association website before migration — outdated builder design",
    },
    afterImage: {
      src: "/images/portfolio/bialystok-after.webp",
      alt: "Bialystok Association website after migration — clean, accessible modern design",
    },
    permissionConfirmed: true,
  },
];
