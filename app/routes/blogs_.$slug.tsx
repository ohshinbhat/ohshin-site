import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArticleReadProgress from "../components/blogs/article-read-progress";
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

function formatPostDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ")
    .toUpperCase();
}

export default function BlogPostPage() {
  const { navigationItems, post } = useLoaderData<typeof loader>();
  const resolvedPost = post!;
  const articleRef = useRef<HTMLElement>(null);

  return (
    <main className="min-h-screen bg-cobalt text-white">
      <SiteNav currentPage="blogs" items={navigationItems} />

      <section className="grid min-h-[calc(100dvh-61px)] grid-cols-1 border-t border-white/80 lg:grid-cols-[0.95fr_3.05fr]">
        <aside className="border-b border-white/80 lg:border-r lg:border-b-0">
          <div className="border-b border-white/80 px-8 py-8">
            <Link
              to="/blogs"
              className="font-doto text-[4rem] font-semibold uppercase leading-none tracking-section text-white sm:text-[5.6rem]"
            >
              blogs
            </Link>
          </div>
          <div className="hidden lg:block lg:min-h-[calc(100vh-61px-123px)]" />
        </aside>

        <article ref={articleRef} className="border-t border-white/80 lg:border-t-0">
          <header className="sticky top-[var(--site-nav-height,61px)] z-20 bg-cobalt">
            <div className="px-8 py-6 text-center lg:px-10">
              <h1 className="mx-auto max-w-[60rem] py-1 font-mono text-[1rem] font-semibold uppercase leading-[1.45] tracking-[0.12em] text-white sm:text-[1.1rem] lg:text-[1.25rem]">
                {resolvedPost.title}
              </h1>
            </div>

            <div className="grid grid-cols-[0.85fr_1.3fr_0.85fr] border-y border-white/70 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-white">
              <div className="px-8 py-2 text-center">
                {resolvedPost.readingTimeMinutes} min
              </div>
              <ArticleReadProgress articleRef={articleRef} resetKey={resolvedPost.slug} />
              <div className="px-8 py-2 text-center">
                {formatPostDate(resolvedPost.publishedAt)}
              </div>
            </div>
          </header>

          <div className="w-full px-[20px] py-8">
            <div className="h-44 w-full rounded-lg bg-muted sm:h-52" aria-hidden="true" />

            <div className="mt-7 w-full font-mono text-[0.92rem] leading-7 text-white">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="mt-10 font-mono text-[1.35rem] font-semibold uppercase tracking-[0.08em] text-white">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => <p className="mt-5 text-justify">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="mt-5 list-disc space-y-2 pl-5">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mt-5 list-decimal space-y-2 pl-5">{children}</ol>
                  ),
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="underline decoration-white/40 underline-offset-4 transition hover:text-white/80"
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
          </div>
        </article>
      </section>
    </main>
  );
}
