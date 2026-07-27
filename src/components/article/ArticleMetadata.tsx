import { Article, getArticleAuthor } from "@/data/articles";
import { articles } from "@/data/articles";
import TagList from "@/components/article/TagList";
import AuthorProfile from "@/components/authors/AuthorProfile";

interface ArticleMetadataProps {
  article: Article;
}

export default function ArticleMetadata({ article }: ArticleMetadataProps) {
  const author = getArticleAuthor(article);
  const articleCount = author
    ? articles.filter((a) => a.authorId === author.id).length
    : undefined;

  return (
    <div className="space-y-6 py-6 border-y border-gray-200 dark:border-slate-700">
      {/* Author */}
      {author ? (
        <AuthorProfile author={author} articleCount={articleCount} variant="compact" />
      ) : (
        <p className="font-semibold text-gray-900 dark:text-white">Unknown author</p>
      )}

      {/* Date + reading time */}
      <div className="text-sm text-gray-500 dark:text-gray-500">
        <time dateTime={article.date}>{article.date}</time>
        {" • "}
        <span>{article.readTime} min read</span>
      </div>

      {/* Tags */}
      <TagList tags={article.tags} />

      {/* Category */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {article.category}
        </span>
      </div>
    </div>
  );
}
