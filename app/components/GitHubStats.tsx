import { profile } from "@/app/lib/data";
import { Reveal } from "./Reveal";

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
    <section id="github" className="border-t border-black/5 px-6 py-28 dark:border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
            GitHub
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            What I&apos;ve been shipping
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Live activity from{" "}
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 underline underline-offset-4 dark:text-white"
            >
              @{GITHUB_USERNAME}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={200}>
          <dl className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/dc2626/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
              className="w-full min-w-[640px]"
            />
          </div>
        </Reveal>

        {repos.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {repos.map((repo, i) => (
              <Reveal key={repo.name} delay={300 + i * 100}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/15 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-red-500/40"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{repo.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {repo.description ?? "No description yet."}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <span className="text-amber-500">★</span> {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
