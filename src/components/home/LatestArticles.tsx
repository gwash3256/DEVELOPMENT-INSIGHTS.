import { articles } from "@/data/articles";
import SectionStrip from "@/components/home/SectionStrip";

export default function LatestArticles() {
  // Newest first, skip the featured lead to avoid repetition
  const featured = articles.find((a) => a.featured);
  const pool = articles
    .filter((a) => a.id !== featured?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <SectionStrip
      label="Latest"
      articles={pool.slice(0, 3)}
      seeAllHref="/articles"
    />
  );
}
