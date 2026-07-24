import { articles } from "@/data/articles";

export interface Category {
  /** Display name */
  name: string;
  /** URL slug — used in /categories/[slug] */
  slug: string;
  /** One-sentence description shown on the landing page */
  description: string;
  /** Lucide icon name (string key) — resolved in CategoryCard */
  icon: string;
  /** Tailwind gradient classes for the icon background */
  gradient: string;
  /** Live count derived from the articles array */
  count: number;
}

// ---------------------------------------------------------------------------
// Category definitions — add new categories here for Sprint 6+
// ---------------------------------------------------------------------------
const categoryDefinitions: Omit<Category, "count">[] = [
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "Frameworks, tooling, and best practices for building modern web applications.",
    icon: "Globe",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Database",
    slug: "database",
    description:
      "Schema design, query optimisation, and data modelling across SQL and NoSQL systems.",
    icon: "Database",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "DevOps",
    slug: "devops",
    description:
      "CI/CD pipelines, infrastructure as code, and automation for reliable deployments.",
    icon: "Layers",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description:
      "Cross-platform and native mobile development patterns for iOS and Android.",
    icon: "Smartphone",
    gradient: "from-purple-500 to-pink-600",
  },
];

// Derive live article counts so the number always reflects the real data
function buildCategories(): Category[] {
  const countMap = articles.reduce<Record<string, number>>((acc, article) => {
    acc[article.category] = (acc[article.category] ?? 0) + 1;
    return acc;
  }, {});

  return categoryDefinitions.map((def) => ({
    ...def,
    count: countMap[def.name] ?? 0,
  }));
}

export const categories: Category[] = buildCategories();

/** Look up a single category by slug — returns undefined if not found */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
