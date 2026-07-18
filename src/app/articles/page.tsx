import Container from "@/components/shared/Container";
import ArticleCard from "@/components/article/ArticleCard";
import { articles } from "@/data/articles";

export const metadata = {
  title: "Articles | Development Insights",
  description: "Explore our collection of in-depth technical articles and tutorials.",
};

export default function ArticlesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-black">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              All Articles
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore our comprehensive collection of technical articles, tutorials, and insights on web development, databases, DevOps, and more.
            </p>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
