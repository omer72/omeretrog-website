import { getBlogPosts } from "../content/blog-posts";
import BlogPostCard from "../components/blog/BlogPostCard";
import { useLocale } from "../i18n/LocaleContext";

export default function BlogPage() {
  const { t, locale } = useLocale();
  const posts = getBlogPosts(locale);

  return (
    <section aria-labelledby="blog-heading" className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <title>{t("blog.title")}</title>
      <meta name="description" content={t("blog.description")} />
      <link rel="canonical" href="https://omer72.github.io/omeretrog-website/blog" />

      <h1 id="blog-heading" className="text-4xl font-bold md:text-5xl">
        {t("blog.heading")}
      </h1>
      <p className="mt-6 text-lg text-text-muted">
        {t("blog.subtitle")}
      </p>

      <div className="mt-12 grid gap-10">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} locale={locale} readMoreLabel={t("blog.viewOnLinkedIn")} />
        ))}
      </div>
    </section>
  );
}
