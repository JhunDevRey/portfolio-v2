import { experience, skillCategories } from "@/app/lib/data";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <span className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
          Experience &amp; Skills
        </span>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Where I&apos;ve worked, what I use
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ol className="relative space-y-10 pl-8">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-px bg-zinc-200 dark:bg-white/10"
            />
            {experience.map((item, i) => (
              <Reveal as="li" key={item.company} delay={i * 100} className="relative">
                <span
                  aria-hidden="true"
                  className="glow-accent absolute -left-[2.31rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-red-600 dark:border-zinc-950"
                />
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {item.period}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-white">
                  {item.role} · {item.company}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{item.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-2">
          <Reveal>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Toolbox
            </h3>
          </Reveal>
          <div className="mt-6 space-y-6">
            {skillCategories.map((category, i) => (
              <Reveal key={category.name} delay={100 + i * 80}>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {category.name}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-red-300 hover:bg-red-500/10 hover:text-red-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-red-500/40 dark:hover:text-red-400"
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
    </section>
  );
}
