import Link from "next/link";
import { Article, getArticleAuthor } from "@/data/articles";
import Container from "@/components/shared/Container";

interface LeadStorySectionProps {
  lead: Article;
  briefs: Article[];
  sectionLabel?: string;
}

/** Lead image placeholder when no photo is set */
function ImagePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--ivory-dark)] dark:bg-[var(--navy-muted)]">
      <span className="font-serif text-6xl text-[var(--border)] select-none">DI</span>
    </div>
  );
}

export default function LeadStorySection({
  lead,
  briefs,
  sectionLabel,
}: LeadStorySectionProps) {
  const leadAuthor = getArticleAuthor(lead);

  return (
    <section className="py-12 md:py-16 border-b border-[var(--border)]">
      <Container>
        {/* Section label */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-8">
            <span className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[var(--gold-dark)] dark:text-[var(--gold)]">
              {sectionLabel}
            </span>
            <span className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
          {/* ── Lead story ─────────────────────────────────── */}
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-[var(--border)] pb-8 lg:pb-0 lg:pr-8">
            <Link href={`/articles/${lead.slug}`} className="group block">
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden mb-5">
                {lead.image
                  ? <img src={lead.image} alt={lead.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  : <ImagePlaceholder />}
              </div>

              {/* Category */}
              <span className="font-sans text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[var(--gold-dark)] dark:text-[var(--gold)]">
                {lead.category}
              </span>

              {/* Headline */}
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--navy)] dark:text-[var(--ivory)] group-hover:text-[var(--gold-dark)] dark:group-hover:text-[var(--gold-light)] transition-colors leading-snug mt-2 mb-3">
                {lead.title}
              </h2>

              {/* Excerpt */}
              <p className="font-sans text-base text-[var(--muted)] leading-relaxed line-clamp-3 mb-4">
                {lead.excerpt}
              </p>

              {/* Byline */}
              <div className="font-sans text-xs text-[var(--muted)] flex items-center gap-2">
                <span>{leadAuthor?.name ?? "Staff writer"}</span>
                <span aria-hidden="true">·</span>
                <span>{lead.readTime} min read</span>
                <span aria-hidden="true">·</span>
                <time dateTime={lead.date}>{lead.date}</time>
              </div>
            </Link>
          </div>

          {/* ── Brief list ─────────────────────────────────── */}
          <div className="pt-8 lg:pt-0">
            <ul className="divide-y divide-[var(--border)]">
              {briefs.map((article) => {
                const author = getArticleAuthor(article);
                return (
                  <li key={article.id} className="py-4 first:pt-0 last:pb-0">
                    <Link href={`/articles/${article.slug}`} className="group block">
                      <span className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[var(--gold-dark)] dark:text-[var(--gold)] block mb-1">
                        {article.category}
                      </span>
                      <h3 className="font-serif text-[1rem] font-bold text-[var(--navy)] dark:text-[var(--ivory)] group-hover:text-[var(--gold-dark)] dark:group-hover:text-[var(--gold-light)] transition-colors leading-snug line-clamp-3 mb-1.5">
                        {article.title}
                      </h3>
                      <div className="font-sans text-[0.68rem] text-[var(--muted)] flex items-center gap-1.5">
                        <span className="font-semibold">{article.readTime} min</span>
                        <span aria-hidden="true">—</span>
                        <span>{author?.name ?? "Staff writer"}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
