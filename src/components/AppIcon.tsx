import React from 'react';

interface AppIconProps {
  appId: string;
  appName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AppIcon: React.FC<AppIconProps> = ({
  appId,
  appName,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl',
  };

  // Dedicated Play Store style Vector Icons for the store apps
  if (appId === 'com.game.minecraft') {
    return (
      <div
        className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden border border-[#3c4043] ${className}`}
        style={{
          background: 'linear-gradient(135deg, #4d8c2f 0%, #2f6b15 50%, #5c3a21 51%, #3b2210 100%)',
        }}
      >
        {/* Minecraft Grass Block Vector */}
        <svg viewBox="0 0 64 64" className="w-4/5 h-4/5" fill="none">
          {/* Top isometric grass */}
          <polygon points="32,6 56,18 32,30 8,18" fill="#5cb822" />
          <polygon points="32,6 44,12 32,18 20,12" fill="#75d32e" />
          <polygon points="32,18 44,12 56,18 44,24" fill="#4d9e1c" />
          {/* Left dirt side */}
          <polygon points="8,18 32,30 32,56 8,44" fill="#694025" />
          <polygon points="8,18 32,30 32,36 8,24" fill="#3f7a14" />
          {/* Right dirt side */}
          <polygon points="32,30 56,18 56,44 32,56" fill="#52311c" />
          <polygon points="32,30 56,18 56,24 32,36" fill="#33660e" />
          {/* Pixel details */}
          <rect x="14" y="36" width="4" height="4" fill="#3b2210" />
          <rect x="22" y="42" width="4" height="4" fill="#3b2210" />
          <rect x="38" y="36" width="4" height="4" fill="#2d1709" />
          <rect x="46" y="44" width="4" height="4" fill="#2d1709" />
        </svg>
      </div>
    );
  }

  if (appId === 'com.ai.neXai') {
    return (
      <div
        className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden border border-purple-500/30 ${className}`}
        style={{
          background: 'radial-gradient(circle at 30% 30%, #7928ca 0%, #240b47 60%, #0c0418 100%)',
        }}
      >
        {/* neXai Core AI Neural Spark Vector */}
        <svg viewBox="0 0 64 64" className="w-4/5 h-4/5" fill="none">
          <circle cx="32" cy="32" r="24" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="32" cy="32" r="16" fill="url(#aiGrad)" />
          {/* Robot eyes / spark */}
          <circle cx="26" cy="30" r="3" fill="#ffffff" />
          <circle cx="38" cy="30" r="3" fill="#ffffff" />
          <path d="M26 38 C28 41, 36 41, 38 38" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          {/* Antenna spark */}
          <line x1="32" y1="16" x2="32" y2="10" stroke="#f472b6" strokeWidth="2" />
          <circle cx="32" cy="9" r="2.5" fill="#38bdf8" />
          <defs>
            <linearGradient id="aiGrad" x1="16" y1="16" x2="48" y2="48">
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (appId === 'com.Orbitku.3d') {
    return (
      <div
        className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden border border-cyan-500/30 ${className}`}
        style={{
          background: 'radial-gradient(circle at center, #0f172a 0%, #030712 100%)',
        }}
      >
        {/* Orbitku Solar System Vector */}
        <svg viewBox="0 0 64 64" className="w-4/5 h-4/5" fill="none">
          <ellipse cx="32" cy="32" rx="26" ry="10" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(-25 32 32)" opacity="0.7" />
          <ellipse cx="32" cy="32" rx="16" ry="6" stroke="#fbbf24" strokeWidth="1.2" transform="rotate(35 32 32)" opacity="0.6" />
          {/* Sun Center */}
          <circle cx="32" cy="32" r="9" fill="url(#sunGrad)" />
          {/* Orbiting Planet */}
          <circle cx="48" cy="24" r="4" fill="#38bdf8" />
          <circle cx="16" cy="40" r="2.5" fill="#f43f5e" />
          <defs>
            <radialGradient id="sunGrad" cx="35%" cy="35%">
              <stop stopColor="#fef08a" />
              <stop offset="0.6" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#dc2626" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (appId === 'com.neXai.Search') {
    return (
      <div
        className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden border border-blue-500/30 ${className}`}
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        }}
      >
        {/* neXai Search Lens */}
        <svg viewBox="0 0 64 64" className="w-4/5 h-4/5" fill="none">
          <circle cx="28" cy="28" r="14" stroke="#60a5fa" strokeWidth="4" fill="#1e293b" />
          <line x1="38" y1="38" x2="52" y2="52" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="25" cy="25" r="4" fill="#93c5fd" opacity="0.6" />
          <polygon points="46,14 49,20 46,26 43,20" fill="#f59e0b" />
        </svg>
      </div>
    );
  }

  if (appId === 'com.savings.money') {
    return (
      <div
        className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden border border-emerald-500/30 ${className}`}
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
        }}
      >
        {/* TabunganKu Piggy / Savings Chest */}
        <svg viewBox="0 0 64 64" className="w-4/5 h-4/5" fill="none">
          <circle cx="32" cy="34" r="18" fill="#10b981" />
          {/* Coin on top */}
          <ellipse cx="32" cy="16" rx="8" ry="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <line x1="28" y1="16" x2="28" y2="20" stroke="#d97706" strokeWidth="1" />
          <line x1="36" y1="16" x2="36" y2="20" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="32" cy="20" rx="8" ry="4" fill="#f59e0b" />
          {/* Piggy snout */}
          <ellipse cx="22" cy="34" rx="4" ry="3" fill="#34d399" />
          <circle cx="21" cy="34" r="0.8" fill="#064e3b" />
          <circle cx="23" cy="34" r="0.8" fill="#064e3b" />
          {/* Eye */}
          <circle cx="26" cy="28" r="1.5" fill="#064e3b" />
          <path d="M42 38 Q48 36 46 32" stroke="#34d399" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  if (appId === 'com.pixel.creator') {
    return (
      <div
        className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden border border-pink-500/30 ${className}`}
        style={{
          background: 'linear-gradient(135deg, #831843 0%, #3b0764 100%)',
        }}
      >
        <svg viewBox="0 0 64 64" className="w-4/5 h-4/5" fill="none">
          <rect x="14" y="14" width="10" height="10" fill="#f43f5e" />
          <rect x="26" y="14" width="10" height="10" fill="#e11d48" />
          <rect x="38" y="14" width="10" height="10" fill="#be123c" />
          <rect x="14" y="26" width="10" height="10" fill="#fbbf24" />
          <rect x="26" y="26" width="10" height="10" fill="#38bdf8" />
          <rect x="38" y="26" width="10" height="10" fill="#818cf8" />
          <rect x="14" y="38" width="10" height="10" fill="#10b981" />
          <rect x="26" y="38" width="10" height="10" fill="#c084fc" />
          <polygon points="38,38 48,48 40,50" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  if (appId === 'com.retro.arcade') {
    return (
      <div
        className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden border border-orange-500/30 ${className}`}
        style={{
          background: 'linear-gradient(135deg, #7c2d12 0%, #1c1917 100%)',
        }}
      >
        <svg viewBox="0 0 64 64" className="w-4/5 h-4/5" fill="none">
          {/* Gamepad controller */}
          <rect x="10" y="20" width="44" height="26" rx="10" fill="#374151" stroke="#4b5563" strokeWidth="2" />
          {/* D-Pad */}
          <polygon points="20,29 24,29 24,25 28,25 28,29 32,29 32,33 28,33 28,37 24,37 24,33 20,33" fill="#9ca3af" />
          {/* Buttons */}
          <circle cx="44" cy="27" r="2.5" fill="#ef4444" />
          <circle cx="49" cy="32" r="2.5" fill="#3b82f6" />
          <circle cx="39" cy="32" r="2.5" fill="#10b981" />
          <circle cx="44" cy="37" r="2.5" fill="#f59e0b" />
        </svg>
      </div>
    );
  }

  // Fallback for custom submitted APKs
  return (
    <div
      className={`${sizeClasses[size]} shrink-0 shadow-md flex items-center justify-center overflow-hidden bg-gradient-to-tr from-emerald-900 to-[#01875f] border border-[#3c4043] ${className}`}
    >
      <span className="font-extrabold text-white text-xl uppercase">
        {appName.charAt(0)}
      </span>
    </div>
  );
};
