import { projectCategories, projects } from "@/app/lib/data";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-24">
      <SectionHeading
        eyebrow={`${projects.length} projects`}
        title="Projects"
        description="Production portals and automations first, then smaller apps and infrastructure work."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {featured.map((p, i) => (
          <ProjectCard key={p.title} project={p} wide={i === 0} />
        ))}
      </div>

      <Reveal>
        <h3 className="mt-20 text-2xl font-semibold tracking-tight text-fg">Other projects</h3>
      </Reveal>
      <ul className="mt-6 border-t border-line">
        {more.map((p) => (
          <li key={p.title} className="border-b border-line">
            <Reveal>
              <div className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_110px] md:gap-10">
                <div>
                  <h4 className="font-semibold text-fg">{p.title}</h4>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {p.tags.length ? p.tags.join(", ") : projectCategories[p.category]}
                  </p>
                </div>
                <p className="leading-7 text-muted">{p.description}</p>
                <div className="flex gap-4 text-sm font-medium text-accent">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                      Live ↗
                    </a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
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
