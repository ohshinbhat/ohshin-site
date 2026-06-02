import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getHomePageContent } from "../content/loaders.server";
import BooksShelf from "../components/about/books-shelf";
import AboutSection from "../components/home/about-section";
import HeroSection from "../components/home/hero-section";
import ProjectsSection from "../components/projects/projects-section";
import ContributionGraph from "../components/projects/contribution-graph";
import SiteNav from "../components/site-nav";
import { getContributionCalendar } from "../lib/github.server";
import { getBooksByTitles } from "../lib/google-books.server";
import type { BookInfo, ContributionCalendar } from "../types";

export const meta: MetaFunction = () => [
  { title: "Ohshin | Engineer, Designer, Shipper" },
];

export async function loader() {
  const username = process.env.GITHUB_USERNAME || "ohshinbhat";
  const homePageContent = await getHomePageContent();
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
  const booksPromise = getBooksByTitles(homePageContent.home.bookTitles).catch(
    () => [] satisfies BookInfo[],
  );

  return defer(
    {
      ...homePageContent,
      contributionCalendar: contributionCalendarPromise,
      books: booksPromise,
    },
    {
      headers: {
        "Cache-Control": "private, max-age=900",
      },
    },
  );
}

export default function Index() {
  const {
    home,
    navigationItems,
    contributionCalendar,
    books,
    projects,
    workExperience,
  } = useLoaderData<typeof loader>();

  return (
    <main className="bg-ink text-fog">
      <HeroSection title={home.hero.title} subtitle={home.hero.subtitle} />
      <SiteNav currentPage="home" items={navigationItems} />
      <AboutSection
        facts={home.about.facts}
        paragraphs={home.about.paragraphs}
        playlists={home.spotifyPlaylists}
        booksContent={
          <Suspense fallback={<BooksShelf loading />}>
            <Await resolve={books}>
              {(resolvedBooks) => (
                <BooksShelf books={(resolvedBooks ?? []) as BookInfo[]} />
              )}
            </Await>
          </Suspense>
        }
      />
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
