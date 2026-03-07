import { useForm, ValidationError } from "@formspree/react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useLocale } from "../../i18n/LocaleContext";

export default function ContactForm() {
  const { t } = useLocale();
  const [state, handleSubmit] = useForm(
    import.meta.env.VITE_FORMSPREE_FORM_ID || "test"
  );

  if (state.succeeded) {
    return (
      <p
        role="status"
        className="rounded-lg bg-green-900/30 p-6 text-center text-green-300"
      >
        {t("contact.success")}
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
          {t("contact.nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={t("contact.namePlaceholder")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-text-muted">
          {t("contact.emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={t("contact.emailPlaceholder")}
        />
        <ValidationError field="email" prefix={t("contact.emailLabel")} errors={state.errors} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-text-muted"
        >
          {t("contact.messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={t("contact.messagePlaceholder")}
        />
        <ValidationError
          field="message"
          prefix={t("contact.messageLabel")}
          errors={state.errors}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="currentSite"
          className="text-sm font-medium text-text-muted"
        >
          {t("contact.siteUrlLabel")}{" "}
          <span className="text-xs text-white/40">{t("contact.siteUrlOptional")}</span>
        </label>
        <input
          id="currentSite"
          type="url"
          name="currentSite"
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={t("contact.siteUrlPlaceholder")}
        />
      </div>

      {/* Turnstile must be inside <form> so the token submits with form data */}
      <Turnstile
        siteKey={
          import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"
        }
        options={{ size: "invisible" }}
      />

      {state.errors && Object.keys(state.errors).length > 0 && (
        <p role="alert" className="text-sm text-red-400">
          {t("contact.error")}
        </p>
      )}

      <button
        type="submit"
        disabled={state.submitting}
        className="gradient-btn rounded-lg px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.submitting ? t("contact.submitting") : t("contact.submit")}
      </button>
    </form>
  );
}
