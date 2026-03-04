import { useForm, ValidationError } from "@formspree/react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactForm() {
  const [state, handleSubmit] = useForm(
    import.meta.env.VITE_FORMSPREE_FORM_ID || "test"
  );

  if (state.succeeded) {
    return (
      <p
        role="status"
        className="rounded-lg bg-green-900/30 p-6 text-center text-green-300"
      >
        Thanks! Omer will be in touch within 24 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot: hidden via CSS, not display:none — bots detect display:none */}
      <input
        type="text"
        name="_gotcha"
        style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-text-muted">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Jane Smith"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="jane@example.com"
        />
        <ValidationError field="email" prefix="Email" errors={state.errors} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Tell Omer about your current site and what you need..."
        />
        <ValidationError
          field="message"
          prefix="Message"
          errors={state.errors}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="currentSite"
          className="text-sm font-medium text-text-muted"
        >
          Current site URL{" "}
          <span className="text-xs text-white/40">(optional)</span>
        </label>
        <input
          id="currentSite"
          type="url"
          name="currentSite"
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="https://yoursite.com"
        />
      </div>

      {/* Turnstile must be inside <form> so the token submits with form data */}
      <Turnstile
        siteKey={
          import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"
        }
        options={{ size: "invisible" }}
      />

      {state.errors && state.errors.length > 0 && (
        <p role="alert" className="text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={state.submitting}
        className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
