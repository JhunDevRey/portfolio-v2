import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="flex items-center gap-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          <span aria-hidden="true" className="h-3 w-3 shrink-0 bg-accent" />
          {title}
        </h2>
        <p className="hidden font-mono text-xs text-muted sm:block">{eyebrow}</p>
      </div>
      {description && <p className="mt-4 max-w-xl text-lg leading-8 text-muted">{description}</p>}
    </Reveal>
  );
}
