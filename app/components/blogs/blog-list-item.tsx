import { Link } from "@remix-run/react";
import type { BlogPostMeta } from "../../types";
import { BlockLabel } from "../blocks/signal-board";
import { formatPostDate } from "../../utils/blog";
import ArrowUpRight from "../ui/icons/arrow-up-right";

interface BlogListItemProps {
  item: BlogPostMeta;
}

export default function BlogListItem({ item }: BlogListItemProps) {
  const href = `/blogs/${item.slug}`;

  return (
    <Link
      to={href}
      className="grid grid-cols-1 gap-3 border-b border-white/30 px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[9rem_1fr_auto] lg:gap-5"
    >
      <div>
        <BlockLabel className="text-[0.58rem] text-white/40">date</BlockLabel>
        <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/58">
          {formatPostDate(item.publishedAt)}
        </p>
      </div>

      <div className="min-w-0">
        <BlockLabel className="text-[0.58rem] text-white/40">
          {item.readingTimeMinutes} min read
        </BlockLabel>
        <h2 className="mt-2 font-serif text-[1.02rem] leading-[1.3] text-white sm:text-[1.12rem] lg:text-[1.2rem]">
          {item.title}
        </h2>
        <p className="mt-2 max-w-[54ch] font-mono text-[0.76rem] leading-5 text-white/56 sm:text-[0.8rem] sm:leading-6">
          {item.excerpt}
        </p>
      </div>

      <div className="flex items-start justify-end pt-0.5 text-white/34">
        <ArrowUpRight />
      </div>
    </Link>
  );
}
