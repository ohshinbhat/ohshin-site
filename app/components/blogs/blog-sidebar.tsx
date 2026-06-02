import { Link } from "@remix-run/react";

interface BlogSidebarProps {
  href?: string;
  title?: string;
}

const headingClassName =
  "font-doto text-[3rem] font-black uppercase leading-none tracking-section text-white sm:text-[4.5rem] md:text-[5.6rem]";

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
