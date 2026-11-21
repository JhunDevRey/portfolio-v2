"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/app/lib/data";

function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      type="button"
      aria-label="Switch between light and dark theme"
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-line text-fg transition-colors hover:bg-surface"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" />
      </svg>
    </button>
  );
}

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5 text-[15px] font-semibold text-fg">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-accent" />
          {profile.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`border-b-2 py-1 text-sm transition-colors ${
                    activeId === link.id
                      ? "border-accent text-fg"
                      : "border-transparent text-muted hover:text-fg"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href={profile.resumeUrl}
              download
              className="font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              CV ↓
            </a>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-line text-fg"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"}
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-background px-6 pb-4 md:hidden">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resumeUrl} download className="block py-3 text-base text-muted">
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
