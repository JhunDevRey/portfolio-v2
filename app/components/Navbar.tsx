"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/app/lib/data";
import { pixelDissolve } from "@/app/lib/pixelDissolve";

function ThemeToggle() {
  const toggle = () => {
    pixelDissolve(() => {
      const toDark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", toDark);
      try {
        localStorage.setItem("theme", toDark ? "dark" : "light");
      } catch {}
    });
  };
  return (
    <button
      type="button"
      aria-label="Toggle light and dark theme"
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-surface"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="shrink-0 whitespace-nowrap font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.03em] text-fg">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[15px] transition-colors ${
                  activeId === link.id ? "bg-surface text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            download
            className="hidden whitespace-nowrap rounded-full border border-line px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface sm:inline-flex"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="hidden whitespace-nowrap rounded-full bg-fg px-4 py-2 text-[15px] font-medium text-on-fg transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Hire me
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg lg:hidden"
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
        <div className="border-t border-line bg-background px-6 pb-4 lg:hidden">
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
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
