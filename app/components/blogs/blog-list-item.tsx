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
      className="grid grid-cols-1 border-b border-white/80 md:grid-cols-[0.35fr_1fr_auto]"
    >
      <div className="min-h-[5.5rem] border-b border-white/80 bg-muted sm:min-h-[8rem] md:min-h-[9rem] md:border-r md:border-b-0" />

      <div className="px-5 py-6 font-mono sm:px-6 sm:py-8 md:px-6 lg:px-8">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/60">
          {item.publishedAt} • {item.readingTimeMinutes} min read
        </p>
        <h2 className="mt-3 font-serif text-[1.3rem] leading-[1.35] text-white lg:text-[1.45rem]">
          {item.title}
        </h2>
        <p className="mt-3 text-[0.86rem] leading-6 text-white/74 sm:text-sm sm:leading-7">{item.excerpt}</p>
      </div>

      <div className="flex items-center justify-end px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-0">
        <ArrowUpRight />
      </div>
    </a>
  );
}
