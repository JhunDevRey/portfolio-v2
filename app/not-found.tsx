import Link from "next/link";
import { profile } from "@/app/lib/data";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <p className=" text-8xl font-semibold tracking-tighter sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-on-fg transition-all hover:-translate-y-0.5 hover:opacity-85"
        >
          Back to home
        </Link>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg transition-all hover:-translate-y-0.5 hover:border-line hover:bg-surface"
        >
          Contact me
        </a>
      </div>
    </div>
  );
}
