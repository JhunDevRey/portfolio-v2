"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";
import { geoInterpolate, geoMercator, geoPath, type GeoProjection } from "d3-geo";
import type { GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";

export type HeroNode = {
  id: string;
  label: string;
  sub: string;
  /** Name of the country as it appears in the world-atlas data. */
  country: string;
  /** [longitude, latitude] */
  location: [number, number];
};

/** id of the empty element in the hero layout where the two pins should land. */
export const HERO_MAP_TARGET = "hero-map-target";

// The kinds of traffic that move between home base and the client.
const events = [
  { dir: "→", text: "case.updated", note: "immigration portal" },
  { dir: "←", text: "form.submitted", note: "client intake" },
  { dir: "→", text: "message.sent", note: "applicant inbox" },
  { dir: "←", text: "lead.routed", note: "automation" },
  { dir: "→", text: "deploy.ok", note: "production" },
  { dir: "←", text: "document.uploaded", note: "case file" },
];

const PACKETS = 3;
const DUR = 3.6;
const BASE = 1000;

const clock = (d: Date) => d.toTimeString().slice(0, 8);

/** True when the visitor asked for reduced motion. Starts false so server and client markup match. */
function useStill() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    const t = window.setTimeout(sync, 0);
    mq.addEventListener("change", sync);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", sync);
    };
  }, []);
  return still;
}

type Layout = {
  w: number;
  h: number;
  matrix: string;
  pins: { x: number; y: number }[];
  route: string;
};

const ROUTE_STEPS = 64;

