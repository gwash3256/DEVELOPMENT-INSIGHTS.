import { Article } from "@/data/articles";

interface ArticleHeaderProps {
  article: Article;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Category Badge */}
      <div className="inline-block">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
        {article.title}
      </h1>

      {/* Excerpt */}
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
        {article.excerpt}
      </p>

      {/* Featured Image */}
      {article.image && (
        <div className="mt-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 h-96 w-full">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
