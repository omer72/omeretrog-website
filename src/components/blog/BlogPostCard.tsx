import ScrollReveal from "../ui/ScrollReveal";
import type { BlogPost } from "../../content/blog-posts";
import type { Locale } from "../../i18n/translations";

interface BlogPostCardProps {
  post: BlogPost;
  locale: Locale;
  readMoreLabel: string;
}

export default function BlogPostCard({ post, locale, readMoreLabel }: BlogPostCardProps) {
  return (
    <ScrollReveal>
      <article className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <time dateTime={post.date} className="text-sm text-text-muted">
          {new Date(post.date).toLocaleDateString(locale === "he" ? "he-IL" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h2 className="mt-3 text-2xl font-bold">{post.title[locale]}</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface-alt px-3 py-0.5 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-5 whitespace-pre-line text-text-muted leading-relaxed">
          {post.body[locale]}
        </p>

        <a
          href={post.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium"
        >
          {readMoreLabel}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </article>
    </ScrollReveal>
  );
}
