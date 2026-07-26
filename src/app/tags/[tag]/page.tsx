import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hash } from "lucide-react";
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/article/Breadcrumb";
import ArticleCard from "@/components/article/ArticleCard";
import { articles } from "@/data/articles";

const ARTICLES_PER_PAGE = 9;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** All unique tags derived from the articles array */
function getAllTags(): string[] {
  const set = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags) {
      set.add(tag);
    }
  }
  return [...set];
}

/** Articles that carry this tag, sorted newest-first */
function getArticlesByTag(tag: string) {
  return articles
    .filter((a) => a.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ---------------------------------------------------------------------------
// Static params — one SSG route per known tag
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    // Next.js will encode this automatically when constructing hrefs;
    // here we supply the raw value so the param matches the decoded lookup.
    tag: encodeURIComponent(tag),
  }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const tagArticles = getArticlesByTag(tag);

  if (tagArticles.length === 0) {
    return { title: "Tag Not Found | Development Insights" };
  }

  return {
    title: `#${tag} | Development Insights`,
    description: `${tagArticles.length} ${tagArticles.length === 1 ? "article" : "articles"} tagged with "${tag}" on Development Insights.`,
    keywords: tag,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function TagPage({ params }: PageProps) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);

  const tagArticles = getArticlesByTag(tag);

  // Unknown tag → 404
  if (!getAllTags().includes(tag)) notFound();

  const totalPages = Math.max(1, Math.ceil(tagArticles.length / ARTICLES_PER_PAGE));
  // Tag pages are SSG — no searchParams, so we always render page 1.
  // If pagination is needed in the future, add a [tag]/page/[page] route.
  const visibleArticles = tagArticles.slice(0, ARTICLES_PER_PAGE);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tags", href: "/tags" },
    { label: `#${tag}`, href: `/tags/${encodeURIComponent(tag)}` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-black border-b border-gray-200 dark:border-slate-800">
        <Container>
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Hash className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            #{tag}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            {tagArticles.length}{" "}
            {tagArticles.length === 1 ? "article" : "articles"} tagged with{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              &ldquo;{tag}&rdquo;
            </span>
          </p>
        </Container>
      </section>

      {/* Article grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          {visibleArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Simple "view more" nudge when articles exceed one page */}
              {totalPages > 1 && (
                <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                  Showing {visibleArticles.length} of {tagArticles.length} articles.{" "}
                  <a
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Search for &ldquo;{tag}&rdquo;
                  </a>{" "}
                  to see all results.
                </p>
              )}
            </>
          ) : (
            // Shouldn't be reached due to the notFound() guard above,
            // but kept as a safety net.
            <div className="text-center py-24">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No articles for this tag
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Try browsing all{" "}
                <a href="/tags" className="text-blue-600 dark:text-blue-400 hover:underline">
                  tags
                </a>{" "}
                or searching instead.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
