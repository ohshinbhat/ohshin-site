import type { BlogItem } from "../../types";
import ArrowUpRight from "../ui/icons/arrow-up-right";

interface BlogListItemProps {
  item: BlogItem;
}

export default function BlogListItem({ item }: BlogListItemProps) {
  return (
    <article className="grid grid-cols-1 border-b border-white/80 md:grid-cols-[0.35fr_1fr_auto]">
      <div className="min-h-[8rem] border-b border-white/80 bg-muted md:min-h-[9rem] md:border-r md:border-b-0" />

      <div className="px-6 py-8 font-mono text-[1.02rem] leading-[1.55] text-white md:px-6 lg:px-8 lg:text-[1.05rem]">
        {item.title}
      </div>

      <div className="flex items-center justify-end px-6 pb-6 md:px-8 md:pb-0">
        <ArrowUpRight />
      </div>
    </article>
  );
}
