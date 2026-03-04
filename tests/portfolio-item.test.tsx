import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PortfolioItem from "../src/components/work/PortfolioItem";
import type { PortfolioItem as PortfolioItemType } from "../src/content/portfolio";

const confirmedMock: PortfolioItemType = {
  id: "test-client",
  clientName: "Test Client",
  role: "Test Role",
  description: "A test description for the portfolio item.",
  result: "Incredible result achieved.",
  beforeImage: {
    src: "/images/portfolio/test-before.webp",
    alt: "Test client website before migration",
  },
  afterImage: {
    src: "/images/portfolio/test-after.webp",
    alt: "Test client website after migration",
  },
  permissionConfirmed: true,
};

const unconfirmedMock: PortfolioItemType = {
  ...confirmedMock,
  id: "unconfirmed-client",
  clientName: "Unconfirmed Client",
  permissionConfirmed: false,
};

describe("PortfolioItem", () => {
  describe("PORT-01: slider rendering when permission confirmed", () => {
    it("renders ReactCompareSlider when permission confirmed", () => {
      render(<PortfolioItem item={confirmedMock} />);
      expect(screen.getByRole("slider")).toBeTruthy();
    });
  });

  describe("PORT-02: slider accessibility", () => {
    it("slider wrapper has accessible aria-label containing the client name", () => {
      render(<PortfolioItem item={confirmedMock} />);
      // react-compare-slider renders a div[data-rcs="root"] with our custom aria-label
      // The inner button[role="slider"] uses the library's built-in label.
      // We verify our accessible label is present on the slider container.
      expect(
        screen.getByLabelText(/Drag to compare.*Test Client/i)
      ).toBeTruthy();
    });
  });

  describe("PORT-03: metadata display", () => {
    it("displays client name", () => {
      render(<PortfolioItem item={confirmedMock} />);
      expect(screen.getByText(confirmedMock.clientName)).toBeTruthy();
    });

    it("displays role", () => {
      render(<PortfolioItem item={confirmedMock} />);
      expect(screen.getByText(confirmedMock.role)).toBeTruthy();
    });

    it("displays description", () => {
      render(<PortfolioItem item={confirmedMock} />);
      expect(screen.getByText(confirmedMock.description)).toBeTruthy();
    });

    it("displays result", () => {
      render(<PortfolioItem item={confirmedMock} />);
      expect(screen.getByText(confirmedMock.result)).toBeTruthy();
    });
  });

  describe("Placeholder logic", () => {
    it("renders placeholder (no slider) when permission not confirmed", () => {
      render(<PortfolioItem item={unconfirmedMock} />);
      expect(screen.queryByRole("slider")).toBeNull();
    });

    it("renders 'coming soon' text when permission not confirmed", () => {
      render(<PortfolioItem item={unconfirmedMock} />);
      expect(screen.getByText(/coming soon/i)).toBeTruthy();
    });

    it("still shows client name in placeholder", () => {
      render(<PortfolioItem item={unconfirmedMock} />);
      expect(screen.getByText(unconfirmedMock.clientName)).toBeTruthy();
    });
  });
});
