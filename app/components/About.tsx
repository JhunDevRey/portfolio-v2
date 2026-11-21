import Image from "next/image";
import { profile, skillCategories } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-24">
      <SectionHeading eyebrow="Background" title="About" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-xl leading-9 text-fg">{profile.bio}</p>
          </Reveal>

          <dl className="mt-12 border-t border-line">
            {skillCategories.map((c) => (
              <Reveal key={c.name}>
                <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <dt className="font-mono text-xs text-muted sm:pt-1">{c.name}</dt>
                  <dd className="leading-7 text-fg">{c.items.join(", ")}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="order-first lg:order-last">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-sm border border-line bg-surface">
            <Image
              src="/images/iam_me/profjhun1nbg.png"
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="300px"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-3 text-center font-mono text-xs text-muted">BS Information Technology</p>
        </Reveal>
      </div>
    </section>
  );
}
