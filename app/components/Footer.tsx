import { navLinks, profile } from "@/app/lib/data";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

const socialLinks = [
  { label: "GitHub", href: profile.social.github },
  { label: "LinkedIn", href: profile.social.linkedin },
  { label: "Facebook", href: profile.social.facebook },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-6">
      <Reveal className="glass mx-auto max-w-6xl rounded-3xl px-6 py-8 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <p className="text-sm font-semibold text-white">{profile.name}</p>
              <p className="text-xs text-zinc-500">{profile.role}</p>
            </div>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="rounded-full px-3 py-1.5 text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-500">
            &copy; {year} · Built with Next.js &amp; Tailwind CSS
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </footer>
  );
}
