import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import RootLayout from "../src/components/layout/RootLayout";
import HomePage from "../src/pages/HomePage";
import WorkPage from "../src/pages/WorkPage";
import AboutPage from "../src/pages/AboutPage";
import ContactPage from "../src/pages/ContactPage";

const pages = [
  { path: "/", element: <HomePage />, name: "Home" },
  { path: "/work", element: <WorkPage />, name: "Work" },
  { path: "/about", element: <AboutPage />, name: "About" },
  { path: "/contact", element: <ContactPage />, name: "Contact" },
];

function renderPage(path: string) {
  const routes = pages.map((p) => ({ path: p.path, element: p.element }));
  const router = createMemoryRouter(
    [{ element: <RootLayout />, children: routes }],
    { initialEntries: [path] }
  );
  return render(<RouterProvider router={router} />);
}

describe("SEO — per-page metadata", () => {
  pages.forEach(({ path, name }) => {
    describe(name, () => {
      it("has exactly one h1", () => {
        const { container } = renderPage(path);
        const h1s = container.querySelectorAll("h1");
        expect(h1s.length).toBe(1);
      });
    });
  });
});

describe("SEO — semantic landmarks", () => {
  it("every page has a section with aria-labelledby", () => {
    pages.forEach(({ path }) => {
      const { container } = renderPage(path);
      const sections = container.querySelectorAll("section[aria-labelledby]");
      expect(sections.length).toBeGreaterThanOrEqual(1);
    });
  });
});
