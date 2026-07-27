import { Metadata } from "next";
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/article/Breadcrumb";
import AuthorCard from "@/components/authors/AuthorCard";
import { authors } from "@/data/authors";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Authors | Development Insights",
  description:
    "Meet the writers behind Development Insights — engineers, architects, and specialists sharing what they know.",
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Authors", href: "/authors" },
];

export default function AuthorsPage() {
  // Compute article counts once — O(n) over articles, keyed by authorId
  const countMap = articles.reduce<Record<string, number>>((acc, article) => {
    acc[article.authorId] = (acc[article.authorId] ?? 0) + 1;
    return acc;
  }, {});

  // Only show authors who have at least one article, sorted by article count desc
  const activeAuthors = authors
    .filter((a) => (countMap[a.id] ?? 0) > 0)
    .sort((a, b) => (countMap[b.id] ?? 0) - (countMap[a.id] ?? 0));

  const totalArticles = articles.length;

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-black border-b border-gray-200 dark:border-slate-800">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Authors
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {activeAuthors.length}{" "}
              {activeAuthors.length === 1 ? "contributor" : "contributors"},{" "}
              {totalArticles}{" "}
              {totalArticles === 1 ? "article" : "articles"} and counting.
            </p>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          {activeAuthors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeAuthors.map((author) => (
                <AuthorCard
                  key={author.id}
                  author={author}
                  articleCount={countMap[author.id] ?? 0}
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-16 text-gray-600 dark:text-gray-400">
              No authors found. Check back soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
