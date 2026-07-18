import { Article } from "@/data/articles";
import TagList from "@/components/article/TagList";

interface ArticleMetadataProps {
  article: Article;
}

export default function ArticleMetadata({ article }: ArticleMetadataProps) {
  return (
    <div className="space-y-6 py-6 border-y border-gray-200 dark:border-slate-700">
      {/* Author and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">
            {article.author}
          </p>
          {article.authorBio && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {article.authorBio}
            </p>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap">
          <time dateTime={article.date}>{article.date}</time>
          {" • "}
          <span>{article.readTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      <TagList tags={article.tags} />

      {/* Category and Share */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {article.category}
        </span>
      </div>
    </div>
  );
}
