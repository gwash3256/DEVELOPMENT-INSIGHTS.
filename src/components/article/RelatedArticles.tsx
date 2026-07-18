import ArticleCard from "@/components/article/ArticleCard";
import { articles, Article } from "@/data/articles";
import Link from "next/link";

interface RelatedArticlesProps {
  currentArticle: Article;
}

export default function RelatedArticles({ currentArticle }: RelatedArticlesProps) {
  // Find articles with same category or tags, exclude current
  const related = articles
    .filter((article) => article.id !== currentArticle.id)
    .filter(
      (article) =>
        article.category === currentArticle.category ||
        article.tags.some((tag) => currentArticle.tags.includes(tag))
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-200 dark:border-slate-700">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Related Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {related.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/articles"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
}
