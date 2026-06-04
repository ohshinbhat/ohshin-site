import type { RefObject } from "react";
import type { BlogPost } from "../../types";
import { BlockLabel } from "../blocks/signal-board";
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
    <header className="sticky top-0 z-20 bg-cobalt">
      <div className="border-b border-white/70 px-5 py-5 text-center sm:px-8 sm:py-6 lg:px-10">
        <BlockLabel className="mx-auto text-white/45">post signal</BlockLabel>
        <h1 className="mx-auto mt-3 max-w-[60rem] py-1 font-serif text-[1.6rem] font-semibold leading-[1.18] text-white sm:text-[2rem] lg:text-[2.45rem]">
          {post.title}
        </h1>
      </div>

      <div className="grid grid-cols-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white sm:grid-cols-[0.85fr_1.3fr_0.85fr] sm:text-[0.75rem] sm:tracking-[0.12em]">
        <div className="border-r border-b border-white/70 px-4 py-2 text-center sm:border-b-0 sm:px-8">
          {post.readingTimeMinutes} min
        </div>
        <div className="border-b border-white/70 px-4 py-2 text-center sm:border-b-0 sm:border-l sm:px-8">
          {formatPostDate(post.publishedAt)}
        </div>
        <div className="col-span-2 sm:col-span-1 sm:row-start-1">
          <ArticleReadProgress articleRef={articleRef} resetKey={post.slug} />
        </div>
      </div>
    </header>
  );
}
