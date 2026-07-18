export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorBio?: string;
  date: string;
  readTime: number;
  image?: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "getting-started-with-nextjs-16",
    title: "Getting Started with Next.js 16: A Modern React Framework",
    excerpt:
      "Learn how to build fast, scalable web applications with Next.js 16. This comprehensive guide covers routing, SSR, and deployment strategies.",
    category: "Web Development",
    tags: ["nextjs", "react", "javascript", "web development"],
    author: "Sarah Chen",
    authorBio: "Full-stack developer with 8+ years of experience building scalable web applications.",
    date: "2026-07-15",
    readTime: 8,
    featured: true,
    image: "/images/nextjs.jpg",
    content: `# Getting Started with Next.js 16

Next.js 16 represents a significant milestone in the evolution of modern React frameworks. With improvements to performance, developer experience, and built-in features, it's the perfect time to dive in.

## Why Next.js?

Next.js eliminates the complexity of setting up React applications. It provides:

- **Server-side rendering (SSR)** for better performance and SEO
- **Static site generation (SSG)** for ultra-fast loading
- **Incremental static regeneration** for dynamic content
- **Built-in optimization** for images, fonts, and scripts
- **API routes** for backend functionality
- **Automatic code splitting** for smaller bundles

## Installation and Setup

Getting started is simple:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This creates a new Next.js project with TypeScript, Tailwind CSS, and ESLint pre-configured.

## File-based Routing

Next.js uses the App Router for intuitive file-based routing:

- \`src/app/page.tsx\` → \`/\`
- \`src/app/about/page.tsx\` → \`/about\`
- \`src/app/blog/[slug]/page.tsx\` → \`/blog/my-post\`

## Server Components by Default

In Next.js 16, components are server components by default. They run only on the server, reducing JavaScript sent to the client.

## Deployment

Deploy to Vercel with a single click:

\`\`\`bash
npm run build
npm start
\`\`\`

Next.js is optimized for Vercel, but works great on any Node.js hosting.

## Conclusion

Next.js 16 is production-ready and battle-tested. Whether you're building a startup or an enterprise application, Next.js provides the tools you need to succeed.`,
  },
  {
    id: "2",
    slug: "typescript-best-practices-type-safety-at-scale",
    title: "TypeScript Best Practices: Type Safety at Scale",
    excerpt:
      "Explore advanced TypeScript patterns and techniques to build maintainable, type-safe applications that scale across large teams.",
    category: "Web Development",
    tags: ["typescript", "type safety", "best practices", "javascript"],
    author: "Marcus Johnson",
    authorBio: "TypeScript expert and open-source contributor with focus on type systems.",
    date: "2026-07-12",
    readTime: 12,
    featured: true,
    image: "/images/typescript.jpg",
    content: `# TypeScript Best Practices: Type Safety at Scale

TypeScript transforms JavaScript from a dynamic language into a statically-typed powerhouse. When done right, it catches bugs before they reach production.

## The Power of Types

Strong typing enables:

- **Early error detection** during development
- **Better IDE support** with autocompletion
- **Self-documenting code** that's easier to understand
- **Refactoring confidence** with compiler verification

## Utility Types

TypeScript provides powerful utility types:

\`\`\`typescript
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Partial<T> = { [K in keyof T]?: T[K] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Record<K extends string | number, T> = { [P in K]: T };
\`\`\`

## Strict Mode

Always enable strict mode in tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

## Module Organization

Organize code by feature:

\`\`\`
src/
  features/
    auth/
      types.ts
      service.ts
      components/
    dashboard/
      types.ts
      service.ts
      components/
\`\`\`

## Conclusion

TypeScript at scale requires discipline, but the payoff in code quality and team velocity is substantial.`,
  },
  {
    id: "3",
    slug: "tailwind-css-mastery-from-basics-to-advanced",
    title: "Tailwind CSS Mastery: From Basics to Advanced Layouts",
    excerpt:
      "Deep dive into Tailwind CSS v4 and learn how to create beautiful, responsive designs with utility-first styling.",
    category: "Web Development",
    tags: ["tailwind", "css", "design", "styling"],
    author: "Emma Wilson",
    authorBio: "Design systems engineer with 6+ years of UI/UX and frontend expertise.",
    date: "2026-07-10",
    readTime: 10,
    featured: true,
    image: "/images/tailwind.jpg",
    content: `# Tailwind CSS Mastery: From Basics to Advanced Layouts

Tailwind CSS revolutionized frontend development by bringing utility-first styling to the mainstream. But beyond basic classes lies a powerful design system.

## Utility-First Philosophy

Instead of writing custom CSS:

\`\`\`css
.btn {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn:hover {
  background-color: #2563eb;
}
\`\`\`

Use Tailwind utilities:

\`\`\`jsx
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
  Click me
</button>
\`\`\`

## Responsive Design

Tailwind makes responsive design intuitive:

\`\`\`jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
\`\`\`

## Custom Configuration

Extend Tailwind with custom values:

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#0066ff',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
};
\`\`\`

## Component Extraction

Use @apply for complex components:

\`\`\`css
@layer components {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
\`\`\`

## Performance

Tailwind's JIT compiler ensures only used styles are generated, resulting in tiny production bundles.`,
  },
  {
    id: "4",
    slug: "mongodb-schema-design-patterns",
    title: "MongoDB Schema Design Patterns You Should Know",
    excerpt:
      "Master MongoDB's flexible schema model with proven patterns for embedding, referencing, and polymorphic documents.",
    category: "Database",
    tags: ["mongodb", "database", "schema design", "data modeling"],
    author: "David Kumar",
    authorBio: "Database architect specializing in NoSQL systems and distributed data.",
    date: "2026-07-08",
    readTime: 15,
    featured: false,
    image: "/images/mongodb.jpg",
    content: `# MongoDB Schema Design Patterns You Should Know

MongoDB's flexible schema is both a superpower and a trap. Without good patterns, you can end up with unmaintainable data structures.

## The Document Model

MongoDB stores data as flexible JSON documents:

\`\`\`json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "posts": [
    {
      "title": "My First Post",
      "content": "...",
      "tags": ["mongodb", "database"]
    }
  ]
}
\`\`\`

## Embedding vs. Referencing

**Embed when:**
- Data is frequently accessed together
- The embedded data is relatively small
- You want ACID transactions across related data

**Reference when:**
- Data is large and changes frequently
- The same data is referenced by many documents
- You want to avoid data duplication

## Polymorphic Documents

Different document types in the same collection:

\`\`\`javascript
db.content.insertMany([
  {
    type: "article",
    title: "My Article",
    content: "..."
  },
  {
    type: "video",
    title: "My Video",
    duration: 180,
    videoUrl: "..."
  }
]);
\`\`\`

## Conclusion

Good schema design in MongoDB requires understanding your access patterns and query requirements.`,
  },
  {
    id: "5",
    slug: "react-hooks-simplify-state-management",
    title: "React Hooks: Simplify Complex State Management",
    excerpt:
      "Learn how to leverage custom hooks to manage complex application state and side effects cleanly.",
    category: "Web Development",
    tags: ["react", "hooks", "state management", "javascript"],
    author: "Lisa Park",
    authorBio: "React specialist focused on scalable architecture and component design.",
    date: "2026-07-05",
    readTime: 11,
    featured: false,
    image: "/images/react-hooks.jpg",
    content: `# React Hooks: Simplify Complex State Management

React Hooks fundamentally changed how we write React components. They eliminate the need for class components and make logic reusable.

## useState Hook

The most basic hook manages component state:

\`\`\`jsx
const [count, setCount] = useState(0);

return (
  <>
    <p>Count: {count}</p>
    <button onClick={() => setCount(count + 1)}>Increment</button>
  </>
);
\`\`\`

## useEffect Hook

Handle side effects like fetching data:

\`\`\`jsx
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch('/api/data');
    setData(data);
  };
  fetchData();
}, []); // Empty dependency array = run once
\`\`\`

## Custom Hooks

Encapsulate complex logic:

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}
\`\`\`

## useContext Hook

Share state across components without prop drilling:

\`\`\`jsx
const ThemeContext = createContext();

export function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <header className={theme}>...</header>;
}
\`\`\`

## Conclusion

Master hooks and you'll write cleaner, more maintainable React code.`,
  },
  {
    id: "6",
    slug: "devops-fundamentals-ci-cd-infrastructure",
    title: "DevOps Fundamentals: From CI/CD to Infrastructure as Code",
    excerpt:
      "Understand the core principles of modern DevOps practices and automate your deployment pipeline.",
    category: "DevOps",
    tags: ["devops", "ci/cd", "infrastructure", "automation"],
    author: "James Rivera",
    authorBio: "DevOps engineer with expertise in cloud infrastructure and automation.",
    date: "2026-07-01",
    readTime: 14,
    featured: false,
    image: "/images/devops.jpg",
    content: `# DevOps Fundamentals: From CI/CD to Infrastructure as Code

DevOps bridges the gap between development and operations. It's about automating everything.

## Continuous Integration (CI)

CI automatically tests code changes:

\`\`\`yaml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
\`\`\`

## Continuous Deployment (CD)

CD automatically deploys successful builds:

\`\`\`yaml
- name: Deploy
  if: success()
  run: npm run deploy
\`\`\`

## Infrastructure as Code (IaC)

Define infrastructure in code:

\`\`\`hcl
resource "aws_s3_bucket" "website" {
  bucket = "my-website"
  acl    = "public-read"
}
\`\`\`

## Monitoring and Alerts

Observe system health in real-time and alert on anomalies.

## Conclusion

DevOps is a culture of continuous improvement through automation.`,
  },
];

export const categories = [
  { name: "Web Development", count: 24 },
  { name: "Database", count: 18 },
  { name: "DevOps", count: 12 },
  { name: "Mobile Development", count: 8 },
];
