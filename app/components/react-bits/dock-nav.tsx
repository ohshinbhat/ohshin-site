import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import type { MotionValue, SpringOptions } from "motion/react";
import type { SiteNavigationItem } from "../../types";

interface DockNavItemProps {
  item: SiteNavigationItem;
  isActive: boolean;
  mouseX: MotionValue<number>;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

interface DockNavProps {
  items: SiteNavigationItem[];
  activeKey: SiteNavigationItem["key"];
  onItemClick: (
    event: MouseEvent<HTMLAnchorElement>,
    item: SiteNavigationItem,
  ) => void;
}

const springConfig: SpringOptions = { mass: 0.12, stiffness: 220, damping: 18 };

function DockNavItem({ item, isActive, mouseX, onClick }: DockNavItemProps) {
  const itemRef = useRef<HTMLAnchorElement | null>(null);

  const distance = useTransform(mouseX, (value) => {
    const rect = itemRef.current?.getBoundingClientRect();

    if (!rect || !Number.isFinite(value)) {
      return Infinity;
    }

    return value - (rect.left + rect.width / 2);
  });

  const scale = useSpring(
    useTransform(distance, [-180, -90, 0, 90, 180], [1, 1.05, 1.18, 1.05, 1]),
    springConfig,
  );

  const y = useSpring(
    useTransform(distance, [-180, -90, 0, 90, 180], [0, -2, -8, -2, 0]),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(distance, [-180, -90, 0, 90, 180], [0.75, 0.88, 1, 0.88, 0.75]),
    springConfig,
  );

  return (
    <motion.a
      ref={itemRef}
      href={item.href}
      onClick={onClick}
      style={{ scale, y, opacity }}
      className={`relative z-10 rounded-full px-3 py-2 font-doto text-[12px] font-medium tracking-[0.08em] transition-[background-color,box-shadow,color] duration-300 sm:px-5 sm:py-2.5 sm:text-[14px] sm:tracking-[0.12em] ${
        isActive
          ? "bg-white/10 text-white ring-1 ring-white/20 shadow-[0_0_24px_rgba(255,255,255,0.06)]"
          : "text-white/70"
      }`}
    >
      {item.label}
    </motion.a>
  );
}

export default function DockNav({ items, activeKey, onItemClick }: DockNavProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="relative flex w-full max-w-full items-center justify-center gap-1 overflow-x-auto px-1 sm:gap-4 sm:px-0 md:gap-8"
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item) => (
        <DockNavItem
          key={item.key}
          item={item}
          isActive={item.key === activeKey}
          mouseX={mouseX}
          onClick={(event) => onItemClick(event, item)}
        />
      ))}
    </div>
  );
}
