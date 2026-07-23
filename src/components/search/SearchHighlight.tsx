interface SearchHighlightProps {
  text: string;
  query: string;
}

/**
 * Renders `text` with every occurrence of each token in `query` wrapped in a
 * <mark> element so the browser (and screen readers) can surface the match.
 *
 * - Case-insensitive matching
 * - Preserves the original casing of the matched text
 * - Multi-word queries highlight each token independently
 * - Safe against regex special characters in the query
 */
export default function SearchHighlight({ text, query }: SearchHighlightProps) {
  const trimmed = query.trim();

  // Nothing to highlight — return the text as-is
  if (!trimmed) {
    return <>{text}</>;
  }

  // Build a single pattern that matches any of the query tokens
  const tokens = trimmed
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // escape regex chars

  const pattern = new RegExp(`(${tokens.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        pattern.test(part) ? (
          <mark
            key={index}
            className="bg-yellow-200 text-yellow-900 dark:bg-yellow-400/30 dark:text-yellow-200 rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}
