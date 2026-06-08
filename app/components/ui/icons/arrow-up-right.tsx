interface ArrowUpRightProps {
  className?: string;
}

export default function ArrowUpRight({
  className = "h-10 w-10 text-white",
}: ArrowUpRightProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 52 52 12" />
      <path d="M30 12h22v22" />
    </svg>
  );
}
