import type { ReactNode } from "react";
import type { SiteProjectsSection, SiteWorkExperienceSection } from "../../types";
import { BlockCell, BlockGrid } from "../blocks/signal-board";
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
      className="min-h-screen-nav bg-accent text-white"
    >
      <BlockGrid className="min-h-screen-nav lg:grid-cols-[1.02fr_2.08fr]">
        <WorkExperienceColumn
          title={workExperience.sectionTitle}
          items={workExperience.items}
        />

        <div className="grid min-h-screen-nav grid-cols-1 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[auto_auto_1fr] lg:min-h-0">
          <BlockCell tone="accent" className="lg:min-h-nav-row">
            {contributionGraphContent}
          </BlockCell>
          <ProjectsHeader title={projects.sectionTitle} />
          <BlockCell tone="accent" className="lg:col-span-2 lg:row-start-3 lg:min-h-0 lg:overflow-y-auto">
            <BlockGrid className="border-t-0 border-l-0 md:grid-cols-2 xl:grid-cols-3">
              {projects.items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </BlockGrid>
          </BlockCell>
        </div>
      </BlockGrid>
    </section>
  );
}
