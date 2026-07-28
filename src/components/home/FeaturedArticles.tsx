import { articles } from "@/data/articles";
import LeadStorySection from "@/components/home/LeadStorySection";

export default function FeaturedArticles() {
  const featured = articles.filter((a) => a.featured);
  if (featured.length === 0) return null;

  const [lead, ...rest] = featured;
  // Use the first 4 non-lead articles as briefs (or remaining featured articles)
  const briefs = rest.length > 0 ? rest.slice(0, 4) : articles.filter((a) => !a.featured).slice(0, 4);

  return (
    <LeadStorySection
      lead={lead}
      briefs={briefs}
      sectionLabel="The Week in Perspective"
    />
  );
}
