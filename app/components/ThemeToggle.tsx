"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-700 transition-colors hover:border-black/20 hover:bg-black/5 dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-white/10"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
      >
        <path
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
          d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z"
        />
      </svg>
    </button>
  );
}
