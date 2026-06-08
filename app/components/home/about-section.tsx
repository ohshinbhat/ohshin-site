import type { ReactNode } from "react";
import type { AboutFact, SpotifyPlaylist } from "../../types";
import AboutCopy from "../about/about-copy";
import AboutFacts from "../about/about-facts";
import AboutPortrait from "../about/about-portrait";
import SpotifyShelf from "../about/spotify-shelf";

interface AboutSectionProps {
  facts: AboutFact[];
  paragraphs: string[];
  playlists: SpotifyPlaylist[];
  booksContent: ReactNode;
}

export default function AboutSection({
  facts,
  paragraphs,
  playlists,
  booksContent,
}: AboutSectionProps) {
  return (
    <section id="about" className="min-h-screen-nav bg-ink font-mono text-white">
      <div className="mx-auto min-h-screen-nav w-full max-w-[1320px] px-5 py-14 pb-32 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-x-16">
          <header className="border-b border-white/18 pb-8 lg:col-span-2">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/45">
              profile / ohshin
            </p>
            <h2 className="mt-4 font-doto text-[4.6rem] font-black uppercase leading-none tracking-section text-white sm:text-[7rem] lg:text-[8.5rem]">
              about
            </h2>
          </header>

          <main className="order-3 space-y-10 lg:order-2">
            <div className="max-w-[78ch] text-[0.9rem] leading-[1.7] text-white/90 sm:text-[0.98rem]">
              <AboutCopy paragraphs={paragraphs} />
            </div>
          </main>

          <aside className="order-2 space-y-6 lg:order-3">
            <div className="border-y border-white/18 py-5">
              <AboutFacts facts={facts} />
            </div>
            <div className="h-[30rem] overflow-hidden rounded-3xl bg-steel sm:h-[34rem] lg:h-[38rem]">
              <AboutPortrait />
            </div>
          </aside>

          <footer className="order-4 grid gap-12 border-t border-white/18 pt-10 lg:col-span-2 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <SpotifyShelf playlists={playlists} />
            </div>

            <div className="min-w-0">{booksContent}</div>
          </footer>
        </div>
      </div>
    </section>
  );
}
