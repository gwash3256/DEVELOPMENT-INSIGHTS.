"use client";

import { useMemo, useState } from "react";
import { Hash, Search, X } from "lucide-react";
import Link from "next/link";

export interface TagEntry {
  tag: string;
  count: number;
}

interface TagsPageClientProps {
  tags: TagEntry[];
}

// Visual weight tiers — the more articles a tag has, the bolder it looks
function sizeClass(count: number, max: number): string {
  const ratio = max > 1 ? count / max : 1;
  if (ratio >= 0.75) return "text-base font-semibold";
  if (ratio >= 0.4) return "text-sm font-medium";
  return "text-xs font-normal";
}

export default function TagsPageClient({ tags }: TagsPageClientProps) {
  const [filter, setFilter] = useState("");

  const maxCount = useMemo(() => Math.max(...tags.map((t) => t.count), 1), [tags]);

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return q ? tags.filter((t) => t.tag.toLowerCase().includes(q)) : tags;
  }, [tags, filter]);

  // Group visible tags alphabetically: { A: [...], B: [...], ... }
  const grouped = useMemo(() => {
    const map: Record<string, TagEntry[]> = {};
    for (const entry of visible) {
      const letter = entry.tag[0].toUpperCase();
      (map[letter] ??= []).push(entry);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [visible]);

  return (
    <>
      {/* Filter input */}
      <div className="relative max-w-sm mb-10">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter tags…"
          aria-label="Filter tags"
          autoComplete="off"
          spellCheck={false}
          className="
            w-full rounded-lg border border-gray-300 bg-white
            py-2 pl-9 pr-9 text-sm text-gray-900
            placeholder:text-gray-400
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
            dark:border-gray-700 dark:bg-gray-900 dark:text-white
            dark:placeholder:text-gray-500
            dark:focus:border-blue-400 dark:focus:ring-blue-900/40
            transition-colors
          "
        />
        {filter && (
          <button
            type="button"
            onClick={() => setFilter("")}
            aria-label="Clear filter"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* No results */}
      {visible.length === 0 && (
        <p className="py-12 text-center text-gray-500 dark:text-gray-400">
          No tags match &ldquo;{filter}&rdquo;.
        </p>
      )}

      {/* Alphabetical sections */}
      <div className="space-y-10">
        {grouped.map(([letter, entries]) => (
          <section key={letter} aria-labelledby={`letter-${letter}`}>
            {/* Letter heading */}
            <h2
              id={`letter-${letter}`}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 border-b border-gray-100 dark:border-slate-800 pb-2"
            >
              {letter}
            </h2>

            {/* Tag cloud row */}
            <div className="flex flex-wrap gap-2">
              {entries.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className={`
                    group inline-flex items-center gap-1.5
                    rounded-full border border-gray-200 dark:border-slate-700
                    bg-white dark:bg-slate-900
                    px-3 py-1.5
                    text-gray-700 dark:text-gray-300
                    hover:border-blue-500 dark:hover:border-blue-400
                    hover:bg-blue-50 dark:hover:bg-blue-900/20
                    hover:text-blue-700 dark:hover:text-blue-300
                    transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                    dark:focus:ring-offset-black
                    ${sizeClass(count, maxCount)}
                  `}
                >
                  <Hash
                    className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                  {tag}
                  <span className="ml-0.5 text-xs text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
