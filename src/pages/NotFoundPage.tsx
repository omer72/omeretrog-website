import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section aria-labelledby="notfound-heading" className="mx-auto max-w-4xl px-4 py-16 md:px-8 text-center">
      <title>Page Not Found | Omer Etrog</title>

      <h1 id="notfound-heading" className="text-4xl font-bold md:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-6 text-lg text-text-muted">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block text-accent hover:text-accent-hover transition-colors font-semibold"
      >
        Back to Home
      </Link>
    </section>
  );
}
