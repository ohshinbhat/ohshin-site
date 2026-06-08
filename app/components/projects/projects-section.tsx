import type { ReactNode } from "react";
import type {
  ReachStat,
  SiteProjectsSection,
  SiteWorkExperienceSection,
} from "../../types";
import ProjectCard from "./project-card";
import ReachStrip from "./reach-strip";
import WorkExperienceColumn from "./work-experience-column";

interface ProjectsSectionProps {
  contributionGraphContent: ReactNode;
  projects: SiteProjectsSection;
  reachStats: ReachStat[];
  workExperience: SiteWorkExperienceSection;
}

export default function ProjectsSection({
  contributionGraphContent,
  projects,
  reachStats,
  workExperience,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="min-h-screen bg-ink text-white [--ledger-accent:#df1303]"
    >
      <div className="mx-auto min-h-screen w-full max-w-[1320px] px-5 py-14 pb-32 sm:px-8 lg:px-10 lg:py-20">
        <header className="border-b border-white/18 pb-8">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent">
              work / output
            </p>
            <h1 className="mt-4 font-doto text-[4.6rem] font-black uppercase leading-none tracking-section text-white sm:text-[7rem] lg:text-[8.5rem]">
              work
            </h1>
          </div>
        </header>

        <div className="mt-8 h-[6rem] min-w-0 overflow-hidden border-y border-white/18 py-3">
          {contributionGraphContent}
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(17rem,0.58fr)_minmax(0,1fr)] lg:gap-20">
          <aside className="min-w-0">
            <WorkExperienceColumn
              title={workExperience.sectionTitle}
              items={workExperience.items}
            />

            <div className="mt-10">
              <ReachStrip stats={reachStats} />
            </div>
          </aside>

          <main className="min-w-0">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-doto text-[2.2rem] font-black uppercase leading-none tracking-section text-white sm:text-[3.2rem]">
                {projects.sectionTitle}
              </h2>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-accent">
                build log
              </p>
            </div>

            <div className="mt-6 border-t border-white/18">
              {projects.items.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  serial={String(index + 1).padStart(2, "0")}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
