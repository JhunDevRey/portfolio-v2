import { buildWorldMap, type MapPlace } from "@/app/lib/worldMap";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SectionHeading } from "./SectionHeading";

const places: MapPlace[] = [
  { id: "davao", label: "Davao City", country: "Philippines", location: [125.46, 7.19], zoom: 6 },
  { id: "canada", label: "Canada (client)", country: "Canada", location: [-75.7, 45.42], zoom: 2.4 },
];

export function Experience() {
  // Country shapes are turned into SVG paths on the server, so no map library ships to the browser.
  const map = buildWorldMap(places);

  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-28">
      <SectionHeading
        number="02"
        eyebrow="Experience"
        title="Where I've worked"
        description="Scroll through the roles and the map follows. Tap a pin to jump to that country's work."
      />
      <ExperienceTimeline map={map} />
    </section>
  );
}
