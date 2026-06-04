import type { SpotifyPlaylist } from "../../types";
import { BlockHeader, HorizontalShelf } from "../blocks/signal-board";

interface SpotifyShelfProps {
  playlists: SpotifyPlaylist[];
}

export default function SpotifyShelf({ playlists }: SpotifyShelfProps) {
  return (
    <div className="space-y-6">
      <BlockHeader
        eyebrow="listening"
        title="playlists"
        titleClassName="text-[1.8rem] sm:text-[2.15rem] lg:text-[2rem]"
      />
      <HorizontalShelf>
        {playlists.map((playlist) => (
          <div
            key={playlist.embedUrl}
            className="w-[min(18rem,calc(100vw-3rem))] flex-none space-y-2 sm:w-64"
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/58">
              {playlist.title}
            </p>
            <div className="overflow-hidden border border-white/30 bg-white/10">
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
      </HorizontalShelf>
    </div>
  );
}
