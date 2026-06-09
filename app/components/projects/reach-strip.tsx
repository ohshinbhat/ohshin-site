import { useEffect, useState, type ComponentType } from "react";
import { staggerDelay, surfaces, textStyles } from "../../config/ui";
import type { ReachStat } from "../../types";
import InstagramIcon from "../ui/icons/instagram";
import XIcon from "../ui/icons/x";
import GlassSheen from "../ui/glass-sheen";
import SectionHeadingRow from "../ui/section-heading-row";

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
    const duration = 8_400;
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

function ReachStatItem({ index, stat }: { index: number; stat: ReachStat }) {
  const Icon = STAT_ICON_MAP[stat.id] ?? PageVisitsIcon;
  const content = (
    <div
      className="group relative isolate grid min-h-[13rem] min-w-0 overflow-hidden rounded-[1.75rem] bg-theme-black/38 px-5 py-5 shadow-[0_22px_80px_rgba(0,0,0,0.28),0_0_44px_rgba(211,23,10,0.12),inset_0_1px_0_rgba(255,255,255,0.11)] ring-1 ring-white/10 transition-transform duration-700 ease-out motion-safe:animate-work-reveal motion-safe:[animation-range:entry_0%_cover_34%] motion-safe:[animation-timeline:view()] motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.018] sm:px-6"
      style={{ animationDelay: staggerDelay(index, 220, 80) }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-14 -top-16 -z-10 h-40 w-40 rounded-full bg-accent/28 blur-2xl motion-safe:animate-reach-pulse"
        style={{ animationDelay: staggerDelay(index, 0, 640) }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 left-1/2 -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl motion-safe:animate-reach-pulse"
        style={{ animationDelay: staggerDelay(index, 900, 520) }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(circle_at_18%_18%,rgba(255,255,255,.10),transparent_34%),radial-gradient(circle_at_80%_90%,rgba(211,23,10,.24),transparent_42%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-white/60 motion-safe:animate-reach-sweep"
      />

      <div className="relative flex items-center justify-between gap-4 font-mono text-[0.74rem] uppercase tracking-[0.18em] text-white/56 sm:text-[0.82rem]">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-white/78" />
          <span>{stat.label}</span>
        </div>
        <span className="font-mono text-[0.58rem] text-accent">
          0{index + 1}
        </span>
      </div>

      <div className="relative mt-10 min-w-0 overflow-hidden">
        <p
          className="truncate font-metric text-[clamp(1.8rem,4.8vw,4.1rem)] font-semibold uppercase leading-none tracking-[-0.08em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.26)]"
        >
          <AnimatedCount value={stat.numericValue} />
        </p>
        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/70">
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
    <section
      className={`${surfaces.reachPanel} motion-safe:[animation-delay:-8.4s] motion-safe:[animation-duration:14.2s]`}
    >
      <GlassSheen className="left-[-42%] bg-white/[0.04] motion-safe:[animation-delay:-1.8s] motion-safe:[animation-duration:13.1s]" />
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-28 -z-10 h-72 w-72 rounded-full bg-accent/28 blur-3xl motion-safe:animate-reach-pulse motion-safe:[animation-delay:-2.2s]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 top-10 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl motion-safe:animate-reach-pulse motion-safe:[animation-delay:-5.6s]"
      />
      <SectionHeadingRow
        label="live-ish / counting slow"
        labelClassName={textStyles.accentLabel}
        title="reach"
        titleClassName="font-doto text-[2.6rem] font-black uppercase leading-none tracking-section text-white sm:text-[4.5rem]"
      />

      <div className="mt-7 grid min-w-0 gap-4 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <ReachStatItem key={stat.id} index={index} stat={stat} />
        ))}
      </div>
    </section>
  );
}
