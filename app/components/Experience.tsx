import { experience } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-24">
      <SectionHeading eyebrow="Work history" title="Career" />

      <ol className="mt-12 border-t border-line">
        {experience.map((item) => (
          <li key={`${item.company}-${item.role}`} className="border-b border-line">
            <Reveal>
              <div className="grid gap-4 py-10 md:grid-cols-[220px_1fr] md:gap-12">
                <div>
                  <p className="font-mono text-xs text-accent">{item.period}</p>
                  <p className="mt-2 font-semibold text-fg">{item.company}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-fg">{item.role}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-muted">{item.description}</p>
                  <ul className="mt-5 max-w-2xl space-y-2.5">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-6 text-fg/90">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
