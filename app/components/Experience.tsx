"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/app/lib/data";
import { Globe, type GlobePlace } from "./Globe";
import { SectionHeading } from "./SectionHeading";

const places: GlobePlace[] = [
  { id: "xdavao", label: "Davao City", location: [7.19, 125.46] },
  { id: "xcanada", label: "Canada (client)", location: [45.42, -75.7] },
];
const arcs = [{ from: places[0].location, to: places[1].location }];

// Where each role was done. Duque Immigration is a Canadian client served remotely.
const locationFor = (company: string) =>
  company === "Duque Immigration" ? places[1] : places[0];

export function Experience() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const focus = locationFor(experience[active].company).location;
  const tally = [
    { label: "Davao City", n: experience.filter((e) => e.company !== "Duque Immigration").length },
    { label: "Canadian client", n: experience.filter((e) => e.company === "Duque Immigration").length },
  ];

  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="Scroll through the roles and the globe follows. You can also drag it."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Globe places={places} arcs={arcs} focus={focus} className="mx-auto w-full max-w-[520px]" />
            <ul className="mt-6 flex justify-center gap-8 font-mono text-xs text-muted">
              {tally.map((t) => (
                <li key={t.label}>
                  <span className="text-lg font-semibold text-fg">{t.n}</span> {t.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="space-y-6">
          {experience.map((item, i) => (
            <li
              key={`${item.company}-${item.role}`}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className={`rounded-xl border p-6 transition-colors duration-300 sm:p-8 ${
                active === i ? "border-accent/60 bg-surface" : "border-line"
              }`}
            >
              <p className="font-mono text-xs text-muted">
                {item.period} · {locationFor(item.company).label}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{item.role}</h3>
              <p className="text-muted">{item.company}</p>
              <p className="mt-4 leading-7 text-fg">{item.description}</p>
              <ul className="mt-4 space-y-2.5">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-6 text-muted">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
