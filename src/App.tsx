import React, { useState, useEffect, useMemo, useRef } from 'react';
import { initialAppsDatabase, AppItem, AppReview } from './data/appsData';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { HeroBillboard } from './components/HeroBillboard';
import { AppCard } from './components/AppCard';
import { TopChartRow } from './components/TopChartRow';
import { AppDetailModal } from './components/AppDetailModal';
import { OfferModal } from './components/OfferModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Sparkles,
  Gamepad2,
  Layers,
  Wrench,
  Search,
  ExternalLink,
  ShieldCheck,
  DownloadCloud
} from 'lucide-react';

export default function App() {
  // User Session
  const [userSession, setUserSession] = useState<{ name: string; email: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Network connectivity
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Active navigation tab & category chip
  const [activeTab, setActiveTab] = useState<'semua' | 'game' | 'aplikasi' | 'charts' | 'koleksi'>('semua');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Active App
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Download simulation states
  const [downloadingAppId, setDownloadingAppId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Installed apps sync tracker (increment to re-render installed states)
  const [installedVersionTrigger, setInstalledVersionTrigger] = useState(0);

  // Apps dataset with in-memory review mutations
  const [apps, setApps] = useState<AppItem[]>(initialAppsDatabase);

  // Shelf scroll refs
  const shelfRef1 = useRef<HTMLDivElement>(null);
  const shelfRef2 = useRef<HTMLDivElement>(null);
  const shelfRef3 = useRef<HTMLDivElement>(null);

  // Initialize Session & Listeners
  useEffect(() => {
    const session = localStorage.getItem('nexus_user_session');
    if (session) {
      try {
        setUserSession(JSON.parse(session));
      } catch {
        setUserSession({ name: 'Pengguna PlayStore', email: 'pengguna@playstore.id' });
      }
    } else {
      // Auto assign standard guest session or trigger auth if completely empty
      setUserSession({ name: 'Pengguna PlayStore', email: 'pengguna@playstore.id' });
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Deep link query check (?app=com.ai.neXai)
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('app');
    if (appId) {
      const target = initialAppsDatabase.find((a) => a.id === appId);
      if (target) {
        setSelectedApp(target);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Calculate Installed status for an app
  const getInstalledStatus = (appId: string, currentVersion: string): 'Download' | 'Update' | 'Buka' => {
    // Rely on installedVersionTrigger for reactivity
    void installedVersionTrigger;
    const local = localStorage.getItem(`app_${appId}`);
    if (!local) return 'Download';
    try {
      const parsed = JSON.parse(local);
      if (parsed.versiDownloaded !== currentVersion) return 'Update';
      return 'Buka';
    } catch {
      return 'Download';
    }
  };

  // Download history list
  const downloadHistory = useMemo(() => {
    void installedVersionTrigger;
    const list: { app: AppItem; waktu: number }[] = [];
    apps.forEach((app) => {
      const local = localStorage.getItem(`app_${app.id}`);
      if (local) {
        try {
          const parsed = JSON.parse(local);
          list.push({ app, waktu: parsed.waktu || Date.now() });
        } catch {
          // ignore corrupted keys
        }
      }
    });
    return list.sort((a, b) => b.waktu - a.waktu);
  }, [apps, installedVersionTrigger]);

  // Execute Download or Open
  const handleDownloadApp = (app: AppItem) => {
    const status = getInstalledStatus(app.id, app.versi);

    if (status === 'Buka') {
      // Already installed, open external target or show feedback
      window.open(app.driveId, '_blank');
      return;
    }

    // Start simulation progress bar
    setDownloadingAppId(app.id);
    setDownloadProgress(10);

    const stepInterval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(stepInterval);
          // Complete download
          localStorage.setItem(
            `app_${app.id}`,
            JSON.stringify({
              id: app.id,
              versiDownloaded: app.versi,
              waktu: Date.now(),
            })
          );
          setInstalledVersionTrigger((t) => t + 1);
          setDownloadingAppId(null);
          // Launch MediaFire link in new tab
          window.open(app.driveId, '_blank');
          return 100;
        }
        return prev + 25;
      });
    }, 280);
  };

  // Uninstall App
  const handleUninstall = (appId: string) => {
    const target = apps.find((a) => a.id === appId);
    const appName = target ? target.nama : 'Aplikasi';
    if (confirm(`Apakah Anda yakin ingin mencopot pemasangan ${appName}?`)) {
      localStorage.removeItem(`app_${appId}`);
      setInstalledVersionTrigger((t) => t + 1);
    }
  };

  // Add Review
  const handleAddReview = (appId: string, reviewData: Omit<AppReview, 'id' | 'likes'>) => {
    setApps((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const newReview: AppReview = {
            ...reviewData,
            id: `rev_${Date.now()}`,
            likes: 0,
          };
          return {
            ...app,
            reviews: [newReview, ...app.reviews],
          };
        }
        return app;
      })
    );
  };

  // Filter Categories
  const categoryChipsList = useMemo(() => {
    if (activeTab === 'game') {
      return ['Semua Game', 'Aksi', 'Petualangan', 'Simulasi', 'Arcade', 'Sandbox'];
    }
    if (activeTab === 'aplikasi') {
      return ['Semua Aplikasi', 'Alat & AI', 'Produktivitas', 'Keuangan', 'Seni & Desain'];
    }
    return ['Semua', 'Game', 'Alat & AI', 'Produktivitas', 'Simulasi', 'Keuangan', 'Pilihan Editor'];
  }, [activeTab]);

  // Filtered Apps based on Search, Tab, and Category
  const filteredApps = useMemo(() => {
    let result = apps;

    // Filter by Active Tab
    if (activeTab === 'game') {
      result = result.filter((a) => a.kategori === 'game');
    } else if (activeTab === 'aplikasi') {
      result = result.filter((a) => a.kategori === 'aplikasi');
    } else if (activeTab === 'koleksi') {
      result = result.filter((a) => localStorage.getItem(`app_${a.id}`));
    }

    // Filter by Category Chip
    if (selectedCategory !== 'Semua' && selectedCategory !== 'Semua Game' && selectedCategory !== 'Semua Aplikasi') {
      if (selectedCategory === 'Pilihan Editor') {
        result = result.filter((a) => a.isEditorsChoice);
      } else {
        const queryCat = selectedCategory.toLowerCase();
        result = result.filter(
          (a) =>
            a.subKategori.toLowerCase().includes(queryCat) ||
            a.labels.some((l) => l.toLowerCase().includes(queryCat))
        );
      }
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.nama.toLowerCase().includes(q) ||
          a.developer.toLowerCase().includes(q) ||
          a.subKategori.toLowerCase().includes(q) ||
          a.deskripsi.toLowerCase().includes(q) ||
          a.labels.some((l) => l.toLowerCase().includes(q))
      );
    }

    return result;
  }, [apps, activeTab, selectedCategory, searchQuery, installedVersionTrigger]);

  // Featured apps for billboard carousel
  const featuredBillboardApps = useMemo(() => {
    return apps.filter((a) => a.isEditorsChoice || a.featuredRank && a.featuredRank <= 4);
  }, [apps]);

  // Top charts sorted by rating and downloads
  const topChartsApps = useMemo(() => {
    return [...apps].sort((a, b) => b.rating - a.rating);
  }, [apps]);

  // Shelves horizontal scroll helpers
  const scrollShelf = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#e3e3e3] pb-20 md:pb-12 selection:bg-[#01875f] selection:text-white">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedCategory('Semua');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userName={userSession?.name || 'Pengguna'}
        onOpenOffer={() => setShowOfferModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenEditName={() => setShowProfileModal(true)}
        onLogout={() => {
          localStorage.removeItem('nexus_user_session');
          setUserSession(null);
          setShowAuthModal(true);
        }}
        isOnline={isOnline}
        totalDownloaded={downloadHistory.length}
      />

      {/* Category Chips Bar */}
      <CategoryChips
        categories={categoryChipsList}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Search Results Active View */}
        {searchQuery.trim() ? (
          <div className="py-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-[#00f076]" />
                <span>Hasil Pencarian: "{searchQuery}"</span>
              </h2>
              <span className="text-xs text-gray-400 font-mono">
                {filteredApps.length} aplikasi ditemukan
              </span>
            </div>

            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onSelect={setSelectedApp}
                    installedStatus={getInstalledStatus(app.id, app.versi)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#181a1f] rounded-3xl border border-[#2b2f38] p-6 max-w-md mx-auto">
                <Search className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Aplikasi Tidak Ditemukan</h3>
                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                  Tidak ada aplikasi atau game yang cocok dengan "{searchQuery}". Coba kata kunci lain atau ajukan aplikasi Anda ke store!
                </p>
                <button
                  onClick={() => setShowOfferModal(true)}
                  className="px-5 py-2.5 bg-[#01875f] hover:bg-[#009b6e] text-white rounded-full text-xs font-bold transition-all"
                >
                  Ajukan APK Baru
                </button>
              </div>
            )}
          </div>
        ) : activeTab === 'charts' ? (
          /* Top Charts View (Peringkat Teratas) */
          <div className="py-6 space-y-6">
            <div className="border-b border-[#2e323c] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  <span>Peringkat Teratas (Top Charts)</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Aplikasi dan game terpopuler dengan rating terbaik di komunitas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topChartsApps.map((app, index) => (
                <div key={app.id} className="bg-[#181a1f] rounded-2xl border border-[#2b2f38] p-1.5">
                  <TopChartRow
                    rank={index + 1}
                    app={app}
                    onSelect={setSelectedApp}
                    onFastInstall={(a, e) => {
                      e.stopPropagation();
                      handleDownloadApp(a);
                    }}
                    installedStatus={getInstalledStatus(app.id, app.versi)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'koleksi' ? (
          /* Koleksi Saya View (Installed Apps) */
          <div className="py-6 space-y-6">
            <div className="border-b border-[#2e323c] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <DownloadCloud className="w-6 h-6 text-[#00f076]" />
                  <span>Koleksi Aplikasi & Unduhan Anda</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Kelola dan buka aplikasi yang telah Anda pasang di perangkat</p>
              </div>
              <span className="text-xs bg-[#01875f]/20 text-[#00f076] px-3 py-1 rounded-full font-bold">
                {downloadHistory.length} Terpasang
              </span>
            </div>

            {downloadHistory.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                {downloadHistory.map(({ app }) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onSelect={setSelectedApp}
                    installedStatus={getInstalledStatus(app.id, app.versi)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#181a1f] rounded-3xl border border-[#2b2f38] p-8 max-w-md mx-auto">
                <DownloadCloud className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Belum Ada Aplikasi Terpasang</h3>
                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                  Jelajahi beragam aplikasi dan game menarik lalu klik tombol Instal untuk memasukkannya ke koleksi Anda.
                </p>
                <button
                  onClick={() => setActiveTab('semua')}
                  className="px-6 py-2.5 bg-[#01875f] hover:bg-[#009b6e] text-white rounded-full text-xs font-bold transition-all"
                >
                  Jelajahi Toko
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Standard Storefront Shelves View */
          <div className="space-y-10 pb-8">
            
            {/* Hero Billboard Carousel */}
            <HeroBillboard
              featuredApps={featuredBillboardApps}
              onSelectApp={setSelectedApp}
              onDownload={handleDownloadApp}
              getInstalledStatus={getInstalledStatus}
            />

            {/* Shelf 1: Direkomendasikan Untuk Anda */}
            <section className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Direkomendasikan Untuk Anda
                  </h2>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollShelf(shelfRef1, 'left')}
                    className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c3038] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#343842]"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollShelf(shelfRef1, 'right')}
                    className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c3038] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#343842]"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={shelfRef1}
                className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
              >
                {filteredApps.slice(0, 7).map((app) => (
                  <div key={app.id} className="w-36 sm:w-44 shrink-0">
                    <AppCard
                      app={app}
                      onSelect={setSelectedApp}
                      installedStatus={getInstalledStatus(app.id, app.versi)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Shelf 2: Top Charts Mini Shelf (3-Column Split like Google Play) */}
            <section className="bg-[#181a1f] border border-[#2b2f38] rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Peringkat Teratas Hari Ini
                    </h2>
                    <p className="text-xs text-gray-400">Paling banyak diunduh dan dicari minggu ini</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('charts')}
                  className="text-xs font-bold text-[#00f076] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Semua</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {topChartsApps.slice(0, 6).map((app, idx) => (
                  <TopChartRow
                    key={app.id}
                    rank={idx + 1}
                    app={app}
                    onSelect={setSelectedApp}
                    onFastInstall={(a, e) => {
                      e.stopPropagation();
                      handleDownloadApp(a);
                    }}
                    installedStatus={getInstalledStatus(app.id, app.versi)}
                  />
                ))}
              </div>
            </section>

            {/* Shelf 3: Game Pilihan & Seru */}
            <section className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Game Unggulan & Petualangan
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollShelf(shelfRef2, 'left')}
                    className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c3038] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#343842]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollShelf(shelfRef2, 'right')}
                    className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c3038] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#343842]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={shelfRef2}
                className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
              >
                {apps
                  .filter((a) => a.kategori === 'game')
                  .map((app) => (
                    <div key={app.id} className="w-36 sm:w-44 shrink-0">
                      <AppCard
                        app={app}
                        onSelect={setSelectedApp}
                        installedStatus={getInstalledStatus(app.id, app.versi)}
                      />
                    </div>
                  ))}
              </div>
            </section>

            {/* Shelf 4: Aplikasi Cerdas & Produktivitas */}
            <section className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Alat, AI & Utilitas Produktivitas
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollShelf(shelfRef3, 'left')}
                    className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c3038] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#343842]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollShelf(shelfRef3, 'right')}
                    className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c3038] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#343842]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={shelfRef3}
                className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
              >
                {apps
                  .filter((a) => a.kategori === 'aplikasi')
                  .map((app) => (
                    <div key={app.id} className="w-36 sm:w-44 shrink-0">
                      <AppCard
                        app={app}
                        onSelect={setSelectedApp}
                        installedStatus={getInstalledStatus(app.id, app.versi)}
                      />
                    </div>
                  ))}
              </div>
            </section>

            {/* Bottom Callout: Publikasikan Aplikasi Anda */}
            <section className="bg-gradient-to-r from-[#172b22] via-[#1a2228] to-[#161a22] border border-[#01875f]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                  <Sparkles className="w-4 h-4" /> Komunitas Developer
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Punya Aplikasi atau Game Sendiri?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                  Dapatkan kesempatan gratis mempublikasikan APK Anda di NewApp PlayStore. Bagikan karyamu ke ribuan pengguna komunitas sekarang!
                </p>
              </div>

              <button
                onClick={() => setShowOfferModal(true)}
                className="px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20 whitespace-nowrap transition-all hover:scale-105"
              >
                Ajukan APK Sekarang
              </button>
            </section>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#2e323c] mt-12 py-8 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 NewApp PlayStore · Google Play Web Experience</p>
          <div className="flex items-center gap-4 text-gray-400">
            <button
              onClick={() => setShowOfferModal(true)}
              className="hover:text-white transition-colors"
            >
              Publikasi APK
            </button>
            <span>·</span>
            <a
              href="https://whatsapp.com/channel/0029Vb6678635fLqu0pxqx2K"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Saluran WhatsApp <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Play Protect
            </span>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <AppDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onDownload={handleDownloadApp}
        onUninstall={handleUninstall}
        installedStatus={selectedApp ? getInstalledStatus(selectedApp.id, selectedApp.versi) : 'Download'}
        isDownloading={Boolean(selectedApp && downloadingAppId === selectedApp.id)}
        downloadProgress={downloadProgress}
        onAddReview={handleAddReview}
        userName={userSession?.name || 'Pengguna'}
      />

      {/* Penawaran Spesial / Form Pengajuan APK Modal */}
      <OfferModal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
      />

      {/* User Profile & Downloads Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userName={userSession?.name || 'Pengguna'}
        userEmail={userSession?.email || 'user@playstore.id'}
        onUpdateName={(newName) => {
          if (userSession) {
            const updated = { ...userSession, name: newName };
            setUserSession(updated);
            localStorage.setItem('nexus_user_session', JSON.stringify(updated));
          }
        }}
        onLogout={() => {
          localStorage.removeItem('nexus_user_session');
          setUserSession(null);
          setShowAuthModal(true);
        }}
        downloadHistory={downloadHistory}
        onOpenApp={(app) => setSelectedApp(app)}
        onUninstallApp={handleUninstall}
        isOnline={isOnline}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onSuccess={(name, email) => {
          const session = { name, email };
          localStorage.setItem('nexus_user_session', JSON.stringify(session));
          setUserSession(session);
          setShowAuthModal(false);
        }}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={(t) => {
          setActiveTab(t);
          setSelectedCategory('Semua');
        }}
        onOpenOffer={() => setShowOfferModal(true)}
        totalDownloaded={downloadHistory.length}
      />

    </div>
  );
}
