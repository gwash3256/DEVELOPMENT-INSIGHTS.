import Hero from "@/components/home/Hero";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import CategorySection from "@/components/home/CategorySection";
import LatestArticles from "@/components/home/LatestArticles";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedArticles />
      <CategorySection />
      <LatestArticles />
      <Newsletter />
    </>
  );
}