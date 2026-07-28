import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded">
      {/* Monogram mark */}
      <div className="w-8 h-8 bg-[var(--navy)] dark:bg-[var(--ivory)] rounded flex items-center justify-center shrink-0">
        <span className="text-[var(--gold)] font-serif font-bold text-sm leading-none select-none">
          DI
        </span>
      </div>

      {/* Wordmark */}
      <span className="font-serif font-bold text-lg tracking-tight text-[var(--navy)] dark:text-[var(--ivory)] hidden sm:inline leading-tight">
        Development<br className="hidden lg:block" />{" "}
        <span className="text-[var(--gold)]">Insights</span>
      </span>
    </Link>
  );
}
