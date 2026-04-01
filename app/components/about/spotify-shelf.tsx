import type { SpotifyPlaylist } from "../../types";

interface SpotifyShelfProps {
  playlists: SpotifyPlaylist[];
}

export default function SpotifyShelf({ playlists }: SpotifyShelfProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-doto text-[2.2rem] font-semibold uppercase leading-none tracking-section text-white lg:text-[2.1rem]">
        playlists
      </h3>
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex w-max gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.embedUrl} className="w-64 flex-none space-y-2">
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
  );
}
