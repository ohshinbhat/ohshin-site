import { describe, expect, it } from "vitest";
import { getAllBlogPosts, getBlogPostBySlug, getBlogPostMetas } from "./blogs.server";
import { ensureUniqueBy } from "./mappers";

describe("blog content loaders", () => {
  it("lists published blog metadata sorted by date", async () => {
    const posts = await getBlogPostMetas();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].publishedAt >= posts[posts.length - 1].publishedAt).toBe(true);
  });

  it("loads a single blog post by slug", async () => {
    const posts = await getAllBlogPosts();
    const firstPost = posts[0];
    const post = await getBlogPostBySlug(firstPost.slug);

    expect(post?.slug).toBe(firstPost.slug);
    expect(post?.body.length).toBeGreaterThan(0);
  });

  it("fails on duplicate slugs", () => {
    expect(() =>
      ensureUniqueBy(
        [
          { slug: "same" },
          { slug: "same" },
        ],
        (item) => item.slug,
        "blog slug",
      ),
    ).toThrow(/Duplicate blog slug/);
  });
});
