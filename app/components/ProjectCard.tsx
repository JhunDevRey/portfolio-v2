import type { Project } from "@/app/lib/data";
import { ProjectGallery } from "./ProjectGallery";
import { SpotlightCard } from "./SpotlightCard";

export function ProjectCard({ project }: { project: Project }) {
  const hasImages = Boolean(project.images && project.images.length > 0);

  return (
    <SpotlightCard className="group flex h-full flex-col p-2 hover:-translate-y-1">
      <div
        className={`relative h-44 w-full overflow-hidden rounded-2xl ${
          hasImages ? "" : `bg-gradient-to-br ${project.gradient}`
        }`}
      >
        {hasImages ? (
          <div className="ease-smooth h-full w-full transition-transform duration-500 group-hover:scale-105">
            <ProjectGallery images={project.images!} alt={project.title} />
          </div>
        ) : (
          <>
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
            <span
              aria-hidden="true"
              className="ease-smooth absolute bottom-4 left-5 text-5xl font-semibold tracking-tighter text-white/90 transition-transform duration-500 group-hover:-translate-y-1"
            >
              {project.title
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </span>
          </>
        )}
        {project.featured && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-zinc-400">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(project.liveUrl || project.repoUrl) && (
        <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-sm font-medium">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-zinc-300 transition-colors hover:text-white"
            >
              Live site
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="ease-smooth h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              >
                <path
                  d="M7 17 17 7M8 7h9v9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-zinc-300 transition-colors hover:text-white"
            >
              Source
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="ease-smooth h-3.5 w-3.5 transition-transform duration-300 group-hover/link:rotate-12"
              >
                <path
                  d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
        )}
      </div>
    </SpotlightCard>
  );
}
