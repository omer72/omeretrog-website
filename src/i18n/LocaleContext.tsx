import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import translations, { type Locale } from "./translations";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("locale");
  if (stored === "he" || stored === "en") return stored;
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("locale", locale);
  }, [locale]);

  const t = (key: string): string => translations[locale][key] ?? key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
