// TODO: replace with real client quotes once permission obtained

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  result: string;
  role?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "liat-leshem",
    quote:
      "I couldn't believe how fast the whole process was. My old Wix site felt like a relic — now it loads instantly and looks incredible.",
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
