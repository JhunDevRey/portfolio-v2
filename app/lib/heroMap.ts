import { feature } from "topojson-client";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";

export const HERO_W = 1000;
export const HERO_H = 640;

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
 * Pacific-centred map cropped to the region between the two nodes, so both
 * countries fill the frame. Runs on the server only.
 */
export function buildHeroMap(from: HeroNode, to: HeroNode): HeroMapData {
  const projection = geoNaturalEarth1()
    .rotate([155, 0])
    .fitExtent(
      [
        [24, 24],
        [HERO_W - 24, HERO_H - 24],
      ],
      {
        type: "MultiPoint",
        coordinates: [
          [104, -8],
          [-56, -8],
          [104, 64],
          [-56, 64],
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
