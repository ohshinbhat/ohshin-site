import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlockCell, BlockGrid, BlockHeader } from "../components/blocks/signal-board";
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

      <section className="mx-auto w-full max-w-[78rem] px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <BlockGrid className="lg:grid-cols-[0.85fr_2.15fr]">
          <BlockCell tone="cobalt" className="px-5 py-7 sm:px-8 sm:py-8 lg:min-h-[20rem]">
            <BlockHeader
              eyebrow="writings / notes"
              title="blogs"
              description="Thoughts on design, engineering, systems, and shipping."
              titleClassName="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]"
            />
          </BlockCell>
          <BlockCell tone="cobalt" className="lg:min-h-[20rem]">
          {posts.map((item) => (
            <BlogListItem key={item.slug} item={item} />
          ))}
          </BlockCell>
        </BlockGrid>
      </section>
    </main>
  );
}
