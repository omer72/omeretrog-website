import { useState } from "react";
import { NavLink, Link } from "react-router";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive
        ? "text-accent font-semibold"
        : "text-text-muted hover:text-accent-hover"
    }`;

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
          <Link
            to="/contact"
            className="gradient-btn rounded-full px-4 py-1.5 text-sm font-semibold text-white"
          >
            Book a Call
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
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
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
            <Link
              to="/contact"
              className="mt-2 inline-block gradient-btn rounded-full px-4 py-1.5 text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Book a Call
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
