import type { BookInfo } from "../../types";

interface BookCardProps {
  book: BookInfo;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group relative min-h-[8.5rem] overflow-hidden rounded-[1.25rem] bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 transition duration-300 hover:bg-white/[0.075]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="flex h-full items-start gap-3">
        <div className="relative h-20 w-14 flex-none overflow-hidden rounded-md bg-black/34 shadow-[0_12px_28px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/12">
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={book.title}
              className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
              cover
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-0.5">
          <div className="space-y-1">
            <p className="text-[0.82rem] font-semibold leading-snug text-white line-clamp-2">
              {book.title}
            </p>
            <p className="text-[0.68rem] leading-snug text-white/62 line-clamp-2">
              {book.authors.length
                ? book.authors.join(", ")
                : "Unknown author"}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2 font-mono text-[0.54rem] uppercase tracking-[0.2em] text-white/40">
            <span>book</span>
            <span>{book.publishedDate ?? "n/a"}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
