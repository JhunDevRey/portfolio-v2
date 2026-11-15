import Image from "next/image";
import { profile } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

const highlights = [
  { label: "Based in", value: profile.location },
  { label: "Studying", value: "BS Information Technology" },
  { label: "Focus", value: "Full-stack & IT infrastructure" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionHeading eyebrow="About" title="A little about how I work" />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <Reveal delay={100} className="md:col-span-2">
          <SpotlightCard className="h-full p-8 sm:p-10">
            <p className="text-lg leading-8 text-zinc-300">{profile.bio}</p>
            <p className="mt-5 text-base leading-7 text-zinc-400">{profile.bioSecondary}</p>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={200} className="md:row-span-2">
          <SpotlightCard className="relative h-full min-h-80 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-red-600/25 to-transparent"
            />
            <Image
              src="/images/iam_me/profjhun1nbg.png"
              alt={profile.name}
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 backdrop-blur-md">
              <p className="text-sm font-semibold text-white">{profile.name}</p>
              <p className="text-xs text-zinc-400">{profile.role}</p>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={250} className="md:col-span-2">
          <SpotlightCard className="grid h-full gap-6 p-6 sm:grid-cols-3 sm:p-8">
            {highlights.map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                <p className="mt-2 font-medium text-white">{item.value}</p>
              </div>
            ))}
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
