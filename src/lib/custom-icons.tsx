import type { IconComponent } from "./icon-map";

export const Shuttlecock: IconComponent = ({ size = 24, className, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Cork base */}
    <circle cx="12" cy="20" r="1.5" />
    {/* 4 feather stems */}
    <line x1="12" y1="18.5" x2="6.5" y2="7" />
    <line x1="12" y1="18.5" x2="9.5" y2="5.5" />
    <line x1="12" y1="18.5" x2="14.5" y2="5.5" />
    <line x1="12" y1="18.5" x2="17.5" y2="7" />
    {/* Rim connecting feather tips */}
    <path d="M6.5 7 Q9.5 3 12 3 Q14.5 3 17.5 7" />
  </svg>
);

export const BadmintonRacket: IconComponent = ({ size = 24, className, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Racket head */}
    <ellipse cx="12" cy="8.5" rx="5" ry="6" />
    {/* Horizontal strings */}
    <line x1="7.2" y1="7" x2="16.8" y2="7" />
    <line x1="7" y1="9.5" x2="17" y2="9.5" />
    {/* Vertical strings */}
    <line x1="10" y1="2.6" x2="10" y2="14.4" />
    <line x1="12" y1="2.5" x2="12" y2="14.5" />
    <line x1="14" y1="2.6" x2="14" y2="14.4" />
    {/* Handle */}
    <line x1="12" y1="14.5" x2="12" y2="21.5" />
    {/* Grip */}
    <line x1="10.5" y1="20" x2="13.5" y2="20" />
  </svg>
);
