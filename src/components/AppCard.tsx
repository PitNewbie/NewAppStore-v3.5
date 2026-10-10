import React from 'react';
import { AppItem } from '../data/appsData';
import { Star } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  onSelect: (app: AppItem) => void;
  installedStatus: 'Download' | 'Update' | 'Buka';
}

export const AppCard: React.FC<AppCardProps> = ({ app, onSelect, installedStatus }) => {
  return (
    <div
      onClick={() => onSelect(app)}
      className="group flex flex-col p-3 rounded-2xl bg-[#1e2024]/60 hover:bg-[#25282e] border border-[#2f333a] hover:border-[#3d424b] transition-all cursor-pointer select-none duration-200"
    >
      {/* Icon Area */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#181a1f] border border-[#343842] shadow-md mb-3 flex items-center justify-center">
        <img
          src={app.icon}
          alt={app.nama}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Elegant fallback if external image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Fallback avatar icon inside if image fails */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-[#1b2b23] to-[#01875f]/30 -z-10">
          <span className="text-2xl font-bold text-[#00f076]">
            {app.nama.charAt(0)}
          </span>
        </div>

        {/* Small badge for Editor's choice or installed */}
        {installedStatus === 'Buka' && (
          <div className="absolute top-2 right-2 bg-[#01875f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
            Terpasang
          </div>
        )}
      </div>

      {/* App Meta Info */}
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-white line-clamp-1 group-hover:text-[#00f076] transition-colors">
          {app.nama}
        </h3>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {app.developer}
        </p>

        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1 font-medium text-gray-200">
            <span>{app.rating}</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[11px] text-gray-400">{app.ukuran}</span>
        </div>
      </div>
    </div>
  );
};
