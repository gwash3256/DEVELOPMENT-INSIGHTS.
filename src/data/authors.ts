import { Author } from "@/types/author";

// ---------------------------------------------------------------------------
// Author records
// Avatars default to undefined until real images are placed in /public/images/authors/
// ---------------------------------------------------------------------------
export const authors: Author[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    slug: "sarah-chen",
    role: "Full-Stack Developer",
    bio: "Full-stack developer with 8+ years of experience building scalable web applications. Passionate about Next.js, TypeScript, and developer experience.",
    avatar: undefined,
    socialLinks: {
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    slug: "marcus-johnson",
    role: "TypeScript Engineer",
    bio: "TypeScript expert and open-source contributor with a focus on type systems, compiler internals, and large-scale application architecture.",
    avatar: undefined,
    socialLinks: {
      github: "https://github.com",
    },
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    slug: "emma-wilson",
    role: "Design Systems Engineer",
    bio: "Design systems engineer with 6+ years of UI/UX and frontend expertise. Specialises in Tailwind CSS, accessibility, and component architecture.",
    avatar: undefined,
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "david-kumar",
    name: "David Kumar",
    slug: "david-kumar",
    role: "Database Architect",
    bio: "Database architect specialising in NoSQL systems and distributed data. Deep experience with MongoDB schema design and query optimisation.",
    avatar: undefined,
    socialLinks: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "lisa-park",
    name: "Lisa Park",
    slug: "lisa-park",
    role: "React Specialist",
    bio: "React specialist focused on scalable architecture, custom hooks, and component design patterns for production applications.",
    avatar: undefined,
    socialLinks: {
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "james-rivera",
    name: "James Rivera",
    slug: "james-rivera",
    role: "DevOps Engineer",
    bio: "DevOps engineer with expertise in cloud infrastructure, CI/CD automation, and infrastructure as code using Terraform and GitHub Actions.",
    avatar: undefined,
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];

/** Look up an author by their id */
export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

/** Look up an author by their slug */
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
