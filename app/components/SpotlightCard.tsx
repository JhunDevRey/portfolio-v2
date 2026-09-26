"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

// Writes the cursor position to CSS vars instead of state so hovering doesn't re-render.
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`glass spotlight ease-smooth relative rounded-3xl transition-all duration-500 hover:border-white/15 ${className}`}
    >
      {children}
    </div>
  );
}
