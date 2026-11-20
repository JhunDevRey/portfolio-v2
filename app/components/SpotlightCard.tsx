import type { ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`rounded-xl border border-line bg-surface ${className}`}>{children}</div>;
}
