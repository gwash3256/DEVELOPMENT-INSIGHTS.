import { Article } from "@/data/articles";

// ---------------------------------------------------------------------------
// Relevance weights — higher = more important field
// ---------------------------------------------------------------------------
const WEIGHTS = {
  title: 10,
  tags: 8,
  category: 6,
  excerpt: 4,
  content: 2,
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalise a string for comparison: lowercase + collapse whitespace */
function normalise(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Count how many times `term` appears in `text` (case-insensitive).
 * Returns 0 if the text doesn't contain the term at all.
 */
function countMatches(text: string, term: string): number {
  if (!text || !term) return 0;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = normalise(text).match(new RegExp(escaped, "g"));
  return matches ? matches.length : 0;
}

/**
 * Score a single article against a single search term.
 * Accumulates weighted match counts across every searchable field.
 */
function scoreArticle(article: Article, term: string): number {
  let score = 0;

  score += countMatches(article.title, term) * WEIGHTS.title;
  score += countMatches(article.excerpt, term) * WEIGHTS.excerpt;
  score += countMatches(article.content, term) * WEIGHTS.content;
  score += countMatches(article.category, term) * WEIGHTS.category;

  // Tags: treat each tag as an independent field
  for (const tag of article.tags) {
    score += countMatches(tag, term) * WEIGHTS.tags;
  }

  return score;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface SearchResult {
  article: Article;
  /** Aggregate relevance score — useful for debugging or ranking indicators */
  score: number;
}

/**
 * Search `articles` for `query` and return results sorted by relevance.
 *
 * - Splits the query into individual tokens so "react hooks" matches articles
 *   that contain both words even if they don't appear adjacent.
 * - An article must match **all** tokens to be included (AND semantics).
 * - Results are sorted descending by total score.
 * - Returns an empty array for a blank query.
 */
export function searchArticles(
  articles: Article[],
  query: string
): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokens = normalise(trimmed)
    .split(/\s+/)
    .filter((t) => t.length > 0);

  const results: SearchResult[] = [];

  for (const article of articles) {
    let totalScore = 0;
    let allTokensMatch = true;

    for (const token of tokens) {
      const tokenScore = scoreArticle(article, token);
      if (tokenScore === 0) {
        allTokensMatch = false;
        break;
      }
      totalScore += tokenScore;
    }

    if (allTokensMatch) {
      results.push({ article, score: totalScore });
    }
  }

  // Sort descending: highest relevance first
  results.sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Convenience wrapper that returns only the `Article` objects, already ranked.
 * This is the shape `SearchResults.tsx` expects.
 */
export function searchArticlesRanked(
  articles: Article[],
  query: string
): Article[] {
  return searchArticles(articles, query).map((r) => r.article);
}
