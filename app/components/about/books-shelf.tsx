import type { BookInfo } from "../../types";
import BookCard from "./book-card";

interface BooksShelfProps {
  books: BookInfo[];
}

export default function BooksShelf({ books }: BooksShelfProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-doto text-[1.8rem] font-semibold uppercase leading-none tracking-section text-white lg:text-[1.7rem]">
        books
      </h3>
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex w-max gap-4">
          {books.map((book) => (
            <div key={book.id} className="w-64 flex-none">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
