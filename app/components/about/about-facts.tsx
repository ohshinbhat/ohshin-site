import { useEffect, useState } from "react";
import type { AboutFact } from "../../types";

interface AboutFactsProps {
  facts: AboutFact[];
}

function getIstTimeLabel() {
  const time = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  return `${time} IST`;
}

export default function AboutFacts({ facts }: AboutFactsProps) {
  const [istTime, setIstTime] = useState<string | null>(null);

  useEffect(() => {
    setIstTime(getIstTimeLabel());

    const intervalId = window.setInterval(() => {
      setIstTime(getIstTimeLabel());
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-1.5 text-[0.95rem] leading-7 text-white/92 lg:text-[0.9rem] lg:leading-6">
      {facts.map((fact, index) => {
        const value =
          fact.label.toLowerCase() === "timezone" && istTime
            ? istTime
            : fact.value;

        return (
          <p key={`${fact.label}-${index}`}>
            <span className="font-semibold">{fact.label}:</span>{" "}
            {fact.href ? (
              <a
                href={fact.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </p>
        );
      })}
    </div>
  );
}
