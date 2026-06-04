import { BlockCell, BlockHeader } from "../blocks/signal-board";

interface ProjectsHeaderProps {
  title: string;
}

export default function ProjectsHeader({ title }: ProjectsHeaderProps) {
  return (
    <BlockCell tone="accent" className="px-5 py-7 sm:px-8 sm:py-8 lg:min-h-nav-row">
      <BlockHeader
        eyebrow="selected work"
        title={title}
        description="Projects as blocks: status, system, links, and the signal that mattered."
        titleClassName="text-[3rem] sm:text-[4.6rem]"
      />
    </BlockCell>
  );
}
