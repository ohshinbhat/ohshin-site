import type { ProjectCardData } from "../../types";

interface ProjectCardProps {
  project: ProjectCardData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex min-h-[21rem] flex-col justify-between bg-[#df1303] transition-colors duration-500 ease-out hover:bg-black">
      <div className="flex-1 px-8 py-8 font-['IBM_Plex_Mono'] text-sm leading-7 text-white/84">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="border border-white/60 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/76"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm leading-7 text-white/82">{project.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-white/80 px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#df1303]"
          >
            github
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-white/80 px-3 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#df1303]"
          >
            live site
          </a>
        </div>
      </div>

      <div className="border-t border-white/80 px-8 py-4">
        <p className="block font-['IBM_Plex_Mono'] text-center text-[0.9rem] uppercase tracking-[0.12em] text-white">
          {project.title}
        </p>
      </div>
    </article>
  );
}
