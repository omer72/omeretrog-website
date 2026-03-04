import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import RootLayout from "../src/components/layout/RootLayout";

function renderLayout() {
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
});
