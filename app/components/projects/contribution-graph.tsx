import type { ContributionWeek } from "../../types";

interface ContributionGraphProps {
  weeks?: ContributionWeek[];
  loading?: boolean;
}

export default function ContributionGraph({
  weeks = [],
  loading = false,
}: ContributionGraphProps) {
  const hasGraph = weeks.length > 0;

  return (
    <div className="overflow-x-auto px-3 py-3 lg:flex lg:min-h-nav-row lg:items-center lg:overflow-hidden">
      {loading ? (
        <div className="grid w-[34rem] grid-cols-14 gap-1 sm:w-[48rem] sm:grid-cols-21 xl:w-full xl:grid-cols-28">
          {Array.from({ length: 140 }, (_, index) => (
            <span
              key={index}
              className="aspect-square w-full animate-pulse border border-white/15 bg-white/8"
            />
          ))}
        </div>
      ) : hasGraph ? (
        <div className="grid w-[34rem] grid-cols-14 gap-1 sm:w-[48rem] sm:grid-cols-21 xl:w-full xl:grid-cols-28">
          {weeks.flatMap((week, weekIndex) =>
            week.contributionDays.map((day) => (
              <span
                key={`${day.date}-${weekIndex}`}
                className="aspect-square w-full border border-white/20"
                style={{ backgroundColor: day.color }}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            )),
          )}
        </div>
      ) : (
        <div className="px-4 py-6 font-mono text-sm text-white/82">
          contribution graph unavailable. add `GITHUB_TOKEN` to enable live data.
        </div>
      )}
    </div>
  );
}
