interface TechRowProps {
  title: string;
  tech: string[];
}

export default function TechRow({ title, tech }: TechRowProps) {
  return (
    <>
      <div className="w-full border-b border-white/80 px-8 py-4 font-doto text-[1.5rem] uppercase tracking-[-0.06em] lg:col-span-2">
        {title}
      </div>
      <div className="border-b border-white/80 px-6 py-4 font-mono text-sm text-white/90 lg:col-span-2">
        <div className="flex flex-wrap gap-3">
          {tech.map((item) => (
            <span key={item} className="border border-white/80 px-3 py-1">
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
