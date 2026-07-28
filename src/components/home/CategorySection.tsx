import Link from "next/link";
import Container from "@/components/shared/Container";
import { categories } from "@/data/categories";

export default function CategorySection() {
  return (
    <section className="py-12 border-b border-[var(--border)] bg-[var(--ivory-dark)] dark:bg-[var(--navy-light)]">
      <Container>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 bg-[var(--gold-dark)] dark:bg-[var(--gold)] shrink-0" aria-hidden="true" />
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[var(--muted)]">
            Browse by Topic
          </span>
          <span className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
          <Link
            href="/categories"
            className="font-sans text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            All topics →
          </Link>
        </div>

        {/* Grid — gap-px creates hairline borders between cells */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)]">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group flex flex-col p-6 bg-[var(--background)] hover:bg-[var(--surface)] transition-colors"
            >
              {/* Gold rule animates in on hover — gold as accent, not text */}
              <span
                className="block h-0.5 w-0 group-hover:w-8 bg-[var(--gold-dark)] dark:bg-[var(--gold)] transition-all duration-300 mb-4"
                aria-hidden="true"
              />

              <h3 className="font-serif text-base font-bold text-[var(--foreground)] group-hover:opacity-75 transition-opacity leading-snug mb-2">
                {category.name}
              </h3>

              <p className="font-sans text-xs text-[var(--muted)] mb-4 leading-relaxed line-clamp-2">
                {category.description}
              </p>

              <span className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[var(--muted)] mt-auto">
                {category.count} {category.count === 1 ? "article" : "articles"}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
