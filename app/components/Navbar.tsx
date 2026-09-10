"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/app/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [activeId, setActiveId] = useState<string>(navLinks[0].id);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-black/60"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          onClick={handleNavClick("top")}
          className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          {profile.initials}
          <span className="text-red-600">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={handleNavClick(link.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeId === link.id
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {activeId === link.id && (
                  <span className="absolute inset-0 rounded-full bg-red-500/10 ring-1 ring-red-500/20 dark:bg-red-400/10 dark:ring-red-400/20" />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={handleNavClick("contact")}
            className="hidden rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-500/25 transition-all hover:scale-105 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/40 sm:inline-flex"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-black/10 px-3 text-xs font-medium text-zinc-500 transition-colors hover:border-black/20 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white sm:inline-flex"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path
                d="m21 21-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <kbd className="font-sans">&#8984;K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-700 dark:border-white/10 dark:text-zinc-300 md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-black/5 bg-white/95 backdrop-blur-xl dark:border-white/5 dark:bg-black/95 md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={handleNavClick(link.id)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    activeId === link.id
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
