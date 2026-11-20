import Image from "next/image";
import { profile, skillCategories } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const highlights = [
  { label: "Based in", value: profile.location },
  { label: "Education", value: "BS Information Technology" },
  { label: "Focus", value: "Full-stack & automation" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-28">
      <SectionHeading eyebrow="About me" title="How I work" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-surface">
            <Image
              src="/images/iam_me/profjhun1nbg.png"
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="max-w-3xl text-xl leading-9 text-fg">{profile.bio}</p>
          </Reveal>
          <Reveal delay={80}>
            <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.label}>
                  <dt className="font-mono text-xs text-muted">{h.label}</dt>
                  <dd className="mt-2 font-medium text-fg">{h.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2">
            {skillCategories.map((c, i) => (
              <Reveal key={c.name} delay={i * 50}>
                <h3 className="font-mono text-xs text-muted">{c.name}</h3>
                <p className="mt-3 leading-7 text-fg">{c.items.join(" · ")}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
