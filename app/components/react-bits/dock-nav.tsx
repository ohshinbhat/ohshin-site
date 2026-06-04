import { motion } from "motion/react";
import type { MouseEvent } from "react";
import type { SiteNavigationItem } from "../../types";

interface DockNavItemProps {
  item: SiteNavigationItem;
  isActive: boolean;
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

function DockNavItem({ item, isActive, onClick }: DockNavItemProps) {
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`relative z-10 min-w-[5.8rem] rounded-full px-4 py-3 text-center font-doto text-[12px] font-medium tracking-[0.08em] sm:min-w-[7rem] sm:px-6 sm:text-[14px] sm:tracking-[0.12em] ${
        isActive ? "text-white" : "text-white/70"
      }`}
    >
      {isActive ? (
        <motion.span
          layoutId="dock-active-pill"
          className="absolute inset-0 -z-10 rounded-full border border-white/16 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_24px_rgba(0,0,0,0.22)]"
          transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.35 }}
        />
      ) : null}
      <motion.span
        className="relative z-10 block"
        animate={{ y: isActive ? -1 : 0, opacity: isActive ? 1 : 0.78 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {item.label}
      </motion.span>
    </motion.a>
  );
}

export default function DockNav({ items, activeKey, onItemClick }: DockNavProps) {
  return (
    <div className="relative flex max-w-[calc(100vw-2.5rem)] items-center justify-center gap-1 overflow-x-auto">
      {items.map((item) => (
        <DockNavItem
          key={item.key}
          item={item}
          isActive={item.key === activeKey}
          onClick={(event) => onItemClick(event, item)}
        />
      ))}
    </div>
  );
}
