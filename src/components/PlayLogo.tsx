import React from 'react';

export const PlayLogo: React.FC<{ size?: number; showText?: boolean; className?: string }> = ({
  size = 36,
  showText = true,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Google Play Quad-Color Geometric Triangle */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105"
      >
        <path
          d="M66.4 22.8C61.4 28 58.5 35.8 58.5 45.7V466.3C58.5 476.2 61.4 484 66.4 489.2L68.7 491.5L304.7 255.5V249.5L68.7 20.5L66.4 22.8Z"
          fill="#00D2FF"
        />
        <path
          d="M383.3 334.2L304.7 255.6V249.6L383.3 171L385.2 172.1L478.4 225.1C504.9 240.2 504.9 265 478.4 280.1L385.2 333.1L383.3 334.2Z"
          fill="#FFCE00"
        />
        <path
          d="M304.7 255.6L66.4 489.2C74.6 498 88.5 499.1 104.3 490.1L383.3 334.2L304.7 255.6Z"
          fill="#00F076"
        />
        <path
          d="M304.7 249.6L383.3 171L104.3 15.1C88.5 6.1 74.6 7.2 66.4 16L304.7 249.6Z"
          fill="#FF3A44"
        />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight">
            <span className="font-bold text-xl tracking-tight text-white">Star</span>
            <span className="font-semibold text-xl tracking-tight ml-1.5 text-[#01875f]">Play</span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide">Web App Store</span>
        </div>
      )}
    </div>
  );
};
          
