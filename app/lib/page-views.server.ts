import recovered from "../../backups/page-views-2026-10-15.json";
import { queryD1 } from "./d1.server";
import type { PageViewTotal } from "../types";
import {
  normalizePageViewSource,
  type PageViewSource,
} from "../utils/page-view-source";

export const RECOVERED_PAGE_VIEW_TOTAL = recovered.total;

interface PageViewIncrementResult extends PageViewTotal {
  source: PageViewSource;
}

let lastKnownTotal = RECOVERED_PAGE_VIEW_TOTAL;

function recordTotal(value: unknown): PageViewTotal {
  if (value !== null && typeof value !== "number" && typeof value !== "string") {
    throw new Error("Invalid visit counter value");
  }
  const total = Number(value);
  if (value === null || !Number.isSafeInteger(total) || total < RECOVERED_PAGE_VIEW_TOTAL) {
    throw new Error("Invalid visit counter value");
  }
  lastKnownTotal = Math.max(lastKnownTotal, total);
  return { live: true, total: lastKnownTotal, status: "live" };
}

export async function getPageViewTotal(): Promise<PageViewTotal> {
  try {
    const rows = await queryD1<{ total: number }>("SELECT total FROM page_views WHERE id = 1");
    if (rows === null) return { live: false, total: lastKnownTotal, status: "unconfigured" };
    return recordTotal(rows[0]?.total);
  } catch {
    return {
      live: false,
      total: lastKnownTotal,
      status: "unavailable",
    };
  }
}

export async function incrementPageView(
  sourceInput: string | null | undefined,
): Promise<PageViewIncrementResult> {
  const source = normalizePageViewSource(sourceInput);
  try {
    // The column comes from the fixed source allowlist. One SQL update changes both
    // the source count and the generated total, including under concurrent requests.
    const rows = await queryD1<{ total: number }>(
      `UPDATE page_views SET ${source} = ${source} + 1, updated_at = ? WHERE id = 1 RETURNING total`,
      [new Date().toISOString()],
    );
    if (rows === null) return { live: false, source, total: lastKnownTotal, status: "unconfigured" };
    return { ...recordTotal(rows[0]?.total), source };
  } catch {
    return {
      live: false,
      source,
      total: lastKnownTotal,
      status: "unavailable",
    };
  }
}
