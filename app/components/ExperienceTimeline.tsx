"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/app/lib/data";
import type { WorldMap } from "@/app/lib/worldMap";
import { ExperienceMap } from "./ExperienceMap";

// Duque Immigration is a Canadian client served remotely; every other role was in Davao City.
const pinFor = (company: string) => (company === "Duque Immigration" ? "canada" : "davao");

export function ExperienceTimeline({ map }: { map: WorldMap }) {
  // -1 means no role is in view yet, so the map shows the whole world.
  const [active, setActive] = useState(-1);
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

  const focusId = active >= 0 ? pinFor(experience[active].company) : null;

  const goToFirstRole = (pinId: string) => {
    const i = experience.findIndex((e) => pinFor(e.company) === pinId);
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const labelFor = (company: string) =>
    map.pins.find((p) => p.id === pinFor(company))?.label ?? "";

  const tally = map.pins.map((p) => ({
    label: p.label,
    n: experience.filter((e) => pinFor(e.company) === p.id).length,
  }));

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ExperienceMap map={map} focusId={focusId} onPinClick={goToFirstRole} />
          <ul className="mt-6 flex justify-center gap-8 font-mono text-xs uppercase tracking-[0.06em] text-muted">
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
            className={`rounded-[20px] border p-6 transition-colors duration-300 sm:p-8 ${
              active === i ? "border-accent/60 bg-surface" : "border-line"
            }`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.06em] text-muted">
              {item.period} · {labelFor(item.company)}
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
  );
}
