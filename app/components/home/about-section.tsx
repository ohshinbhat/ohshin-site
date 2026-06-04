import type { ReactNode } from "react";
import type { AboutFact, SpotifyPlaylist } from "../../types";
import AboutCopy from "../about/about-copy";
import AboutFacts from "../about/about-facts";
import AboutPortrait from "../about/about-portrait";
import SpotifyShelf from "../about/spotify-shelf";
import { BlockCell, BlockGrid, BlockHeader } from "../blocks/signal-board";

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
    <section id="about" className="min-h-screen-nav bg-panel font-mono">
      <BlockGrid className="min-h-screen-nav md:grid-cols-2 lg:grid-cols-[0.92fr_1.58fr_1.46fr] lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <BlockCell className="px-5 py-7 sm:px-8 sm:py-8 lg:px-7 lg:py-7">
          <BlockHeader
            eyebrow="profile / signal"
            title="about"
            description="Small fragments of context. Read together, they make the shape."
          />
        </BlockCell>

        <BlockCell className="px-5 py-7 sm:px-8 sm:py-8 lg:px-7 lg:py-6">
          <AboutFacts facts={facts} />
        </BlockCell>

        <BlockCell className="min-h-[24rem] md:min-h-[30rem] lg:row-span-2 lg:min-h-0">
          <AboutPortrait />
        </BlockCell>

        <BlockCell className="px-5 py-7 text-[0.9rem] leading-[1.55] sm:px-8 sm:py-8 sm:text-[0.95rem] md:min-h-[30rem] lg:col-span-2 lg:min-h-0 lg:px-7 lg:py-6 lg:text-[0.86rem] lg:leading-[1.34]">
          <AboutCopy paragraphs={paragraphs} />
        </BlockCell>

        <BlockCell className="text-white md:col-span-2 lg:col-span-3">
          <div className="grid md:grid-cols-2">
            <div className="min-w-0 border-b border-white/70 px-5 py-7 sm:px-8 sm:py-8 md:border-r md:border-b-0 lg:px-7 lg:py-6">
              <SpotifyShelf playlists={playlists} />
            </div>

            <div className="min-w-0 px-5 py-7 sm:px-8 sm:py-8 lg:px-7 lg:py-6">
              {booksContent}
            </div>
          </div>
        </BlockCell>
      </BlockGrid>
    </section>
  );
}
