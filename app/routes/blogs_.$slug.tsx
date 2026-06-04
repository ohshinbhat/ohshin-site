import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import BlogPageLayout from "../components/blogs/blog-page-layout";
import BlogPostBody from "../components/blogs/blog-post-body";
import BlogPostHeader from "../components/blogs/blog-post-header";
import { getBlogPostPageContent } from "../content/loaders.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [{ title: "Post Not Found | Ohshin" }];
  }

  return [
    { title: `${data.post.title} | Ohshin` },
    { name: "description", content: data.post.excerpt },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const data = await getBlogPostPageContent(slug);

  if (!data.post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(data);
}

export default function BlogPostPage() {
  const { navigationItems, post } = useLoaderData<typeof loader>();
  const resolvedPost = post!;
  const articleRef = useRef<HTMLElement>(null);

  return (
    <BlogPageLayout
      navigationItems={navigationItems}
      sidebarHref="/blogs"
    >
      <article
        ref={articleRef}
        className="min-w-0 border-r border-b border-white/70 bg-cobalt lg:min-h-screen-nav"
      >
        <BlogPostHeader articleRef={articleRef} post={resolvedPost} />
        <BlogPostBody post={resolvedPost} />
      </article>
    </BlogPageLayout>
  );
}
