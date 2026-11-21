import { profile } from "@/app/lib/data";

// Real pipeline from the Duque Immigration contract project (see projects in data.ts).
const pipeline = [
  { name: "WordPress form", note: "Client submits their details" },
  { name: "Make.com scenario", note: "Picks up the submission" },
  { name: "Flask service", note: "Fills the Word contract template" },
  { name: "Documenso", note: "Two-party e-signature" },
];

export function Hero() {
  return (
    <section id="top" className="px-6 pt-16">
      <div className="mx-auto grid max-w-7xl gap-14 py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:py-28">
        <div>
          <p className="flex animate-fade-in-up items-center gap-3 font-mono text-xs text-muted">
            <span aria-hidden="true" className="h-2 w-2 bg-accent" />
            {profile.location} · Full-Stack Developer, AI &amp; Automation
          </p>
          <h1 className="mt-6 animate-fade-in-up text-5xl font-semibold leading-[1.02] tracking-tight text-fg [animation-delay:80ms] sm:text-6xl lg:text-[5.25rem]">
            Web tools and{" "}
            <span className="underline decoration-accent decoration-[5px] underline-offset-[10px]">
              automations
            </span>{" "}
            for real client work.
          </h1>
          <p className="mt-8 max-w-xl animate-fade-in-up text-lg leading-8 text-muted [animation-delay:160ms]">
            {profile.tagline}
          </p>
          <div className="mt-10 flex animate-fade-in-up flex-wrap items-center gap-3 [animation-delay:240ms]">
            <a
              href="#projects"
              className="rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-85"
            >
              Selected projects ↓
            </a>
            <a
              href="#contact"
              className="rounded-sm border border-fg px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-fg hover:text-on-fg"
            >
              Contact
            </a>
          </div>
        </div>

        <aside
          aria-label="Example of a pipeline I built"
          className="animate-fade-in-up rounded-sm border border-line bg-surface p-6 [animation-delay:200ms] sm:p-8"
        >
          <p className="font-mono text-xs text-muted">Built for Duque Immigration</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-fg">
            Contract and e-signature pipeline
          </h2>
          <ol className="mt-7">
            {pipeline.map((step, i) => (
              <li key={step.name} className="relative flex gap-4 pb-6 last:pb-0">
                {i < pipeline.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[13px] top-8 h-[calc(100%-2rem)] w-px bg-line"
                  />
                )}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-fg bg-background font-mono text-xs text-fg">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-fg">{step.name}</p>
                  <p className="text-sm text-muted">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
