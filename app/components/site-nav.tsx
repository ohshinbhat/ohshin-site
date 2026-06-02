import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, type MouseEvent } from "react";
import type { SiteNavigationItem } from "../types";
import DockNav from "./react-bits/dock-nav";
import GradualBlur from "./react-bits/gradual-blur";
import { useActiveHomeSection } from "../hooks/use-active-home-section";
import { isHomeSectionId, scrollWindowToSection } from "../utils/nav";

interface SiteNavProps {
  currentPage?: "home" | "blogs";
  items: SiteNavigationItem[];
}

export default function SiteNav({ currentPage = "home", items }: SiteNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeHomeSection = useActiveHomeSection(currentPage === "home");
  const isBlogsPage = currentPage === "blogs";
  const isHomePage = currentPage === "home";
  const resolvedItems = items.map((item) =>
    item.key === "blogs"
      ? item
      : {
          ...item,
          href: isBlogsPage ? `/${item.href}` : item.href,
        },
  );

  const activeKey = location.pathname.startsWith("/blogs")
    ? "blogs"
    : activeHomeSection;

  useEffect(() => {
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

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: SiteNavigationItem,
  ) => {
    if (item.key === "blogs") {
      return;
    }

    if (isBlogsPage) {
      event.preventDefault();
      navigate("/", {
        state: { targetSection: item.key },
      });
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, "", `#${item.key}`);
    scrollWindowToSection(item.key);
  };

  useEffect(() => {
    if (location.pathname !== "/") return;
    const stateSection =
      typeof location.state === "object" &&
      location.state !== null &&
      "targetSection" in location.state &&
      typeof location.state.targetSection === "string"
        ? location.state.targetSection
        : null;
    const sectionId = stateSection ?? location.hash.slice(1);
    if (!isHomeSectionId(sectionId)) return;

    // Delay to ensure layout is ready before measuring positions
    window.requestAnimationFrame(() => {
      window.history.replaceState(null, "", `#${sectionId}`);
      scrollWindowToSection(sectionId);
    });
  }, [location.pathname, location.hash, location.state]);

  return (
    <header
      className={`${isHomePage ? "fixed inset-x-0 top-0" : "sticky top-0"} z-30 w-full overflow-hidden bg-[rgba(20,24,31,0.28)] shadow-nav-glass backdrop-blur-xl supports-[backdrop-filter]:bg-glass`}
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
        className="relative mx-auto flex w-full max-w-site items-center justify-center gap-2 px-2 py-2.5 sm:gap-4 sm:px-4 sm:py-3 md:gap-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 "
        />

        <DockNav
          items={resolvedItems}
          activeKey={activeKey}
          onItemClick={handleClick}
        />
      </nav>
    </header>
  );
}
