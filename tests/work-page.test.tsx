import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkPage from "../src/pages/WorkPage";
import { portfolioItems } from "../src/content/portfolio";

// Mock react-compare-slider to avoid jsdom issues with slider internals at page level.
// Returns a simple div with role="slider" and the aria-label prop forwarded.
vi.mock("react-compare-slider", () => ({
  ReactCompareSlider: ({ "aria-label": ariaLabel }: { "aria-label"?: string }) => (
    <div role="slider" aria-label={ariaLabel ?? "slider"} />
  ),
  ReactCompareSliderImage: ({ alt, src }: { alt?: string; src?: string }) => (
    <img alt={alt} src={src} />
  ),
}));

describe("WorkPage (PORT-04)", () => {
  it("renders correct page heading", () => {
    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1, name: /before.*after/i })).toBeTruthy();
  });

  it("renders a portfolio article for each item", () => {
    render(<WorkPage />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(portfolioItems.length);
  });

  it("displays each client name", () => {
    render(<WorkPage />);
    for (const item of portfolioItems) {
      expect(screen.getByText(item.clientName)).toBeTruthy();
    }
  });

  it("has correct page title", () => {
    render(<WorkPage />);
    // React 19 native title hoisting: check <title> element in the document
    const titleEl = document.querySelector("title");
    expect(titleEl?.textContent).toMatch(/Portfolio/i);
  });
});
