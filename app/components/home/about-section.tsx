import type { AboutFact, BookInfo, SpotifyPlaylist } from "../../types";
import BookCard from "./book-card";

interface AboutSectionProps {
  facts: AboutFact[];
  paragraphs: string[];
  playlists: SpotifyPlaylist[];
  books: BookInfo[];
}

const interactiveBlockClassName =
  "bg-transparent text-white transition-colors duration-500 ease-out hover:bg-[#df1303] hover:text-white";

export default function AboutSection({
  facts,
  paragraphs,
  playlists,
  books,
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className="min-h-[calc(100dvh-var(--site-nav-height,61px))] bg-[#0b0c0d] font-['IBM_Plex_Mono']"
    >
      <div className="grid min-h-[calc(100dvh-var(--site-nav-height,61px))] grid-cols-1 border-t border-white/80 border-white/80 lg:grid-cols-[0.92fr_1.58fr_1.46fr] lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <div
          className={`border-b border-white/80 px-8 py-8 lg:border-r lg:px-7 lg:py-7 ${interactiveBlockClassName}`}
        >
          <h2 className="font-['Doto'] text-[3.7rem] font-semibold uppercase leading-none tracking-[-0.08em] text-white sm:text-[5.5rem]">
            about
          </h2>
        </div>

        <div
          className={`border-b border-white/80 px-8 py-8 lg:border-r lg:px-7 lg:py-6 ${interactiveBlockClassName}`}
        >
          <div className="space-y-1.5 text-[0.95rem] leading-7 text-white/92 lg:text-[0.9rem] lg:leading-6">
            {facts.map(([label, value], index) => (
              <p key={`${label}-${index}`}>
                <span className="font-semibold">{label}:</span> {value}
              </p>
            ))}
          </div>
        </div>

        <div className="min-h-[20rem] border-b border-white/80 lg:row-span-2 lg:min-h-0">
          <div
            aria-label="Portrait of Ohshin"
            className="h-full w-full bg-[#161617] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12)), url('/profile.png')",
            }}
          />
        </div>

        <div
          className={`border-b border-white/80 px-8 py-8 text-[0.95rem] leading-[1.5] lg:col-span-2 lg:border-r lg:px-7 lg:py-6 lg:text-[0.86rem] lg:leading-[1.34] ${interactiveBlockClassName}`}
        >
          <div className="max-w-[74ch] space-y-0.5 lg:max-w-[78ch]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-white/92">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="border-b border-white/80 px-8 py-8 text-white lg:col-span-3 lg:border-b-0 lg:px-0 lg:py-0">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-0">
            <div
              className={`space-y-6 border-white/80 lg:border-r lg:pr-8 lg:pl-7 lg:py-6 ${interactiveBlockClassName}`}
            >
              <h3 className="font-['Doto'] text-[2.2rem] font-semibold uppercase leading-none tracking-[-0.08em] text-white lg:text-[2.1rem]">
                playlists
              </h3>
              <div className="mt-4 overflow-x-auto pb-2">
                <div className="flex w-max gap-4">
                  {playlists.map((playlist) => (
                    <div key={playlist.embedUrl} className="w-[16rem] flex-none space-y-2">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/70">
                        {playlist.title}
                      </p>
                      <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/10">
                        <iframe
                          title={playlist.title}
                          src={playlist.embedUrl}
                          width="100%"
                          height="152"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-transparent text-white transition-colors duration-500 ease-out hover:bg-[#df1303] hover:text-white lg:pl-8 lg:pr-7 lg:py-6">
              <h3 className="font-['Doto'] text-[1.8rem] font-semibold uppercase leading-none tracking-[-0.08em] text-white lg:text-[1.7rem]">
                books
              </h3>
              <div className="mt-4 pb-2">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
