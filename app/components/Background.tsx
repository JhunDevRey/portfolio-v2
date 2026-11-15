import { certifications, education, skills } from "@/app/lib/data";
import { Section } from "./Section";

const row = "sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6";
const cell = "block text-sm text-muted sm:pt-0.5";

export function Background() {
  return (
    <>
      <Section id="skills" title="Skills">
        <dl className="space-y-3 text-[15px] leading-6">
          {skills.map((group) => (
            <div key={group.label} className={row}>
              <dt className={cell}>{group.label}</dt>
              <dd>{group.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="education" title="Education and certifications">
        <ul className="space-y-3 text-[15px] leading-6">
          {education.map((item) => (
            <li key={item.name} className={row}>
              <span className={cell}>{item.period}</span>
              <span>
                {item.name}, {item.place}
              </span>
            </li>
          ))}
          {certifications.map((cert) => (
            <li key={cert.name} className={row}>
              <span className={cell}>{cert.year}</span>
              <span>
                {cert.name}, {cert.issuer}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
