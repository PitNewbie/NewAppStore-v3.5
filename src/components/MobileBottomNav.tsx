import React from 'react';
import { Gamepad2, LayoutGrid, Trophy, User, Sparkles } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'semua' | 'game' | 'aplikasi' | 'charts' | 'koleksi';
  setActiveTab: (tab: 'semua' | 'game' | 'aplikasi' | 'charts' | 'koleksi') => void;
  onOpenOffer: () => void;
  totalDownloaded: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenOffer,
  totalDownloaded,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1f1f1f]/95 backdrop-blur-lg border-t border-[#333538] px-2 py-1.5 flex justify-around items-center">
      <button
        onClick={() => setActiveTab('game')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
          activeTab === 'game' ? 'text-[#00f076]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Gamepad2 className="w-5 h-5" />
        <span className="text-[10px] font-medium">Game</span>
      </button>

      <button
        onClick={() => setActiveTab('aplikasi')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
          activeTab === 'aplikasi' ? 'text-[#00f076]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] font-medium">Aplikasi</span>
      </button>

      <button
        onClick={() => setActiveTab('charts')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
          activeTab === 'charts' ? 'text-[#00f076]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Trophy className="w-5 h-5" />
        <span className="text-[10px] font-medium">Top Charts</span>
      </button>

      <button
        onClick={onOpenOffer}
        className="flex flex-col items-center gap-1 py-1 px-3 text-amber-400 hover:text-amber-300 transition-all"
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-[10px] font-medium">Ajukan</span>
      </button>

      <button
        onClick={() => setActiveTab('koleksi')}
        className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
          activeTab === 'koleksi' ? 'text-[#00f076]' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium">Akun</span>
        {totalDownloaded > 0 && (
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#01875f]" />
        )}
      </button>
    </nav>
  );
};
