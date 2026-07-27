// ---------------------------------------------------------------------------
// Author type
// ---------------------------------------------------------------------------

export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Author {
  /** Unique identifier — used to link articles to authors */
  id: string;
  /** Display name */
  name: string;
  /** URL slug — used in /authors/[slug] (Sprint 7.2+) */
  slug: string;
  /** Short biography shown on article pages and the author profile */
  bio: string;
  /** Path to avatar image under /public, e.g. "/images/authors/sarah-chen.jpg" */
  avatar?: string;
  /** Job title or role shown alongside the name */
  role: string;
  /** Optional social / external links */
  socialLinks?: SocialLinks;
}
