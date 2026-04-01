import SectionHeading from "../ui/section-heading";

export default function ProjectsHeader() {
  return (
    <div className="flex border-b border-white/80 px-8 py-8 lg:h-nav-row lg:items-center">
      <SectionHeading className="text-right text-[3.6rem] sm:text-[5.2rem]">
        projects
      </SectionHeading>
    </div>
  );
}
