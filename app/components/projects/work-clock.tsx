import { useEffect, useState } from "react";

function getIstClockLabel() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })
    .format(new Date())
    .replace(/\s/g, " ");
}

export default function WorkClock() {
  const [clockLabel, setClockLabel] = useState<string | null>(null);

  useEffect(() => {
    setClockLabel(getIstClockLabel());

    const intervalId = window.setInterval(() => {
      setClockLabel(getIstClockLabel());
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return <>{clockLabel ?? "-- : --"}</>;
}
