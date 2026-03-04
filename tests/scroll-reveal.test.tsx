import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock motion/react
vi.mock("motion/react", () => {
  const div = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      initial?: Record<string, unknown>;
      whileInView?: Record<string, unknown>;
      viewport?: Record<string, unknown>;
      transition?: Record<string, unknown>;
    }
  >(function MotionDiv(props, ref) {
    const { initial, whileInView, viewport, transition, children, ...rest } = props;
    return (
      <div
        ref={ref}
        data-initial={JSON.stringify(initial)}
        data-while-in-view={JSON.stringify(whileInView)}
        {...rest}
      >
        {children}
      </div>
    );
  });
  div.displayName = "motion.div";

  return {
    motion: { div },
    MotionConfig: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

import ScrollReveal from "../src/components/ui/ScrollReveal";

describe("ScrollReveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children inside the wrapper", () => {
    render(
      <ScrollReveal>
        <p>Test content</p>
      </ScrollReveal>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("passes className to motion.div", () => {
    const { container } = render(
      <ScrollReveal className="my-custom-class">
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("my-custom-class");
  });

  it("initial prop contains only opacity and y keys (no layout props)", () => {
    const { container } = render(
      <ScrollReveal>
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    const initial = JSON.parse(wrapper.getAttribute("data-initial") || "{}");
    const initialKeys = Object.keys(initial);
    expect(initialKeys).toContain("opacity");
    expect(initialKeys).toContain("y");
    // Must not contain layout properties
    const layoutProps = ["height", "width", "margin", "padding", "top", "left", "right", "bottom"];
    for (const prop of layoutProps) {
      expect(initialKeys).not.toContain(prop);
    }
    // Only opacity and y
    expect(initialKeys).toHaveLength(2);
  });

  it("whileInView prop contains only opacity and y keys (no layout props)", () => {
    const { container } = render(
      <ScrollReveal>
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    const whileInView = JSON.parse(wrapper.getAttribute("data-while-in-view") || "{}");
    const whileInViewKeys = Object.keys(whileInView);
    expect(whileInViewKeys).toContain("opacity");
    expect(whileInViewKeys).toContain("y");
    // Must not contain layout properties
    const layoutProps = ["height", "width", "margin", "padding", "top", "left", "right", "bottom"];
    for (const prop of layoutProps) {
      expect(whileInViewKeys).not.toContain(prop);
    }
    // Only opacity and y
    expect(whileInViewKeys).toHaveLength(2);
  });
});
