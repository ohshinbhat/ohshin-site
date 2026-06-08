import type { ElementType, ReactNode } from "react";

type Tone = "ink" | "panel" | "accent" | "cobalt" | "transparent";

const toneClassNames: Record<Tone, string> = {
  ink: "bg-ink",
  panel: "bg-panel",
  accent: "bg-accent",
  cobalt: "bg-cobalt",
  transparent: "bg-transparent",
};

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

interface BlockGridProps {
  children: ReactNode;
  className?: string;
}

export function BlockGrid({ children, className }: BlockGridProps) {
  return (
    <div
      className={cx(
        "grid grid-cols-1 border-t border-l border-white/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BlockCellProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  tone?: Tone;
}

export function BlockCell({
  as: Component = "div",
  children,
  className,
  tone = "transparent",
}: BlockCellProps) {
  return (
    <Component
      className={cx(
        "min-w-0 border-r border-b border-white/70 motion-safe:animate-signal-cell",
        toneClassNames[tone],
        className,
      )}
    >
      {children}
    </Component>
  );
}

interface BlockLabelProps {
  children: ReactNode;
  className?: string;
}

export function BlockLabel({ children, className }: BlockLabelProps) {
  return (
    <p
      className={cx(
        "font-mono text-[0.66rem] uppercase leading-none tracking-[0.18em] text-white/55",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface BlockHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function BlockHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: BlockHeaderProps) {
  return (
    <div className={cx("space-y-3", className)}>
      {eyebrow ? <BlockLabel>{eyebrow}</BlockLabel> : null}
      <h2
        className={cx(
          "font-doto text-[2.75rem] font-black uppercase leading-none tracking-section text-white sm:text-[4rem] lg:text-[5rem]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-[38rem] font-mono text-[0.8rem] leading-6 text-white/62">
          {description}
        </p>
      ) : null}
    </div>
  );
}

interface BlockSectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function BlockSectionTitle({
  children,
  className,
}: BlockSectionTitleProps) {
  return (
    <h2
      className={cx(
        "font-doto text-[2.1rem] font-black uppercase leading-none tracking-section text-white sm:text-[3rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

interface BlockSectionLayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  padded?: boolean;
  title: ReactNode;
  titleClassName?: string;
}

export function BlockSectionLayout({
  children,
  className,
  contentClassName,
  padded = true,
  title,
  titleClassName,
}: BlockSectionLayoutProps) {
  return (
    <div
      className={cx(
        padded && "px-5 py-7 sm:px-8 sm:py-8 lg:px-7 lg:py-6",
        className,
      )}
    >
      <BlockSectionTitle className={titleClassName}>{title}</BlockSectionTitle>
      <div className={cx("mt-6", contentClassName)}>{children}</div>
    </div>
  );
}

interface HorizontalShelfProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function HorizontalShelf({
  children,
  className,
  contentClassName,
}: HorizontalShelfProps) {
  return (
    <div className={cx("overflow-x-auto pb-2", className)}>
      <div className={cx("flex w-max gap-4", contentClassName)}>{children}</div>
    </div>
  );
}
