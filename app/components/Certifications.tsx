import { certifications } from "@/app/lib/data";
import { Reveal } from "./Reveal";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="border-t border-black/5 px-6 py-28 dark:border-white/5"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
            Certifications
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Credentials &amp; badges
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={150 + i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.75" />
                      <path
                        d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      cert.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {cert.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
