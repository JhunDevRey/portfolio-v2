import Link from "next/link";
import { profile } from "@/app/lib/data";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-bold tracking-tight text-red-600 dark:text-red-400 sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:bg-red-700"
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
