import { projectCategories, projects } from "@/app/lib/data";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-28">
      <SectionHeading
        number="01"
        eyebrow="Selected work"
        title="Work"
        description="Production portals and automations first, then smaller apps and infrastructure work."
      />

      <div>
        {featured.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <Reveal>
        <h3 className="mt-16 font-mono text-sm text-muted">
          More projects
        </h3>
      </Reveal>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {more.map((p) => (
          <li key={p.title}>
            <Reveal>
              <div className="grid gap-3 py-6 md:grid-cols-[1fr_2fr_110px] md:items-baseline md:gap-8">
                <div>
                  <h4 className="text-lg font-semibold tracking-tight text-fg">{p.title}</h4>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.06em] text-muted">
                    {p.tags.length ? p.tags.join(" / ") : projectCategories[p.category]}
                  </p>
                </div>
                <p className="leading-7 text-muted">{p.description}</p>
                <div className="flex gap-4 text-sm font-medium text-accent">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live ↗
                    </a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
