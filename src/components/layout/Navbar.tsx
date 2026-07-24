"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Sun, Moon, Menu } from "lucide-react";
import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";

export default function Navbar() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------------------------
  // Theme
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // ---------------------------------------------------------------------------
  // Inline search (desktop)
  // ---------------------------------------------------------------------------
  const openSearch = () => {
    setIsSearchOpen(true);
    // Focus after the state update has painted
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeSearch();
    }
    if (e.key === "Enter" && searchValue.trim()) {
      commitSearch();
    }
  };

  const commitSearch = () => {
    const q = searchValue.trim();
    closeSearch();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  // ---------------------------------------------------------------------------
  // Nav links
  // ---------------------------------------------------------------------------
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ];

  if (!mounted) return null;

  return (
    <nav
      className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800"
      aria-label="Main navigation"
    >
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo — hidden when inline search is open so the input has room */}
          <div className={isSearchOpen ? "hidden md:block" : ""}>
            <Logo />
          </div>

          {/* ----------------------------------------------------------------
              Inline search field (desktop, expands from the icon)
          ---------------------------------------------------------------- */}
          {isSearchOpen && (
            <div className="flex flex-1 items-center gap-2 md:ml-8">
              <div className="relative flex-1 max-w-lg">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />
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
                  className="
                    w-full rounded-lg border border-gray-300 bg-white
                    py-2 pl-9 pr-4 text-sm text-gray-900
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
                    dark:border-gray-700 dark:bg-slate-800 dark:text-white
                    dark:focus:border-blue-400 dark:focus:ring-blue-900/40
                    transition-colors
                  "
                />
              </div>

              {/* Go button */}
              <button
                type="button"
                onClick={commitSearch}
                disabled={!searchValue.trim()}
                className="
                  rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white
                  hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  dark:focus:ring-offset-slate-900 transition-colors
                "
              >
                Go
              </button>

              {/* Close search */}
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* ----------------------------------------------------------------
              Desktop nav links (hidden while search is expanded)
          ---------------------------------------------------------------- */}
          {!isSearchOpen && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* ----------------------------------------------------------------
              Right-side icons
          ---------------------------------------------------------------- */}
          <div className={`flex items-center gap-1 ${isSearchOpen ? "hidden md:flex" : ""}`}>

            {/* Search icon
                - Desktop: toggles the inline field
                - Mobile: navigates straight to /search             */}
            {!isSearchOpen && (
              <>
                {/* Desktop trigger */}
                <button
                  type="button"
                  onClick={openSearch}
                  aria-label="Open search"
                  aria-expanded={isSearchOpen}
                  className="hidden md:flex p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Search className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Mobile trigger — goes straight to /search */}
                <Link
                  href="/search"
                  aria-label="Search"
                  className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Search className="h-5 w-5" aria-hidden="true" />
                </Link>
              </>
            )}

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isDark
                ? <Sun className="h-5 w-5" aria-hidden="true" />
                : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen
                ? <X className="h-6 w-6" aria-hidden="true" />
                : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Mobile navigation drawer
        ------------------------------------------------------------------ */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Search entry point in the mobile drawer */}
            <Link
              href="/search"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}
