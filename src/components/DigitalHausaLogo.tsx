import React from 'react';

interface DigitalHausaLogoProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
}

export const DigitalHausaLogo: React.FC<DigitalHausaLogoProps> = ({
  className = "w-6 h-6",
  size,
  monochrome = false
}) => {
  const primaryGreen = monochrome ? "currentColor" : "#2E7D32";
  const flameColor = monochrome ? "currentColor" : "#E2A021";

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="DigitalHausa Logo"
    >
      {/* Top Handle Loop */}
      <circle 
        cx="50" 
        cy="12" 
        r="6.5" 
        stroke={primaryGreen} 
        strokeWidth="5" 
        fill="none" 
      />

      {/* Main D Frame / Lantern Body */}
      {/* Left Vertical Spine */}
      <line 
        x1="32" 
        y1="22" 
        x2="32" 
        y2="70" 
        stroke={primaryGreen} 
        strokeWidth="6" 
        strokeLinecap="round" 
      />

      {/* Outer 'D' Arc Loop */}
      <path 
        d="M 32 22 H 52 C 68 22 76 32 76 46 C 76 60 68 70 52 70 H 32" 
        stroke={primaryGreen} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />

      {/* Golden Flame / Drop in Center */}
      <path 
        d="M 50 34 C 50 34 38 47 38 53.5 C 38 60 43.3 65 50 65 C 56.7 65 62 60 62 53.5 C 62 47 50 34 50 34 Z" 
        fill={flameColor} 
      />

      {/* Base Open Book */}
      {/* Left Page */}
      <path 
        d="M 50 78 C 42 74 32 72 20 75 V 82 C 32 79 42 81 50 85 Z" 
        fill={primaryGreen} 
      />
      {/* Right Page */}
      <path 
        d="M 50 78 C 58 74 68 72 80 75 V 82 C 68 79 58 81 50 85 Z" 
        fill={primaryGreen} 
      />
      {/* Base Stand */}
      <path 
        d="M 22 88 H 78 L 84 94 H 16 Z" 
        fill={primaryGreen} 
      />
    </svg>
  );
};
