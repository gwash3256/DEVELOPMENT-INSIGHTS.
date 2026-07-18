import { Article } from "@/data/articles";
import Link from "next/link";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured";
}

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Link href={`/articles/${article.id}`}>
      <article
        className={`
          group h-full rounded-lg overflow-hidden border transition-all duration-300
          ${
            isFeatured
              ? "border-gray-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-blue-900/20 bg-white dark:bg-slate-800"
              : "border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md"
          }
          dark:bg-slate-900 bg-white
        `}
      >
        {/* Image Section */}
        {isFeatured && (
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 h-48 w-full">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className={`p-5 ${isFeatured ? "" : "flex flex-col"}`}>
          {/* Category Badge */}
          <span className="inline-block w-fit mb-3 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {article.category}
          </span>

          {/* Title */}
          <h3
            className={`
              font-bold text-gray-900 dark:text-white
              group-hover:text-blue-600 dark:group-hover:text-blue-400
              transition-colors duration-300 line-clamp-2
              ${isFeatured ? "text-xl mb-2" : "text-lg mb-2"}
            `}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p
            className={`
              text-gray-600 dark:text-gray-400 text-sm
              line-clamp-2 mb-4 flex-1
              ${isFeatured ? "line-clamp-3" : ""}
            `}
          >
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-3 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
            <span className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">
              {article.readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
