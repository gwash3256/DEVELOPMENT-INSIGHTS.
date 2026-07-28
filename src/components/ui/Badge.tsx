interface BadgeProps {
  children: React.ReactNode;
  variant?: "category" | "tag" | "featured";
  className?: string;
}

/**
 * Editorial badge — restrained, no bright colours.
 * category : small uppercase label, gold border
 * tag      : lowercase pill, muted
 * featured : navy fill
 */
export default function Badge({
  children,
  variant = "category",
  className = "",
}: BadgeProps) {
  const base =
    "inline-block text-xs font-sans font-semibold tracking-widest uppercase leading-none";

  const variants: Record<string, string> = {
    category:
      "px-2.5 py-1 border border-[var(--gold)] text-[var(--gold-dark)] dark:text-[var(--gold-light)]",
    tag:
      "px-2.5 py-1 bg-[var(--ivory-dark)] dark:bg-[var(--navy-muted)] text-[var(--muted)] dark:text-[var(--muted)] tracking-normal normal-case",
    featured:
      "px-2.5 py-1 bg-[var(--navy)] dark:bg-[var(--ivory)] text-[var(--ivory)] dark:text-[var(--navy)]",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
