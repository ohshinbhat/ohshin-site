import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BlogListItem from "../components/blogs/blog-list-item";
import BlogPageLayout from "../components/blogs/blog-page-layout";
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
    <BlogPageLayout navigationItems={navigationItems}>
      <div className="border-t border-white/80 lg:border-t-0">
        {posts.map((item) => (
          <BlogListItem key={item.slug} item={item} />
        ))}
      </div>
    </BlogPageLayout>
  );
}
