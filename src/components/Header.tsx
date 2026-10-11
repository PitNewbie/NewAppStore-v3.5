import React, { useState, useRef, useEffect } from 'react';
import { NewAppStore } from './PlayLogo';
import { Search, X, Sparkles, User, DownloadCloud, Plus, LogOut, Edit2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'semua' | 'game' | 'aplikasi' | 'charts' | 'koleksi';
  setActiveTab: (tab: 'semua' | 'game' | 'aplikasi' | 'charts' | 'koleksi') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  userName: string;
  onOpenOffer: () => void;
  onOpenProfile: () => void;
  onOpenEditName: () => void;
  onLogout: () => void;
  isOnline: boolean;
  totalDownloaded: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  userName,
  onOpenOffer,
  onOpenProfile,
  onOpenEditName,
  onLogout,
  isOnline,
  totalDownloaded,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initial = userName ? userName.charAt(0).toUpperCase() : 'P';

  return (
    <header className="sticky top-0 z-40 bg-[#1f1f1f] border-b border-[#2d3036] transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* MOBILE VIEW: Google Play Android Authentic Search Bar */}
        <div className="flex md:hidden items-center justify-between py-2.5 gap-2.5">
          {/* Play Store unified search pill */}
          <div className="relative flex-1 flex items-center bg-[#2a2c30] rounded-full px-3.5 py-2 border border-transparent focus-within:border-[#01875f] focus-within:bg-[#32353a] transition-all shadow-sm">
            <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Telusuri aplikasi & game"
              className="w-full bg-transparent text-white text-sm outline-none placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Ajukan APK button on mobile */}
          <button
            onClick={onOpenOffer}
            className="p-2 rounded-full bg-[#2a2c30] hover:bg-[#32353a] text-amber-400 border border-amber-500/20 shrink-0"
            title="Ajukan APK"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* User profile avatar on mobile */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-8 h-8 rounded-full bg-[#01875f] text-white font-bold text-xs flex items-center justify-center ring-2 ring-transparent active:ring-white/40"
            >
              {initial}
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#282a2d] border border-[#3c4043] rounded-2xl shadow-2xl py-2 z-50 text-white animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-3 border-b border-[#3c4043]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#01875f] text-white font-bold flex items-center justify-center text-sm">
                      {initial}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold truncate text-white">{userName}</p>
                      <p className="text-xs text-gray-400 truncate flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                        {isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full px-4 py-2.5 text-left text-gray-200 hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <User className="w-4 h-4 text-[#01875f]" />
                    <span>Kelola Akun & Unduhan</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setActiveTab('koleksi');
                    }}
                    className="w-full px-4 py-2.5 text-left text-gray-200 hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <DownloadCloud className="w-4 h-4 text-blue-400" />
                    <span>Aplikasi Terpasang ({totalDownloaded})</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenEditName();
                    }}
                    className="w-full px-4 py-2.5 text-left text-gray-200 hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <Edit2 className="w-4 h-4 text-amber-400" />
                    <span>Ubah Nama Akun</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenOffer();
                    }}
                    className="w-full px-4 py-2.5 text-left text-gray-200 hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>Ajukan APK (Gratis)</span>
                  </button>
                </div>

                <div className="border-t border-[#3c4043] pt-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP VIEW: Google Play Web Bar */}
        <div className="hidden md:flex h-16 items-center justify-between gap-4">
          <div 
            onClick={() => setActiveTab('semua')}
            className="cursor-pointer shrink-0"
          >
            <PlayLogo size={32} />
          </div>

          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('semua')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                activeTab === 'semua'
                  ? 'bg-[#01875f]/15 text-[#01875f] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Untuk Anda
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                activeTab === 'charts'
                  ? 'bg-[#01875f]/15 text-[#01875f] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Peringkat Teratas
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                activeTab === 'game'
                  ? 'bg-[#01875f]/15 text-[#01875f] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Game
            </button>
            <button
              onClick={() => setActiveTab('aplikasi')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                activeTab === 'aplikasi'
                  ? 'bg-[#01875f]/15 text-[#01875f] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Aplikasi
            </button>
            <button
              onClick={() => setActiveTab('koleksi')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                activeTab === 'koleksi'
                  ? 'bg-[#01875f]/15 text-[#01875f] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Koleksi Saya
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-64 lg:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Telusuri aplikasi & game"
                className="w-full bg-[#2d2e30] hover:bg-[#35363a] focus:bg-[#35363a] text-white text-sm rounded-full pl-10 pr-9 py-2 border border-transparent focus:border-[#01875f] outline-none transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={onOpenOffer}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#2e3137] hover:bg-[#3a3e46] text-amber-300 border border-amber-500/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ajukan APK</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full bg-[#01875f] text-white font-bold text-sm flex items-center justify-center hover:opacity-90"
            >
              {initial}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
  
