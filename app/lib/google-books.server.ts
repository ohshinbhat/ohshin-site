import type { BookInfo } from "../types";

const OPEN_LIBRARY_SEARCH_ENDPOINT = "https://openlibrary.org/search.json";
const OPEN_LIBRARY_COVER_ENDPOINT = "https://covers.openlibrary.org/b/id";

interface OpenLibraryDoc {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface OpenLibrarySearchResponse {
  docs?: OpenLibraryDoc[];
}

function createFallbackBook(title: string): BookInfo {
  return {
    id: title,
    title,
    authors: [],
  };
}

function getCoverUrl(coverId?: number): string | undefined {
  if (!coverId) {
    return undefined;
  }

  return `${OPEN_LIBRARY_COVER_ENDPOINT}/${coverId}-M.jpg`;
}

async function fetchBookByTitle(title: string): Promise<BookInfo | null> {
  const url = new URL(OPEN_LIBRARY_SEARCH_ENDPOINT);
  url.searchParams.set("title", title);
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString());
  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as OpenLibrarySearchResponse;
  const item = payload.docs?.[0];
  if (!item) {
    return null;
  }

  return {
    id: item.key ?? title,
    title: item.title ?? title,
    authors: item.author_name ?? [],
    publishedDate: item.first_publish_year
      ? String(item.first_publish_year)
      : undefined,
    thumbnail: getCoverUrl(item.cover_i),
  };
}

export async function getBooksByTitles(titles: string[]): Promise<BookInfo[]> {
  const results = await Promise.all(titles.map((title) => fetchBookByTitle(title)));

  return titles.map((title, index) => results[index] ?? createFallbackBook(title));
}
