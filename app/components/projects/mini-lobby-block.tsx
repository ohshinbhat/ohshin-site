import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";

type PixelMatrix = string[];
type BurstKind = "snow" | "glow" | "wind";

interface BurstState {
  tick: number;
  x: number;
  y: number;
  kind: BurstKind;
  label: string;
}

const palette = {
  A: "#ffffff",
  B: "#eef7ff",
  C: "#dcecff",
  D: "#bfd9ff",
  E: "#93baf3",
  F: "#5e86c2",
  G: "#324a78",
  H: "#1f2e52",
  I: "#10192f",
  J: "#f7d9a7",
  K: "#9ff4ff",
  L: "#c4b5ff",
  M: "#7ce7ff",
  N: "#a6d0ff",
  O: "#dfe9f7",
  P: "#8ea3c3",
} as const;

const cloudSprite: PixelMatrix = [
  "...AAAAA.....",
  ".AAAAAAAAA...",
  "AAAAAAAAAAA..",
  ".AAAAAAAAA...",
  "..AAAAAAA....",
];

const summitGlowSprite: PixelMatrix = [
  "..J..",
  ".JJJ.",
  "JJJJJ",
  ".JJJ.",
  "..J..",
];

const snowSparkleSprite: PixelMatrix = [
  "..A..",
  ".AAA.",
  "..A..",
  ".....",
];

interface PixelSpriteProps {
  pixels: PixelMatrix;
  pixelSize?: number;
  className?: string;
}

