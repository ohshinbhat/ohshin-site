import type { ReachStat, SiteSocialLink } from "../types";

interface ReachStatsArgs {
  socialLinks: SiteSocialLink[];
}

interface XUserResponse {
  data?: {
    public_metrics?: {
      followers_count?: number;
    };
  };
}

type UnknownRecord = Record<string, unknown>;

const FALLBACK_REACH_VALUES: Record<ReachStat["id"], number> = {
  instagram: 150_000,
  visits: 48_000,
  x: 1_500_000,
};

function getSocialUrl(socialLinks: SiteSocialLink[], label: string) {
  return socialLinks.find(
    (link) => link.label.toLowerCase() === label.toLowerCase(),
  )?.url;
}

function getHandleFromUrl(url: string | undefined, fallback: string) {
  if (!url) return fallback;
  const sanitized = url.replace(/\/$/, "");
  const handle = sanitized.split("/").pop();

  return handle?.replace(/^@/, "") || fallback;
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    compactDisplay: "short",
    maximumFractionDigits: value >= 10_000 ? 1 : 0,
    notation: "compact",
  }).format(value);
}

function parseStatValue(value: string | undefined) {
  if (!value) return null;
  const parsed = Number(value.replaceAll(",", ""));

  return Number.isFinite(parsed) ? parsed : null;
}

function getNumberFromPayload(payload: unknown, keys: string[]) {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as UnknownRecord;

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const parsed = parseStatValue(value);
      if (parsed !== null) return parsed;
    }
  }

  return null;
}

async function fetchJsonWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2_500);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    });

    if (!response.ok) return null;

    return response.json() as Promise<unknown>;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getXFollowers(username: string) {
  const token = process.env.X_BEARER_TOKEN;

  if (!token) return null;

  const payload = (await fetchJsonWithTimeout(
    `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "ohshin-portfolio",
      },
    },
  )) as XUserResponse | null;

  return payload?.data?.public_metrics?.followers_count ?? null;
}

async function getEndpointStat(endpoint: string | undefined, keys: string[]) {
  if (!endpoint) return null;
  const payload = await fetchJsonWithTimeout(endpoint);

  return getNumberFromPayload(payload, keys);
}

export async function getReachStats({
  socialLinks,
}: ReachStatsArgs): Promise<ReachStat[]> {
  const instagramUrl = getSocialUrl(socialLinks, "Instagram");
  const xUrl = getSocialUrl(socialLinks, "X");
  const xHandle = process.env.X_USERNAME || getHandleFromUrl(xUrl, "ohshinbhat");
  const instagramFollowers =
    parseStatValue(process.env.INSTAGRAM_FOLLOWERS) ??
    (await getEndpointStat(process.env.INSTAGRAM_STATS_ENDPOINT, [
      "followers",
      "followers_count",
      "count",
      "total",
    ]));
  const xFollowers =
    parseStatValue(process.env.X_FOLLOWERS) ?? (await getXFollowers(xHandle));
  const pageVisits =
    parseStatValue(process.env.PAGE_VISITS) ??
    (await getEndpointStat(process.env.PAGE_VISITS_ENDPOINT, [
      "visits",
      "pageviews",
      "count",
      "total",
    ]));

  return [
    {
      href: xUrl,
      id: "x",
      label: "twitter",
      metricLabel: "Impressions",
      numericValue: xFollowers ?? FALLBACK_REACH_VALUES.x,
      live: xFollowers !== null,
      value: formatCompactNumber(xFollowers ?? FALLBACK_REACH_VALUES.x),
    },
    {
      href: instagramUrl,
      id: "instagram",
      label: "instagram",
      metricLabel: "Views",
      numericValue: instagramFollowers ?? FALLBACK_REACH_VALUES.instagram,
      live: instagramFollowers !== null,
      value: formatCompactNumber(
        instagramFollowers ?? FALLBACK_REACH_VALUES.instagram,
      ),
    },
    {
      id: "visits",
      label: "page visits",
      metricLabel: "Page visits",
      numericValue: pageVisits ?? FALLBACK_REACH_VALUES.visits,
      live: pageVisits !== null,
      value: formatCompactNumber(pageVisits ?? FALLBACK_REACH_VALUES.visits),
    },
  ];
}
