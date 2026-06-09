import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ComponentType } from "react";
import type { SiteNavigationItem, SiteSocialLink } from "../types";
import DockNav from "./react-bits/dock-nav";
import { useActiveHomeSection } from "../hooks/use-active-home-section";
import { externalLinkProps } from "../utils/link";
import { isHomeSectionId, scrollWindowToSection } from "../utils/nav";
import GitHubIcon from "./ui/icons/github";
import InstagramIcon from "./ui/icons/instagram";
import LinkedInIcon from "./ui/icons/linkedin";
import MailIcon from "./ui/icons/mail";
import XIcon from "./ui/icons/x";

interface SiteNavProps {
  currentPage?: "home" | "work";
  items: SiteNavigationItem[];
  socialLinks: SiteSocialLink[];
}

const SOCIAL_ICON_MAP: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  github: GitHubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
  x: XIcon,
};

const SOCIAL_ICON_CLASS_MAP: Record<string, string> = {
  github: "h-6 w-6",
  instagram: "h-7 w-7",
  linkedin: "h-6 w-6",
  mail: "h-6 w-6",
  x: "h-5.5 w-5.5",
};

export default function SiteNav({
  currentPage = "home",
  items,
  socialLinks,
}: SiteNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const hideTimeoutRef = useRef<number | null>(null);
  const tickingRef = useRef(false);
  const [isDockHidden, setIsDockHidden] = useState(false);
  const activeHomeSection = useActiveHomeSection(currentPage === "home");
  const isHomePage = location.pathname === "/";
  const visibleItems = items.filter(
    (item): item is SiteNavigationItem =>
      item.key === "about" || item.key === "projects",
  );
  const visibleSocialLinks = socialLinks.filter((link) =>
    Object.hasOwn(SOCIAL_ICON_MAP, link.label.toLowerCase()),
  );

  const activeKey = location.pathname.startsWith("/work")
    ? "projects"
    : activeHomeSection;

  useEffect(() => {
    setIsDockHidden(false);
  }, [location.pathname]);

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
    if (item.key === "projects") {
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

  useEffect(() => {
    const updateDockVisibility = () => {
      const currentScrollY = window.scrollY;

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      if (currentScrollY < 24) {
        setIsDockHidden(false);
      } else {
        setIsDockHidden(true);
        hideTimeoutRef.current = window.setTimeout(() => {
          setIsDockHidden(false);
        }, 560);
      }

      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;
      window.requestAnimationFrame(updateDockVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-30 flex w-full justify-center px-3 transition-transform duration-300 ease-out sm:bottom-6 ${
        isDockHidden ? "translate-y-[calc(100%+2rem)]" : "translate-y-0"
      }`}
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
          className="relative flex max-w-full items-center justify-center gap-1.5"
        >
          <DockNav
            items={visibleItems}
            activeKey={activeKey}
            onItemClick={handleClick}
          />
          {visibleSocialLinks.length > 0 ? (
            <>
              <span
                aria-hidden="true"
                className="h-7 w-px shrink-0 bg-white/10"
              />
              <div className="flex items-center gap-0.5 pr-1 sm:gap-1">
                {visibleSocialLinks.map((link) => {
                  const iconKey = link.label.toLowerCase();
                  const Icon = SOCIAL_ICON_MAP[iconKey];
                  const iconClassName =
                    SOCIAL_ICON_CLASS_MAP[iconKey] ?? "h-6 w-6";

                  return (
                    <a
                      key={link.label}
                      aria-label={link.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white/68 transition-colors duration-150 hover:text-white"
                      href={link.url}
                      {...externalLinkProps(link.url)}
                    >
                      <Icon className={iconClassName} />
                    </a>
                  );
                })}
              </div>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
