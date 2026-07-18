import Container from "@/components/shared/Container";
import Link from "next/link";
import { categories } from "@/data/articles";

export default function CategorySection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-black">
      <Container>
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Explore content organized by topic to find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}
            >
              <div className="group h-full p-8 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C6.228 6.228 2 10.456 2 15.5c0 4.446 3.357 8.057 7.61 8.471M12 6.253c5.772 0 10 4.228 10 9.247m0 0c0 4.446-3.357 8.057-7.61 8.471"
                    />
                  </svg>
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>

                {/* Count */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.count} articles
                </p>

                {/* Arrow */}
                <div className="mt-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
