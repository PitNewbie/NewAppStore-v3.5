import React from 'react';

export const NewAppStoreLogo: React.FC<{
  size?: number;
  showText?: boolean;
  className?: string;
}> = ({ size = 36, showText = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Cloud + Publish Vector Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105 filter drop-shadow-md"
      >
        <defs>
          {/* Gradient Definitions */}
          <linearGradient id="cloudGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C6FF" />
            <stop offset="100%" stopColor="#0072FF" />
          </linearGradient>

          <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="50%" stopColor="#4FACFE" />
            <stop offset="100%" stopColor="#00E676" />
          </linearGradient>

          <linearGradient id="accentGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF416C" />
            <stop offset="100%" stopColor="#FF4B2B" />
          </linearGradient>

          <linearGradient id="accentGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9D423" />
            <stop offset="100%" stopColor="#FF4E50" />
          </linearGradient>
        </defs>

        {/* Back Cloud Base Layer */}
        <path
          d="M360 160C348 110 300 70 240 70C188 70 144 100 128 144C78 152 40 196 40 250C40 310 90 360 150 360H370C425 360 470 315 470 260C470 208 428 165 375 161C371 160.7 365 160 360 160Z"
          fill="url(#cloudGradMain)"
          opacity="0.25"
        />

        {/* Main Cloud Body */}
        <path
          d="M360 180C349.5 138 308 104 256 104C211 104 172.5 130 158.5 168C115 175 82 213 82 260C82 312 124 354 176 354H364C412 354 450 316 450 268C450 223 413.5 186 368.5 182.5"
          fill="url(#cloudGradMain)"
        />

        {/* Dynamic Multi-layer Publish Arrow (Centerpiece) */}
        {/* Left Arrow Wing */}
        <path
          d="M256 140L140 280H220V390C220 401 229 410 240 410H256V140Z"
          fill="url(#accentGrad1)"
        />

        {/* Right Arrow Wing */}
        <path
          d="M256 140L372 280H292V390C292 401 283 410 272 410H256V140Z"
          fill="url(#accentGrad2)"
        />

        {/* Glowing Center Core / Cloud Connector */}
        <path
          d="M256 120L160 236H224V370H288V236H352L256 120Z"
          fill="url(#arrowGrad)"
        />
      </svg>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight">
            <span className="font-extrabold text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              NewApp
            </span>
            <span className="font-bold text-2xl tracking-tight ml-1 text-white">
              Store
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              Cloud & Publish Center
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
              
