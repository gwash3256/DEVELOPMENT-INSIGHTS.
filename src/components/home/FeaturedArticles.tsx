import Container from "@/components/shared/Container";
import ArticleCard from "@/components/article/ArticleCard";
import { articles } from "@/data/articles";

export default function FeaturedArticles() {
  const featured = articles.filter((article) => article.featured);

  return (
    <section id="featured" className="py-20 md:py-32 bg-white dark:bg-black">
      <Container>
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Hand-picked articles that provide deep insights into modern web development, frameworks, and best practices.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="featured"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
