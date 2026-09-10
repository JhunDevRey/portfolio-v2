"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks, profile } from "@/app/lib/data";
import { useTheme } from "./ThemeProvider";

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Social";
  keywords?: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggleTheme } = useTheme();

  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const goTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openExternal = (url: string) => () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const commands: Command[] = useMemo(
    () => [
      { id: "nav-top", label: "Go to Top", group: "Navigate", run: goTo("top") },
      ...navLinks.map((link) => ({
        id: `nav-${link.id}`,
        label: `Go to ${link.label}`,
        group: "Navigate" as const,
        run: goTo(link.id),
      })),
      {
        id: "action-resume",
        label: "Download Resume",
        group: "Actions",
        keywords: "cv pdf download",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      {
        id: "action-email",
        label: `Email ${profile.email}`,
        group: "Actions",
        keywords: "contact mail",
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "action-theme",
        label: "Toggle Light / Dark Theme",
        group: "Actions",
        keywords: "dark light mode appearance",
        run: toggleTheme,
      },
      {
        id: "social-github",
        label: "Open GitHub Profile",
        group: "Social",
        keywords: "github code repos",
        run: openExternal(profile.social.github),
      },
      {
        id: "social-linkedin",
        label: "Open LinkedIn Profile",
        group: "Social",
        keywords: "linkedin",
        run: openExternal(profile.social.linkedin),
      },
      {
        id: "social-facebook",
        label: "Open Facebook Profile",
        group: "Social",
        keywords: "facebook",
        run: openExternal(profile.social.facebook),
      },
    ],
    [toggleTheme]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setActiveIndex(0);
        return;
      }
      if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onOpenRequest = () => {
      setOpen(true);
      setActiveIndex(0);
    };
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => window.removeEventListener("open-command-palette", onOpenRequest);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) {
        cmd.run();
        close();
      }
    }
  };

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
      <div
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900"
      >
        <div className="flex items-center gap-3 border-b border-black/5 px-4 py-3 dark:border-white/10">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-zinc-400">
            <path
              d="m21 21-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Jump to a section, run an action..."
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
          />
          <kbd className="hidden shrink-0 rounded border border-black/10 px-1.5 py-0.5 text-xs text-zinc-400 dark:border-white/10 sm:inline-block">
            Esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No matches.
            </p>
          )}
          {(["Navigate", "Actions", "Social"] as const).map((group) => {
            const items = filtered.filter((c) => c.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {group}
                </p>
                {items.map((cmd) => {
                  runningIndex += 1;
                  const isActive = runningIndex === activeIndex;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(runningIndex)}
                      onClick={() => {
                        cmd.run();
                        close();
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {cmd.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-black/5 px-4 py-2.5 text-xs text-zinc-400 dark:border-white/10 dark:text-zinc-500">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
