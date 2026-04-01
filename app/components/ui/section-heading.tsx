interface SectionHeadingProps {
  children: string;
  className?: string;
}

export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-doto text-[3.7rem] font-semibold uppercase leading-none tracking-section text-white sm:text-[5.5rem] ${className}`.trim()}
    >
      {children}
    </h2>
  );
}
