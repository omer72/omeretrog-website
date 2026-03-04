import { render, screen } from "@testing-library/react";
import TestimonialsSection from "../src/components/home/TestimonialsSection";
import type { Testimonial } from "../src/content/testimonials";

const mockTestimonials: Testimonial[] = [
  {
    id: "client-a",
    quote: "Amazing speed improvement on our website.",
    clientName: "Alice Johnson",
    result: "PageSpeed went from 40 to 95",
    role: "CEO",
  },
  {
    id: "client-b",
    quote: "The migration was seamless and fast.",
    clientName: "Bob Smith",
    result: "Launched in 30 minutes flat",
  },
];

describe("TestimonialsSection", () => {
  beforeEach(() => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
  });

  it("renders all testimonial quotes (TEST-01)", () => {
    expect(
      screen.getByText(/Amazing speed improvement/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/migration was seamless/),
    ).toBeInTheDocument();
  });

  it("renders client names (TEST-02)", () => {
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("renders result for each testimonial (TEST-02)", () => {
    expect(screen.getByText("PageSpeed went from 40 to 95")).toBeInTheDocument();
    expect(screen.getByText("Launched in 30 minutes flat")).toBeInTheDocument();
  });
});
