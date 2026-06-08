interface XIconProps {
  className?: string;
}

export default function XIcon({ className = "h-3.5 w-3.5" }: XIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.26l-4.9-7.42L5.55 22H2.44l7.25-8.29L2 2h6.42l4.43 6.74L18.9 2Zm-1.1 18h1.73L7.48 3.9H5.62L17.8 20Z" />
    </svg>
  );
}
