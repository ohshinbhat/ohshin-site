import type { CSSProperties } from "react";

type BlurPosition = "top" | "bottom" | "left" | "right";
type BlurCurve = "linear" | "bezier";

interface GradualBlurProps {
  target?: "parent";
  position?: BlurPosition;
  height?: string;
  width?: string;
  strength?: number;
  divCount?: number;
  opacity?: number;
  curve?: BlurCurve;
  className?: string;
}

function getDirection(position: BlurPosition): string {
  return {
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  }[position];
}

function getProgress(index: number, count: number, curve: BlurCurve): number {
  const base = index / count;

  if (curve === "bezier") {
    return base * base * (3 - 2 * base);
  }

  return base;
}

export default function GradualBlur({
  target = "parent",
  position = "bottom",
  height = "100%",
  width = "100%",
  strength = 2,
  divCount = 6,
  opacity = 0.7,
  curve = "bezier",
  className = "",
}: GradualBlurProps) {
  void target;
  const direction = getDirection(position);
  const isVertical = position === "top" || position === "bottom";
  const layers = Array.from({ length: divCount }, (_, index) => {
    const step = 100 / divCount;
    const i = index + 1;
    const p1 = Math.max(0, step * (i - 1));
    const p2 = Math.min(100, step * i);
    const p3 = Math.min(100, p2 + step);
    const p4 = Math.min(100, p3 + step);
    const progress = getProgress(i, divCount, curve);
    const blur = (0.25 + progress * 1.8) * strength;

    return {
      id: i,
      style: {
        position: "absolute",
        inset: 0,
        maskImage: `linear-gradient(${direction}, transparent ${p1}%, black ${p2}%, black ${p3}%, transparent ${p4}%)`,
        WebkitMaskImage: `linear-gradient(${direction}, transparent ${p1}%, black ${p2}%, black ${p3}%, transparent ${p4}%)`,
        backdropFilter: `blur(${blur.toFixed(2)}px)`,
        WebkitBackdropFilter: `blur(${blur.toFixed(2)}px)`,
        opacity,
      } as CSSProperties,
    };
  });

  const containerStyle: CSSProperties = {
    left: 0,
    [position]: 0,
    right: isVertical ? 0 : undefined,
    top: isVertical ? undefined : 0,
    bottom: isVertical ? undefined : 0,
    height: isVertical ? height : "100%",
    width: isVertical ? width : height,
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`.trim()}
      style={containerStyle}
    >
      {layers.map((layer) => (
        <div key={layer.id} style={layer.style} />
      ))}
    </div>
  );
}
