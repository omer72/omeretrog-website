import { useState } from "react";
import { NavLink, Link } from "react-router";
import { useLocale } from "../../i18n/LocaleContext";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();

  const navLinks = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/work", label: t("nav.work") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive
        ? "text-accent font-semibold"
        : "text-text-muted hover:text-accent-hover"
    }`;

  const toggleLocale = () => setLocale(locale === "en" ? "he" : "en");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-lg font-bold gradient-text">
          Omer Etrog
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-8">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={linkClasses}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggleLocale}
            className="text-sm text-text-muted hover:text-accent-hover transition-colors"
          >
            {t("lang.switch")}
          </button>
          <Link
            to="/contact"
            className="gradient-btn rounded-full px-4 py-1.5 text-sm font-semibold text-white"
          >
            {t("nav.bookACall")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-text p-2"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">{isOpen ? t("nav.closeMenu") : t("nav.openMenu")}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <ul id="mobile-menu" className="border-t border-border bg-bg px-4 pb-4 md:hidden">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <span className="block py-2">{label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => { toggleLocale(); setIsOpen(false); }}
              className="block py-2 text-sm text-text-muted hover:text-accent-hover transition-colors"
            >
              {t("lang.switch")}
            </button>
          </li>
          <li>
            <Link
              to="/contact"
              className="mt-2 inline-block gradient-btn rounded-full px-4 py-1.5 text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.bookACall")}
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
