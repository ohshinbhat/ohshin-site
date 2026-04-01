import type { SiteWorkExperience } from "../../types";

interface WorkExperienceColumnProps {
  title: string;
  items: SiteWorkExperience[];
}

export default function WorkExperienceColumn({
  title,
  items,
}: WorkExperienceColumnProps) {
  return (
    <aside className="border-b border-white/80 lg:border-r lg:border-b-0">
      <div className="flex border-b border-white/80 px-8 py-8 lg:h-nav-row lg:items-center">
        <h2 className="font-doto text-[2.7rem] font-semibold uppercase tracking-section sm:text-[3.4rem]">
          {title}
        </h2>
      </div>

      <div className="px-8 py-8">
        <div className="space-y-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="border border-white/80 bg-accent px-6 py-6 font-mono text-sm leading-6 text-white/88 transition-colors duration-500 ease-out hover:bg-black"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/70">
                {item.periodLabel}
              </p>
              <h3 className="mt-3 text-base font-semibold text-white">{item.role}</h3>
              <p className="mt-1 text-white/90">{item.company}</p>
              {item.location ? (
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-white/58">
                  {item.location}
                </p>
              ) : null}
              <p className="mt-4 text-white/78">{item.summary}</p>
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
    </aside>
  );
}
