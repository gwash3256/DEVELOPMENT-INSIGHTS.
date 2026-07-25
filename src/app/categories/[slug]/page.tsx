import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/article/Breadcrumb";
import ArticleCard from "@/components/article/ArticleCard";
import CategoryPagination from "@/components/category/CategoryPagination";
import { categories, getCategoryBySlug } from "@/data/categories";
import { articles } from "@/data/articles";
import {
  Globe,
  Database,
  Layers,
  Smartphone,
  BookOpen,
  type LucideProps,
} from "lucide-react";

const ARTICLES_PER_PAGE = 9;

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Globe,
  Database,
  Layers,
  Smartphone,
  BookOpen,
};

// ---------------------------------------------------------------------------
// Static params — one route per category
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | Development Insights`,
    description: category.description,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  // Articles for this category, newest first
  const categoryArticles = articles
    .filter((a) => a.category === category.name)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Pagination
  const rawPage = sp.page;
  const currentPage = Math.max(
    1,
    parseInt(typeof rawPage === "string" ? rawPage : "1", 10) || 1
  );
  const totalPages = Math.max(1, Math.ceil(categoryArticles.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageArticles = categoryArticles.slice(
    (safePage - 1) * ARTICLES_PER_PAGE,
    safePage * ARTICLES_PER_PAGE
  );

  const Icon = ICON_MAP[category.icon] ?? BookOpen;
  const basePath = `/categories/${category.slug}`;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.name, href: basePath },
  ];

  return (
    <>
      {/* Hero / Banner */}
      <section
        className={`py-16 md:py-24 bg-gradient-to-br ${category.gradient} relative overflow-hidden`}
      >
        {/* Decorative background shape */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white" />
        </div>

        <Container>
          <div className="relative">
            {/* Breadcrumb — light variant for coloured background */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span className="text-white/40">/</span>
              <a href="/categories" className="hover:text-white transition-colors">
                Categories
              </a>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {category.name}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mb-4">
              {category.description}
            </p>
            <p className="text-sm text-white/60">
              {category.count} {category.count === 1 ? "article" : "articles"}
            </p>
          </div>
        </Container>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          {/* Breadcrumb — standard variant for body (screen-reader backup) */}
          <div className="sr-only">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {pageArticles.length > 0 ? (
            <>
              {/* Page indicator when beyond page 1 */}
              {safePage > 1 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                  Page {safePage} of {totalPages}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pageArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              <CategoryPagination
                currentPage={safePage}
                totalPages={totalPages}
                basePath={basePath}
              />
            </>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No articles yet
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check back soon — content in this category is on the way.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
