import { useEffect, useState, type ComponentType } from "react";
import type { ReachStat } from "../../types";
import InstagramIcon from "../ui/icons/instagram";
import XIcon from "../ui/icons/x";

interface ReachStripProps {
  stats: ReachStat[];
}

const STAT_ICON_MAP: Partial<
  Record<ReachStat["id"], ComponentType<{ className?: string }>>
> = {
  instagram: InstagramIcon,
  x: XIcon,
};

function PageVisitsIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path d="M3.5 12s3.2-5.5 8.5-5.5S20.5 12 20.5 12 17.3 17.5 12 17.5 3.5 12 3.5 12Z" />
      <circle cx="12" cy="12" r="2.7" />
    </svg>
  );
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function AnimatedCount({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2_600;
    const start = performance.now();
    let frameId = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [value]);

  return <>{formatCount(displayValue)}+</>;
}

function ReachStatItem({ stat }: { stat: ReachStat }) {
  const Icon = STAT_ICON_MAP[stat.id] ?? PageVisitsIcon;
  const content = (
    <div className="grid gap-3 py-4">
      <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/45">
        <Icon className="h-4 w-4 text-white/70" />
        <span>{stat.label}</span>
      </div>

      <div className="min-w-0">
        <p
          className="font-mono text-[1.55rem] font-semibold uppercase leading-none tracking-tight text-[color:var(--ledger-accent)] sm:text-[1.95rem]"
        >
          <AnimatedCount value={stat.numericValue} />
        </p>
        <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/70">
          {stat.metricLabel}
        </p>
      </div>
    </div>
  );

  if (!stat.href) {
    return content;
  }

  return (
    <a href={stat.href} rel="noreferrer" target="_blank">
      {content}
    </a>
  );
}

export default function ReachStrip({ stats }: ReachStripProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-doto text-[2.2rem] font-black uppercase leading-none tracking-section text-white sm:text-[3.2rem]">
          reach
        </h2>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-accent">
          live-ish
        </p>
      </div>

      <div className="mt-6 grid divide-y divide-white/12 border-t border-white/18 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <ReachStatItem key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
