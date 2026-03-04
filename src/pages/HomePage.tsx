import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import JsonLd from "../components/JsonLd";
import { testimonials } from "../content/testimonials";
import { steps } from "../content/how-it-works";
import { serviceSchema } from "../content/schema";

export default function HomePage() {
  return (
    <>
      <title>Omer Etrog | Modern Web Migration in Under an Hour</title>
      <meta
        name="description"
        content="Transform your outdated Wix site into a fast, modern website. Full content migration in under an hour. See real before & after results."
      />
      <link rel="canonical" href="https://omeretrog.com/" />

      <HeroSection testimonialTeaser={testimonials[0]} />
      <HowItWorksSection steps={steps} />
      <TestimonialsSection testimonials={testimonials} />
      <JsonLd data={serviceSchema} />
    </>
  );
}
