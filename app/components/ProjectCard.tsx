import Image from "next/image";
import type { Project } from "@/app/lib/data";
import { Reveal } from "./Reveal";

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const cover = project.images?.[0];
  const linkCls = "font-medium text-accent underline-offset-4 hover:underline";

  return (
    <Reveal className={wide ? "md:col-span-2" : ""}>
      <article
        className={`grid h-full overflow-hidden rounded-sm border border-line bg-surface ${
          wide ? "md:grid-cols-[1.2fr_1fr]" : ""
        }`}
      >
        <div className="relative aspect-[16/10] border-b border-line bg-background md:border-b-0">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} screenshot`}
              fill
              sizes={wide ? "(min-width: 768px) 640px, 100vw" : "(min-width: 768px) 560px, 100vw"}
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
        <div className="flex flex-col p-6 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
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
