import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HeroSection from "../src/components/home/HeroSection";
import type { Testimonial } from "../src/content/testimonials";

const mockTeaser: Testimonial = {
  id: "test-client",
  quote: "This migration was incredible, my site is so fast now.",
  clientName: "Test Client",
  result: "PageSpeed jumped from 30 to 99",
  role: "Designer",
};

describe("HeroSection", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HeroSection testimonialTeaser={mockTeaser} />
      </MemoryRouter>,
    );
  });

  it("renders h1 with value proposition mentioning modern and under an hour (HERO-01)", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent?.toLowerCase()).toContain("modern");
    expect(heading.textContent?.toLowerCase()).toContain("under an hour");
  });

  it("renders a CTA link to /contact (HERO-02)", () => {
    const link = screen.getByRole("link", { name: /get started/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders testimonial teaser with client name (HERO-03)", () => {
    expect(screen.getByText(/Test Client/)).toBeInTheDocument();
  });
});
