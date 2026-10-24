import React, { useState, useEffect } from 'react';
import { AppItem, AppReview } from '../data/appsData';
import { AppIcon } from './AppIcon';
import {
  X,
  Star,
  Download,
  Share2,
  Trash2,
  ShieldCheck,
  CheckCircle,
  ThumbsUp,
  Bookmark,
  ExternalLink,
  ChevronRight,
  Send,
  Smartphone,
  Info
} from 'lucide-react';

interface AppDetailModalProps {
  app: AppItem | null;
  onClose: () => void;
  onDownload: (app: AppItem) => void;
  onUninstall: (appId: string) => void;
  installedStatus: 'Download' | 'Update' | 'Buka';
  isDownloading: boolean;
  downloadProgress: number;
  onAddReview: (appId: string, review: Omit<AppReview, 'id' | 'likes'>) => void;
  userName: string;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  onClose,
  onDownload,
  onUninstall,
  installedStatus,
  isDownloading,
  downloadProgress,
  onAddReview,
  userName,
}) => {
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Reset review form when app changes
    setShowReviewForm(false);
    setNewComment('');
  }, [app?.id]);

  if (!app) return null;

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?app=${app.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2500);
      });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddReview(app.id, {
      userName: userName || 'Pengguna NewAppStore',
      userAvatar: (userName || 'P').charAt(0).toUpperCase(),
      rating: newRating,
      date: 'Hari ini',
      comment: newComment.trim(),
    });
    setNewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="relative w-full sm:max-w-3xl lg:max-w-4xl bg-[#1f2125] sm:rounded-3xl border border-[#343842] shadow-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto play-scrollbar rounded-t-3xl flex flex-col">
        
        {/* Sticky Header Nav */}
        <div className="sticky top-0 z-30 bg-[#1f2125]/95 backdrop-blur-md px-5 py-4 border-b border-[#31353f] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
            <span className="capitalize">{app.kategori}</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="text-white truncate max-w-[200px] sm:max-w-md">{app.nama}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/10'
              }`}
              title="Tambahkan ke Wishlist"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
              title="Bagikan tautan"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toast Notifikasi Salin Link */}
        {copiedToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#01875f] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-1.5 animate-in slide-in-from-top duration-200">
            <CheckCircle className="w-3.5 h-3.5" /> Link aplikasi berhasil disalin ke clipboard!
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-7">
          
          {/* Main App Identity Lockup */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            {/* App Icon */}
            <AppIcon appId={app.id} appName={app.nama} size="xl" />

            {/* Info and Titles */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {app.isEditorsChoice && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#01875f]/20 text-[#00f076] border border-[#01875f]/30">
                    Pilihan Editor
                  </span>
                )}
                <span className="text-xs text-gray-400 capitalize">{app.subKategori}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {app.nama}
              </h1>

              <p className="text-sm font-medium text-[#00f076] mt-1 flex items-center gap-1.5">
                <span>{app.developer}</span>
                <span className="text-gray-500">·</span>
                <span className="text-xs text-gray-400">Gratis APK</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar (Play Store Iconic 4-Column Metric Row) */}
          <div className="grid grid-cols-4 gap-2 bg-[#17191d] rounded-2xl p-3.5 border border-[#2b2e37] text-center">
            {/* Rating */}
            <div className="flex flex-col items-center justify-center border-r border-[#2b2e37]">
              <div className="flex items-center gap-1 font-bold text-white text-base">
                <span>{app.rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[11px] text-gray-400 mt-0.5">{app.totalReviews} ulasan</span>
            </div>

            {/* Downloads */}
            <div className="flex flex-col items-center justify-center border-r border-[#2b2e37]">
              <span className="font-bold text-white text-base">{app.downloads}</span>
              <span className="text-[11px] text-gray-400 mt-0.5">Unduhan</span>
            </div>

            {/* Age Rating */}
            <div className="flex flex-col items-center justify-center border-r border-[#2b2e37]">
              <span className="font-bold text-white text-base">{app.ageRating}</span>
              <span className="text-[11px] text-gray-400 mt-0.5">Semua Umur</span>
            </div>

            {/* File Size */}
            <div className="flex flex-col items-center justify-center">
              <span className="font-bold text-white text-base">{app.ukuran}</span>
              <span className="text-[11px] text-gray-400 mt-0.5">Ukuran File</span>
            </div>
          </div>

          {/* Primary Action Button (Play Store Green Install) */}
          <div className="space-y-2">
            {isDownloading ? (
              <div className="bg-[#17191d] border border-[#2e323b] rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#01875f] animate-ping" />
                    {downloadProgress < 90 ? 'Mengunduh APK...' : 'Menyiapkan berkas instalasi...'}
                  </span>
                  <span className="font-mono text-[#00f076]">{downloadProgress}%</span>
                </div>
                <div className="w-full bg-[#2a2d36] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#01875f] to-[#00f076] h-full rounded-full transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onDownload(app)}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                    installedStatus === 'Buka'
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      : installedStatus === 'Update'
                      ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/20'
                      : 'bg-[#01875f] hover:bg-[#009b6e] text-white shadow-[#01875f]/25 hover:scale-[1.01]'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {installedStatus === 'Buka'
                      ? 'Buka Aplikasi'
                      : installedStatus === 'Update'
                      ? 'Perbarui ke Versi Baru'
                      : 'Instal APK'}
                  </span>
                </button>

                {installedStatus !== 'Download' && (
                  <button
                    onClick={() => onUninstall(app.id)}
                    className="py-3.5 px-5 rounded-2xl font-semibold text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Copot Pemasangan</span>
                  </button>
                )}
              </div>
            )}

            {/* Direct MediaFire download notice */}
            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diverifikasi oleh Play Protect · Berkas aman bebas virus</span>
            </p>
          </div>

          {/* Screenshot Preview Gallery */}
          {app.screenshots && app.screenshots.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white mb-3">Tangkapan Layar & Pratinjau</h3>
              <div className="flex gap-3 overflow-x-auto play-scrollbar pb-2">
                {app.screenshots.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveScreenshot(src)}
                    className="relative shrink-0 w-64 sm:w-72 h-36 sm:h-40 rounded-2xl overflow-hidden bg-[#181a1f] border border-[#2e333d] cursor-pointer group hover:border-[#01875f] transition-all"
                  >
                    <img
                      src={src}
                      alt={`Screenshot ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lightbox for screenshots */}
          {activeScreenshot && (
            <div
              onClick={() => setActiveScreenshot(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <img
                  src={activeScreenshot}
                  alt="Enlarged screenshot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-2xl border border-white/20"
                />
                <button
                  onClick={() => setActiveScreenshot(null)}
                  className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Tentang Aplikasi Ini (About this app) */}
          <div className="border-t border-[#2e323b] pt-6">
            <h3 className="text-base font-bold text-white mb-2">Tentang Aplikasi Ini</h3>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {app.deskripsi}
            </p>

            {/* Tags / Labels */}
            {app.labels && app.labels.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {app.labels.map((label, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-[#25282f] text-gray-300 border border-[#353943]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Apa yang baru (Changelog) */}
          {app.whatsNew && (
            <div className="border-t border-[#2e323b] pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-white">Yang Baru</h3>
                <span className="text-xs text-gray-400 font-mono">v{app.versi}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed bg-[#181a1f] p-4 rounded-2xl border border-[#2b2f38]">
                {app.whatsNew}
              </p>
            </div>
          )}

          {/* Keamanan Data (Data Safety) */}
          <div className="border-t border-[#2e323b] pt-6">
            <h3 className="text-base font-bold text-white mb-2">Keamanan Data</h3>
            <div className="bg-[#17191d] border border-[#2b2f38] rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Tidak ada data dibagikan kepada pihak ketiga</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Developer menyatakan bahwa aplikasi ini tidak membagikan data pengguna ke perusahaan atau organisasi lain.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Data dienkripsi dalam proses transfer</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Koneksi unduhan langsung ke server aman MediaFire terverifikasi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Tambahan Table */}
          <div className="border-t border-[#2e323b] pt-6">
            <h3 className="text-base font-bold text-white mb-3">Informasi Aplikasi</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#17191d] p-4 rounded-2xl border border-[#2b2f38]">
              <div>
                <p className="text-gray-400">Versi</p>
                <p className="font-semibold text-white mt-0.5">{app.versi}</p>
              </div>
              <div>
                <p className="text-gray-400">Diperbarui Pada</p>
                <p className="font-semibold text-white mt-0.5">Oktober 2026</p>
              </div>
              <div>
                <p className="text-gray-400">Ukuran Unduhan</p>
                <p className="font-semibold text-white mt-0.5">{app.ukuran}</p>
              </div>
              <div>
                <p className="text-gray-400">Kompatibilitas</p>
                <p className="font-semibold text-white mt-0.5">Android 7.0+</p>
              </div>
              <div>
                <p className="text-gray-400">Developer</p>
                <p className="font-semibold text-white mt-0.5">{app.developer}</p>
              </div>
              <div>
                <p className="text-gray-400">ID Paket</p>
                <p className="font-mono text-emerald-400 mt-0.5 text-[11px] truncate">{app.id}</p>
              </div>
            </div>
          </div>

          {/* Rating & Ulasan (Ratings & Reviews Section) */}
          <div className="border-t border-[#2e323b] pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Rating & Ulasan</h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-semibold text-[#00f076] hover:underline"
              >
                {showReviewForm ? 'Batal' : 'Tulis Ulasan'}
              </button>
            </div>

            {/* Star Distribution Graph */}
            <div className="flex items-center gap-6 bg-[#17191d] p-4 rounded-2xl border border-[#2b2f38] mb-4">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-white">{app.rating}</div>
                <div className="flex items-center justify-center gap-0.5 my-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.round(app.rating) ? 'fill-amber-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[11px] text-gray-400">{app.totalReviews}</div>
              </div>

              {/* Progress bars for 5, 4, 3, 2, 1 */}
              <div className="flex-1 space-y-1 text-xs">
                {[
                  { star: 5, pct: '82%' },
                  { star: 4, pct: '12%' },
                  { star: 3, pct: '4%' },
                  { star: 2, pct: '1%' },
                  { star: 1, pct: '1%' },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2">
                    <span className="w-3 text-gray-400 text-[11px]">{row.star}</span>
                    <div className="flex-1 bg-[#282b33] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#01875f] h-full rounded-full"
                        style={{ width: row.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-[#181a1f] p-4 rounded-2xl border border-[#2f333e] mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-300">Beri Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform"
                    >
                        <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda menggunakan aplikasi ini..."
                  rows={3}
                  required
                  className="w-full bg-[#121316] border border-[#343842] rounded-xl p-3 text-xs text-white placeholder:text-gray-500 focus:border-[#01875f] outline-none resize-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#01875f] hover:bg-[#009b6e] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Ulasan</span>
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              {app.reviews && app.reviews.length > 0 ? (
                app.reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#17191d] p-4 rounded-2xl border border-[#2b2f38] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                          {rev.userAvatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{rev.userName}</p>
                          <p className="text-[10px] text-gray-400">{rev.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>

                    <div className="flex items-center gap-1 text-[11px] text-gray-400 pt-1">
                      <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Membantu ({rev.likes})</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic py-2 text-center">Belum ada ulasan untuk aplikasi ini.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
