import { Metadata } from "next";
import { articles } from "@/data/articles";
import SearchPageClient from "./SearchPageClient";

export const metadata: Metadata = {
  title: "Search | Development Insights",
  description: "Search articles across Development Insights.",
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQ = params.q;
  const initialQuery = typeof rawQ === "string" ? rawQ : "";

  return (
    <SearchPageClient
      articles={articles}
      initialQuery={initialQuery}
    />
  );
}
