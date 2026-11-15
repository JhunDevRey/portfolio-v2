import { navLinks, profile } from "@/app/lib/data";

export function Nav() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-16 pt-8 sm:pt-12">
      <a href="#top" className="font-medium">
        {profile.name}
      </a>
      <nav aria-label="Sections">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resumeUrl} className="hover:text-fg">
              CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
