import Hero from "@/components/home/Hero";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import LatestArticles from "@/components/home/LatestArticles";
import CategorySection from "@/components/home/CategorySection";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      {/* Masthead */}
      <Hero />

      {/* Lead story + brief list */}
      <FeaturedArticles />

      {/* Latest 3 stories strip */}
      <LatestArticles />

      {/* Topic directory */}
      <CategorySection />

      {/* Newsletter CTA */}
      <Newsletter />
    </>
  );
}
