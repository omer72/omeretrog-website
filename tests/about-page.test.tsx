import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import AboutPage from "../src/pages/AboutPage";

function renderAbout() {
  const router = createMemoryRouter(
    [{ path: "*", element: <AboutPage /> }],
    { initialEntries: ["/about"] }
  );
  return render(<RouterProvider router={router} />);
}

describe("AboutPage (ABOUT-01, ABOUT-02)", () => {
  it("renders h1 containing 'Omer'", () => {
    renderAbout();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Omer/i);
  });

  it("renders body text about expertise with keywords", () => {
    renderAbout();
    const body = document.body.textContent ?? "";
    expect(body).toMatch(/migration|modern web/i);
  });

  it("renders an img element with non-empty alt attribute (ABOUT-02)", () => {
    renderAbout();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt");
    expect(img.getAttribute("alt")).not.toBe("");
  });

  it("renders specific background detail (not generic copy)", () => {
    renderAbout();
    const body = document.body.textContent ?? "";
    expect(body).toMatch(/Wix/i);
    expect(body).toMatch(/under an hour|in under an hour/i);
  });
});
