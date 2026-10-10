import React, { useState } from 'react';
import { AppItem } from '../data/appsData';
import {
  X,
  User,
  Wifi,
  Download,
  Trash2,
  ExternalLink,
  Edit2,
  Check,
  ShieldCheck,
  LogOut,
  FolderOpen
} from 'lucide-react';

interface DownloadHistoryItem {
  app: AppItem;
  waktu: number;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  onUpdateName: (newName: string) => void;
  onLogout: () => void;
  downloadHistory: DownloadHistoryItem[];
  onOpenApp: (app: AppItem) => void;
  onUninstallApp: (appId: string) => void;
  isOnline: boolean;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  onUpdateName,
  onLogout,
  downloadHistory,
  onOpenApp,
  onUninstallApp,
  isOnline,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userName);

  if (!isOpen) return null;

  const handleSaveName = () => {
    if (editedName.trim()) {
      onUpdateName(editedName.trim());
      setIsEditing(false);
    }
  };

  const initial = (userName || 'U').charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#1e2025] border border-[#343842] rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto play-scrollbar text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="text-center pt-2 pb-5 border-b border-[#2e323c]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-[#00f076] text-black font-extrabold text-3xl flex items-center justify-center mx-auto shadow-xl mb-3 border-2 border-white/20">
            {initial}
          </div>

          {isEditing ? (
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="bg-[#121316] border border-[#01875f] text-white text-sm rounded-xl px-3 py-1.5 outline-none text-center"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="p-2 bg-[#01875f] hover:bg-[#009b6e] text-white rounded-xl text-xs"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold text-white">{userName}</h2>
              <button
                onClick={() => {
                  setEditedName(userName);
                  setIsEditing(true);
                }}
                className="text-gray-400 hover:text-white p-1"
                title="Ubah nama"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-1 font-mono">{userEmail}</p>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-[#16181c] border border-[#2c303a] rounded-2xl p-3.5 text-center">
            <span className="text-[11px] text-gray-400 block uppercase font-medium">Aplikasi Terpasang</span>
            <span className="text-2xl font-extrabold text-[#00f076] mt-0.5 block">
              {downloadHistory.length}
            </span>
          </div>

          <div className="bg-[#16181c] border border-[#2c303a] rounded-2xl p-3.5 text-center">
            <span className="text-[11px] text-gray-400 block uppercase font-medium">Status Jaringan</span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              <span className={`text-sm font-bold ${isOnline ? 'text-emerald-400' : 'text-red-400'}`}>
                {isOnline ? 'Terhubung (Online)' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Saluran WhatsApp Info Box */}
        <a
          href="https://whatsapp.com/channel/0029Vb6678635fLqu0pxqx2K"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-gradient-to-r from-emerald-950/40 to-[#01875f]/10 border border-[#01875f]/30 hover:border-[#01875f] rounded-2xl p-4 transition-all mb-5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#01875f]/20 flex items-center justify-center text-[#00f076]">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-[#00f076] transition-colors">
                  Saluran WhatsApp Resmi NewApp
                </p>
                <p className="text-[11px] text-gray-400">Dapatkan update APK mod dan rilis game terbaru</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </a>

        {/* Riwayat Download */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#01875f]" />
              <span>Daftar Unduhan & Koleksi</span>
            </h4>
            <span className="text-[11px] text-gray-500 font-mono">{downloadHistory.length} items</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto play-scrollbar">
            {downloadHistory.length > 0 ? (
              downloadHistory.map(({ app, waktu }) => {
                const dateStr = new Date(waktu).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between bg-[#15171b] border border-[#2b2f38] hover:border-[#383d47] p-2.5 rounded-2xl transition-all gap-2"
                  >
                    <div
                      onClick={() => {
                        onClose();
                        onOpenApp(app);
                      }}
                      className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                    >
                      <img
                        src={app.icon}
                        alt={app.nama}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-white/10 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{app.nama}</p>
                        <p className="text-[10px] text-gray-400 truncate">{dateStr} · v{app.versi}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenApp(app);
                        }}
                        className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium"
                      >
                        Buka
                      </button>
                      <button
                        onClick={() => onUninstallApp(app.id)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Hapus riwayat & copot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-gray-500 text-xs italic bg-[#15171b] rounded-2xl border border-dashed border-[#2b2f38]">
                Belum ada aplikasi yang diunduh.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#2e323c] flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Yakin ingin keluar dari akun?')) {
                onLogout();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
