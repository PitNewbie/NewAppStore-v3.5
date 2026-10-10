import React from 'react';
import { AppItem } from '../data/appsData';
import { Star, Download } from 'lucide-react';

interface TopChartRowProps {
  rank: number;
  app: AppItem;
  onSelect: (app: AppItem) => void;
  onFastInstall: (app: AppItem, e: React.MouseEvent) => void;
  installedStatus: 'Download' | 'Update' | 'Buka';
}

export const TopChartRow: React.FC<TopChartRowProps> = ({
  rank,
  app,
  onSelect,
  onFastInstall,
  installedStatus,
}) => {
  return (
    <div
      onClick={() => onSelect(app)}
      className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#25282e] border border-transparent hover:border-[#333740] transition-all cursor-pointer group select-none"
    >
      {/* Rank Number */}
      <span className="w-6 text-center text-sm font-bold text-gray-400 group-hover:text-white shrink-0">
        {rank}
      </span>

      {/* App Icon */}
      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#181a1f] border border-[#343842] shrink-0 shadow-sm">
        <img
          src={app.icon}
          alt={app.nama}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-950 -z-10">
          <span className="font-bold text-emerald-400 text-lg">{app.nama.charAt(0)}</span>
        </div>
      </div>

      {/* App Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#00f076] transition-colors">
          {app.nama}
        </h4>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {app.developer}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span className="text-[11px] text-gray-300 font-medium">{app.subKategori}</span>
          <span>·</span>
          <div className="flex items-center gap-0.5 text-gray-200">
            <span>{app.rating}</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </div>
          <span>·</span>
          <span className="text-[11px]">{app.ukuran}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={(e) => onFastInstall(app, e)}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
          installedStatus === 'Buka'
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : installedStatus === 'Update'
            ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
            : 'bg-[#01875f] hover:bg-[#009b6e] text-white shadow-sm'
        }`}
      >
        {installedStatus === 'Buka' ? 'Buka' : installedStatus === 'Update' ? 'Update' : 'Instal'}
      </button>
    </div>
  );
};
