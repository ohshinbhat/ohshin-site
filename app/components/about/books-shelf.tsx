import { textStyles } from "../../config/ui";
import type { BookInfo } from "../../types";
import SectionHeadingRow from "../ui/section-heading-row";
import BookCard from "./book-card";

interface BooksShelfProps {
  books?: BookInfo[];
}

export default function BooksShelf({
  books = [],
}: BooksShelfProps) {
  return (
    <section>
      <SectionHeadingRow
        title="books"
        titleClassName={textStyles.shelfTitle}
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
  );
}
