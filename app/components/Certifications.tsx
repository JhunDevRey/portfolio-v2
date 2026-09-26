import { certifications } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Certifications" title="Credentials & badges" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={150 + i * 100}>
              <SpotlightCard className="group flex h-full flex-col p-7">
                <div className="flex items-start justify-between">
                  <div className="ease-smooth flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
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
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                      cert.status === "completed"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                        : "border-amber-500/20 bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        cert.status === "completed" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {cert.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-white">{cert.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{cert.issuer}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
