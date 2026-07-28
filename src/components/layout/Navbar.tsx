"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, Sun, Moon, Menu } from "lucide-react";
import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const applyTheme = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") closeSearch();
    if (e.key === "Enter" && searchValue.trim()) commitSearch();
  };

  const commitSearch = () => {
    const q = searchValue.trim();
    closeSearch();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  const navLinks = [
    { label: "Politics", href: "/categories/governance" },
    { label: "Technology", href: "/categories/web-development" },
    { label: "Business", href: "/categories/database" },
    { label: "Authors", href: "/authors" },
  ];

  if (!mounted) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_0_0_var(--border)]" : ""
      } bg-[var(--background)] dark:bg-[var(--background)]`}
      aria-label="Site header"
    >
      {/* Top bar — publication name + date */}
      <div className="border-b border-[var(--border)] py-2 hidden md:block">
        <Container>
          <div className="flex items-center justify-between">
            <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-[var(--muted)]">
              Analysis · Perspective · Intelligence
            </span>
            <span className="font-sans text-[0.65rem] text-[var(--muted)]">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </Container>
      </div>

      {/* Logo row */}
      <div className="border-b border-[var(--border)] py-4">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <Logo />

            {/* Right controls */}
            <div className="flex items-center gap-1">
              {/* Inline search field (desktop) */}
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" aria-hidden="true" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search articles…"
                      aria-label="Search articles"
                      autoComplete="off"
                      spellCheck={false}
                      className="w-56 md:w-72 rounded-none border border-[var(--border)] bg-[var(--surface)] py-1.5 pl-9 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={commitSearch}
                    disabled={!searchValue.trim()}
                    className="px-3 py-1.5 text-xs font-sans font-semibold tracking-widest uppercase bg-[var(--navy)] dark:bg-[var(--ivory)] text-[var(--ivory)] dark:text-[var(--navy)] hover:bg-[var(--navy-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Go
                  </button>
                  <button
                    type="button"
                    onClick={closeSearch}
                    aria-label="Close search"
                    className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  {/* Desktop search trigger */}
                  <button
                    type="button"
                    onClick={openSearch}
                    aria-label="Open search"
                    className="hidden md:flex p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {/* Mobile search link */}
                  <Link href="/search" aria-label="Search" className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </>
              )}

              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Light mode" : "Dark mode"}
                className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {isDark
                  ? <Sun className="h-4 w-4" aria-hidden="true" />
                  : <Moon className="h-4 w-4" aria-hidden="true" />}
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Section nav row (desktop) */}
      <div className="border-b border-[var(--border)] hidden md:block">
        <Container>
          <nav aria-label="Section navigation" className="flex items-center gap-0 -mx-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 font-sans text-xs font-bold tracking-[0.12em] uppercase transition-colors duration-150 border-b-2 ${
                  pathname === link.href
                    ? "border-[var(--gold)] text-[var(--navy)] dark:text-[var(--ivory)]"
                    : "border-transparent text-[var(--muted)] hover:text-[var(--navy)] dark:hover:text-[var(--ivory)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/articles"
              className="ml-auto px-3 py-2.5 font-sans text-xs font-bold tracking-[0.12em] uppercase text-[var(--muted)] hover:text-[var(--navy)] dark:hover:text-[var(--ivory)] transition-colors border-b-2 border-transparent"
            >
              All Articles →
            </Link>
          </nav>
        </Container>
      </div>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-b border-[var(--border)] bg-[var(--background)]">
          <Container>
            <nav className="py-3 space-y-0.5" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex py-2.5 font-sans text-sm font-semibold text-[var(--foreground)] hover:text-[var(--gold-dark)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/articles"
                className="flex py-2.5 font-sans text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Articles
              </Link>
              <Link
                href="/search"
                className="flex items-center gap-2 py-2.5 font-sans text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Search
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
