import Image from "next/image";
import { profile, stats } from "@/app/lib/data";
import { TypingText } from "./TypingText";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-12rem] -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-[140px]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="w-full lg:max-w-2xl">
          <p className="inline-flex animate-fade-in-up items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-sm text-zinc-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work · {profile.location}
          </p>

          <h1 className="mt-7 animate-fade-in-up text-5xl font-semibold tracking-tight text-white [animation-delay:100ms] [animation-fill-mode:backwards] sm:text-6xl md:text-7xl">
            <span className="text-gradient">Hi, I&apos;m {profile.name.split(" ")[0]}</span>
            <span className="mt-2 block text-3xl font-medium text-zinc-500 sm:text-4xl md:text-5xl">
              <TypingText words={profile.roles} />
            </span>
          </h1>

          <p className="mt-7 max-w-xl animate-fade-in-up text-lg leading-8 text-zinc-400 [animation-delay:200ms] [animation-fill-mode:backwards]">
            {profile.tagline}
          </p>

          <div className="mt-10 flex animate-fade-in-up flex-wrap items-center gap-3 [animation-delay:300ms] [animation-fill-mode:backwards]">
            <a
              href="#projects"
              className="ease-smooth group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-6px_rgb(239_68_68/0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 active:translate-y-0"
            >
              View my work
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="ease-smooth h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              className="ease-smooth inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
            >
              Get in touch
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
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

          <dl className="mt-16 grid animate-fade-in-up grid-cols-2 gap-3 [animation-delay:400ms] [animation-fill-mode:backwards] sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass flex flex-col-reverse rounded-2xl px-4 py-4">
                <dt className="mt-1 text-xs text-zinc-500">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden shrink-0 animate-fade-in-up [animation-delay:250ms] [animation-fill-mode:backwards] lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 bottom-10 top-24 -z-10 rounded-full bg-red-600/25 blur-3xl"
          />
          <Image
            src="/images/iam_me/profjhun1nbg.png"
            alt={profile.name}
            width={420}
            height={560}
            priority
            className="h-[28rem] w-auto animate-float object-contain [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] xl:h-[34rem]"
          />
        </div>
      </div>
    </section>
  );
}
