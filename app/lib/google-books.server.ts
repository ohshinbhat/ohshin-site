import type { BookInfo } from "../types";

const GOOGLE_BOOKS_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";

interface GoogleBooksVolume {
  id?: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}

interface GoogleBooksResponse {
  items?: GoogleBooksVolume[];
}

function normalizeThumbnail(url?: string): string | undefined {
  if (!url) return undefined;
  return url.replace(/^http:/, "https:");
}

async function fetchBookByTitle(title: string): Promise<BookInfo | null> {
  const query = `intitle:${title}`;
  const url = new URL(GOOGLE_BOOKS_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("maxResults", "1");

  const response = await fetch(url.toString());
  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as GoogleBooksResponse;
  const item = payload.items?.[0];
  if (!item?.volumeInfo) {
    return null;
  }

  const info = item.volumeInfo;
  return {
    id: item.id ?? title,
    title: info.title ?? title,
    authors: info.authors ?? [],
    publishedDate: info.publishedDate,
    description: info.description,
    thumbnail: normalizeThumbnail(info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail),
  };
}

export async function getBooksByTitles(titles: string[]): Promise<BookInfo[]> {
  const results = await Promise.all(titles.map((title) => fetchBookByTitle(title)));
  return results.filter((book): book is BookInfo => Boolean(book));
}
