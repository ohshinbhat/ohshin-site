import type { ReactNode } from "react";
import type { AboutFact, SpotifyPlaylist } from "../../types";
import AboutCopy from "../about/about-copy";
import AboutFacts from "../about/about-facts";
import AboutPortrait from "../about/about-portrait";
import SpotifyShelf from "../about/spotify-shelf";
import SectionHeading from "../ui/section-heading";

interface AboutSectionProps {
  facts: AboutFact[];
  paragraphs: string[];
  playlists: SpotifyPlaylist[];
  booksContent: ReactNode;
}

const interactiveBlockClassName =
  "bg-transparent text-white";

export default function AboutSection({
  facts,
  paragraphs,
  playlists,
  booksContent,
}: AboutSectionProps) {
  return (
    <section id="about" className="min-h-screen-nav bg-panel font-mono">
      <div className="grid min-h-screen-nav grid-cols-1 border-t border-white/80 md:grid-cols-2 lg:grid-cols-[0.92fr_1.58fr_1.46fr] lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <div
          className={`border-b border-white/80 px-5 py-7 sm:px-8 sm:py-8 md:border-r lg:px-7 lg:py-7 ${interactiveBlockClassName}`}
        >
          <SectionHeading>about</SectionHeading>
        </div>

        <div
          className={`border-b border-white/80 px-5 py-7 sm:px-8 sm:py-8 lg:border-r lg:px-7 lg:py-6 ${interactiveBlockClassName}`}
        >
          <AboutFacts facts={facts} />
        </div>

        <div className="min-h-[24rem] border-b border-white/80 md:min-h-[30rem] md:border-r lg:row-span-2 lg:min-h-0 lg:border-r-0">
          <AboutPortrait />
        </div>

        <div
          className={`border-b border-white/80 px-5 py-7 text-[0.9rem] leading-[1.55] sm:px-8 sm:py-8 sm:text-[0.95rem] md:min-h-[30rem] lg:col-span-2 lg:min-h-0 lg:border-r lg:px-7 lg:py-6 lg:text-[0.86rem] lg:leading-[1.34] ${interactiveBlockClassName}`}
        >
          <AboutCopy paragraphs={paragraphs} />
        </div>

        <div className="border-b border-white/80 px-5 py-7 text-white sm:px-8 sm:py-8 md:col-span-2 lg:col-span-3 lg:border-b-0 lg:px-0 lg:py-0">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-0">
            <div
              className={`min-w-0 space-y-6 border-white/80 md:border-r md:pr-6 lg:px-7 lg:py-6 ${interactiveBlockClassName}`}
            >
              <SpotifyShelf playlists={playlists} />
            </div>

            <div
              className={`min-w-0 space-y-6 md:pl-6 lg:px-7 lg:py-6 ${interactiveBlockClassName}`}
            >
              {booksContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
