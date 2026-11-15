import { profile } from "@/app/lib/data";

const links = [
  { label: "GitHub", href: profile.social.github },
  { label: "LinkedIn", href: profile.social.linkedin },
  { label: "Facebook", href: profile.social.facebook },
  { label: "Source", href: "https://github.com/JhunDevRey/portfolio-v2" },
];

export function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line py-8 text-sm text-muted sm:mt-20">
      <p>
        &copy; {new Date().getFullYear()} {profile.name}
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
