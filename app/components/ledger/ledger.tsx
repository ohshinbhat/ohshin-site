import type { ReactNode } from "react";

type LedgerTheme = "accent" | "cobalt" | "panel";

interface LedgerPageProps {
  children: ReactNode;
  className?: string;
  theme?: LedgerTheme;
}

interface LedgerHeaderProps {
  description?: string;
  eyebrow?: string;
  meta?: ReactNode;
  title: string;
  titleClassName?: string;
}

interface LedgerSectionProps {
  children: ReactNode;
  description?: string;
  eyebrow?: string;
  title: string;
}

interface LedgerRailProps {
  children: ReactNode;
  eyebrow?: string;
  title: string;
}

interface LedgerRowProps {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  meta?: ReactNode;
}

interface LedgerLabelProps {
  children: ReactNode;
  className?: string;
}

const themeClasses: Record<LedgerTheme, string> = {
  accent:
    "bg-ink text-white [--ledger-accent:#df1303] [--ledger-accent-soft:rgba(223,19,3,0.18)]",
  cobalt:
    "bg-ink text-white [--ledger-accent:#0a3566] [--ledger-accent-soft:rgba(10,53,102,0.36)]",
  panel:
    "bg-ink text-white [--ledger-accent:#f3f5f7] [--ledger-accent-soft:rgba(243,245,247,0.1)]",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LedgerPage({
  children,
  className,
  theme = "panel",
}: LedgerPageProps) {
  return (
    <section
      className={cx(
        "min-h-screen px-4 pt-8 pb-28 sm:px-6 sm:pt-10 lg:px-8",
        themeClasses[theme],
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[78rem]">{children}</div>
    </section>
  );
}

export function LedgerHeader({
  description,
  eyebrow,
  meta,
  title,
  titleClassName,
}: LedgerHeaderProps) {
  return (
    <header className="grid gap-8 border-b border-white/10 pb-8 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.46fr)] lg:items-end">
      <div className="min-w-0">
        {eyebrow ? <LedgerLabel>{eyebrow}</LedgerLabel> : null}
        <h1
          className={cx(
            "mt-4 font-doto text-[3.25rem] font-black leading-none tracking-section text-white sm:text-[5rem] lg:text-[7rem]",
            titleClassName,
          )}
        >
          {title}
        </h1>
      </div>

      <div className="grid gap-4 border-l border-[color:var(--ledger-accent)] pl-4 font-mono text-[0.72rem] leading-5 text-white/60 sm:text-[0.8rem] sm:leading-6">
        {description ? <p>{description}</p> : null}
        {meta ? <div>{meta}</div> : null}
      </div>
    </header>
  );
}

export function LedgerSection({
  children,
  description,
  eyebrow,
  title,
}: LedgerSectionProps) {
  return (
    <section>
      <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,0.42fr)] sm:items-end">
        <div>
          {eyebrow ? <LedgerLabel>{eyebrow}</LedgerLabel> : null}
          <h2 className="mt-2 font-doto text-[1.45rem] font-black uppercase leading-none tracking-section text-white sm:text-[1.9rem]">
            {title}
          </h2>
        </div>
        {description ? (
          <p className="max-w-[46ch] font-mono text-[0.72rem] leading-5 text-white/46 sm:text-[0.78rem] sm:leading-6">
            {description}
          </p>
        ) : null}
      </div>
      <div className="border-t border-white/10">{children}</div>
    </section>
  );
}

export function LedgerRail({ children, eyebrow, title }: LedgerRailProps) {
  return (
    <aside className="min-w-0">
      <div>
        {eyebrow ? <LedgerLabel>{eyebrow}</LedgerLabel> : null}
        <h2 className="mt-2 font-doto text-[1.45rem] font-black uppercase leading-none tracking-section text-white sm:text-[1.9rem]">
          {title}
        </h2>
      </div>
      <div className="mt-4 divide-y divide-white/10 border-t border-white/10">
        {children}
      </div>
    </aside>
  );
}

export function LedgerRow({ action, children, className, meta }: LedgerRowProps) {
  return (
    <article
      className={cx(
        "grid gap-4 border-b border-white/10 py-5 last:border-b-0 sm:py-6 lg:grid-cols-[10rem_minmax(0,1fr)_auto] lg:items-start lg:gap-7",
        className,
      )}
    >
      <div className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-white/38 sm:text-[0.68rem]">
        {meta}
      </div>
      <div className="min-w-0">{children}</div>
      {action ? (
        <div className="flex items-start justify-start text-[color:var(--ledger-accent)] lg:justify-end">
          {action}
        </div>
      ) : null}
    </article>
  );
}

export function LedgerLabel({ children, className }: LedgerLabelProps) {
  return (
    <p
      className={cx(
        "font-doto text-[0.76rem] font-black uppercase leading-none tracking-section text-white/50 sm:text-[0.84rem]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mr-2 inline-block h-2 w-2 bg-[color:var(--ledger-accent)] align-middle"
      />
      {children}
    </p>
  );
}
