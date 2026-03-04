import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomePage from "../src/pages/HomePage";

describe("HomePage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  });

  it("renders hero h1 with value proposition", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent?.toLowerCase()).toContain("modern");
  });

  it("renders How It Works heading", () => {
    expect(
      screen.getByRole("heading", { name: /how it works/i }),
    ).toBeInTheDocument();
  });

  it("renders TestimonialsSection with real client name (TEST-03)", () => {
    const matches = screen.getAllByText("Liat Leshem");
    expect(matches.length).toBeGreaterThanOrEqual(1);
    // Testimonials section heading confirms the section is rendered
    expect(
      screen.getByRole("heading", { name: /what clients say/i }),
    ).toBeInTheDocument();
  });

  it("renders JSON-LD script tag (SEO-03)", () => {
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    expect(script!.textContent).toContain("Modern Web Migration");
  });
});
