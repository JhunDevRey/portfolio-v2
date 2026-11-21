import { certifications } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-24">
      <SectionHeading eyebrow={`${certifications.length} items`} title="Credentials" />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert.name} className="rounded-sm border border-line bg-surface">
            <Reveal>
              <div className="flex h-full flex-col justify-between gap-6 p-6">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-fg">
                  {cert.name}
                </h3>
                <p className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
                  {cert.issuer}
                  {cert.status === "in-progress" && (
                    <span className="border border-accent px-2 py-0.5 text-accent">In progress</span>
                  )}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
