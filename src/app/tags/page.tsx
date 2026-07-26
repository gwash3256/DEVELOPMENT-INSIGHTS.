import { Metadata } from "next";
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/article/Breadcrumb";
import TagsPageClient, { type TagEntry } from "./TagsPageClient";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Tags | Development Insights",
  description: "Browse all article tags on Development Insights.",
};

function buildTags(): TagEntry[] {
  const countMap: Record<string, number> = {};

  for (const article of articles) {
    for (const tag of article.tags) {
      countMap[tag] = (countMap[tag] ?? 0) + 1;
    }
  }

  return Object.entries(countMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag)); // alphabetical
}

export default function TagsPage() {
  const tags = buildTags();
  const uniqueTagCount = tags.length;
  const totalArticles = articles.length;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tags", href: "/tags" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-black border-b border-gray-200 dark:border-slate-800">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tags
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {uniqueTagCount} tags across {totalArticles}{" "}
              {totalArticles === 1 ? "article" : "articles"}. Filter below to
              find what you need.
            </p>
          </div>
        </Container>
      </section>

      {/* Tag cloud */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <TagsPageClient tags={tags} />
        </Container>
      </section>
    </>
  );
}
