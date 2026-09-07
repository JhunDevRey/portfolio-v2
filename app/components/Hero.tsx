import Image from "next/image";
import { profile, stats } from "@/app/lib/data";
import { TypingText } from "./TypingText";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(220,38,38,0.12),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 animate-blob rounded-full bg-gradient-to-tr from-red-400/30 via-rose-400/20 to-amber-400/30 blur-3xl dark:from-red-500/20 dark:via-rose-500/15 dark:to-amber-500/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-[26rem] w-[26rem] animate-blob rounded-full bg-gradient-to-tr from-amber-400/20 via-rose-400/15 to-red-400/20 blur-3xl [animation-delay:-9s] dark:from-amber-500/15 dark:via-rose-500/10 dark:to-red-500/15"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="w-full lg:max-w-2xl">
          <p className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 text-sm font-medium text-red-600 dark:border-red-400/20 dark:bg-red-400/5 dark:text-red-400">
            Hi, my name is {profile.name} <span className="wave">👋</span>
          </p>

          <h1 className="mt-4 max-w-3xl animate-fade-in-up text-5xl font-bold tracking-tight text-zinc-900 [animation-delay:100ms] [animation-fill-mode:backwards] dark:text-white sm:text-6xl md:text-7xl">
            I&apos;m a
            <span className="block">
              <TypingText words={profile.roles} />
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-in-up text-lg leading-8 text-zinc-600 [animation-delay:200ms] [animation-fill-mode:backwards] dark:text-zinc-400">
            {profile.tagline}
          </p>

          <div className="mt-10 flex animate-fade-in-up flex-wrap items-center gap-4 [animation-delay:300ms] [animation-fill-mode:backwards]">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-500/40"
            >
              View my work
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-red-500/20 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-red-500/40 hover:bg-red-500/5 dark:border-red-400/20 dark:text-white dark:hover:border-red-400/40 dark:hover:bg-red-400/5"
            >
              Get in touch
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download CV
            </a>
          </div>

          <dl className="mt-20 grid animate-fade-in-up grid-cols-2 gap-8 [animation-delay:400ms] [animation-fill-mode:backwards] sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</dt>
                <dd className="gradient-text mt-1 text-3xl font-bold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden shrink-0 animate-fade-in-up [animation-delay:250ms] [animation-fill-mode:backwards] lg:block">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/4 rounded-full bg-gradient-to-tr from-red-500/25 via-rose-500/15 to-amber-500/25 blur-3xl"
          />
          <Image
            src="/images/iam_me/936a4268-785a-4d9d-8444-0e133c91da0c.png"
            alt={profile.name}
            width={420}
            height={560}
            priority
            className="h-[28rem] w-auto object-contain drop-shadow-2xl xl:h-[34rem]"
          />
        </div>
      </div>
    </section>
  );
}
