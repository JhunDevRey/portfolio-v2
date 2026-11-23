import { profile } from "@/app/lib/data";
import { Globe, type GlobePlace } from "./Globe";

const places: GlobePlace[] = [
  { id: "davao", label: "Davao City", location: [7.19, 125.46] },
  { id: "canada", label: "Canada (client)", location: [45.42, -75.7] },
];
const arcs = [{ from: places[0].location, to: places[1].location }];

const facts = [
  { label: "Duque Immigration, current", value: "Full-Stack Developer" },
  { label: "IT & development", value: "5+ years" },
  { label: "Main stack", value: "PHP, Python, Next.js" },
  { label: "Based in", value: "Davao City" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      <div aria-hidden="true" className="glow pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center px-6 gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="pb-6 pt-16 lg:pb-32">
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.06em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {profile.role}
          </p>
          <h1 className="mt-5 text-5xl leading-[0.98] tracking-[-0.045em] text-fg sm:text-6xl lg:text-[76px]">
            I build web tools and <span className="text-accent">automations</span> for real client work.
          </h1>
          <p className="mt-7 max-w-xl text-[17px] leading-7 text-muted">
            {profile.tagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-[15px] font-medium text-on-fg transition-opacity hover:opacity-85"
            >
              See my work <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-6 py-3 text-[15px] font-medium text-fg transition-colors hover:bg-surface"
            >
              Hire me
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="px-3 py-3 text-sm text-muted transition-colors hover:text-fg"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="relative -mr-6 lg:-mr-24 lg:pb-16">
          <Globe places={places} arcs={arcs} className="mx-auto w-full max-w-[640px]" />
          <p className="absolute bottom-2 right-28 hidden max-w-[16rem] text-right text-sm text-muted lg:block">
            <strong className="font-medium text-fg">Davao City, Philippines.</strong> Home base,
            building for a Canadian client.{" "}
            <a href="#experience" className="text-accent">
              See where I&apos;ve worked →
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
      <dl className="grid grid-cols-2 gap-6 border-t border-line py-8 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="font-mono text-xs uppercase tracking-[0.06em] text-muted">{f.label}</dt>
            <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em] text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
}
