import type { ReachStat } from "../types";
import { RECOVERED_PAGE_VIEW_TOTAL } from "./page-views.server";

const STATIC_REACH_STATS: ReachStat[] = [
  {
    href: "https://x.com/ohshinbhat",
    id: "x",
    label: "twitter",
    metricLabel: "Impressions",
    numericValue: 2_000_000,
    live: false,
  },
  {
    href: "https://www.instagram.com/ohshiin/",
    id: "instagram",
    label: "instagram",
    metricLabel: "Views",
    numericValue: 250_000,
    live: false,
  },
  {
    id: "visits",
    label: "page visits",
    metricLabel: "Page visits",
    tooltip: "My previous portfolio already had 150,000 visits, so I carried that history over here.",
    numericValue: RECOVERED_PAGE_VIEW_TOTAL,
    live: false,
  },
];

export function getReachStats() {
  return STATIC_REACH_STATS;
}
