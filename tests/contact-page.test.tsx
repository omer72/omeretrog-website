import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ContactPage from "../src/pages/ContactPage";

// Mock @formspree/react — same as contact-form test
const mockUseForm = vi.fn();
vi.mock("@formspree/react", () => ({
  useForm: (...args: unknown[]) => mockUseForm(...args),
  ValidationError: () => null,
}));

// Mock Turnstile
vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: () => (
    <input type="hidden" name="cf-turnstile-response" data-testid="turnstile-input" />
  ),
}));

// Mock react-calendly to avoid network requests
vi.mock("react-calendly", () => ({
  InlineWidget: ({ url }: { url: string }) => (
    <div data-testid="calendly-widget" data-url={url} />
  ),
}));

function defaultState() {
  return [
    { submitting: false, succeeded: false, errors: [] },
    vi.fn(),
  ];
}

describe("ContactPage", () => {
  beforeEach(() => {
    mockUseForm.mockReturnValue(defaultState());
  });

  function renderPage() {
    return render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );
  }

  it("renders h1 'Get Started'", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: /get started/i })).toBeInTheDocument();
  });

  it("renders 'Send a Message' h2", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 2, name: /send a message/i })).toBeInTheDocument();
  });

  it("renders 'Book a Call' h2", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 2, name: /book a call/i })).toBeInTheDocument();
  });

  it("renders all four form input fields by label text", () => {
    renderPage();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current site/i)).toBeInTheDocument();
  });

  it("renders booking calendar facade button", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: /open booking calendar/i })
    ).toBeInTheDocument();
  });
});
