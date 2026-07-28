import Link from "next/link";
import { Article, getArticleAuthor } from "@/data/articles";
import Container from "@/components/shared/Container";

interface SectionStripProps {
  label: string;
  articles: Article[];
  seeAllHref?: string;
}

export default function SectionStrip({ label, articles, seeAllHref }: SectionStripProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-12 md:py-14 border-b border-[var(--border)]">
      <Container>
        {/* Section header — gold short rule, muted uppercase label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 bg-[var(--gold-dark)] dark:bg-[var(--gold)] shrink-0" aria-hidden="true" />
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[var(--muted)]">
            {label}
          </span>
          <span className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="font-sans text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap"
            >
              All →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          {articles.slice(0, 3).map((article, idx) => {
            const author = getArticleAuthor(article);
            const isFirst = idx === 0;

            return (
              <div key={article.id} className="md:px-6 first:pl-0 last:pr-0 py-5 md:py-0">
                <Link href={`/articles/${article.slug}`} className="group block">
                  {isFirst && article.image && (
                    <div className="aspect-[3/2] overflow-hidden mb-4">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Category — muted, not gold */}
                  <span className="font-sans text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[var(--muted)] block mb-2">
                    {article.category}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[var(--foreground)] group-hover:opacity-75 transition-opacity leading-snug line-clamp-3 mb-2">
                    {article.title}
                  </h3>

                  {isFirst && (
                    <p className="font-sans text-sm text-[var(--muted)] line-clamp-2 mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}

                  <div className="font-sans text-[0.68rem] text-[var(--muted)] flex items-center gap-1.5">
                    <span className="font-semibold">{article.readTime} min</span>
                    <span aria-hidden="true">—</span>
                    <span>{author?.name ?? "Staff writer"}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
