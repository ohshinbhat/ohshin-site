import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useLayoutEffect, type MouseEvent } from "react";
import type { HomeSectionId, NavItem } from "../types";
import DockNav from "./react-bits/dock-nav";
import GradualBlur from "./react-bits/gradual-blur";
import { useActiveHomeSection } from "../hooks/use-active-home-section";
import { HOME_SECTIONS, scrollWindowToSection } from "../utils/nav";

interface SiteNavProps {
  currentPage?: "home" | "blogs";
}

export default function SiteNav({ currentPage = "home" }: SiteNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeHomeSection = useActiveHomeSection(currentPage === "home");
  const isBlogsPage = currentPage === "blogs";
  const isHomePage = currentPage === "home";

  const items: NavItem[] = [
    {
      key: "about",
      label: "about",
      href: isBlogsPage ? "/#about" : "#about",
    },
    {
      key: "projects",
      label: "projects",
      href: isBlogsPage ? "/#projects" : "#projects",
    },
    {
      key: "blogs",
      label: "blogs",
      href: "/blogs",
    },
  ];

  const activeKey =
    location.pathname === "/blogs" ? "blogs" : activeHomeSection;

  useLayoutEffect(() => {
    const nav = document.querySelector("header[data-site-nav]");

    if (!nav) {
      return;
    }

    const updateNavHeight = () => {
      const height = nav.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--site-nav-height", `${height}px`);
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    return () => {
      window.removeEventListener("resize", updateNavHeight);
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    event.preventDefault();

    if (item.key === "blogs") {
      navigate("/blogs");
      return;
    }

    if (isBlogsPage) {
      navigate(`/#${item.key}`);
      return;
    }

    window.history.replaceState(null, "", `#${item.key}`);
    scrollWindowToSection(item.key as HomeSectionId);
  };

  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    const sectionId = location.hash.slice(1) as HomeSectionId;
    if (!HOME_SECTIONS.includes(sectionId)) return;

    // Delay to ensure layout is ready before measuring positions
    window.requestAnimationFrame(() => {
      scrollWindowToSection(sectionId);
    });
  }, [location.pathname, location.hash]);

  return (
    <header
      className={`${isHomePage ? "fixed inset-x-0 top-0" : "sticky top-0"} z-30 w-full overflow-hidden bg-[rgba(20,24,31,0.28)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(20,24,31,0.18)]`}
      data-site-nav
    >
      <GradualBlur
        target="parent"
        position="bottom"
        height="100%"
        strength={2}
        divCount={6}
        curve="bezier"
        opacity={0.7}
        className="pointer-events-none"
      />
      <nav
        aria-label="Primary"
        className="relative mx-auto flex w-full max-w-[1400px] items-center justify-center gap-2 px-4 py-3 sm:gap-4 md:gap-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 "
        />

        <DockNav items={items} activeKey={activeKey} onItemClick={handleClick} />
      </nav>
    </header>
  );
}
