export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between md:px-8">
        {/* Contact */}
        <div className="text-center md:text-left">
          <p className="text-sm text-text-muted">
            <a
              href="mailto:omer@omeretrog.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              omer@omeretrog.com
            </a>
          </p>
        </div>

        {/* Social links */}
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/omeretrog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-hover transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/omeretrog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-hover transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-text-muted">
          &copy; 2026 Omer Etrog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
