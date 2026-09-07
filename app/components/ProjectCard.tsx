import type { Project } from "@/app/lib/data";
import { ProjectGallery } from "./ProjectGallery";

export function ProjectCard({ project }: { project: Project }) {
  const hasImages = Boolean(project.images && project.images.length > 0);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/20 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-red-500/30">
      <div
        className={`relative h-40 w-full overflow-hidden ${
          hasImages ? "" : `bg-gradient-to-br ${project.gradient}`
        }`}
      >
        {hasImages ? (
          <ProjectGallery images={project.images!} alt={project.title} />
        ) : (
          <>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125"
            />
          </>
        )}
        {project.featured && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/5 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.repoUrl) && (
        <div className="mt-6 flex items-center gap-4 border-t border-black/5 pt-4 text-sm font-medium dark:border-white/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-700 transition-colors hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400"
            >
              Live site
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
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
              className="inline-flex items-center gap-1.5 text-zinc-700 transition-colors hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400"
            >
              Source
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
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
    </div>
  );
}
