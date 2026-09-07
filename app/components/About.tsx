import Image from "next/image";
import { profile } from "@/app/lib/data";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <span className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
          About
        </span>
      </Reveal>

      <div className="mt-4 grid gap-12 md:grid-cols-5">
        <Reveal delay={100} className="md:col-span-3">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            A little about how I work
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {profile.bio}
          </p>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {profile.bioSecondary}
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M12 21s-7-6.1-9.3-10.2C.9 7.6 2.6 4 6.1 4c2 0 3.4 1 4.9 2.7C12.5 5 13.9 4 15.9 4c3.5 0 5.2 3.6 3.4 6.8C19 14.9 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Based in {profile.location}
          </div>
        </Reveal>

        <Reveal delay={200} className="md:col-span-2">
          <div className="relative aspect-square w-full max-w-sm">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 -z-10 animate-blob rounded-full bg-red-500/15 blur-2xl dark:bg-red-500/10"
            />
            <div className="glow-accent relative h-full w-full overflow-hidden rounded-3xl border-2 border-red-500/30 dark:border-red-400/30">
              <Image
                src="/images/iam_me/jhunprof-v2.png"
                alt={profile.name}
                fill
                sizes="(min-width: 768px) 24rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
