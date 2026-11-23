import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Kept for call-site compatibility; sections no longer animate in. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

export function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const Tag = as;
  return <Tag className={className || undefined}>{children}</Tag>;
}
