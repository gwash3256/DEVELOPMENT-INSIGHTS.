"use client";

import { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Article } from "@/data/articles";
import { useSearch } from "@/hooks/useSearch";
import SearchBar from "@/components/search/SearchBar";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import Container from "@/components/shared/Container";

interface SearchPageClientProps {
  articles: Article[];
  initialQuery: string;
}

export default function SearchPageClient({
  articles,
  initialQuery,
}: SearchPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { query, setQuery, results, isSearching } = useSearch({
    articles,
    initialQuery,
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Keep the URL in sync so the page stays shareable and refresh-safe.
  // Uses router.replace so searching doesn't pollute the history stack.
  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);

      const params = new URLSearchParams();
      if (value.trim()) {
        params.set("q", value);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [setQuery, router, pathname]
  );

  // Filter results by category after the search algorithm has ranked them
  const filteredResults = activeCategory
    ? results.filter((a) => a.category === activeCategory)
    : results;

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Page header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-black border-b border-gray-200 dark:border-slate-800">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Search
          </h1>

          {/* SearchBar */}
          <SearchBar
            query={query}
            onQueryChange={handleQueryChange}
            autoFocus
            className="max-w-2xl"
          />
        </Container>
      </section>

      {/* Filters + Results */}
      <section className="py-8 md:py-12">
        <Container>
          {/* SearchFilters */}
          <div className="mb-6">
            <SearchFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Result count / status line */}
          {hasQuery && !isSearching && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {filteredResults.length === 0
                ? null
                : `${filteredResults.length} result${filteredResults.length === 1 ? "" : "s"} for "${query}"`}
            </p>
          )}

          {/* Searching indicator */}
          {isSearching && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 animate-pulse">
              Searching…
            </p>
          )}

          {/* Idle state — no query entered yet */}
          {!hasQuery && !isSearching && (
            <p className="py-12 text-center text-gray-500 dark:text-gray-400">
              Type something to search across all articles.
            </p>
          )}

          {/* SearchResults */}
          {(hasQuery || isSearching) && (
            <SearchResults results={filteredResults} query={query} />
          )}
        </Container>
      </section>
    </div>
  );
}
