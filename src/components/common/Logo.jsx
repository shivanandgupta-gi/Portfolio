import { memo } from 'react';

const Logo = memo(function Logo({ size = 36, className = '' }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0984e3" />
          <stop offset="50%" stopColor="#6c5ce7" />
          <stop offset="100%" stopColor="#00cec9" />
        </linearGradient>
        <clipPath id="logo-clip">
          <circle cx="256" cy="256" r="256" />
        </clipPath>
      </defs>
      <circle cx="256" cy="256" r="256" fill="url(#logo-g)" />
      <g clipPath="url(#logo-clip)">
        <path
          d="M172 148 L320 256 L172 364"
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          stroke-width="42"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M340 148 L192 256 L340 364"
          fill="none"
          stroke="rgba(255,255,255,0.38)"
          stroke-width="42"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="256" cy="256" r="10" fill="rgba(255,255,255,0.7)" />
      </g>
    </svg>
  );
});

export default Logo;
