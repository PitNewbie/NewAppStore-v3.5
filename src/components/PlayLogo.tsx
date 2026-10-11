import React from 'react';

export const NewAppStoreLogo: React.FC<{
  size?: number;
  showText?: boolean;
  className?: string;
}> = ({ size = 36, showText = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Cloud & Publish App Store */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="cloudBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C6FF" />
            <stop offset="100%" stopColor="#0072FF" />
          </linearGradient>

          <linearGradient id="arrowLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F076" />
            <stop offset="100%" stopColor="#00A859" />
          </linearGradient>

          <linearGradient id="arrowRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCE00" />
            <stop offset="100%" stopColor="#FF3A44" />
          </linearGradient>
        </defs>

        {/* Cloud Silhouette Base */}
        <path
          d="M160 360 C100 360 60 320 60 260 C60 205 100 165 155 160 C175 110 220 80 275 80 C340 80 390 125 400 185 C445 190 480 225 480 275 C480 325 440 360 380 360 Z"
          fill="url(#cloudBg)"
        />

        {/* Central Publish / App Store Arrow (Left Wing) */}
        <path
          d="M270 140 L170 280 H240 V380 H270 Z"
          fill="url(#arrowLeft)"
        />

        {/* Central Publish / App Store Arrow (Right Wing) */}
        <path
          d="M270 140 L370 280 H300 V380 H270 Z"
          fill="url(#arrowRight)"
        />

        {/* Glow / Highlight Line */}
        <path
          d="M270 140 L170 280 H240 V380"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </svg>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight">
            <span className="font-bold text-xl text-white">NewApp</span>
            <span className="font-semibold text-xl ml-1 text-[#00C6FF]">Store</span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
            Cloud & Publish App Store
          </span>
        </div>
      )}
    </div>
  );
};

export const PlayLogo = NewAppStoreLogo;
export default NewAppStoreLogo;
