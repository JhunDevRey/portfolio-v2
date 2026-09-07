import { navLinks, profile } from "@/app/lib/data";

const socialLinks = [
  { label: "GitHub", href: profile.social.github },
  { label: "LinkedIn", href: profile.social.linkedin },
  { label: "Facebook", href: profile.social.facebook },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 py-12">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {year} · Built with Next.js &amp; Tailwind CSS
          </p>
        </div>

        <ul className="flex items-center gap-2 text-sm">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="rounded-full px-3 py-1.5 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
