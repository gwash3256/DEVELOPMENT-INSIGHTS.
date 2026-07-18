export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image?: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 16: A Modern React Framework",
    excerpt: "Learn how to build fast, scalable web applications with Next.js 16. This comprehensive guide covers routing, SSR, and deployment strategies.",
    category: "Web Development",
    author: "Sarah Chen",
    date: "2026-07-15",
    readTime: 8,
    featured: true,
    image: "/images/nextjs.jpg",
  },
  {
    id: "2",
    title: "TypeScript Best Practices: Type Safety at Scale",
    excerpt: "Explore advanced TypeScript patterns and techniques to build maintainable, type-safe applications that scale across large teams.",
    category: "Web Development",
    author: "Marcus Johnson",
    date: "2026-07-12",
    readTime: 12,
    featured: true,
    image: "/images/typescript.jpg",
  },
  {
    id: "3",
    title: "Tailwind CSS Mastery: From Basics to Advanced Layouts",
    excerpt: "Deep dive into Tailwind CSS v4 and learn how to create beautiful, responsive designs with utility-first styling.",
    category: "Web Development",
    author: "Emma Wilson",
    date: "2026-07-10",
    readTime: 10,
    featured: true,
    image: "/images/tailwind.jpg",
  },
  {
    id: "4",
    title: "MongoDB Schema Design Patterns You Should Know",
    excerpt: "Master MongoDB's flexible schema model with proven patterns for embedding, referencing, and polymorphic documents.",
    category: "Database",
    author: "David Kumar",
    date: "2026-07-08",
    readTime: 15,
    featured: false,
    image: "/images/mongodb.jpg",
  },
  {
    id: "5",
    title: "React Hooks: Simplify Complex State Management",
    excerpt: "Learn how to leverage custom hooks to manage complex application state and side effects cleanly.",
    category: "Web Development",
    author: "Lisa Park",
    date: "2026-07-05",
    readTime: 11,
    featured: false,
    image: "/images/react-hooks.jpg",
  },
  {
    id: "6",
    title: "DevOps Fundamentals: From CI/CD to Infrastructure as Code",
    excerpt: "Understand the core principles of modern DevOps practices and automate your deployment pipeline.",
    category: "DevOps",
    author: "James Rivera",
    date: "2026-07-01",
    readTime: 14,
    featured: false,
    image: "/images/devops.jpg",
  },
];

export const categories = [
  { name: "Web Development", count: 24 },
  { name: "Database", count: 18 },
  { name: "DevOps", count: 12 },
  { name: "Mobile Development", count: 8 },
];
