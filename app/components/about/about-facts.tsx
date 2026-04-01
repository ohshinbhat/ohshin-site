import type { AboutFact } from "../../types";

interface AboutFactsProps {
  facts: AboutFact[];
}

export default function AboutFacts({ facts }: AboutFactsProps) {
  return (
    <div className="space-y-1.5 text-[0.95rem] leading-7 text-white/92 lg:text-[0.9rem] lg:leading-6">
      {facts.map(([label, value], index) => (
        <p key={`${label}-${index}`}>
          <span className="font-semibold">{label}:</span> {value}
        </p>
      ))}
    </div>
  );
}
