import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BlogListItem from "../components/blogs/blog-list-item";
import SiteNav from "../components/site-nav";
import { getBlogsPageContent } from "../content/loaders.server";

export const meta: MetaFunction = () => [
  { title: "Blogs | Ohshin" },
];

export async function loader() {
  return json(await getBlogsPageContent());
}

export default function BlogsPage() {
  const { navigationItems, posts } = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-cobalt text-white">
      <SiteNav currentPage="blogs" items={navigationItems} />

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
          {posts.map((item) => (
            <BlogListItem key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
