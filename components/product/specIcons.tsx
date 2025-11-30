import React from "react";

type IconProps = { className?: string; title?: string };

export function MaterialIcon({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? "false" : "true"}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 2 L20 11 L12 22 L4 11 L12 2 Z M12 6 L7.5 11.5 L12 17 L16.5 11.5 L12 6 Z" />
    </svg>
  );
}

export function DimensionsIcon({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? "false" : "true"}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <rect x="2.5" y="6" width="19" height="12" rx="1.5" />
      <path d="M5 9h1M8 9h1M11 9h1M14 9h1M17 9h1" />
    </svg>
  );
}

export function WeightIcon({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? "false" : "true"}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 3v4" />
      <path d="M5 11c0 3 2 5 7 5s7-2 7-5" />
      <path d="M7 11l-2.5 5M17 11l2.5 5" />
      <circle cx="12" cy="17.5" r="1" />
    </svg>
  );
}

export function CertificationsIcon({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? "false" : "true"}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 2a5 5 0 0 0-5 5v.5A5.5 5.5 0 0 0 7.5 16L12 22l4.5-6A5.5 5.5 0 0 0 17 7.5V7a5 5 0 0 0-5-5z" />
      <circle cx="12" cy="9.5" r="1.5" fill="white" />
    </svg>
  );
}

const Icons = {
  MaterialIcon,
  DimensionsIcon,
  WeightIcon,
  CertificationsIcon,
};

export default Icons;
