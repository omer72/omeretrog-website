import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendlyEmbed from "../src/components/contact/CalendlyEmbed";

// Mock react-calendly to avoid network requests
vi.mock("react-calendly", () => ({
  InlineWidget: ({ url }: { url: string }) => (
    <div data-testid="calendly-widget" data-url={url} />
  ),
}));

describe("CalendlyEmbed", () => {
  it("renders facade button 'Open Booking Calendar' by default", () => {
    render(<CalendlyEmbed url="https://calendly.com/omeretrog/30min" />);
    expect(screen.getByRole("button", { name: /open booking calendar/i })).toBeInTheDocument();
  });

  it("does NOT render InlineWidget before clicking facade button", () => {
    render(<CalendlyEmbed url="https://calendly.com/omeretrog/30min" />);
    expect(screen.queryByTestId("calendly-widget")).toBeNull();
  });

  it("renders InlineWidget after clicking facade button", () => {
    render(<CalendlyEmbed url="https://calendly.com/omeretrog/30min" />);
    const btn = screen.getByRole("button", { name: /open booking calendar/i });
    fireEvent.click(btn);
    expect(screen.getByTestId("calendly-widget")).toBeInTheDocument();
  });
});
