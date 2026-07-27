import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AuthorProfile from "@/components/authors/AuthorProfile";
import type { Author } from "@/types/author";

interface AuthorCardProps {
  author: Author;
  articleCount: number;
}

export default function AuthorCard({ author, articleCount }: AuthorCardProps) {
  return (
    <div className="group flex flex-col h-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300">
      {/* Reuse the compact AuthorProfile for all identity/bio/social rendering */}
      <div className="flex-1">
        <AuthorProfile
          author={author}
          articleCount={articleCount}
          variant="compact"
        />
      </div>

      {/* View Profile CTA */}
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800">
        <Link
          href={`/authors/${author.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          View Profile
          <ChevronRight
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
