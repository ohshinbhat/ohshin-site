import type {
  ContributionCalendar,
  SiteProject,
  SiteProjectsSection,
  SiteWorkExperienceSection,
} from "../types";
import ContributionGraph from "./projects/contribution-graph";
import ProjectCard from "./projects/project-card";
import ProjectsHeader from "./projects/projects-header";
import TechRow from "./projects/tech-row";
import WorkExperienceColumn from "./projects/work-experience-column";

function getTechTags(projectList: SiteProject[]): string[] {
  return [...new Set(projectList.flatMap((project) => project.tech))].slice(0, 8);
}

interface ProjectsSectionProps {
  contributionCalendar: ContributionCalendar;
  projects: SiteProjectsSection;
  workExperience: SiteWorkExperienceSection;
}

export default function ProjectsSection({
  contributionCalendar,
  projects,
  workExperience,
}: ProjectsSectionProps) {
  const tech = getTechTags(projects.items);
  const weeks = contributionCalendar.weeks ?? [];

  return (
    <section
      id="projects"
      className="min-h-screen-nav border-t border-white/80 bg-accent text-white"
    >
      <div className="grid min-h-screen-nav grid-cols-1 lg:grid-cols-[1.03fr_2.02fr]">
        <WorkExperienceColumn
          title={workExperience.sectionTitle}
          items={workExperience.items}
        />

        <div className="grid min-h-screen-nav grid-cols-1 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[auto_auto_1fr] lg:min-h-0">
          <ContributionGraph weeks={weeks} />
          <ProjectsHeader title={projects.sectionTitle} />
          <TechRow title={projects.techTitle} tech={tech} />
          <div className="h-full min-h-0 lg:col-span-2 lg:row-start-3 lg:overflow-y-auto">
            <div className="grid grid-cols-1 gap-px bg-white/80 md:grid-cols-2 xl:grid-cols-3">
              {projects.items.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
