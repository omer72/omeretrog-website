import { useState } from "react";
import { InlineWidget } from "react-calendly";
import { useLocale } from "../../i18n/LocaleContext";

interface CalendlyEmbedProps {
  url: string;
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const { t } = useLocale();

  if (!loaded) {
    return (
      <div className="rounded-lg border border-white/10 p-8 text-center">
        <p className="mb-4 text-text-muted">{t("contact.preferBook")}</p>
        <button
          onClick={() => setLoaded(true)}
          className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent/90"
        >
          {t("contact.openCalendar")}
        </button>
      </div>
    );
  }

  return (
    <InlineWidget
      url={url}
      styles={{ height: "700px" }}
      pageSettings={{
        backgroundColor: "111111",
        textColor: "ffffff",
        primaryColor: "6366f1",
      }}
    />
  );
}
