import type { SiteWorkExperience } from "../../types";
import { BlockCell, BlockHeader, BlockLabel } from "../blocks/signal-board";

interface WorkExperienceColumnProps {
  title: string;
  items: SiteWorkExperience[];
}

export default function WorkExperienceColumn({
  title,
  items,
}: WorkExperienceColumnProps) {
  return (
    <BlockCell as="aside" tone="accent" className="lg:row-span-3">
      <div className="border-b border-white/70 px-5 py-7 sm:px-8 sm:py-8 lg:min-h-nav-row">
        <BlockHeader
          eyebrow="timeline"
          title={title}
          titleClassName="text-[2.15rem] sm:text-[3rem] lg:text-[3.2rem]"
        />
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="border border-white/55 bg-accent px-5 py-5 font-mono text-[0.76rem] leading-5 text-white/86 sm:px-6 sm:py-6 sm:text-[0.8rem] sm:leading-6"
            >
              <BlockLabel className="text-[0.6rem] text-white/58">{item.periodLabel}</BlockLabel>
              <h3 className="mt-3 text-[0.92rem] font-semibold text-white">{item.role}</h3>
              <p className="mt-1 text-[0.8rem] text-white/90">{item.company}</p>
              {item.location ? (
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-white/58">
                  {item.location}
                </p>
              ) : null}
              <p className="mt-4 text-[0.78rem] text-white/78 sm:text-[0.8rem]">{item.summary}</p>
              {item.highlights.length > 0 ? (
                <ul className="mt-4 space-y-1.5 text-white/72">
                  {item.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </BlockCell>
  );
}
