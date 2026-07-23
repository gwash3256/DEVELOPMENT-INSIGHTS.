"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Article } from "@/data/articles";
import { searchArticlesRanked } from "@/lib/search";

const DEBOUNCE_MS = 300;

interface UseSearchOptions {
  /** Article pool to search within. Defaults to all articles when omitted. */
  articles: Article[];
  /** Initial query string. Defaults to "". */
  initialQuery?: string;
}

interface UseSearchReturn {
  /** The current (live) query — bind this to SearchBar's `query` prop */
  query: string;
  /** Update the query — bind this to SearchBar's `onQueryChange` prop */
  setQuery: (value: string) => void;
  /** Ranked search results. Empty array when query is blank. */
  results: Article[];
  /**
   * True during the debounce window between the user typing and the search
   * running. Use this to show a spinner or suppress a "no results" message
   * while the user is still typing.
   */
  isSearching: boolean;
}

export function useSearch({
  articles,
  initialQuery = "",
}: UseSearchOptions): UseSearchReturn {
  // Live value — updated on every keystroke
  const [query, setQuery] = useState(initialQuery);
  // Debounced value — updated after DEBOUNCE_MS of inactivity
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // isSearching is true from the first keystroke until the debounce settles
  const [isSearching, setIsSearching] = useState(false);

  // Track whether this is the initial render so we don't flash isSearching=true
  // when there's a non-empty initialQuery.
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the debounce entirely on the very first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDebouncedQuery(query);
      return;
    }

    setIsSearching(query.trim().length > 0);

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  // Re-run the search only when the debounced query or the article pool changes
  const results = useMemo(
    () => searchArticlesRanked(articles, debouncedQuery),
    [articles, debouncedQuery]
  );

  return { query, setQuery, results, isSearching };
}
