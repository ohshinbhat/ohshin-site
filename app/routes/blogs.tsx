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
    <main className="min-h-screen bg-cobalt pb-24 text-white">
      <SiteNav currentPage="blogs" items={navigationItems} />

      <section className="mx-auto flex w-full max-w-[74rem] flex-col px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <div className="border-y border-white/20 py-6 sm:py-7">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-white/48">
            writings / notes
          </p>
          <h1 className="mt-3 font-doto text-[2.4rem] font-black uppercase leading-[0.94] tracking-[-0.03em] text-white sm:text-[3.2rem] lg:text-[4rem]">
            blogs
          </h1>
          <p className="mt-3 max-w-[32rem] font-mono text-[0.8rem] leading-6 text-white/58 sm:text-[0.84rem]">
            Thoughts on design, engineering, systems, and shipping.
          </p>
        </div>

        <div className="mt-5 border-b border-white/20">
          {posts.map((item) => (
            <BlogListItem key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
