import Image from "next/image";
import { profile } from "@/app/lib/data";

const linkClass = "underline decoration-line hover:decoration-fg";

export function Intro() {
  return (
    <section id="about" className="scroll-mt-8">
      <div className="flex items-center gap-4">
        <Image
          src={profile.photo}
          alt=""
          width={64}
          height={64}
          priority
          className="h-16 w-16 shrink-0 rounded-full bg-field object-cover object-[50%_30%]"
        />
        <div>
          <h1 className="text-xl font-medium sm:text-2xl">{profile.name}</h1>
          <p className="text-muted">
            {profile.role}, {profile.location}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-5 leading-7">
        {profile.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm [overflow-wrap:anywhere]">
        <li>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </li>
        <li>
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
        </li>
        <li>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>
        </li>
        <li>
          <a href={profile.resumeUrl} className={linkClass}>
            CV (PDF)
          </a>
        </li>
      </ul>
    </section>
  );
}
