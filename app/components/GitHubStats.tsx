import { profile } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

const GITHUB_USERNAME = "JhunDevRey";

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};

async function getGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getTopRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);
  } catch {
    return [];
  }
}

export async function GitHubStats() {
  const [user, repos] = await Promise.all([getGitHubUser(), getTopRepos()]);

  if (!user) return null;

  const yearsOnGitHub = Math.max(
    1,
    new Date().getFullYear() - new Date(user.created_at).getFullYear()
  );

  const stats = [
    { label: "Public repos", value: String(user.public_repos) },
    { label: "Followers", value: String(user.followers) },
    { label: "Following", value: String(user.following) },
    { label: "Years on GitHub", value: `${yearsOnGitHub}+` },
  ];

  return (
    <section id="github" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="GitHub"
          title={<>What I&apos;ve been shipping</>}
          description={
            <>
              Live activity from{" "}
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-red-400"
              >
                @{GITHUB_USERNAME}
              </a>
              .
            </>
          }
        />

        <Reveal delay={200}>
          <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <SpotlightCard key={stat.label} className="flex flex-col-reverse p-6">
                <dt className="mt-1 text-sm text-zinc-500">{stat.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </SpotlightCard>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={250}>
          <div className="glass mt-4 overflow-x-auto rounded-3xl p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/ef4444/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
              className="w-full min-w-[640px] opacity-90 [filter:invert(1)_hue-rotate(180deg)]"
            />
          </div>
        </Reveal>

        {repos.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {repos.map((repo, i) => (
              <Reveal key={repo.name} delay={300 + i * 100}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <SpotlightCard className="group h-full p-6 hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate font-semibold text-white">{repo.name}</h3>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="ease-smooth h-4 w-4 shrink-0 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      >
                        <path
                          d="M7 17 17 7M8 7h9v9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                      {repo.description ?? "No description yet."}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-zinc-500">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span className="text-amber-400">★</span> {repo.stargazers_count}
                      </span>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
