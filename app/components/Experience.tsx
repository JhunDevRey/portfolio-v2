import { experience } from "@/app/lib/data";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p className="text-sm text-muted sm:pt-0.5">{job.period}</p>
            <div className="mt-1 sm:mt-0">
              <h3 className="font-medium">{job.role}</h3>
              <p className="text-muted">{job.company}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-6 marker:text-muted">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
