import { projectCategories, projects, type Project } from "@/app/lib/data";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

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
        <div className="flex items-center gap-4">
          <h3 className="shrink-0 text-sm font-medium uppercase tracking-[0.18em] text-zinc-400">
            {title}
          </h3>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-sm tabular-nums text-zinc-600">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    <section id="projects" className="relative isolate scroll-mt-24 overflow-x-clip px-6 py-28">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-40 -z-10 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]"
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title={<>Things I&apos;ve built</>}
          description={
            <>A selection of products and tools I&apos;ve designed, built, and shipped end-to-end.</>
          }
        />

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
