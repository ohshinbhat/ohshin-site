import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getHomePageContent } from "../content/loaders.server";
import BooksShelf from "../components/about/books-shelf";
import AboutSection from "../components/home/about-section";
import HeroSection from "../components/home/hero-section";
import SiteNav from "../components/site-nav";
import { getBooksByTitles } from "../lib/google-books.server";
import type { BookInfo } from "../types";

export const meta: MetaFunction = () => [
  { title: "Ohshin | Engineer, Designer, Shipper" },
];

export async function loader() {
  const homePageContent = await getHomePageContent();
  const booksPromise = getBooksByTitles(homePageContent.home.bookTitles).catch(
    () => [] satisfies BookInfo[],
  );

  return defer(
    {
      ...homePageContent,
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
    books,
  } = useLoaderData<typeof loader>();

  return (
    <main className="bg-ink pb-24 text-fog">
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
    </main>
  );
}
