import { profile } from "@/app/lib/data";

const socialLinks = [
  { label: "GitHub", href: profile.social.github },
  { label: "LinkedIn", href: profile.social.linkedin },
  { label: "Facebook", href: profile.social.facebook },
  { label: "Email", href: `mailto:${profile.email}` },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-7xl border-t border-line px-6 py-10">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; {year} {profile.name}. {profile.location}.
        </p>
        <ul className="flex flex-wrap items-center gap-6 text-sm">
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="link-underline text-muted transition-colors hover:text-fg"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="link-underline text-fg">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
