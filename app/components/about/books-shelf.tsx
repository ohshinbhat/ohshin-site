import type { BookInfo } from "../../types";
import { BlockHeader } from "../blocks/signal-board";
import BookCard from "./book-card";

interface BooksShelfProps {
  books?: BookInfo[];
  loading?: boolean;
}

function BookCardSkeleton() {
  return (
    <div className="relative h-[6rem] overflow-hidden border border-white/20 bg-white/5 p-3">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex items-start gap-2.5">
        <div className="h-16 w-12 rounded-md border border-white/15 bg-white/8" />
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
    <div className="space-y-6">
      <BlockHeader
        eyebrow="read stack"
        title="books"
        titleClassName="text-[1.8rem] sm:text-[2.15rem] lg:text-[2rem]"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="min-w-0">
                <BookCardSkeleton />
              </div>
            ))
          : books.map((book) => (
              <div key={book.id} className="min-w-0">
                <BookCard book={book} />
              </div>
            ))}
      </div>
    </div>
  );
}
