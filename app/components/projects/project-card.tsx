import { staggerDelay } from "../../config/ui";
import type { SiteProject } from "../../types";
import ArrowUpRight from "../ui/icons/arrow-up-right";
import GitHubIcon from "../ui/icons/github";

interface ProjectCardProps {
  project: SiteProject;
  revealIndex?: number;
  serial?: string;
}

export default function ProjectCard({
  project,
  revealIndex = 0,
  serial,
}: ProjectCardProps) {
  return (
    <article
      className="grid gap-4 rounded-[1.35rem] bg-theme-black/24 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/6 transition-transform duration-300 ease-out motion-safe:animate-work-reveal motion-safe:[animation-range:entry_0%_cover_34%] motion-safe:[animation-timeline:view()] motion-safe:hover:translate-x-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:px-5"
      style={{ animationDelay: staggerDelay(revealIndex, 160, 80) }}
    >
      <div className="hidden pr-5 font-doto text-[1.6rem] font-black leading-none text-accent/80 sm:block">
        {serial}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-3">
          {serial ? (
            <span className="font-doto text-[1.4rem] font-black leading-none text-accent/80 sm:hidden">
              {serial}
            </span>
          ) : null}
          <h3 className="font-doto text-[1.35rem] font-black uppercase leading-none tracking-section text-white sm:text-[1.82rem]">
            {project.title}
          </h3>
        </div>
        <p className="mt-3 max-w-[46ch] font-mono text-[0.74rem] leading-6 text-white/58 sm:text-[0.8rem]">
          {project.summary}
        </p>
      </div>

      <div className="flex h-full items-center gap-3 self-center text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.18)]">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} GitHub`}
          >
            <GitHubIcon className="h-7 w-7" />
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} live site`}
          >
            <ArrowUpRight className="h-7 w-7" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
