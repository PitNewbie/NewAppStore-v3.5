import React, { useState, useEffect } from 'react';
import { AppItem } from '../data/appsData';
import { Star, ChevronLeft, ChevronRight, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface HeroBillboardProps {
  featuredApps: AppItem[];
  onSelectApp: (app: AppItem) => void;
  onDownload: (app: AppItem) => void;
  getInstalledStatus: (appId: string, version: string) => 'Download' | 'Update' | 'Buka';
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  featuredApps,
  onSelectApp,
  onDownload,
  getInstalledStatus,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredApps.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredApps.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [featuredApps.length]);

  if (!featuredApps.length) return null;
  const currentApp = featuredApps[currentIndex] || featuredApps[0];
  const installStatus = getInstalledStatus(currentApp.id, currentApp.versi);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-6">
      <div className="relative rounded-3xl overflow-hidden bg-[#1f1f1f] border border-[#333538] shadow-2xl group min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] flex items-end">
        
        {/* Background Image Artwork */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentApp.bannerImage || currentApp.screenshots[0]}
            alt={currentApp.nama}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-90 group-hover:scale-105"
          />
          {/* Measured Play Store gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/60 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 max-w-2xl">
          {/* Subtitle / Category Badge */}
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#00f076] tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="uppercase text-amber-300">PILIHAN UTAMA MINGGU INI</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-300">{currentApp.subKategori}</span>
          </div>

          {/* App Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-sm">
            {currentApp.nama}
          </h2>

          {/* Developer & Verified Tag */}
          <p className="text-sm text-gray-300 mb-3 flex items-center gap-2">
            <span>{currentApp.developer}</span>
            <span className="text-gray-500">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi Aman
            </span>
          </p>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 mb-5">
            <div className="flex items-center gap-1 font-semibold text-white">
              <span>{currentApp.rating}</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span>·</span>
            <div>{currentApp.downloads} unduhan</div>
            <span>·</span>
            <div>{currentApp.ukuran}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onDownload(currentApp)}
              className="px-6 py-2.5 rounded-full font-bold text-sm bg-[#01875f] hover:bg-[#009b6e] text-white transition-all shadow-lg shadow-[#01875f]/25 flex items-center gap-2 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span>
                {installStatus === 'Buka' ? 'Buka Aplikasi' : installStatus === 'Update' ? 'Perbarui APK' : 'Instal APK'}
              </span>
            </button>

            <button
              onClick={() => onSelectApp(currentApp)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10"
            >
              Detail Aplikasi
            </button>
          </div>
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredApps.length) % featuredApps.length)}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredApps.length)}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-20 flex items-center gap-1.5">
          {featuredApps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-[#01875f]' : 'w-1.5 bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
