import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. /categories/web-development
}

export default function CategoryPagination({
  currentPage,
  totalPages,
  basePath,
}: CategoryPaginationProps) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  // Build the visible page numbers: always show first, last, current ± 1
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const pageNumbers = [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-12"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          aria-label="Previous page"
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Prev
        </span>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, i) => {
        const prev = pageNumbers[i - 1];
        const showEllipsis = prev !== undefined && page - prev > 1;

        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="px-2 py-2 text-sm text-gray-400 dark:text-gray-600">
                …
              </span>
            )}
            {page === currentPage ? (
              <span
                aria-current="page"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold bg-blue-600 text-white"
              >
                {page}
              </span>
            ) : (
              <Link
                href={pageHref(page)}
                aria-label={`Page ${page}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                {page}
              </Link>
            )}
          </span>
        );
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          aria-label="Next page"
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
          Next
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
