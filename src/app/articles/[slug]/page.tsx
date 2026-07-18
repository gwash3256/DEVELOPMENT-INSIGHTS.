import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/article/Breadcrumb";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleMetadata from "@/components/article/ArticleMetadata";
import ArticleBody from "@/components/article/ArticleBody";
import ShareButtons from "@/components/article/ShareButtons";
import RelatedArticles from "@/components/article/RelatedArticles";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(props: ArticlePageProps) {
  const params = await props.params;
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | Development Insights`,
    description: article.excerpt,
    keywords: article.tags.join(", "),
  };
}

export default async function ArticlePage(props: ArticlePageProps) {
  const params = await props.params;
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: article.title, href: `/articles/${article.slug}` },
  ];

  const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/articles/${article.slug}`;

  return (
    <article className="py-16 md:py-24 bg-white dark:bg-black">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Article Header */}
        <div className="mb-12">
          <ArticleHeader article={article} />
        </div>

        {/* Share Buttons */}
        <div className="mb-8">
          <ShareButtons title={article.title} url={articleUrl} />
        </div>

        {/* Metadata */}
        <ArticleMetadata article={article} />

        {/* Article Body */}
        <div className="py-12">
          <ArticleBody content={article.content} />
        </div>

        {/* Related Articles */}
        <RelatedArticles currentArticle={article} />
      </Container>
    </article>
  );
}
