import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteNav from "../components/site-nav";
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

  return (
    <main className="min-h-screen bg-cobalt text-white">
      <SiteNav currentPage="blogs" items={navigationItems} />

      <article className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-8 lg:px-10">
        <Link
          to="/blogs"
          className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/64 transition hover:text-white"
        >
          back to blogs
        </Link>

        <header className="mt-8 border-b border-white/20 pb-8">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/56">
            {resolvedPost.publishedAt} • {resolvedPost.readingTimeMinutes} min read
          </p>
          <h1 className="mt-4 font-doto text-[2.8rem] font-semibold uppercase leading-[0.94] tracking-[-0.05em] sm:text-[4.2rem]">
            {resolvedPost.title}
          </h1>
          <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-white/74">
            {resolvedPost.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {resolvedPost.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/30 px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10 font-mono text-[0.98rem] leading-8 text-white/88">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="mt-12 font-doto text-[2rem] font-semibold uppercase tracking-[-0.05em] text-white">
                  {children}
                </h2>
              ),
              p: ({ children }) => <p className="mt-5">{children}</p>,
              ul: ({ children }) => <ul className="mt-5 space-y-2 pl-5">{children}</ul>,
              ol: ({ children }) => <ol className="mt-5 space-y-2 pl-5">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="underline decoration-white/40 underline-offset-4 transition hover:text-white"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {resolvedPost.body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
