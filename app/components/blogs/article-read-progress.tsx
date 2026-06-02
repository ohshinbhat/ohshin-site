import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useState, type RefObject } from "react";

const barSpring = { stiffness: 280, damping: 34, mass: 0.12 };

function computeReadPercent(article: HTMLElement): number {
  const rect = article.getBoundingClientRect();
  const scrollable = article.scrollHeight - window.innerHeight;

  if (scrollable <= 0) {
    return 100;
  }

  const scrolled = -rect.top;
  return Math.min(100, Math.max(0, (scrolled / scrollable) * 100));
}

interface ArticleReadProgressProps {
  articleRef: RefObject<HTMLElement | null>;
  resetKey: string;
}

export default function ArticleReadProgress({ articleRef, resetKey }: ArticleReadProgressProps) {
  const progress = useMotionValue(0);
  const [ariaValue, setAriaValue] = useState(0);

  const smoothProgress = useSpring(progress, barSpring);
  const barWidth = useTransform(smoothProgress, (v) => `${v}%`);

  useLayoutEffect(() => {
    const article = articleRef.current;
    if (!article) {
      return;
    }

    progress.set(0);
    setAriaValue(0);

    const update = () => {
      const next = computeReadPercent(article);
      progress.set(next);
      setAriaValue(Math.round(next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [articleRef, resetKey]);

  return (
    <div
      className="relative min-h-2 overflow-hidden border-t border-white/70 bg-cobalt sm:min-h-[2.75rem] sm:border-x sm:border-t-0"
      role="progressbar"
      aria-valuenow={ariaValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <motion.div
        className="absolute inset-y-0 left-0 bg-white will-change-[width]"
        style={{ width: barWidth }}
      />
    </div>
  );
}
