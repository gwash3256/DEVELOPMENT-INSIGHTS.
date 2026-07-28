import Container from "@/components/shared/Container";

export default function Hero() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--background)]">
      <Container>
        {/* Masthead flag */}
        <div className="py-8 md:py-12 text-center border-b border-[var(--border)] mb-6">
          {/* Flanking gold rules — accent only, not text */}
          <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
            <span className="flex-1 max-w-[6rem] h-px bg-[var(--gold-dark)] dark:bg-[var(--gold)]" />
            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[var(--muted)] font-bold">
              Est. 2024
            </span>
            <span className="flex-1 max-w-[6rem] h-px bg-[var(--gold-dark)] dark:bg-[var(--gold)]" />
          </div>

          {/* Publication name */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] tracking-tight leading-none mb-3">
            Development Insights
          </h1>

          {/* Tagline — muted, no gold */}
          <p className="font-sans text-sm md:text-base text-[var(--muted)] tracking-wide max-w-xl mx-auto">
            Analysis · Perspective · Intelligence
          </p>
        </div>

        {/* Edition bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[var(--muted)]">
            Today&rsquo;s Edition
          </span>
          <a
            href="#newsletter"
            className="font-sans text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline-offset-2 hover:underline"
          >
            Subscribe →
          </a>
        </div>
      </Container>
    </section>
  );
}
