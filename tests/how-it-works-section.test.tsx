import { render, screen } from "@testing-library/react";
import HowItWorksSection from "../src/components/home/HowItWorksSection";
import type { HowItWorksStep } from "../src/content/how-it-works";

const mockSteps: HowItWorksStep[] = [
  { step: 1, title: "Share your site", description: "Send us the link." },
  { step: 2, title: "We migrate it", description: "We move everything." },
  { step: 3, title: "Launch day", description: "Your new site goes live." },
];

describe("HowItWorksSection", () => {
  beforeEach(() => {
    render(<HowItWorksSection steps={mockSteps} />);
  });

  it("renders How It Works heading", () => {
    expect(
      screen.getByRole("heading", { name: /how it works/i }),
    ).toBeInTheDocument();
  });

  it("renders all 3 step titles (HERO-04)", () => {
    expect(screen.getByText("Share your site")).toBeInTheDocument();
    expect(screen.getByText("We migrate it")).toBeInTheDocument();
    expect(screen.getByText("Launch day")).toBeInTheDocument();
  });

  it("renders step numbers", () => {
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
