import type { MetaFunction } from "@remix-run/node";
import SiteNav from "../components/site-nav";
import { blogItems } from "../data/blog-content";

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-10 w-10 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 52 52 12" />
      <path d="M30 12h22v22" />
    </svg>
  );
}

export const meta: MetaFunction = () => [
  { title: "Blogs | Ohshin" },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#0a3566] text-white">
      <SiteNav currentPage="blogs" />

      <section className="grid min-h-[calc(100dvh-61px)] grid-cols-1 lg:grid-cols-[0.95fr_3.05fr]">
        <aside className="border-b border-white/80 lg:border-r lg:border-b-0">
          <div className="border-b border-white/80 px-8 py-8">
            <h1 className="font-['Doto'] text-[4rem] font-semibold uppercase tracking-[-0.08em] sm:text-[5.6rem]">
              blogs
            </h1>
          </div>
          <div className="hidden lg:block lg:min-h-[calc(100vh-61px-123px)]" />
        </aside>

        <div className="border-t border-white/80 lg:border-t-0">
          {blogItems.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-1 border-b border-white/80 md:grid-cols-[0.35fr_1fr_auto]"
            >
              <div className="min-h-[8rem] border-b border-white/80 bg-[#d4d4d4] md:min-h-[9rem] md:border-b-0 md:border-r" />

              <div className="px-6 py-8 font-['IBM_Plex_Mono'] text-[1.02rem] leading-[1.55] text-white md:px-6 lg:px-8 lg:text-[1.05rem]">
                {item.title}
              </div>

              <div className="flex items-center justify-end px-6 pb-6 md:px-8 md:pb-0">
                <ArrowUpRight />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
