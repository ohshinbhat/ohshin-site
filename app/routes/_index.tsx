import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AboutSection from "../components/home/about-section";
import HeroSection from "../components/home/hero-section";
import ProjectsSection from "../components/projects-section";
import SiteNav from "../components/site-nav";
import {
  aboutFacts,
  aboutParagraphs,
  bookTitles,
  heroContent,
  spotifyPlaylists,
} from "../data/home-content";
import { getContributionCalendar } from "../lib/github.server";
import { getBooksByTitles } from "../lib/google-books.server";

export const meta: MetaFunction = () => [
  { title: "Ohshin | Engineer, Designer, Shipper" },
];

export async function loader() {
  const username = process.env.GITHUB_USERNAME || "ohshinbhat";

  try {
    const [contributionCalendar, books] = await Promise.all([
      getContributionCalendar({
        username,
        token: process.env.GITHUB_TOKEN,
      }),
      getBooksByTitles(bookTitles),
    ]);

    return json(
      { contributionCalendar, books },
      {
        headers: {
          "Cache-Control": "private, max-age=900",
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return json({
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
  const { contributionCalendar, books } = useLoaderData<typeof loader>();

  return (
    <main className="bg-ink text-fog">
      <HeroSection title={heroContent.title} subtitle={heroContent.subtitle} />
      <SiteNav currentPage="home" />
      <AboutSection
        facts={aboutFacts}
        paragraphs={aboutParagraphs}
        playlists={spotifyPlaylists}
        books={books ?? []}
      />
      <ProjectsSection contributionCalendar={contributionCalendar} />
    </main>
  );
}
