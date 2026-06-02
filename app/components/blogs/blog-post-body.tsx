import type { BlogPost } from "../../types";
import BlogMarkdown from "./blog-markdown";

interface BlogPostBodyProps {
  post: BlogPost;
}

export default function BlogPostBody({ post }: BlogPostBodyProps) {
  return (
    <div className="w-full px-5 py-6 sm:px-[20px] sm:py-8">
      <div className="h-36 w-full rounded-lg bg-muted sm:h-52" aria-hidden="true" />
      <BlogMarkdown body={post.body} />
    </div>
  );
}
