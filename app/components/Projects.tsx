import { projectCategories, projects, type Project } from "@/app/lib/data";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

function ProjectGroup({
  title,
  items,
  delayOffset,
}: {
  title: string;
  items: Project[];
  delayOffset: number;
}) {
  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      <Reveal>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
      </Reveal>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project, i) => (
          <Reveal key={project.title} delay={delayOffset + (i % 3) * 100}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const development = projects.filter((p) => p.category === "development");
  const technical = projects.filter((p) => p.category === "technical");

  return (
    <section
      id="projects"
      className="border-t border-black/5 bg-zinc-50/60 px-6 py-28 dark:border-white/5 dark:bg-white/[0.02]"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
            Projects
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Things I&apos;ve built
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A selection of products and tools I&apos;ve designed, built, and
            shipped end-to-end.
          </p>
        </Reveal>

        <ProjectGroup
          title={projectCategories.development}
          items={development}
          delayOffset={200}
        />
        <ProjectGroup
          title={projectCategories.technical}
          items={technical}
          delayOffset={200}
        />
      </div>
    </section>
  );
}
