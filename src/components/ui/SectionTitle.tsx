interface SectionTitleProps {
  /** Main headline — rendered in serif */
  title: string;
  /** Optional subtitle rendered in sans-serif below */
  subtitle?: string;
  /** Show the gold rule accent beneath the title */
  accent?: boolean;
  /** Alignment */
  align?: "left" | "center";
  /** HTML heading level */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  accent = true,
  align = "left",
  as: Tag = "h2",
  className = "",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      <Tag className="font-serif text-3xl md:text-4xl font-bold text-[var(--navy)] dark:text-[var(--ivory)] leading-tight">
        {title}
      </Tag>

      {accent && (
        <span
          className="mt-3 block h-0.5 w-12 bg-[var(--gold)]"
          aria-hidden="true"
        />
      )}

      {subtitle && (
        <p className="mt-4 font-sans text-base text-[var(--muted)] dark:text-[var(--muted)] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
