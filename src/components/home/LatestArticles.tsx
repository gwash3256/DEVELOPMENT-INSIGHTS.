import Container from "@/components/shared/Container";
import ArticleCard from "@/components/article/ArticleCard";
import { articles } from "@/data/articles";

export default function LatestArticles() {
  const latest = articles.slice().reverse().slice(0, 6);

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-black">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Stay up to date with the newest content from our community of developers.
            </p>
          </div>
          <a
            href="/articles"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors whitespace-nowrap"
          >
            View All Articles
          </a>
        </div>

        {/* Latest Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
