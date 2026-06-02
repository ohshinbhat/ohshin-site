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
      className={`font-doto text-[3rem] font-black uppercase leading-none tracking-section text-white sm:text-[4.5rem] md:text-[5.5rem] ${className}`.trim()}
    >
      {children}
    </h2>
  );
}
