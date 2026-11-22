"use client";

import { MAP_H, MAP_W, type WorldMap } from "@/app/lib/worldMap";

type Props = {
  map: WorldMap;
  /** id of the pin to fly to, or null for the whole-world view. */
  focusId: string | null;
  onPinClick?: (id: string) => void;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function ExperienceMap({ map, focusId, onPinClick }: Props) {
  const target = map.pins.find((p) => p.id === focusId) ?? null;
  const k = target?.zoom ?? 1;

  // Center the focused pin, but never pan past the edge of the map.
  const tx = target ? clamp(MAP_W / 2 - k * target.x, MAP_W - k * MAP_W, 0) : 0;
  const ty = target ? clamp(MAP_H / 2 - k * target.y, MAP_H - k * MAP_H, 0) : 0;

  const highlighted = new Set(map.pins.map((p) => p.country));

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        role="img"
        aria-label={`World map with pins for ${map.pins.map((p) => p.label).join(" and ")}`}
        className="block h-auto w-full"
      >
        <g
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${k})`,
            transformOrigin: "0 0",
            transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {map.countries.map((c) => {
            const on = highlighted.has(c.name);
            return (
              <path
                key={c.name}
                d={c.d}
                vectorEffect="non-scaling-stroke"
                style={{
                  fill: on ? "color-mix(in srgb, var(--accent) 28%, transparent)" : "var(--line)",
                  stroke: on ? "var(--accent)" : "var(--background)",
                  strokeWidth: on ? 1.25 : 0.6,
                }}
              />
            );
          })}

          {map.pins.map((p) => {
            const active = p.id === focusId;
            return (
              <g
                key={p.id}
                transform={`translate(${p.x} ${p.y})`}
                className="cursor-pointer"
                onClick={() => onPinClick?.(p.id)}
              >
                {active && (
                  <circle r={14 / k} fill="none" style={{ stroke: "var(--accent)" }} strokeWidth={1.5 / k}>
                    <animate attributeName="r" from={5 / k} to={20 / k} dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle r={5.5 / k} style={{ fill: "var(--accent)", stroke: "var(--background)" }} strokeWidth={1.5 / k} />
                <text
                  y={-12 / k}
                  textAnchor="middle"
                  fontSize={13 / k}
                  style={{
                    fill: "var(--foreground)",
                    stroke: "var(--background)",
                    strokeWidth: 3 / k,
                    paintOrder: "stroke",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
