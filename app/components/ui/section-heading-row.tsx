interface SectionHeadingRowProps {
  title: string;
  titleClassName: string;
}

export default function SectionHeadingRow({
  title,
  titleClassName,
}: SectionHeadingRowProps) {
  return <h2 className={titleClassName}>{title}</h2>;
}
