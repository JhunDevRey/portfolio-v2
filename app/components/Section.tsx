import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-8 border-t border-line pt-10 sm:mt-20">
      <h2 className="text-sm font-medium text-muted">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
