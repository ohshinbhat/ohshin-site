import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, type MouseEvent } from "react";
import type { SiteNavigationItem } from "../types";
import DockNav from "./react-bits/dock-nav";
import { useActiveHomeSection } from "../hooks/use-active-home-section";
import { isHomeSectionId, scrollWindowToSection } from "../utils/nav";

interface SiteNavProps {
  currentPage?: "home" | "work" | "blogs";
  items: SiteNavigationItem[];
}

export default function SiteNav({ currentPage = "home", items }: SiteNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeHomeSection = useActiveHomeSection(currentPage === "home");
  const isHomePage = location.pathname === "/";

  const activeKey = location.pathname.startsWith("/blogs")
    ? "blogs"
    : location.pathname.startsWith("/work")
      ? "projects"
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
    if (item.key === "blogs" || item.key === "projects") {
      return;
    }

    if (!isHomePage) {
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
      className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex w-full justify-center px-3 sm:bottom-6"
      data-site-nav
    >
      <div className="pointer-events-auto relative max-w-full rounded-full border border-white/14 bg-[rgba(10,12,17,0.42)] p-1.5 shadow-nav-glass backdrop-blur-2xl">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.045)_42%,rgba(0,0,0,0.12))]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-px rounded-full border border-black/18"
        />

        <nav
          aria-label="Primary"
          className="relative flex max-w-full items-center justify-center"
        >
          <DockNav
            items={items}
            activeKey={activeKey}
            onItemClick={handleClick}
          />
        </nav>
      </div>
    </header>
  );
}
