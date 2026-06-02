import type { ReactNode } from "react";
import type { SiteNavigationItem } from "../../types";
import SiteNav from "../site-nav";
import BlogSidebar from "./blog-sidebar";

interface BlogPageLayoutProps {
  children: ReactNode;
  navigationItems: SiteNavigationItem[];
  sidebarHref?: string;
  withTopBorder?: boolean;
}

export default function BlogPageLayout({
  children,
  navigationItems,
  sidebarHref,
  withTopBorder = false,
}: BlogPageLayoutProps) {
  return (
    <main className="min-h-screen bg-cobalt text-white">
      <SiteNav currentPage="blogs" items={navigationItems} />

      <section
        className={`grid min-h-screen-nav grid-cols-1 lg:grid-cols-[0.95fr_3.05fr] ${
          withTopBorder ? "border-t border-white/80" : ""
        }`.trim()}
      >
        <BlogSidebar href={sidebarHref} />
        {children}
      </section>
    </main>
  );
}
