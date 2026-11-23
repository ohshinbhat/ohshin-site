import { useLocation } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import type { PageViewTotal } from "../types";
import { normalizePageViewSource } from "../utils/page-view-source";

const PageViewContext = createContext<PageViewTotal | null>(null);

export function usePageViews() {
  return useContext(PageViewContext);
}

export default function PageViewTracker({ children }: PropsWithChildren) {
  const location = useLocation();
  const lastTrackedRouteKey = useRef<string | null>(null);
  const [pageViews, setPageViews] = useState<PageViewTotal | null>(null);

  useEffect(() => {
    const routeKey = `${location.pathname}?${location.search}`;

    if (lastTrackedRouteKey.current === routeKey) {
      return;
    }

    lastTrackedRouteKey.current = routeKey;

    const searchParams = new URLSearchParams(location.search);
    const source = normalizePageViewSource(searchParams.get("source"));

    void fetch(`/api/page-view?source=${encodeURIComponent(source)}`, {
      credentials: "same-origin",
      keepalive: true,
      method: "POST",
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return;
        const result = await response.json() as PageViewTotal;
        if (!Number.isSafeInteger(result.total) || result.total < 0) return;
        setPageViews(previous => ({
          ...result,
          total: Math.max(previous?.total ?? 0, result.total),
        }));
      })
      .catch(() => undefined);
  }, [location.pathname, location.search]);

  return <PageViewContext.Provider value={pageViews}>{children}</PageViewContext.Provider>;
}
