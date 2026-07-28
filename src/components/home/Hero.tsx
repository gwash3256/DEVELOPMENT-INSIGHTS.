import Container from "@/components/shared/Container";

/**
 * Masthead-style hero — newspaper flag, not a landing page splash.
 * No gradients, no animations, no stats. Just hierarchy and type.
 */
export default function Hero() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--background)]">
      <Container>
        {/* ── Flag / masthead ─────────────────────── */}
        <div className="py-8 md:py-12 text-center border-b border-[var(--border)] mb-8">
          {/* Eyebrow rule */}
          <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
            <span className="flex-1 max-w-[8rem] h-px bg-[var(--gold)]" />
            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[var(--gold-dark)] dark:text-[var(--gold)] font-bold">
              Est. 2024
            </span>
            <span className="flex-1 max-w-[8rem] h-px bg-[var(--gold)]" />
          </div>

          {/* Publication title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--navy)] dark:text-[var(--ivory)] tracking-tight leading-none mb-3">
            Development Insights
          </h1>

          {/* Tagline */}
          <p className="font-sans text-sm md:text-base text-[var(--muted)] tracking-wide max-w-xl mx-auto">
            Analysis · Perspective · Intelligence
          </p>
        </div>

        {/* ── Edition label ────────────────────────── */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-[var(--border)]">
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[var(--muted)]">
            Today&rsquo;s Edition
          </span>
          <a
            href="#newsletter"
            className="font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[var(--gold-dark)] dark:text-[var(--gold)] hover:underline underline-offset-2 transition-colors"
          >
            Subscribe →
          </a>
        </div>
      </Container>
    </section>
  );
}
