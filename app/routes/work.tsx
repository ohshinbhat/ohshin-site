import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import ContributionGraph from "../components/projects/contribution-graph";
import ProjectsSection from "../components/projects/projects-section";
import SiteNav from "../components/site-nav";
import { getWorkPageContent } from "../content/loaders.server";
import { getContributionCalendar } from "../lib/github.server";
import type { ContributionCalendar } from "../types";

export const meta: MetaFunction = () => [
  { title: "Work | Ohshin" },
];

export async function loader() {
  const username = process.env.GITHUB_USERNAME || "ohshinbhat";
  const workPageContent = await getWorkPageContent();
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
    workExperience,
  } = useLoaderData<typeof loader>();

  return (
    <main className="bg-accent pb-24 text-white">
      <SiteNav currentPage="work" items={navigationItems} />
      <ProjectsSection
        contributionGraphContent={
          <Suspense fallback={<ContributionGraph loading />}>
            <Await resolve={contributionCalendar}>
              {(resolvedCalendar) => (
                <ContributionGraph
                  weeks={
                    ((resolvedCalendar?.weeks ?? []) as ContributionCalendar["weeks"])
                  }
                />
              )}
            </Await>
          </Suspense>
        }
        projects={projects}
        workExperience={workExperience}
      />
    </main>
  );
}
