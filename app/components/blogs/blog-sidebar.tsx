import { Link } from "@remix-run/react";
import { BlockCell, BlockHeader } from "../blocks/signal-board";

interface BlogSidebarProps {
  href?: string;
  title?: string;
}

export default function BlogSidebar({
  href,
  title = "blogs",
}: BlogSidebarProps) {
  return (
    <BlockCell as="aside" tone="cobalt" className="lg:min-h-screen-nav">
      <div className="px-5 py-7 sm:px-8 sm:py-8">
        {href ? (
          <Link to={href}>
            <BlockHeader
              eyebrow="archive"
              title={title}
              titleClassName="font-serif text-[2.7rem] normal-case tracking-[0.04em] sm:text-[4rem] lg:text-[5rem]"
            />
          </Link>
        ) : (
          <BlockHeader
            eyebrow="archive"
            title={title}
            titleClassName="font-serif text-[2.7rem] normal-case tracking-[0.04em] sm:text-[4rem] lg:text-[5rem]"
          />
        )}
      </div>
    </BlockCell>
  );
}
