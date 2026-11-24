"use client";

import { useEffect, useState } from "react";
import { HERO_H, HERO_W, type HeroMapData } from "@/app/lib/heroMap";

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

const clock = (d: Date) => d.toTimeString().slice(0, 8);

export function HeroMap({ map }: { map: HeroMapData }) {
  const [from, to] = map.nodes;
  const highlighted = new Set(map.nodes.map((n) => n.country));

  const [still, setStill] = useState(false);
  const [log, setLog] = useState<{ t: string; i: number }[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let i = 0;
    const push = () => {
      const entry = { t: clock(new Date()), i: i % events.length };
      i += 1;
      setLog((l) => [entry, ...l].slice(0, 3));
    };
    // Defer the first entry so the server and client render the same markup.
    const first = window.setTimeout(() => {
      setStill(mq.matches);
      push();
    }, 0);
    const id = mq.matches ? undefined : window.setInterval(push, 2400);
    return () => {
      window.clearTimeout(first);
      if (id) window.clearInterval(id);
    };
  }, []);

  const labelStyle = {
    stroke: "var(--surface)",
    strokeWidth: 4,
    paintOrder: "stroke",
    fontFamily: "var(--font-geist-mono), monospace",
  } as const;

  return (
    <figure className="overflow-hidden rounded-[20px] border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.06em] text-muted">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            {!still && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-70" />}
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Working
        </span>
        <span>
          {from.label} <span className="text-accent">⇄</span> {to.label}
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${HERO_W} ${HERO_H}`}
        role="img"
        aria-label={`Map linking ${from.label} (${from.sub}) with ${to.label} (${to.sub})`}
        className="block h-auto w-full"
      >
        {map.countries.map((c) => {
          const on = highlighted.has(c.name);
          return (
            <path
              key={c.name}
              d={c.d}
              style={{
                fill: on ? "color-mix(in srgb, var(--accent) 22%, transparent)" : "var(--line)",
                stroke: on ? "var(--accent)" : "var(--surface)",
                strokeWidth: on ? 1.2 : 0.6,
              }}
            />
          );
        })}

        <path
          id="hero-route"
          d={map.route}
          fill="none"
          style={{ stroke: "var(--accent)", strokeOpacity: 0.3 }}
          strokeWidth={1.5}
        />
        <path
          d={map.route}
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
          Array.from({ length: PACKETS * 2 }, (_, k) => {
            const back = k % 2 === 1;
            const slot = Math.floor(k / 2);
            const begin = `${(slot * DUR) / PACKETS + (back ? DUR / (PACKETS * 2) : 0)}s`;
            return (
              <circle key={k} r={back ? 3 : 4} style={{ fill: back ? "var(--foreground)" : "var(--accent)" }}>
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

        {map.nodes.map((n, idx) => {
          const x = 14;
          const anchor = "start";
          return (
            <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
              {!still && (
                <circle r={8} fill="none" style={{ stroke: "var(--accent)" }} strokeWidth={1.5}>
                  <animate attributeName="r" from="6" to="26" dur="2s" begin={`${idx}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.9" to="0" dur="2s" begin={`${idx}s`} repeatCount="indefinite" />
                </circle>
              )}
              <circle r={6} style={{ fill: "var(--accent)", stroke: "var(--surface)" }} strokeWidth={2} />
              <text x={x} y={-14} textAnchor={anchor} fontSize={17} style={{ ...labelStyle, fill: "var(--foreground)" }}>
                {n.label}
              </text>
              <text
                x={x}
                y={6}
                textAnchor={anchor}
                fontSize={12}
                style={{ ...labelStyle, fill: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <ul aria-hidden="true" className="min-h-[5.25rem] space-y-1.5 border-t border-line px-5 py-4 font-mono text-xs">
        {log.map((e, row) => {
          const ev = events[e.i];
          return (
            <li
              key={`${e.t}-${e.i}`}
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
    </figure>
  );
}
