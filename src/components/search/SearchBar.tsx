"use client";

import { Search, X } from "lucide-react";
import { KeyboardEvent } from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export default function SearchBar({
  query,
  onQueryChange,
  placeholder = "Search articles...",
  autoFocus = false,
  className = "",
}: SearchBarProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      onQueryChange("");
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon */}
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        aria-hidden="true"
      />

      {/* Input */}
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label="Search articles"
        autoComplete="off"
        spellCheck={false}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-3
          pl-12
          pr-12
          text-gray-900
          shadow-sm
          transition-all
          duration-200
          placeholder:text-gray-400
          focus:border-blue-500
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-white
          dark:placeholder:text-gray-500
          dark:focus:border-blue-400
          dark:focus:ring-blue-900/40
        "
      />

      {/* Clear Button */}
      {query && (
        <button
          type="button"
          onClick={() => onQueryChange("")}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-gray-400
            transition
            hover:bg-gray-100
            hover:text-gray-700
            dark:hover:bg-gray-800
            dark:hover:text-white
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
