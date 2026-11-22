import Link from "next/link";
import { profile } from "@/app/lib/data";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-lg leading-8 text-muted">
        That address doesn&apos;t exist on this site.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-fg px-5 py-3 text-sm font-medium text-on-fg transition-opacity hover:opacity-85"
        >
          Back to home
        </Link>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg border border-line px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface"
        >
          Contact me
        </a>
      </div>
    </div>
  );
}
