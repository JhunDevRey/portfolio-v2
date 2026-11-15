import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgb(239_68_68/0.6)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="text-gradient mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={150}>
          <p className="mt-5 text-lg leading-8 text-zinc-400">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
