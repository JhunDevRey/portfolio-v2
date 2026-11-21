import Image from "next/image";
import type { Project } from "@/app/lib/data";
import { Reveal } from "./Reveal";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images?.[0];
  const linkCls = "font-medium text-accent underline-offset-4 hover:underline";

  return (
    <Reveal className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface">
        <div className="relative aspect-[2/1] border-b border-line bg-background">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center text-6xl font-semibold text-line"
            >
              {project.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-semibold tracking-tight text-fg">
            {project.title}
          </h3>
          <p className="mt-4 flex-1 leading-7 text-muted">{project.description}</p>
          {project.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li key={t} className="border border-line px-2 py-1 font-mono text-[11px] text-fg">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-6 flex gap-6 text-sm">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Live site ↗
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Source ↗
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
