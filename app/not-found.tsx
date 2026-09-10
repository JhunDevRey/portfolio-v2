import Link from "next/link";
import { profile } from "@/app/lib/data";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(220,38,38,0.12),transparent)]"
      />

      <p className="gradient-text text-8xl font-bold tracking-tight sm:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-500/40"
        >
          Back to home
        </Link>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-red-500/20 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-red-500/40 hover:bg-red-500/5 dark:border-red-400/20 dark:text-white dark:hover:border-red-400/40 dark:hover:bg-red-400/5"
        >
          Contact me
        </a>
      </div>
    </div>
  );
}
