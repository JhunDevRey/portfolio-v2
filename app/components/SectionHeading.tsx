import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-2 lg:items-end">
      <Reveal>
        <p className="font-mono text-sm text-muted">{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={100}>
          <p className="max-w-lg text-lg leading-8 text-muted lg:ml-auto">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
