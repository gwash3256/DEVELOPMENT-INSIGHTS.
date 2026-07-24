"use client";

// ---------------------------------------------------------------------------
// Category filter list — add or remove entries here for Sprint 6 expansion.
// The "All" sentinel always stays first; its value is null so callers can
// distinguish "no filter applied" from a real category name.
// ---------------------------------------------------------------------------
export interface FilterCategory {
  label: string;
  value: string | null;
}

export const FILTER_CATEGORIES: FilterCategory[] = [
  { label: "All", value: null },
  { label: "Enterprise", value: "Enterprise" },
  { label: "Governance", value: "Governance" },
  { label: "Leadership", value: "Leadership" },
  { label: "Climate", value: "Climate" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface SearchFiltersProps {
  /** The currently active category value (null = All). */
  activeCategory: string | null;
  /** Called with the new category value when the user selects a filter. */
  onCategoryChange: (category: string | null) => void;
  /**
   * Optional custom list of categories to render.
   * Defaults to FILTER_CATEGORIES when omitted.
   */
  categories?: FilterCategory[];
}

export default function SearchFilters({
  activeCategory,
  onCategoryChange,
  categories = FILTER_CATEGORIES,
}: SearchFiltersProps) {
  return (
    <nav aria-label="Filter by category">
      <ul className="flex flex-wrap gap-2" role="list">
        {categories.map(({ label, value }) => {
          const isActive = value === activeCategory;

          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onCategoryChange(value)}
                aria-pressed={isActive}
                className={`
                  inline-flex items-center
                  rounded-full
                  px-4 py-1.5
                  text-sm font-medium
                  transition-colors duration-150
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  dark:focus:ring-offset-gray-900
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm dark:bg-blue-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                  }
                `}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
