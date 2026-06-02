import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogMarkdownProps {
  body: string;
}

export default function BlogMarkdown({ body }: BlogMarkdownProps) {
  return (
    <div className="mt-7 w-full font-mono text-[0.86rem] leading-7 text-white sm:text-[0.92rem]">
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
        {body}
      </ReactMarkdown>
    </div>
  );
}
