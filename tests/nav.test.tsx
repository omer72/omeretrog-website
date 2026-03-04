import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import RootLayout from "../src/components/layout/RootLayout";

function renderWithRouter(initialEntry = "/") {
  const router = createMemoryRouter(
    [{ element: <RootLayout />, children: [{ path: "*", element: <div>Test</div> }] }],
    { initialEntries: [initialEntry] }
  );
  return render(<RouterProvider router={router} />);
}

describe("Nav", () => {
  it("renders links to all 4 pages", () => {
    renderWithRouter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/work");
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/contact");
  });

  it("has main navigation aria-label", () => {
    renderWithRouter();
    expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
  });
});
