import type { ReactNode } from "react";
import type { SiteProjectsSection, SiteWorkExperienceSection } from "../../types";
import ProjectCard from "./project-card";
import ProjectsHeader from "./projects-header";
import WorkExperienceColumn from "./work-experience-column";

interface ProjectsSectionProps {
  contributionGraphContent: ReactNode;
  projects: SiteProjectsSection;
  workExperience: SiteWorkExperienceSection;
}

export default function ProjectsSection({
  contributionGraphContent,
  projects,
  workExperience,
}: ProjectsSectionProps) {
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
          {contributionGraphContent}
          <ProjectsHeader title={projects.sectionTitle} />
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
