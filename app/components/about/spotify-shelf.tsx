import type { SpotifyPlaylist } from "../../types";

interface SpotifyShelfProps {
  playlists: SpotifyPlaylist[];
}

export default function SpotifyShelf({ playlists }: SpotifyShelfProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-doto text-[2.4rem] font-black uppercase leading-none tracking-section text-white sm:text-[3.4rem]">
          playlists
        </h2>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/42">
          frequency shelf
        </p>
      </div>

      <div className="mt-5 overflow-x-auto pb-3">
        <div className="flex w-max gap-5">
          {playlists.map((playlist) => (
            <div
              key={playlist.embedUrl}
              className="w-[min(19rem,calc(100vw-3rem))] flex-none space-y-2 sm:w-72"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/58">
                {playlist.title}
              </p>
              <div className="overflow-hidden rounded-[1.4rem] bg-white/[0.08] shadow-[0_18px_60px_rgba(0,0,0,.38)]">
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
    </section>
  );
}
