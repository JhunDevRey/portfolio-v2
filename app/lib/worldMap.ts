import { feature } from "topojson-client";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";

export const MAP_W = 1000;
export const MAP_H = 520;

export type MapPlace = {
  id: string;
  label: string;
  /** Name of the country as it appears in the world-atlas data. */
  country: string;
  /** [longitude, latitude] */
  location: [number, number];
  /** How far the map zooms in when this place is focused. */
  zoom: number;
};

export type WorldMap = {
  countries: { name: string; d: string }[];
  pins: (MapPlace & { x: number; y: number })[];
};

/** Builds SVG path data for every country and projects the pins. Runs on the server only. */
export function buildWorldMap(places: MapPlace[]): WorldMap {
  const projection = geoNaturalEarth1().fitSize([MAP_W, MAP_H], { type: "Sphere" });
  const path = geoPath(projection).digits(1);

  const collection = feature(
    world as unknown as Parameters<typeof feature>[0],
    (world as unknown as { objects: { countries: GeometryCollection } }).objects.countries,
  );

  const countries = collection.features
    .map((f) => ({ name: String((f.properties as { name?: string } | null)?.name ?? ""), d: path(f) ?? "" }))
    .filter((c) => c.name !== "Antarctica")
    .filter((c) => c.d);

  const pins = places.map((p) => {
    const [x, y] = projection(p.location) ?? [0, 0];
    return { ...p, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  });

  return { countries, pins };
}
