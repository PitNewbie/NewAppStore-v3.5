import React, { useState } from 'react';
import { PlayLogo } from './PlayLogo';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onSuccess }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nama.trim() && email.trim() && password.trim()) {
      onSuccess(nama.trim(), email.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex justify-center items-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#1e2025] border border-[#343842] rounded-3xl p-7 sm:p-9 shadow-2xl text-white">
        
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <PlayLogo size={42} showText={true} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Masuk ke PlayStore Web
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            Daftar akun gratis untuk mulai mengunduh APK, memberikan ulasan bintang, dan mengelola koleksi aplikasi Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">Nama Lengkap</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full bg-[#121316] border border-[#2e323c] rounded-2xl py-3 pl-10 pr-4 text-xs text-white focus:border-[#01875f] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">Alamat Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-[#121316] border border-[#2e323c] rounded-2xl py-3 pl-10 pr-4 text-xs text-white focus:border-[#01875f] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121316] border border-[#2e323c] rounded-2xl py-3 pl-10 pr-4 text-xs text-white focus:border-[#01875f] outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#01875f] hover:bg-[#009b6e] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#01875f]/25 transition-all text-xs flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <span>Buat Akun & Masuk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-[#2e323c] text-center">
          <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dilindungi oleh Play Protect Security</span>
          </p>
        </div>

      </div>
    </div>
  );
};
