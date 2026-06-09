import type { ReachStat } from "../types";

const STATIC_REACH_STATS: ReachStat[] = [
  {
    href: "https://x.com/ohshinbhat",
    id: "x",
    label: "twitter",
    metricLabel: "Impressions",
    numericValue: 2_000_000,
    value: "2M+",
    live: false,
  },
  {
    href: "https://www.instagram.com/ohshinbhat/",
    id: "instagram",
    label: "instagram",
    metricLabel: "Views",
    numericValue: 250_000,
    value: "250K+",
    live: false,
  },
  {
    id: "visits",
    label: "page visits",
    metricLabel: "Page visits",
    numericValue: 120_000,
    value: "120K+",
    live: false,
  },
];

export function getReachStats() {
  return STATIC_REACH_STATS;
}
