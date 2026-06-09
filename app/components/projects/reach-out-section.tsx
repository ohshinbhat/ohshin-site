import { staggerDelay, surfaces, textStyles } from "../../config/ui";
import type { SiteReachOutSection } from "../../types";
import { externalLinkProps } from "../../utils/link";
import GlassSheen from "../ui/glass-sheen";
import ArrowUpRight from "../ui/icons/arrow-up-right";

interface ReachOutSectionProps {
  content: SiteReachOutSection;
}

export default function ReachOutSection({ content }: ReachOutSectionProps) {
  return (
    <section className={surfaces.reachOutPanel}>
      <GlassSheen className="left-[-40%] bg-white/[0.035] motion-safe:[animation-delay:-6.4s] motion-safe:[animation-duration:12.7s]" />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent/24 blur-3xl motion-safe:animate-reach-pulse motion-safe:[animation-delay:-3.1s]"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className={textStyles.accentLabel}>
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-doto text-[clamp(3.4rem,11vw,8rem)] font-black uppercase leading-[0.8] tracking-section text-white">
            {content.title}
          </h2>
        </div>
        <p className="max-w-[58ch] font-mono text-[0.82rem] leading-7 text-white/68 sm:text-[0.9rem] lg:justify-self-end">
          {content.description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {content.lanes.map((lane, index) => (
          <article
            key={lane.id}
            className="relative min-w-0 overflow-hidden rounded-[1.75rem] bg-theme-black/40 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.10)] ring-1 ring-white/10 transition-transform duration-500 ease-out motion-safe:animate-work-reveal motion-safe:[animation-range:entry_0%_cover_32%] motion-safe:[animation-timeline:view()] motion-safe:hover:-translate-y-1.5 sm:p-6"
            style={{ animationDelay: staggerDelay(index, 240, 90) }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-white/48"
            />
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-accent">
              {lane.label}
            </p>
            <h3 className="mt-5 font-doto text-[2.25rem] font-black uppercase leading-[0.9] tracking-section text-white sm:text-[2.7rem]">
              {lane.title}
            </h3>
            <p className="mt-5 font-mono text-[0.76rem] leading-6 text-white/62">
              {lane.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {lane.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  {...externalLinkProps(action.href)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-theme-black shadow-[0_12px_32px_rgba(255,255,255,0.12)]"
                >
                  <span>{action.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

            {lane.options && lane.options.length > 0 ? (
              <div className="mt-6 grid gap-2">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.24em] text-white/38">
                  choose a chaos prompt
                </p>
                {lane.options.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    {...externalLinkProps(option.href)}
                    className="flex items-center justify-between gap-3 rounded-[1rem] bg-white/[0.055] px-3 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/72 ring-1 ring-white/8"
                  >
                    <span>{option.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white" />
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
