import { Metadata } from "next";
import Container from "@/components/shared/Container";
import CategoryCard from "@/components/category/CategoryCard";
import Breadcrumb from "@/components/article/Breadcrumb";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Categories | Development Insights",
  description:
    "Browse all content categories on Development Insights — web development, databases, DevOps, mobile, and more.",
};

export default function CategoriesPage() {
  const totalArticles = categories.reduce((sum, c) => sum + c.count, 0);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-black border-b border-gray-200 dark:border-slate-800">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {totalArticles} articles across {categories.length} topics. Find
              exactly what you&apos;re looking for.
            </p>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>

          {categories.length === 0 && (
            <p className="text-center py-16 text-gray-600 dark:text-gray-400">
              No categories found. Check back soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
