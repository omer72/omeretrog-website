import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactForm from "../src/components/contact/ContactForm";

// Mock @formspree/react — controllable useForm state
const mockUseForm = vi.fn();
vi.mock("@formspree/react", () => ({
  useForm: (...args: unknown[]) => mockUseForm(...args),
  ValidationError: ({ errors, field }: { errors: unknown[]; field: string }) => {
    const err = (errors as Array<{ field: string; message: string }>).find((e) => e.field === field);
    return err ? <span role="alert">{err.message}</span> : null;
  },
}));

// Mock Turnstile — render a hidden input so form tests are not blocked
vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: () => (
    <input type="hidden" name="cf-turnstile-response" data-testid="turnstile-input" />
  ),
}));

function defaultState(overrides = {}) {
  return [
    { submitting: false, succeeded: false, errors: [], ...overrides },
    vi.fn(),
  ];
}

describe("ContactForm", () => {
  beforeEach(() => {
    mockUseForm.mockReturnValue(defaultState());
  });

  it("renders all four labeled fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current site/i)).toBeInTheDocument();
  });

  it("renders honeypot input with correct attributes", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="_gotcha"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot?.getAttribute("aria-hidden")).toBe("true");
    expect(honeypot?.getAttribute("tabindex")).toBe("-1");
  });

  it("renders submit button with 'Send Message' text in default state", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows 'Sending...' and disables submit button while submitting", () => {
    mockUseForm.mockReturnValue(defaultState({ submitting: true }));
    render(<ContactForm />);
    const btn = screen.getByRole("button", { name: /sending/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it("shows success message with role='status' when succeeded", () => {
    mockUseForm.mockReturnValue(defaultState({ succeeded: true }));
    render(<ContactForm />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error alert message when errors are non-empty", () => {
    mockUseForm.mockReturnValue(
      defaultState({ errors: [{ field: "form", message: "Something went wrong." }] })
    );
    render(<ContactForm />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
