interface LinkedInIconProps {
  className?: string;
}

export default function LinkedInIcon({
  className = "h-3.5 w-3.5",
}: LinkedInIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.11ZM5.6 9.7h2.67V18H5.6V9.7Zm4.34 0h2.55v1.13h.04c.35-.64 1.22-1.31 2.51-1.31 2.69 0 3.18 1.77 3.18 4.06V18h-2.66v-3.91c0-.93-.02-2.13-1.3-2.13-1.3 0-1.5 1.01-1.5 2.05V18H9.94V9.7Z" />
    </svg>
  );
}
