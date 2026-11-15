import { projects } from "@/app/lib/data";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="divide-y divide-line">
        {projects.map((project) => (
          <li key={project.title} className="py-5 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium [overflow-wrap:anywhere]">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line hover:decoration-fg"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <span className="text-sm text-muted">{project.year}</span>
            </div>
            <p className="mt-1.5 text-[15px] leading-6">{project.description}</p>
            <p className="mt-1.5 text-sm text-muted">
              {project.stack}
              {project.note ? ` · ${project.note}` : ""}
              {project.url && project.urlLabel ? (
                <>
                  {" · "}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line hover:text-fg hover:decoration-fg"
                  >
                    {project.urlLabel}
                  </a>
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
