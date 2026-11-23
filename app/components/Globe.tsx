"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export type GlobePlace = { id: string; label: string; location: [number, number] };

type GlobeProps = {
  places: GlobePlace[];
  arcs?: { from: [number, number]; to: [number, number] }[];
  /** Location to rotate toward. When omitted the globe auto-rotates. */
  focus?: [number, number] | null;
  className?: string;
};

const toPhi = (lng: number) => -Math.PI / 2 - (lng * Math.PI) / 180;
const toTheta = (lat: number) => (lat * Math.PI) / 180;

export function Globe({ places, arcs = [], focus = null, className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef(focus);
  const drag = useRef({ active: false, x: 0, y: 0, dPhi: 0, dTheta: 0 });

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dark = document.documentElement.classList.contains("dark");
    const size = () => canvas.offsetWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let phi = toPhi(places[0]?.location[1] ?? 0);
    let theta = 0.25;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: size() * 2,
      height: size() * 2,
      phi,
      theta,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.1 : 1.3,
      mapSamples: 16000,
      mapBrightness: dark ? 10 : 2.2,
      baseColor: dark ? [0.3, 0.29, 0.28] : [0.97, 0.96, 0.93],
      markerColor: dark ? [1, 0.5, 0.36] : [0.85, 0.31, 0.16],
      glowColor: dark ? [0.2, 0.18, 0.16] : [0.9, 0.88, 0.82],
      arcColor: dark ? [1, 0.5, 0.36] : [0.85, 0.31, 0.16],
      arcWidth: 0.5,
      arcHeight: 0.25,
      markers: places.map((p) => ({ location: p.location, size: 0.07, id: p.id })),
      arcs,
    });

    let raf = 0;
    const tick = () => {
      const f = focusRef.current;
      const d = drag.current;
      let outPhi = phi;
      let outTheta = theta;
      if (d.active) {
        outPhi = phi + d.dPhi;
        outTheta = theta + d.dTheta;
      } else {
        if (f) {
          let diff = toPhi(f[1]) - phi;
          diff = ((((diff + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
          phi += diff * 0.06;
          theta += (toTheta(f[0]) * 0.6 - theta) * 0.06;
        } else if (!reduce) {
          phi += 0.003;
        }
        outPhi = phi;
        outTheta = theta;
      }
      globe.update({ phi: outPhi, theta: outTheta, width: size() * 2, height: size() * 2 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      drag.current = { active: true, x: e.clientX, y: e.clientY, dPhi: 0, dTheta: 0 };
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.active) return;
      d.dPhi = (e.clientX - d.x) / 200;
      d.dTheta = Math.max(-1.2 - theta, Math.min(1.2 - theta, (e.clientY - d.y) / 300));
    };
    const up = () => {
      const d = drag.current;
      if (!d.active) return;
      phi += d.dPhi;
      theta += d.dTheta;
      drag.current = { active: false, x: 0, y: 0, dPhi: 0, dTheta: 0 };
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, [places, arcs]);

  return (
    <div className={`relative aspect-square ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Interactive globe showing ${places.map((p) => p.label).join(" and ")}`}
        className="h-full w-full cursor-grab touch-pan-y"
      />
      {places.map((p) => (
        <span
          key={p.id}
          style={
            {
              positionAnchor: `--cobe-${p.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              opacity: `var(--cobe-visible-${p.id}, 0)`,
            } as React.CSSProperties
          }
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-full border border-line bg-background px-2 py-0.5 font-mono text-[11px] text-fg transition-opacity"
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}
