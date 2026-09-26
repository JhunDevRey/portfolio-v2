import { experience, skillCategories } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

export function Experience() {
  const allSkills = skillCategories.flatMap((category) => category.items);

  return (
    <section id="experience" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Experience & Skills"
          title={<>Where I&apos;ve worked, what I use</>}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          <ol className="relative space-y-4 lg:col-span-3">
            {experience.map((item, i) => (
              <Reveal as="li" key={`${item.company}-${item.role}`} delay={i * 100}>
                <SpotlightCard className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                      <p className="mt-0.5 text-sm text-zinc-400">{item.company}</p>
                    </div>
                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">{item.description}</p>
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm text-zinc-400">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                        >
                          <path
                            d="m5 12 4.5 4.5L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </ol>

          <div className="lg:col-span-2">
            <div className="space-y-4 lg:sticky lg:top-28">
              {skillCategories.map((category, i) => (
                <Reveal key={category.name} delay={100 + i * 80}>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {category.name}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="ease-smooth rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative mt-24 overflow-hidden border-y border-white/5 py-5 [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-10">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="flex items-center gap-10 whitespace-nowrap text-2xl font-semibold tracking-tight text-zinc-700"
            >
              {skill}
              <span className="text-red-500/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
