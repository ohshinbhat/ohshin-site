import type { BookInfo } from "../../types";

interface BookCardProps {
  book: BookInfo;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="relative flex w-64 flex-col justify-between overflow-hidden py-1">
      <div className="flex items-start gap-2.5">
        <div className="relative h-20 w-14 flex-none overflow-hidden rounded-lg bg-white/5 shadow-[0_14px_40px_rgba(0,0,0,.36)]">
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

        <div className="min-w-0 space-y-1 border-t border-white/18 pt-2">
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