function PixelSprite({ pixels, pixelSize = 4, className }: PixelSpriteProps) {
  const rows = pixels.length;
  const cols = pixels[0]?.length ?? 0;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        width: cols * pixelSize,
        height: rows * pixelSize,
        imageRendering: "pixelated",
      }}
    >
      <div className="relative" style={{ width: cols * pixelSize, height: rows * pixelSize }}>
        {pixels.flatMap((row, rowIndex) =>
          row.split("").map((cell, colIndex) => {
            if (cell === ".") {
              return null;
            }

            return (
              <span
                key={`${rowIndex}-${colIndex}-${cell}`}
                className="absolute block"
                style={{
                  left: colIndex * pixelSize,
                  top: rowIndex * pixelSize,
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: palette[cell as keyof typeof palette] ?? "#fff",
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

function KarakoramSky({
  hovered,
  parallaxX,
  stormGlow,
}: {
  hovered: boolean;
  parallaxX: number;
  stormGlow: boolean;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#09111f_0%,#182847_36%,#3a5e93_72%,#89a8d8_100%)]" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 0.7px, transparent 0.7px)",
          backgroundSize: "7px 7px",
          transform: `translateX(${parallaxX * 6}px)`,
        }}
      />
      <motion.div
        className="absolute left-[8%] top-[10%] opacity-80"
        animate={{ x: hovered ? 6 : 0 }}
        transition={{ duration: 2.1, ease: "easeOut" }}
      >
        <PixelSprite pixels={cloudSprite} pixelSize={2.4} />
      </motion.div>
      <motion.div
        className="absolute right-[12%] top-[16%] opacity-70"
        animate={{ x: hovered ? -8 : 0 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <PixelSprite pixels={cloudSprite} pixelSize={2.1} />
      </motion.div>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          stormGlow ? "opacity-35" : "opacity-12"
        } bg-[radial-gradient(circle_at_50%_18%,rgba(197,225,255,0.45),transparent_36%)]`}
      />
    </>
  );
}

interface TerrainBlock {
  color: string;
  height: string;
  left: string;
  opacity?: number;
  top: string;
  width: string;
}

function TerrainDetails({ blocks }: { blocks: TerrainBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <span
          key={`${block.left}-${block.top}-${index}`}
          aria-hidden="true"
          className="absolute block"
          style={{
            left: block.left,
            top: block.top,
            width: block.width,
            height: block.height,
            backgroundColor: block.color,
            opacity: block.opacity ?? 1,
          }}
        />
      ))}
    </>
  );
}

const leftPeakDetails: TerrainBlock[] = [
  { left: "50%", top: "25%", width: "10%", height: "5%", color: "#f7fcff" },
  { left: "42%", top: "36%", width: "19%", height: "4%", color: "#dcecff" },
  { left: "35%", top: "48%", width: "24%", height: "5%", color: "#bfd9ff" },
  { left: "61%", top: "42%", width: "11%", height: "18%", color: "#5e86c2", opacity: 0.8 },
  { left: "22%", top: "61%", width: "24%", height: "5%", color: "#6f86ad" },
  { left: "53%", top: "70%", width: "22%", height: "4%", color: "#4b668d", opacity: 0.75 },
  { left: "17%", top: "75%", width: "15%", height: "4%", color: "#dcecff", opacity: 0.65 },
];

const centerPeakDetails: TerrainBlock[] = [
  { left: "43%", top: "11%", width: "14%", height: "6%", color: "#ffffff" },
  { left: "37%", top: "22%", width: "26%", height: "5%", color: "#eef7ff" },
  { left: "31%", top: "34%", width: "19%", height: "5%", color: "#dcecff" },
  { left: "52%", top: "35%", width: "21%", height: "5%", color: "#bfd9ff" },
  { left: "25%", top: "48%", width: "30%", height: "5%", color: "#93baf3", opacity: 0.82 },
  { left: "57%", top: "50%", width: "23%", height: "6%", color: "#415c86", opacity: 0.8 },
  { left: "18%", top: "62%", width: "17%", height: "4%", color: "#eef7ff", opacity: 0.68 },
  { left: "38%", top: "67%", width: "27%", height: "4%", color: "#526f9c", opacity: 0.78 },
  { left: "70%", top: "73%", width: "13%", height: "4%", color: "#dcecff", opacity: 0.58 },
  { left: "11%", top: "80%", width: "21%", height: "5%", color: "#4d668f", opacity: 0.82 },
];

const rightPeakDetails: TerrainBlock[] = [
  { left: "44%", top: "8%", width: "17%", height: "6%", color: "#fcfeff" },
  { left: "36%", top: "20%", width: "24%", height: "5%", color: "#eef7ff" },
  { left: "59%", top: "28%", width: "18%", height: "5%", color: "#bfd9ff" },
  { left: "27%", top: "36%", width: "19%", height: "5%", color: "#dcecff", opacity: 0.86 },
  { left: "48%", top: "45%", width: "28%", height: "6%", color: "#31476a", opacity: 0.78 },
  { left: "17%", top: "57%", width: "25%", height: "5%", color: "#4d678f", opacity: 0.9 },
  { left: "64%", top: "62%", width: "20%", height: "5%", color: "#dcecff", opacity: 0.62 },
  { left: "30%", top: "75%", width: "32%", height: "4%", color: "#263b5f", opacity: 0.62 },
];

const foregroundRidgeBlocks: TerrainBlock[] = [
  { left: "0%", top: "0%", width: "8%", height: "36%", color: "#dcecff" },
  { left: "8%", top: "30%", width: "11%", height: "26%", color: "#9fb6d5" },
  { left: "19%", top: "12%", width: "9%", height: "32%", color: "#eef7ff" },
  { left: "28%", top: "40%", width: "15%", height: "28%", color: "#7891b5" },
  { left: "43%", top: "18%", width: "12%", height: "34%", color: "#bfd9ff" },
  { left: "55%", top: "52%", width: "16%", height: "24%", color: "#526b91" },
  { left: "71%", top: "25%", width: "10%", height: "30%", color: "#dcecff" },
  { left: "81%", top: "45%", width: "19%", height: "30%", color: "#7f96b8" },
];

function SnowPeaks({
  hovered,
  glowPeak,
}: {
  hovered: boolean;
  glowPeak: boolean;
}) {
  return (
    <>
      <div className="absolute inset-x-0 bottom-[14%] h-[10%] bg-[linear-gradient(180deg,#cadbf4_0%,#aebfdd_100%)] opacity-70" />

      <div className="absolute left-[-2%] bottom-[18%] h-[42%] w-[30%] bg-[#7d92b8] [clip-path:polygon(0_100%,18%_58%,33%_42%,48%_28%,64%_10%,82%_34%,100%_100%)]">
        <div className="absolute left-[46%] top-[8%] h-[20%] w-[22%] bg-[#f8fdff] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <TerrainDetails blocks={leftPeakDetails} />
      </div>

      <div className="absolute left-[18%] bottom-[17%] h-[56%] w-[36%] bg-[#667fa8] [clip-path:polygon(0_100%,12%_76%,24%_52%,39%_24%,50%_0,63%_18%,79%_40%,90%_65%,100%_100%)]">
        <div className="absolute left-[34%] top-[6%] h-[26%] w-[28%] bg-[#ffffff] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <TerrainDetails blocks={centerPeakDetails} />
      </div>

      <div className="absolute left-[46%] bottom-[18%] h-[48%] w-[28%] bg-[#556c93] [clip-path:polygon(0_100%,18%_60%,36%_34%,53%_10%,69%_26%,87%_55%,100%_100%)]">
        <div className="absolute left-[34%] top-[10%] h-[20%] w-[26%] bg-[#f7fcff] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <TerrainDetails blocks={leftPeakDetails} />
      </div>

      <div className="absolute right-[-2%] bottom-[16%] h-[52%] w-[34%] bg-[#425979] [clip-path:polygon(0_100%,14%_62%,28%_44%,45%_20%,63%_0,78%_24%,90%_52%,100%_100%)]">
        <div className="absolute left-[38%] top-[5%] h-[24%] w-[25%] bg-[#fcfeff] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <TerrainDetails blocks={rightPeakDetails} />
      </div>

      <div className="absolute inset-x-0 bottom-[13.6%] h-[11%] bg-[#6f83a7]">
        <TerrainDetails blocks={foregroundRidgeBlocks} />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0 12px, rgba(255,255,255,0.35) 12px 20px, transparent 20px 38px),
              linear-gradient(transparent 0 8px, rgba(36,54,86,0.45) 8px 10px, transparent 10px 18px),
              linear-gradient(90deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 18px, rgba(31,46,82,0.32) 18px 24px, transparent 24px 100%)
            `,
            backgroundSize: "48px 100%, 100% 18px, 36px 24px",
          }}
        />
      </div>

      <motion.div
        className="absolute left-[40%] bottom-[59%]"
        animate={{ opacity: glowPeak ? [0.2, 1, 0.2] : [0.1, 0.35, 0.1] }}
        transition={{ duration: glowPeak ? 1 : 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <PixelSprite pixels={summitGlowSprite} pixelSize={2.1} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-[13.8%] h-[2px] bg-white/16" />

      {hovered ? (
        <motion.div
          className="absolute left-[24%] bottom-[41%] h-[10%] w-[26%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]"
          animate={{ x: [0, 24, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </>
  );
}

function Snowfall({
  driftBoost,
  reducedMotion,
}: {
  driftBoost: number;
  reducedMotion: boolean;
}) {
  const flakes = useMemo(
    () => [
      { left: "8%", delay: 0, duration: 6.5, size: "h-1.5 w-1.5" },
      { left: "17%", delay: 0.4, duration: 5.8, size: "h-1 w-1" },
      { left: "28%", delay: 0.8, duration: 7.1, size: "h-1.5 w-1.5" },
      { left: "39%", delay: 0.1, duration: 6.2, size: "h-1 w-1" },
      { left: "52%", delay: 0.9, duration: 5.9, size: "h-1.5 w-1.5" },
      { left: "63%", delay: 0.3, duration: 7.3, size: "h-1 w-1" },
      { left: "76%", delay: 0.7, duration: 6.6, size: "h-1.5 w-1.5" },
      { left: "88%", delay: 0.2, duration: 5.6, size: "h-1 w-1" },
    ],
    [],
  );

  return (
    <>
      {flakes.map((flake) => (
        <motion.span
          key={`${flake.left}-${flake.delay}`}
          className={`absolute top-[-4%] rounded-full bg-white/90 ${flake.size}`}
          style={{ left: flake.left }}
          animate={
            reducedMotion
              ? { opacity: 0.55 }
              : {
                  y: ["0%", "118%"],
                  x: [0, 6 + driftBoost * 8, -4, 2],
                  opacity: [0, 0.9, 0.75, 0],
                }
          }
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

function Burst({ burst }: { burst: BurstState | null }) {
  if (!burst) {
    return null;
  }

  const pixels =
    burst.kind === "glow"
      ? summitGlowSprite
      : burst.kind === "wind"
        ? cloudSprite
        : snowSparkleSprite;

  return (
    <motion.div
      key={`${burst.tick}`}
      className="pointer-events-none absolute"
      initial={{ opacity: 0, x: burst.x, y: burst.y, scale: 0.72 }}
      animate={{
        opacity: [0, 1, 0],
        x: burst.x,
        y: burst.y - 18,
        scale: [0.72, 1.02, 0.82],
      }}
      transition={{ duration: 0.95, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-1">
        <PixelSprite pixels={pixels} pixelSize={burst.kind === "wind" ? 1.7 : 2.1} />
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white/90">
          {burst.label}
        </span>
      </div>
    </motion.div>
  );
}

interface MiniLobbyBlockProps {
  variant?: "hybrid-lobby";
  density?: "medium";
  interactive?: boolean;
}

export default function MiniLobbyBlock({
  variant = "hybrid-lobby",
  density = "medium",
  interactive = true,
}: MiniLobbyBlockProps) {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [parallaxX, setParallaxX] = useState(0);
  const [driftBoost, setDriftBoost] = useState(0);
  const [glowPeak, setGlowPeak] = useState(false);
  const [burst, setBurst] = useState<BurstState | null>(null);
  const [status, setStatus] = useState("idle / snowfall");
  const [storms, setStorms] = useState(0);

  useEffect(() => {
    if (!burst) {
      return;
    }
    const timeout = window.setTimeout(() => setBurst(null), 950);
    return () => window.clearTimeout(timeout);
  }, [burst]);

  useEffect(() => {
    if (!glowPeak) {
      return;
    }
    const timeout = window.setTimeout(() => setGlowPeak(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [glowPeak]);

  const triggerBurst = (
    kind: BurstKind,
    label: string,
    x: number,
    y: number,
  ) => {
    setBurst({
      tick: Date.now(),
      x,
      y,
      kind,
      label,
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    setParallaxX(normalizedX);
    setDriftBoost(Math.abs(normalizedX));
    setStatus("hover / drifting");
  };

  const handleSceneClick = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    setStorms((current) => current + 1);
    setStatus("snow / gust");
    triggerBurst("snow", "gust", x, y);
  };

  const handlePeakClick = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = bounds ? rect.left - bounds.left + rect.width / 2 : rect.left;
    const y = bounds ? rect.top - bounds.top : rect.top;

    setGlowPeak(true);
    setStatus("peak / glow");
    triggerBurst("glow", "summit", x, y);
  };

  const handleWindClick = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = bounds ? rect.left - bounds.left + rect.width / 2 : rect.left;
    const y = bounds ? rect.top - bounds.top : rect.top;

    setDriftBoost(1);
    setStatus("wind / sweep");
    triggerBurst("wind", "wind", x, y);
    window.setTimeout(() => setDriftBoost(0.25), 1200);
  };

  return (
    <div
      className="relative h-full min-h-[8rem] overflow-hidden bg-[#10192f]"
      data-density={density}
      data-variant={variant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setParallaxX(0);
        setDriftBoost(0);
        setStatus("idle / snowfall");
      }}
      onMouseMove={handlePointerMove}
      onClick={handleSceneClick}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-3 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-white/76">
        <span>karakoram</span>
        <span>{status}</span>
      </div>

      <div className="pointer-events-none absolute left-4 top-7 z-20 font-mono text-[0.56rem] uppercase tracking-[0.22em] text-white/84">
        gusts: <span className="text-[#fff4c6]">{storms}</span>
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{
          scale: hovered ? 1.008 : 1,
          filter: hovered ? "brightness(1.03)" : "brightness(1)",
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <KarakoramSky hovered={hovered} parallaxX={parallaxX} stormGlow={glowPeak} />
        <SnowPeaks hovered={hovered} glowPeak={glowPeak} />
        <Snowfall driftBoost={driftBoost} reducedMotion={Boolean(reducedMotion)} />

        <motion.button
          type="button"
          className="absolute left-[39%] bottom-[58%] cursor-pointer bg-transparent p-0"
          animate={{ scale: glowPeak ? [1, 1.08, 1] : 1 }}
          transition={{ duration: 0.9, repeat: glowPeak ? Infinity : 0, ease: "easeInOut" }}
          onClick={handlePeakClick}
          aria-label="Light the summit"
        >
          <PixelSprite pixels={summitGlowSprite} pixelSize={2.1} />
        </motion.button>

        <motion.button
          type="button"
          className="absolute right-[16%] top-[18%] cursor-pointer bg-transparent p-0"
          animate={hovered ? { x: [0, 4, 0] } : { x: 0 }}
          transition={{ duration: 2.3, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
          onClick={handleWindClick}
          aria-label="Send a wind sweep"
        >
          <PixelSprite pixels={cloudSprite} pixelSize={1.9} />
        </motion.button>
      </motion.div>

      <Burst burst={burst} />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_28%,rgba(0,0,0,0.12)_100%)]" />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          hovered ? "opacity-22" : "opacity-14"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.14) 0, rgba(255,255,255,0.14) 1px, transparent 1px, transparent 6px)",
          backgroundSize: "100% 6px",
        }}
      />
    </div>
  );
}
