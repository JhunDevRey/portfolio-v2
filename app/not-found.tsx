import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-5 sm:px-6">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-2 text-xl font-medium">There&apos;s nothing at this address.</h1>
      <p className="mt-4">
        <Link href="/" className="underline decoration-line hover:decoration-fg">
          Back to the home page
        </Link>
      </p>
    </main>
  );
}
