import Link from "next/link";
import { profile } from "@/app/lib/data";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]"
      />
      <p className="text-gradient text-8xl font-semibold tracking-tighter sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-zinc-200"
        >
          Back to home
        </Link>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
        >
          Contact me
        </a>
      </div>
    </div>
  );
}
