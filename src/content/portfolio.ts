// TODO: set permissionConfirmed to true only after obtaining written client permission

export interface PortfolioItem {
  id: string;
  clientName: string;
  role: string;
  description: string;
  result: string;
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
  permissionConfirmed: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "liat-leshem",
    clientName: "Liat Leshem",
    role: "Photographer",
    description:
      "Full Wix site migration preserving gallery, pricing, and contact pages.",
    result:
      "Launched in under 45 minutes with PageSpeed score jumping from 34 to 96.",
    beforeImage: {
      src: "/images/portfolio/liat-leshem-before.webp",
      alt: "Liat Leshem photography website before migration — original Wix design",
    },
    afterImage: {
      src: "/images/portfolio/liat-leshem-after.webp",
      alt: "Liat Leshem photography website after migration — modern, fast design",
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
