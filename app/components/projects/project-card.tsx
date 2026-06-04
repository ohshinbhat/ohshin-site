import type { SiteProject } from "../../types";
import { BlockCell, BlockLabel } from "../blocks/signal-board";

interface ProjectCardProps {
  project: SiteProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <BlockCell as="article" tone="accent" className="flex min-h-[18rem] flex-col justify-between sm:min-h-[21rem]">
      <div className="flex-1 px-5 py-6 font-mono text-[0.86rem] leading-6 text-white/84 sm:px-8 sm:py-8 sm:text-sm sm:leading-7">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.14em] text-white/56 sm:tracking-[0.18em]">
          <span>{project.year}</span>
          <span>{project.status}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="border border-white/50 px-2 py-0.5 text-[0.64rem] uppercase tracking-[0.14em] text-white/70"
            >
              {item}
            </span>
          ))}
        </div>

        <BlockLabel className="mt-6 text-[0.58rem] text-white/44">project memo</BlockLabel>
        <p className="mt-5 text-[0.86rem] leading-6 text-white/82 sm:text-sm sm:leading-7">{project.summary}</p>
        <p className="mt-4 text-[0.82rem] leading-6 text-white/60">{project.role}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-white/80 px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-white"
            >
              github
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-white/80 px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-white"
            >
              live site
            </a>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/70 px-5 py-4 sm:px-8">
        <p className="block font-mono text-center text-[0.82rem] uppercase tracking-[0.1em] text-white sm:text-[0.9rem] sm:tracking-[0.12em]">
          {project.title}
        </p>
      </div>
    </BlockCell>
  );
}
