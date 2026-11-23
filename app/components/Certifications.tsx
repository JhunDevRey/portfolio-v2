import { certifications } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-28">
      <SectionHeading number="04" eyebrow="Education & credentials" title="Certifications" />
      <ul className="divide-y divide-line">
        {certifications.map((cert) => (
          <li key={cert.name}>
            <Reveal>
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-lg font-medium tracking-tight text-fg">{cert.name}</h3>
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.06em] text-muted">
                  {cert.issuer}
                  <span
                    className={`rounded-md border px-2 py-0.5 ${
                      cert.status === "completed"
                        ? "border-line text-muted"
                        : "border-accent/50 text-accent"
                    }`}
                  >
                    {cert.status === "completed" ? "Completed" : "In progress"}
                  </span>
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
