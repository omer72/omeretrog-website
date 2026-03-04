import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import React from "react";

// Mock motion/react to capture MotionConfig props
const motionConfigProps: Record<string, unknown>[] = [];
vi.mock("motion/react", () => {
  return {
    MotionConfig: (props: { reducedMotion?: string; children: React.ReactNode }) => {
      motionConfigProps.push({ reducedMotion: props.reducedMotion });
      return <>{props.children}</>;
    },
    motion: {
      div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
        function MotionDiv(props, ref) {
          return <div ref={ref} {...props} />;
        }
      ),
    },
  };
});

import RootLayout from "../src/components/layout/RootLayout";

function renderLayout() {
  motionConfigProps.length = 0; // Reset before each render
  const router = createMemoryRouter(
    [{ element: <RootLayout />, children: [{ path: "*", element: <div>Page Content</div> }] }],
    { initialEntries: ["/"] }
  );
  return render(<RouterProvider router={router} />);
}

describe("RootLayout", () => {
  it("renders navigation", () => {
    renderLayout();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders footer with contentinfo role", () => {
    renderLayout();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders main landmark", () => {
    renderLayout();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders page content inside main via Outlet", () => {
    renderLayout();
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });

  it("wraps content with MotionConfig reducedMotion='user'", () => {
    renderLayout();
    expect(motionConfigProps.length).toBeGreaterThan(0);
    expect(motionConfigProps[0].reducedMotion).toBe("user");
  });
});
