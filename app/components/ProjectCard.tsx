import Image from "next/image";
import type { Project } from "@/app/lib/data";
import { Reveal } from "./Reveal";

function Links({ project }: { project: Project }) {
  const cls = "text-sm font-medium text-accent transition-opacity hover:opacity-75";
  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={cls}>
          Live site ↗
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={cls}>
          Source code ↗
        </a>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cover = project.images?.[0];
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <article className="grid items-center gap-8 border-b border-line py-12 lg:grid-cols-2 lg:gap-16">
        <div
          className={`relative aspect-[2/1] overflow-hidden rounded-xl border border-line bg-surface ${
            flip ? "lg:order-2" : ""
          }`}
        >
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center text-6xl font-semibold tracking-tighter text-line"
            >
              {project.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
            </span>
          )}
        </div>
        <div>
          <p className="font-mono text-xs text-muted">
            {number}. {project.category === "development" ? "Web, app & automation" : "Network & systems"}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-fg/90">{project.description}</p>
          {project.tags.length > 0 && (
            <p className="mt-5 font-mono text-xs text-muted">{project.tags.join(" / ")}</p>
          )}
          <Links project={project} />
        </div>
      </article>
    </Reveal>
  );
}
