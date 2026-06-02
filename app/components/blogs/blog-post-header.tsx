import type { RefObject } from "react";
import type { BlogPost } from "../../types";
import { formatPostDate } from "../../utils/blog";
import ArticleReadProgress from "./article-read-progress";

interface BlogPostHeaderProps {
  articleRef: RefObject<HTMLElement>;
  post: BlogPost;
}

export default function BlogPostHeader({
  articleRef,
  post,
}: BlogPostHeaderProps) {
  return (
    <header className="sticky top-[var(--site-nav-height,61px)] z-20 bg-cobalt">
      <div className="px-5 py-5 text-center sm:px-8 sm:py-6 lg:px-10">
        <h1 className="mx-auto max-w-[60rem] py-1 font-mono text-[0.86rem] font-semibold uppercase leading-[1.55] tracking-[0.08em] text-white sm:text-[1.1rem] sm:tracking-[0.12em] lg:text-[1.25rem]">
          {post.title}
        </h1>
      </div>

      <div className="grid grid-cols-2 border-y border-white/70 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white sm:grid-cols-[0.85fr_1.3fr_0.85fr] sm:text-[0.75rem] sm:tracking-[0.12em]">
        <div className="px-4 py-2 text-center sm:px-8">
          {post.readingTimeMinutes} min
        </div>
        <div className="px-4 py-2 text-center sm:px-8">
          {formatPostDate(post.publishedAt)}
        </div>
        <div className="col-span-2 sm:col-span-1 sm:row-start-1">
          <ArticleReadProgress articleRef={articleRef} resetKey={post.slug} />
        </div>
      </div>
    </header>
  );
}
