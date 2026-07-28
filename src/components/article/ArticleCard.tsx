import { Article, getArticleAuthor } from "@/data/articles";
import Link from "next/link";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const isFeatured = variant === "featured";
  const author = getArticleAuthor(article);

  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <article className="h-full flex flex-col bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--foreground)] transition-colors duration-200">

        {/* Image — featured only */}
        {isFeatured && (
          <div className="relative overflow-hidden bg-[var(--ivory-dark)] dark:bg-[var(--navy-muted)] aspect-[16/9] w-full">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[var(--border)] font-serif text-4xl select-none">DI</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col flex-1 p-5">
          {/* Category — muted uppercase label, no gold */}
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[var(--muted)] mb-3">
            {article.category}
          </span>

          {/* Title — opacity fade on hover, not a colour jump */}
          <h3 className={`font-serif font-bold text-[var(--foreground)] group-hover:opacity-75 transition-opacity leading-snug line-clamp-3 mb-2 ${isFeatured ? "text-xl" : "text-lg"}`}>
            {article.title}
          </h3>

          {isFeatured && (
            <p className="font-sans text-sm text-[var(--muted)] line-clamp-3 flex-1 mb-4 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between text-[0.7rem] font-sans text-[var(--muted)] pt-3 border-t border-[var(--border)]">
            <span>{author?.name ?? "Unknown"}</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
