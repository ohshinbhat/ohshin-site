import type { BookInfo } from "../types";

interface BooksSectionProps {
  books: BookInfo[];
}

export default function BooksSection({ books }: BooksSectionProps) {
  return (
    <section id="books" className="border-t border-white/80 bg-[#0b0c0d] text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-white/80 pb-6">
          <h2 className="font-['Doto'] text-[2.8rem] font-semibold uppercase tracking-[-0.08em] sm:text-[3.6rem]">
            books
          </h2>
          <p className="max-w-[28rem] text-sm text-white/70">
            Recent reads and long-term obsessions. Data pulled live from Google Books.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <article
              key={book.id}
              className="flex gap-5 border border-white/40 bg-[#0f1114] p-5 transition-colors duration-500 ease-out hover:bg-black"
            >
              <div className="h-28 w-20 flex-none overflow-hidden rounded-md border border-white/30 bg-white/5">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-white/60">
                    no cover
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-white">{book.title}</h3>
                <p className="mt-1 text-sm text-white/70">
                  {book.authors.length ? book.authors.join(", ") : "Unknown author"}
                </p>
                {book.publishedDate ? (
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                    {book.publishedDate}
                  </p>
                ) : null}
                {book.description ? (
                  <p className="mt-3 line-clamp-3 text-xs leading-5 text-white/72">
                    {book.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
