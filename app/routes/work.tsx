import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import ContributionGraph from "../components/projects/contribution-graph";
import ProjectsSection from "../components/projects/projects-section";
import SiteNav from "../components/site-nav";
import { getWorkPageContent } from "../content/loaders.server";
import { getContributionCalendar } from "../lib/github.server";
import { getReachStats } from "../lib/reach.server";
import type { ContributionCalendar } from "../types";

export const meta: MetaFunction = () => [
  { title: "Work | Ohshin" },
];

export async function loader() {
  const username = process.env.GITHUB_USERNAME || "ohshinbhat";
  const workPageContent = await getWorkPageContent();
  const reachStats = await getReachStats({
    socialLinks: workPageContent.socialLinks,
  });
  const contributionCalendarPromise = getContributionCalendar({
    username,
    token: process.env.GITHUB_TOKEN,
  }).catch((error) => {
    const message = error instanceof Error ? error.message : "Unknown error";

    return {
      weeks: [],
      username,
      live: false,
      error: message,
    } satisfies ContributionCalendar;
  });

  return defer(
    {
      ...workPageContent,
      contributionCalendar: contributionCalendarPromise,
      reachStats,
    },
    {
      headers: {
        "Cache-Control": "private, max-age=900",
      },
    },
  );
}

export default function WorkPage() {
  const {
    navigationItems,
    contributionCalendar,
    projects,
    reachStats,
    socialLinks,
    workExperience,
  } = useLoaderData<typeof loader>();

  return (
    <main className="bg-ink text-white">
      <SiteNav currentPage="work" items={navigationItems} socialLinks={socialLinks} />
      <ProjectsSection
        contributionGraphContent={
          <Suspense fallback={<ContributionGraph loading />}>
            <Await resolve={contributionCalendar}>
              {(resolvedCalendar) => (
                <ContributionGraph
                  weeks={
                    ((resolvedCalendar?.weeks ?? []) as ContributionCalendar["weeks"])
                  }
                  error={resolvedCalendar?.error ?? null}
                />
              )}
            </Await>
          </Suspense>
        }
        projects={projects}
        reachStats={reachStats}
        workExperience={workExperience}
      />
    </main>
  );
}
