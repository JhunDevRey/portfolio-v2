import { feature } from "topojson-client";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";

/** Wide canvas so the map can sit behind the whole hero and be cropped to fit. */
export const HERO_W = 1600;
export const HERO_H = 1100;

export type HeroNode = {
  id: string;
  label: string;
  sub: string;
  /** Name of the country as it appears in the world-atlas data. */
  country: string;
  /** [longitude, latitude] */
  location: [number, number];
};

export type HeroMapData = {
  countries: { name: string; d: string }[];
  nodes: (HeroNode & { x: number; y: number })[];
  /** Great-circle route between the two nodes, as SVG path data. */
  route: string;
};

/**
 * Pacific-centred map. The Davao–Canada region is fitted into the right half
 * of the canvas, leaving the left side (behind the headline) as quiet Asian
 * landmass. The SVG is cropped from the left, so the pins stay visible.
 * Runs on the server only.
 */
export function buildHeroMap(from: HeroNode, to: HeroNode): HeroMapData {
  const projection = geoNaturalEarth1()
    .rotate([155, 0])
    .fitExtent(
      [
        [HERO_W * 0.56, 140],
        [HERO_W - 70, HERO_H - 300],
      ],
      {
        type: "MultiPoint",
        coordinates: [
          [118, 0],
          [-56, 0],
          [118, 66],
          [-56, 66],
        ],
      },
    );
  const path = geoPath(projection).digits(1);

  const collection = feature(
    world as unknown as Parameters<typeof feature>[0],
    (world as unknown as { objects: { countries: GeometryCollection } }).objects.countries,
  );

  const countries = collection.features
    .map((f) => ({ name: String((f.properties as { name?: string } | null)?.name ?? ""), d: path(f) ?? "" }))
    .filter((c) => c.d && c.name !== "Antarctica");

  const nodes = [from, to].map((n) => {
    const [x, y] = projection(n.location) ?? [0, 0];
    return { ...n, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  });

  const route = path({ type: "LineString", coordinates: [from.location, to.location] }) ?? "";

  return { countries, nodes, route };
}
