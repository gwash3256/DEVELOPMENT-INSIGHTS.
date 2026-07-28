import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: undefined;
  onClick?: undefined;
  disabled?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--navy)] text-[var(--ivory)] hover:bg-[var(--navy-light)] dark:bg-[var(--ivory)] dark:text-[var(--navy)] dark:hover:bg-[var(--ivory-dark)]",
  secondary:
    "border border-[var(--navy)] dark:border-[var(--ivory)] text-[var(--navy)] dark:text-[var(--ivory)] hover:bg-[var(--navy)] hover:text-[var(--ivory)] dark:hover:bg-[var(--ivory)] dark:hover:text-[var(--navy)]",
  ghost:
    "text-[var(--navy)] dark:text-[var(--ivory)] hover:bg-[var(--ivory-dark)] dark:hover:bg-[var(--navy-muted)]",
  gold:
    "bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] font-semibold",
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
