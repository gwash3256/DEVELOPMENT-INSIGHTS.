import Link from "next/link";
import {
  Globe,
  Database,
  Layers,
  Smartphone,
  BookOpen,
  ChevronRight,
  type LucideProps,
} from "lucide-react";
import { Category } from "@/data/categories";

// ---------------------------------------------------------------------------
// Icon registry — add entries here whenever a new icon key is added to
// categoryDefinitions in src/data/categories.ts
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Globe,
  Database,
  Layers,
  Smartphone,
  BookOpen,
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = ICON_MAP[category.icon] ?? BookOpen;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col h-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
      </div>

      {/* Name */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {category.name}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 leading-relaxed mb-4">
        {category.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-500">
          {category.count} {category.count === 1 ? "article" : "articles"}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Browse
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
