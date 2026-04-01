import type { MetaFunction } from "@remix-run/node";
import BlogListItem from "../components/blogs/blog-list-item";
import SiteNav from "../components/site-nav";
import { blogItems } from "../data/blog-content";

export const meta: MetaFunction = () => [
  { title: "Blogs | Ohshin" },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-cobalt text-white">
      <SiteNav currentPage="blogs" />

      <section className="grid min-h-[calc(100dvh-61px)] grid-cols-1 lg:grid-cols-[0.95fr_3.05fr]">
        <aside className="border-b border-white/80 lg:border-r lg:border-b-0">
          <div className="border-b border-white/80 px-8 py-8">
            <h1 className="font-doto text-[4rem] font-semibold uppercase tracking-section sm:text-[5.6rem]">
              blogs
            </h1>
          </div>
          <div className="hidden lg:block lg:min-h-[calc(100vh-61px-123px)]" />
        </aside>

        <div className="border-t border-white/80 lg:border-t-0">
          {blogItems.map((item) => (
            <BlogListItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
