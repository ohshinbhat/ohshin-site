import type { BlogPostMeta } from "../../types";
import ArrowUpRight from "../ui/icons/arrow-up-right";

interface BlogListItemProps {
  item: BlogPostMeta;
}

export default function BlogListItem({ item }: BlogListItemProps) {
  const href = `/blogs/${item.slug}`;

  return (
    <a
      href={href}
      className="grid grid-cols-1 border-b border-white/80 transition-colors hover:bg-white/5 md:grid-cols-[0.35fr_1fr_auto]"
    >
      <div className="min-h-[8rem] border-b border-white/80 bg-muted md:min-h-[9rem] md:border-r md:border-b-0" />

      <div className="px-6 py-8 font-mono md:px-6 lg:px-8">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/60">
          {item.publishedAt} • {item.readingTimeMinutes} min read
        </p>
        <h2 className="mt-3 text-[1.02rem] leading-[1.55] text-white lg:text-[1.05rem]">
          {item.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/74">{item.excerpt}</p>
      </div>

      <div className="flex items-center justify-end px-6 pb-6 md:px-8 md:pb-0">
        <ArrowUpRight />
      </div>
    </a>
  );
}
