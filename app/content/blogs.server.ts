import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  calculateReadingTimeMinutes,
  ensureUniqueBy,
  filterPublishedBlogPosts,
  sortBlogPosts,
} from "./mappers";
import { BlogFrontmatterSchema } from "./schemas";
import type { BlogPost, BlogPostMeta } from "../types";

const BLOGS_ROOT = path.join(process.cwd(), "content", "blogs");

async function getBlogFilePaths(): Promise<string[]> {
  const entries = await readdir(BLOGS_ROOT, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(BLOGS_ROOT, entry.name));
}

async function parseBlogFile(filePath: string): Promise<BlogPost> {
  const raw = await readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = BlogFrontmatterSchema.parse(data);

  return {
    ...frontmatter,
    body: content.trim(),
    readingTimeMinutes: calculateReadingTimeMinutes(content),
  };
}

export async function getAllBlogPosts(options?: {
  includeDrafts?: boolean;
}): Promise<BlogPost[]> {
  const filePaths = await getBlogFilePaths();
  const parsedPosts = await Promise.all(filePaths.map(parseBlogFile));
  const validatedPosts = ensureUniqueBy(
    parsedPosts,
    (post) => post.slug,
    "blog slug",
  );
  const posts = options?.includeDrafts
    ? validatedPosts
    : filterPublishedBlogPosts(validatedPosts);

  return sortBlogPosts(posts);
}

export async function getBlogPostMetas(options?: {
  includeDrafts?: boolean;
}): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts(options);

  return posts.map(({ body: _body, ...meta }) => meta);
}

export async function getBlogPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts(options);
  return posts.find((post) => post.slug === slug) ?? null;
}
