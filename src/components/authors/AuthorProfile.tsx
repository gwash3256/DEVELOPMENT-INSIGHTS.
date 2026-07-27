import Link from "next/link";
import { ExternalLink, BookOpen } from "lucide-react";
import type { Author, SocialLinks } from "@/types/author";

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface AvatarProps {
  author: Author;
  size: "sm" | "lg";
}

function Avatar({ author, size }: AvatarProps) {
  const dim = size === "lg" ? "w-24 h-24 text-2xl" : "w-14 h-14 text-base";

  if (author.avatar) {
    return (
      <img
        src={author.avatar}
        alt={`${author.name}'s avatar`}
        className={`${dim} rounded-full object-cover ring-2 ring-gray-200 dark:ring-slate-700`}
      />
    );
  }

  // Initials fallback — deterministic gradient based on the author's id
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-purple-500 to-pink-600",
    "from-cyan-500 to-blue-600",
    "from-rose-500 to-pink-600",
  ];
  const index =
    author.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
    gradients.length;

  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center font-bold text-white select-none ring-2 ring-gray-200 dark:ring-slate-700`}
      aria-hidden="true"
    >
      {getInitials(author.name)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------

const SOCIAL_CONFIG: {
  key: keyof SocialLinks;
  label: string;
}[] = [
  { key: "twitter", label: "Twitter" },
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "website", label: "Website" },
];

interface SocialLinksListProps {
  socialLinks: SocialLinks;
  size?: "sm" | "md";
}

function SocialLinksList({ socialLinks, size = "md" }: SocialLinksListProps) {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const btnPad = size === "sm" ? "px-2 py-1" : "px-2.5 py-1.5";

  const present = SOCIAL_CONFIG.filter(({ key }) => socialLinks[key]);
  if (present.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Social links">
      {present.map(({ key, label }) => (
        <a
          key={key}
          href={socialLinks[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} profile (opens in new tab)`}
          role="listitem"
          className={`inline-flex items-center gap-1.5 ${btnPad} rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <ExternalLink className={iconSize} aria-hidden="true" />
          {label}
        </a>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AuthorProfile
// ---------------------------------------------------------------------------

interface AuthorProfileProps {
  author: Author;
  /**
   * Number of articles by this author — pass from the parent so the component
   * stays a pure presentation layer with no data lookups.
   */
  articleCount?: number;
  /**
   * full    — standalone profile page, /authors/[slug]
   * compact — inline on article pages and author cards
   */
  variant?: "full" | "compact";
}

export default function AuthorProfile({
  author,
  articleCount,
  variant = "compact",
}: AuthorProfileProps) {
  if (variant === "full") {
    return (
      <section aria-label={`About ${author.name}`}>
        {/* Top row: avatar + identity */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <Avatar author={author} size="lg" />

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {author.name}
            </h1>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
              {author.role}
            </p>

            {/* Article count badge */}
            {articleCount !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-xs font-medium text-gray-700 dark:text-gray-300">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                {articleCount} {articleCount === 1 ? "article" : "articles"}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          {author.bio}
        </p>

        {/* Social links */}
        {author.socialLinks && (
          <SocialLinksList socialLinks={author.socialLinks} size="md" />
        )}
      </section>
    );
  }

  // compact variant — side-by-side, used on article pages and author cards
  return (
    <div className="flex items-start gap-4" aria-label={`About ${author.name}`}>
      <Link
        href={`/authors/${author.slug}`}
        className="shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Avatar author={author} size="sm" />
      </Link>

      <div className="flex-1 min-w-0">
        {/* Name + role */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
          <Link
            href={`/authors/${author.slug}`}
            className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {author.name}
          </Link>
          <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {author.role}
          </span>
        </div>

        {/* Bio — single line clamp */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
          {author.bio}
        </p>

        {/* Social + article count */}
        <div className="flex items-center gap-3">
          {author.socialLinks && (
            <SocialLinksList socialLinks={author.socialLinks} size="sm" />
          )}
          {articleCount !== undefined && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {articleCount} {articleCount === 1 ? "article" : "articles"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
