import { projectCards, workExperiences } from "../data/projects-content";
import type { ContributionCalendar, ProjectCardData } from "../types";
import ContributionGraph from "./projects/contribution-graph";
import ProjectCard from "./projects/project-card";
import WorkExperienceColumn from "./projects/work-experience-column";

function getTechTags(projectList: ProjectCardData[]): string[] {
  return [...new Set(projectList.flatMap((project) => project.tech))].slice(0, 8);
}

interface ProjectsSectionProps {
  contributionCalendar: ContributionCalendar;
}

export default function ProjectsSection({
  contributionCalendar,
}: ProjectsSectionProps) {
  const tech = getTechTags(projectCards);
  const weeks = contributionCalendar.weeks ?? [];

  return (
    <section
      id="projects"
      className="min-h-[calc(100dvh-var(--site-nav-height,61px))] border-t border-white/80 bg-[#df1303] text-white"
    >
      <div className="grid min-h-[calc(100dvh-var(--site-nav-height,61px))] grid-cols-1 lg:grid-cols-[1.03fr_2.02fr]">
        <WorkExperienceColumn items={workExperiences} />

        <div className="grid min-h-[calc(100dvh-var(--site-nav-height,61px))] grid-cols-1 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[auto_auto_1fr] lg:min-h-0">
          <ContributionGraph weeks={weeks} />

          <div className="flex border-b border-white/80 px-8 py-8 lg:h-42 lg:items-center">
            <h2 className="text-right font-['Doto'] text-[3.6rem] font-semibold uppercase leading-none tracking-[-0.08em] sm:text-[5.2rem]">
              projects
            </h2>
          </div>

          <div className="w-full border-b border-white/80 px-8 py-4 font-['Doto'] text-[1.5rem] uppercase tracking-[-0.06em] lg:col-span-2">
            tech
          </div>
          <div className="h-full min-h-0 lg:col-span-2 lg:row-start-3 lg:overflow-y-auto">
            <div className="grid grid-cols-1 gap-px bg-white/80 md:grid-cols-2 xl:grid-cols-3">
              {projectCards.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
