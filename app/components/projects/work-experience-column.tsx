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
    <section className="min-w-0">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-doto text-[2.2rem] font-black uppercase leading-none tracking-section text-white sm:text-[3.2rem]">
          {title}
        </h2>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-accent">
          timeline
        </p>
      </div>

      <div className="mt-6 border-t border-white/18">
        {items.map((item) => (
          <article
            key={item.id}
            className="grid gap-3 border-b border-white/12 py-5 font-mono text-[0.82rem] leading-5 text-white/62 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:text-[0.88rem]"
          >
            <div>
              <p className="text-[0.64rem] uppercase tracking-[0.14em] text-white/46">
                {item.periodLabel}
              </p>
              {item.location ? (
                <p className="mt-2 text-[0.64rem] uppercase tracking-[0.14em] text-white/46">
                  {item.location}
                </p>
              ) : null}
            </div>

            <div>
              <h3 className="font-mono text-[0.96rem] font-semibold text-white sm:text-[1.02rem]">
                {item.role}
              </h3>
              <p className="mt-1 text-white/86">{item.company}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
