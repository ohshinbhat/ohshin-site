import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { ContributionWeek } from "../../types";

const GRAPH_WEEKS = 53;
const DAYS_PER_WEEK = 7;
const GRAPH_GAP = 1;

interface ContributionGraphProps {
  weeks?: ContributionWeek[];
  loading?: boolean;
  error?: string | null;
}

function getContributionTone(count: number) {
  if (count <= 0) {
    return "rgba(255,255,255,0.12)";
  }

  if (count < 3) {
    return "color-mix(in srgb, var(--ledger-accent) 42%, white 8%)";
  }

  if (count < 7) {
    return "color-mix(in srgb, var(--ledger-accent) 64%, white 12%)";
  }

  if (count < 12) {
    return "color-mix(in srgb, var(--ledger-accent) 82%, white 16%)";
  }

  return "#ffffff";
}

function getFallbackTone(weekIndex: number, dayIndex: number) {
  if ((weekIndex + dayIndex) % 7 === 0) {
    return "#ffffff";
  }

  if ((weekIndex + dayIndex) % 3 === 0) {
    return "color-mix(in srgb, var(--ledger-accent) 78%, white 14%)";
  }

  if ((weekIndex + dayIndex) % 2 === 0) {
    return "color-mix(in srgb, var(--ledger-accent) 46%, transparent)";
  }

  return "rgba(255,255,255,0.12)";
}

function getNormalizedWeeks(weeks: ContributionWeek[]) {
  const recentWeeks = weeks.slice(-GRAPH_WEEKS);
  const paddingWeeks = Math.max(GRAPH_WEEKS - recentWeeks.length, 0);
  const emptyWeeks = Array.from({ length: paddingWeeks }, () => ({
    contributionDays: Array.from({ length: DAYS_PER_WEEK }, () => ({
      color: "",
      contributionCount: 0,
      date: "",
    })),
  }));

  return [...emptyWeeks, ...recentWeeks].map((week) => ({
    contributionDays: Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => (
      week.contributionDays[dayIndex] ?? {
        color: "",
        contributionCount: 0,
        date: "",
      }
    )),
  }));
}

function getGraphCellSize(width: number, height: number) {
  const widthBound = (width - GRAPH_GAP * (GRAPH_WEEKS - 1)) / GRAPH_WEEKS;
  const heightBound = (height - GRAPH_GAP * (DAYS_PER_WEEK - 1)) / DAYS_PER_WEEK;

  return Math.max(1, Math.floor(Math.min(widthBound, heightBound)));
}

export default function ContributionGraph({
  weeks = [],
  loading = false,
  error = null,
}: ContributionGraphProps) {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(3);
  const hasGraph = weeks.length > 0;
  const normalizedWeeks = getNormalizedWeeks(weeks);
  const graphStyle: CSSProperties = {
    gap: GRAPH_GAP,
    gridTemplateColumns: `repeat(${GRAPH_WEEKS}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${DAYS_PER_WEEK}, ${cellSize}px)`,
  };

  useEffect(() => {
    const node = graphRef.current;

    if (!node) {
      return undefined;
    }

    const updateCellSize = () => {
      const { height, width } = node.getBoundingClientRect();
      setCellSize(getGraphCellSize(width, height));
    };

    updateCellSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateCellSize);
      return () => window.removeEventListener("resize", updateCellSize);
    }

    const observer = new ResizeObserver(updateCellSize);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={graphRef}
      className="flex h-full w-full max-w-full items-center justify-center overflow-hidden"
    >
      {loading ? (
        <div className="grid max-h-full max-w-full" style={graphStyle}>
          {Array.from({ length: GRAPH_WEEKS }, (_, weekIndex) =>
            Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => (
              <span
                key={`${weekIndex}-${dayIndex}`}
                className="h-full w-full animate-pulse border border-white/18 bg-white/18"
                style={{
                  gridColumn: weekIndex + 1,
                  gridRow: dayIndex + 1,
                }}
              />
            )),
          )}
        </div>
      ) : hasGraph ? (
        <div className="grid max-h-full max-w-full" style={graphStyle}>
          {normalizedWeeks.map((week, weekIndex) =>
            week.contributionDays.map((day, dayIndex) => (
              <span
                key={day.date || `${weekIndex}-${dayIndex}`}
                className="h-full w-full border border-white/18"
                style={{
                  gridColumn: weekIndex + 1,
                  gridRow: dayIndex + 1,
                  backgroundColor: getContributionTone(day.contributionCount),
                }}
                title={
                  day.date
                    ? `${day.date}: ${day.contributionCount} contributions`
                    : undefined
                }
              />
            )),
          )}
        </div>
      ) : (
        <div
          aria-label={error ? "GitHub contribution graph unavailable" : undefined}
          className="grid max-h-full max-w-full"
          style={graphStyle}
        >
          {Array.from({ length: GRAPH_WEEKS }, (_, weekIndex) =>
            Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => (
              <span
                key={`${weekIndex}-${dayIndex}`}
                className="h-full w-full border border-white/18"
                style={{
                  gridColumn: weekIndex + 1,
                  gridRow: dayIndex + 1,
                  backgroundColor: getFallbackTone(weekIndex, dayIndex),
                }}
              />
            )),
          )}
        </div>
      )}
    </div>
  );
}
