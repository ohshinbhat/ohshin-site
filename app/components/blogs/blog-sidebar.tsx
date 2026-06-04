import { Link } from "@remix-run/react";

interface BlogSidebarProps {
  href?: string;
  title?: string;
}

const headingClassName =
  "font-serif text-[2.8rem] font-semibold uppercase leading-none tracking-[0.04em] text-white sm:text-[4.15rem] md:text-[5.1rem]";

export default function BlogSidebar({
  href,
  title = "blogs",
}: BlogSidebarProps) {
  const heading = href ? (
    <Link to={href} className={headingClassName}>
      {title}
    </Link>
  ) : (
    <h1 className={headingClassName}>{title}</h1>
  );

  return (
    <aside className="border-b border-white/80 lg:border-r lg:border-b-0">
      <div className="border-b border-white/80 px-5 py-7 sm:px-8 sm:py-8">{heading}</div>
      <div className="hidden lg:block lg:min-h-[calc(100vh-61px-123px)]" />
    </aside>
  );
}
