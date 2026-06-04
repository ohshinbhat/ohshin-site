import type { BookInfo } from "../../types";

interface BookCardProps {
  book: BookInfo;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group relative flex h-[6rem] flex-col justify-between overflow-hidden border border-white/20 bg-white/5 p-3">
      <div className="flex items-start gap-2.5">
        <div className="relative h-16 w-12 flex-none overflow-hidden rounded-md border border-white/20 bg-white/5">
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={book.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
              cover
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-0.5">
          <p className="text-[0.8rem] font-semibold leading-snug text-white line-clamp-2">
            {book.title}
          </p>
          <p className="text-[0.7rem] text-white/70 line-clamp-1">
            {book.authors.length ? book.authors.join(", ") : "Unknown author"}
          </p>
        </div>
      </div>
    </div>
  );
}
