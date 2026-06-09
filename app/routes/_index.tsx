import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getHomePageContent } from "../content/loaders.server";
import BooksShelf from "../components/about/books-shelf";
import AboutSection from "../components/home/about-section";
import HeroSection from "../components/home/hero-section";
import SiteNav from "../components/site-nav";

export const meta: MetaFunction = () => [
  { title: "Ohshin Bhat" },
];

export async function loader() {
  const homePageContent = await getHomePageContent();

  return json(
    {
      ...homePageContent,
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
    socialLinks,
  } = useLoaderData<typeof loader>();

  return (
    <main className="bg-ink text-fog">
      <HeroSection
        title={home.hero.title}
        subtitle={home.hero.subtitle}
      />
      <SiteNav currentPage="home" items={navigationItems} socialLinks={socialLinks} />
      <AboutSection
        paragraphs={home.about.paragraphs}
        playlists={home.spotifyPlaylists}
        booksContent={<BooksShelf books={home.books} />}
      />
    </main>
  );
}
