import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getHomePageContent } from "../content/loaders.server";
import AboutSection from "../components/home/about-section";
import HeroSection from "../components/home/hero-section";
import ProjectsSection from "../components/projects-section";
import SiteNav from "../components/site-nav";
import { getContributionCalendar } from "../lib/github.server";
import { getBooksByTitles } from "../lib/google-books.server";

export const meta: MetaFunction = () => [
  { title: "Ohshin | Engineer, Designer, Shipper" },
];

export async function loader() {
  const username = process.env.GITHUB_USERNAME || "ohshinbhat";
  const homePageContent = await getHomePageContent();

  try {
    const [contributionCalendar, books] = await Promise.all([
      getContributionCalendar({
        username,
        token: process.env.GITHUB_TOKEN,
      }),
      getBooksByTitles(homePageContent.home.bookTitles),
    ]);

    return json(
      { ...homePageContent, contributionCalendar, books },
      {
        headers: {
          "Cache-Control": "private, max-age=900",
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return json({
      ...homePageContent,
      contributionCalendar: {
        weeks: [],
        username,
        live: false,
        error: message,
      },
      books: [],
    });
  }
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
        books={books ?? []}
      />
      <ProjectsSection
        contributionCalendar={contributionCalendar}
        projects={projects}
        workExperience={workExperience}
      />
    </main>
  );
}
