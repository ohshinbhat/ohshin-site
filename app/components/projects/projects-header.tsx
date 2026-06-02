import SectionHeading from "../ui/section-heading";

interface ProjectsHeaderProps {
  title: string;
}

export default function ProjectsHeader({ title }: ProjectsHeaderProps) {
  return (
    <div className="flex border-b border-white/80 px-5 py-7 sm:px-8 sm:py-8 lg:h-nav-row lg:items-center">
      <SectionHeading className="text-[3rem] sm:text-[5.2rem]">
        {title}
      </SectionHeading>
    </div>
  );
}
