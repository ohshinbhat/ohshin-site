import type { ReactNode } from "react";
import type { SiteNavigationItem } from "../../types";
import SiteNav from "../site-nav";
import { BlockGrid } from "../blocks/signal-board";
import BlogSidebar from "./blog-sidebar";

interface BlogPageLayoutProps {
  children: ReactNode;
  navigationItems: SiteNavigationItem[];
  sidebarHref?: string;
}

export default function BlogPageLayout({
  children,
  navigationItems,
  sidebarHref,
}: BlogPageLayoutProps) {
  return (
    <main className="min-h-screen bg-cobalt pb-24 text-white">
      <SiteNav currentPage="blogs" items={navigationItems} />

      <BlockGrid className="min-h-screen-nav lg:grid-cols-[0.92fr_3.08fr]">
        <BlogSidebar href={sidebarHref} />
        {children}
      </BlockGrid>
    </main>
  );
}
