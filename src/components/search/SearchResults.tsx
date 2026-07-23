import { Article } from "@/data/articles";
import Link from "next/link";
import { Clock, Calendar, ImageOff } from "lucide-react";

interface SearchResultsProps {
  results: Article[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  if (query && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No results for &ldquo;{query}&rdquo;
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try different keywords or browse articles by category.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-slate-700" role="list">
      {results.map((article) => (
        <li key={article.id}>
          <Link
            href={`/articles/${article.slug}`}
            className="group flex gap-4 py-5 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50 -mx-4 px-4 rounded-xl"
          >
            {/* Thumbnail */}
            <div className="hidden sm:block shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              {article.image ? (
                <img
                  src={article.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40">
                  <ImageOff className="w-6 h-6" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Category badge */}
              <span className="inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {article.category}
              </span>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                {article.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <time dateTime={article.date}>{article.date}</time>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {article.readTime} min read
                </span>
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {article.tags.length > 4 && (
                    <span className="px-2 py-0.5 text-xs text-gray-400 dark:text-gray-500">
                      +{article.tags.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
