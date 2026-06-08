interface MailIconProps {
  className?: string;
}

export default function MailIcon({
  className = "h-3.5 w-3.5",
}: MailIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.4" />
      <path d="m5 7 7 6 7-6" />
    </svg>
  );
}
