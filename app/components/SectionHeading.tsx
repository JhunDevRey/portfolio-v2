import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  number?: string;
};

export function SectionHeading({ eyebrow, title, description, number }: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-2 lg:items-end">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.06em] text-muted">
          {number && <span className="text-accent">[{number}]</span>}
          {eyebrow}
        </p>
        <h2 className="mt-4 text-4xl leading-[1.05] tracking-[-0.035em] text-fg sm:text-6xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={100}>
          <p className="max-w-lg text-[17px] leading-7 text-muted lg:ml-auto">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