/** Full-bleed map behind the hero. The two pins are fitted into the layout's map target. */
export function HeroMapBackground({ nodes }: { nodes: [HeroNode, HeroNode] }) {
  const still = useStill();
  const svgRef = useRef<SVGSVGElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [from, to] = nodes;

  // Country outlines in a Pacific-centred, north-up Mercator at a fixed base
  // scale. Screen size only changes the transform applied on top, not the paths.
  const geo = useMemo(() => {
    const projection: GeoProjection = geoMercator()
      .rotate([155, 0])
      .scale(BASE)
      .translate([0, 0])
      // Let the map reach far towards the poles so tall screens are still covered.
      .clipExtent([
        [-1e6, -4 * BASE],
        [1e6, 4 * BASE],
      ]);
    const path = geoPath(projection).digits(1);
    const collection = feature(
      world as unknown as Parameters<typeof feature>[0],
      (world as unknown as { objects: { countries: GeometryCollection } }).objects.countries,
    );
    const highlighted = new Set(nodes.map((n) => n.country));
    const countries = collection.features
      .map((f) => {
        const name = String((f.properties as { name?: string } | null)?.name ?? "");
        return { name, d: path(f) ?? "", on: highlighted.has(name) };
      })
      .filter((c) => c.d);
    // Great-circle route, sampled so it curves over the North Pacific.
    const along = geoInterpolate(from.location, to.location);
    const route = Array.from({ length: ROUTE_STEPS + 1 }, (_, i) => projection(along(i / ROUTE_STEPS)) ?? [0, 0]);
    // Vertical extent of land: northern tip of Greenland down to Antarctica,
    // which runs to the bottom edge of the clipped map.
    const north = projection([0, 83])?.[1] ?? -3 * BASE;
    const south = 4 * BASE;
    // Mercator repeats every 360°, so the map can tile sideways.
    const period = 2 * Math.PI * BASE;
    return { countries, route, north, south, period };
  }, [from, to, nodes]);

  useEffect(() => {
    const svg = svgRef.current;
    const section = svg?.parentElement;
    const target = document.getElementById(HERO_MAP_TARGET);
    if (!svg || !section || !target) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const s = section.getBoundingClientRect();
        const t = target.getBoundingClientRect();
        if (!s.width || !t.width) return;
        // Inner box the route must fit in: room on the right for Canada's label,
        // and above for the route's arc over the North Pacific.
        const pad = { l: 32, r: t.width >= 480 ? 120 : 100, t: 32, b: 32 };
        const box = {
          x: t.left - s.left + pad.l,
          y: t.top - s.top + pad.t,
          w: Math.max(1, t.width - pad.l - pad.r),
          h: Math.max(1, t.height - pad.t - pad.b),
        };

        // Bounds of the whole route (it bulges north of both pins).
        const xs = geo.route.map((p) => p[0]);
        const ys = geo.route.map((p) => p[1]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const clamp = (v: number, lo: number, hi: number) => (lo > hi ? (lo + hi) / 2 : Math.min(hi, Math.max(lo, v)));
        const spanX = maxX - minX;
        const spanY = maxY - minY;

        // Scale: at least big enough for the route to fill the target box, and
        // bigger still so land reaches the top and bottom of the hero, as long
        // as Davao stays right of the box's left edge (clear of the headline)
        // and Canada's label stays on screen. North always stays up.
        const fit = Math.min(box.w / spanX, box.h / spanY);
        const cover = s.height / (geo.south - geo.north);
        const widest = (s.width - pad.r - box.x) / spanX;
        const tallest = box.h / spanY;
        const k = Math.max(fit, Math.min(cover, widest, tallest));

        // Centre the route on the box, then nudge so both pins stay in bounds
        // and, when possible, land covers the full height.
        const e = clamp(
          box.x + box.w / 2 - (k * (minX + maxX)) / 2,
          box.x - k * minX,
          s.width - pad.r - k * maxX,
        );
        // Keeping the route inside the box (clear of text) wins over covering the height.
        const centreY = box.y + box.h / 2 - (k * (minY + maxY)) / 2;
        const inBox = [box.y - k * minY, box.y + box.h - k * maxY];
        const lo = Math.max(inBox[0], s.height - k * geo.south);
        const hi = Math.min(inBox[1], -k * geo.north);
        const f = lo <= hi ? clamp(centreY, lo, hi) : clamp(centreY, inBox[0], inBox[1]);
        const toScreen = (p: number[]) => ({ x: k * p[0] + e, y: k * p[1] + f });

        const pts = geo.route.map(toScreen);
        setLayout({
          w: s.width,
          h: s.height,
          matrix: `matrix(${k} 0 0 ${k} ${e} ${f})`,
          pins: [pts[0], pts[pts.length - 1]],
          route: "M" + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("L"),
        });
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(target);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [geo]);

  const labelStyle = {
    stroke: "var(--background)",
    strokeWidth: 5,
    paintOrder: "stroke",
    fontFamily: "var(--font-geist-mono), monospace",
  } as const;

  return (
    <svg
      ref={svgRef}
      viewBox={layout ? `0 0 ${layout.w} ${layout.h}` : undefined}
      role="img"
      aria-label={`Map linking ${from.label} (${from.sub}) with ${to.label} (${to.sub})`}
      className="absolute inset-0 -z-10 h-full w-full"
    >
      {layout && (
        <>
          <g transform={layout.matrix}>
            <g id="hero-world">
              {geo.countries.map((c) => (
                <path
                  key={c.name}
                  d={c.d}
                  vectorEffect="non-scaling-stroke"
                  style={{ fill: "var(--surface)", stroke: "var(--line)", strokeWidth: 0.7 }}
                />
              ))}
            </g>
            {/* Plain copies either side so the map always spans the full width. */}
            {[-2, -1, 1, 2].map((n) => (
              <use key={n} href="#hero-world" x={n * geo.period} />
            ))}
            {geo.countries
              .filter((c) => c.on)
              .map((c) => (
                <path
                  key={c.name}
                  d={c.d}
                  vectorEffect="non-scaling-stroke"
                  style={{
                    fill: "color-mix(in srgb, var(--accent) 18%, transparent)",
                    stroke: "color-mix(in srgb, var(--accent) 70%, transparent)",
                    strokeWidth: 1.2,
                  }}
                />
              ))}
          </g>

          <path
            id="hero-route"
            d={layout.route}
            fill="none"
            style={{ stroke: "var(--accent)", strokeOpacity: 0.3 }}
            strokeWidth={1.5}
          />
          <path
            d={layout.route}
            fill="none"
            style={{ stroke: "var(--accent)" }}
            strokeWidth={1.5}
            strokeDasharray="2 10"
            strokeLinecap="round"
          >
            {!still && (
              <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="1.2s" repeatCount="indefinite" />
            )}
          </path>

          {!still &&
            Array.from({ length: PACKETS * 2 }, (_, i) => {
              const back = i % 2 === 1;
              const slot = Math.floor(i / 2);
              const begin = `${(slot * DUR) / PACKETS + (back ? DUR / (PACKETS * 2) : 0)}s`;
              return (
                <circle key={i} r={back ? 3 : 4} style={{ fill: back ? "var(--foreground)" : "var(--accent)" }}>
                  <animateMotion
                    dur={`${DUR}s`}
                    begin={begin}
                    repeatCount="indefinite"
                    keyPoints={back ? "1;0" : "0;1"}
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href="#hero-route" />
                  </animateMotion>
                </circle>
              );
            })}

          {nodes.map((n, idx) => {
            const p = layout.pins[idx];
            return (
              <g key={n.id} transform={`translate(${p.x} ${p.y})`}>
                {!still && (
                  <circle r={8} fill="none" style={{ stroke: "var(--accent)" }} strokeWidth={1.5}>
                    <animate attributeName="r" from="6" to="26" dur="2s" begin={`${idx}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="2s" begin={`${idx}s`} repeatCount="indefinite" />
                  </circle>
                )}
                <circle r={6} style={{ fill: "var(--accent)", stroke: "var(--background)" }} strokeWidth={2} />
                <text x={14} y={-10} fontSize={14} style={{ ...labelStyle, fill: "var(--foreground)" }}>
                  {n.label}
                </text>
                <text
                  x={14}
                  y={7}
                  fontSize={10}
                  style={{ ...labelStyle, fill: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {n.sub}
                </text>
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}

/** Small status card with a rolling event log, shown over the map. */
export function HeroFeed({ nodes }: { nodes: [HeroNode, HeroNode] }) {
  const still = useStill();
  const [from, to] = nodes;
  const [log, setLog] = useState<{ t: string; i: number }[]>([]);

  useEffect(() => {
    let i = 0;
    const push = () => {
      const entry = { t: clock(new Date()), i: i % events.length };
      i += 1;
      setLog((l) => [entry, ...l].slice(0, 3));
    };
    const first = window.setTimeout(push, 0);
    const id = still ? undefined : window.setInterval(push, 2400);
    return () => {
      window.clearTimeout(first);
      if (id) window.clearInterval(id);
    };
  }, [still]);

  return (
    <div className="w-full rounded-[20px] border border-line bg-background sm:max-w-sm">
      <p className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.06em] text-muted">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            {!still && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-70" />}
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Working
        </span>
        <span className="truncate">
          {from.label} <span className="text-accent">⇄</span> {to.label}
        </span>
      </p>
      <ul aria-hidden="true" className="min-h-[5.25rem] space-y-1.5 px-5 py-4 font-mono text-xs">
        {log.map((e, row) => {
          const ev = events[e.i];
          return (
            <li
              key={`${e.t}-${e.i}-${row}`}
              className={`flex gap-3 ${row === 0 ? "text-fg" : "text-muted"}`}
              style={{ opacity: 1 - row * 0.3 }}
            >
              <span className="text-muted">{e.t}</span>
              <span className="text-accent">{ev.dir}</span>
              <span>{ev.text}</span>
              <span className="ml-auto hidden text-muted sm:inline">{ev.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
