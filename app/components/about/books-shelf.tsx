import type { BookInfo } from "../../types";
import BookCard from "./book-card";

interface BooksShelfProps {
  books?: BookInfo[];
  loading?: boolean;
}

function BookCardSkeleton() {
  return (
    <div className="relative h-[6rem] w-64 flex-none overflow-hidden rounded-2xl bg-white/5 p-3">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex items-start gap-2.5">
        <div className="h-16 w-12 rounded-md bg-white/8" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3.5 w-4/5 rounded bg-white/12" />
          <div className="h-3 w-3/5 rounded bg-white/8" />
        </div>
      </div>
    </div>
  );
}

export default function BooksShelf({
  books = [],
  loading = false,
}: BooksShelfProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-doto text-[2.4rem] font-black uppercase leading-none tracking-section text-white sm:text-[3.4rem]">
          books
        </h2>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/42">
          reading stack
        </p>
      </div>

      <div className="mt-5 overflow-x-auto pb-3">
        <div className="flex w-max gap-5">
        {loading
          ? Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex-none">
                <BookCardSkeleton />
              </div>
            ))
          : books.map((book) => (
              <div key={book.id} className="flex-none">
                <BookCard book={book} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
