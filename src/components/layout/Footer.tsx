import Link from "next/link";
import Container from "@/components/shared/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  const sections = [
    {
      heading: "Coverage",
      links: [
        { label: "Politics & Governance", href: "/categories/governance" },
        { label: "Technology", href: "/categories/web-development" },
        { label: "Business & Economy", href: "/categories/database" },
        { label: "DevOps & Infrastructure", href: "/categories/devops" },
      ],
    },
    {
      heading: "Publication",
      links: [
        { label: "All Articles", href: "/articles" },
        { label: "Authors", href: "/authors" },
        { label: "Categories", href: "/categories" },
        { label: "Tags", href: "/tags" },
      ],
    },
    {
      heading: "About",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[var(--navy)] text-[var(--ivory)]">
      {/* Top rule */}
      <div className="h-0.5 bg-[var(--gold)]" />

      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[var(--gold)] flex items-center justify-center">
                <span className="text-[var(--navy)] font-serif font-bold text-xs select-none">DI</span>
              </div>
              <span className="font-serif font-bold text-base text-[var(--ivory)]">
                Development Insights
              </span>
            </div>
            <p className="font-sans text-sm text-[var(--ivory)]/60 leading-relaxed">
              Serious analysis of technology, governance, and the forces shaping our world.
            </p>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.heading}>
              <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-[var(--ivory)]/60 hover:text-[var(--ivory)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--navy-muted)] pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-[var(--ivory)]/40">
            © {year} Development Insights. All rights reserved.
          </p>
          <p className="font-sans text-xs text-[var(--ivory)]/40 italic">
            &ldquo;Stay informed. Think critically.&rdquo;
          </p>
        </div>
      </Container>
    </footer>
  );
}
