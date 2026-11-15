"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/app/lib/data";
import { Logo } from "./Logo";

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
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`ease-smooth mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-white/10 bg-zinc-950/70 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={handleNavClick("top")}
          aria-label={`${profile.name} — back to top`}
          className="ease-smooth flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white transition-opacity duration-300 hover:opacity-80"
        >
          <Logo size={30} />
          <span className="hidden sm:inline">{profile.name.split(" ")[0]}</span>
        </a>

        <ul className="hidden items-center md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={handleNavClick(link.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 lg:px-4 ${
                  activeId === link.id ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`ease-smooth absolute inset-0 rounded-full bg-white/[0.08] transition-all duration-300 ${
                    activeId === link.id ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  }`}
                />
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white sm:inline-flex"
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
          <a
            href="#contact"
            onClick={handleNavClick("contact")}
            className="ease-smooth hidden whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-zinc-200 sm:inline-flex"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-white/[0.06] md:hidden"
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
                  d="M4 8h16M4 16h16"
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
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="animate-backdrop-in fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {menuOpen && (
        <div className="animate-modal-in mx-auto mt-2 max-w-5xl rounded-3xl border border-white/10 bg-zinc-950/90 p-2 shadow-2xl backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={handleNavClick(link.id)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-colors duration-200 ${
                    activeId === link.id
                      ? "bg-white/[0.06] text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {activeId === link.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
