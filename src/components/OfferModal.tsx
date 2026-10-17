import React, { useState } from 'react';
import { Gift, ArrowLeft, Send, CheckSquare, X, UploadCloud, MessageSquare } from 'lucide-react';
import { rekomendasiLabels } from '../data/appsData';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose }) => {
  const [viewState, setViewState] = useState<'main' | 'form'>('main');

  // Form states
  const [idApk, setIdApk] = useState('');
  const [namaApk, setNamaApk] = useState('');
  const [devApk, setDevApk] = useState('');
  const [kategori, setKategori] = useState<'aplikasi' | 'game'>('aplikasi');
  const [versi, setVersi] = useState('');
  const [sizeAngka, setSizeAngka] = useState('');
  const [sizeSatuan, setSizeSatuan] = useState('MB');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [uploadMediaFireMandiri, setUploadMediaFireMandiri] = useState(false);
  const [linkMediaFire, setLinkMediaFire] = useState('');
  const [logoFileName, setLogoFileName] = useState('logo_default.png');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFileName(e.target.files[0].name);
    }
  };

  const handleKirimWhatsApp = () => {
    setErrorMessage('');
    if (!idApk.trim() || !namaApk.trim() || !devApk.trim() || !versi.trim() || !sizeAngka.trim() || !deskripsi.trim() || !linkMediaFire.trim()) {
      setErrorMessage('Harap isi seluruh formulir data APK beserta link MediaFire terlebih dahulu!');
      return;
    }

    // Validasi Ukuran File Limit 1 GB
    let totalMB = parseFloat(sizeAngka);
    if (isNaN(totalMB)) {
      setErrorMessage('Ukuran file harus berupa angka valid.');
      return;
    }
    if (sizeSatuan === 'KB') totalMB = totalMB / 1024;
    if (sizeSatuan === 'GB') totalMB = totalMB * 1024;

    if (totalMB > 1024) {
      setErrorMessage('Ukuran APK melampaui batas limit 1GB, mohon periksa kembali file Anda.');
      return;
    }

    const payload = {
      id: idApk.trim(),
      nama: namaApk.trim(),
      developer: devApk.trim(),
      kategori: kategori,
      icon: logoFileName,
      deskripsi: deskripsi.trim(),
      ukuran: `${sizeAngka.trim()} ${sizeSatuan}`,
      driveId: linkMediaFire.trim(),
      versi: versi.trim(),
      labels: selectedLabels,
    };

    const dataJSONString = JSON.stringify(payload, null, 4);
    const pesanWa = `https://store.starpit.my.id\nHalo Admin NewAppStore, saya ingin mengajukan publikasi data APK ke NewAppStore.\n\nBerikut hasil data aplikasi saya:\n\n\`\`\`javascript\n${dataJSONString}\n\`\`\``;
    const nomorAdmin = '6285727658632';
    const linkWa = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesanWa)}`;

    window.open(linkWa, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1c1e23] border border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto play-scrollbar">
        
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {viewState === 'main' ? (
          /* View 1: Penawaran Utama */
          <div className="text-center py-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-amber-500/15 rounded-3xl flex items-center justify-center text-amber-400 mx-auto mb-4 border border-amber-500/20 shadow-inner">
              <Gift className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">Penawaran Spesial ✨</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Ingin mempublikasikan APK buatan sendiri tapi gapunya duit? Dapatkan kesempatan{' '}
              <span className="text-amber-400 font-bold">Gratis pertama kali upload</span> di NewAppStore!
              Pamerkan hasil karya aplikasi dan game Anda agar bisa diunduh oleh semua pengguna.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                    window.open('https://create.starpit.my.id/', '_blank');
              onClose();
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 ..."
              >
                <Send className="w-4 h-4" />
                <span>Mulai Isi Form Pengajuan</span>
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white/5 hover:bg-white/10 text-gray-400 font-medium py-3 rounded-2xl transition-all text-xs"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        ) : (
          /* View 2: Form Pengajuan Lengkap */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#2e323c]">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setViewState('main')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Data Pengajuan APK</span>
                  </h3>
                  <p className="text-xs text-gray-400">Lengkapi formulir spesifikasi aplikasi atau game Anda</p>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">ID APK (Package Name)</label>
                <input
                  type="text"
                  value={idApk}
                  onChange={(e) => setIdApk(e.target.value)}
                  placeholder="Contoh: com.ai.neXai"
                  className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Nama APK</label>
                <input
                  type="text"
                  value={namaApk}
                  onChange={(e) => setNamaApk(e.target.value)}
                  placeholder="Contoh: neXai core"
                  className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Developer</label>
                <input
                  type="text"
                  value={devApk}
                  onChange={(e) => setDevApk(e.target.value)}
                  placeholder="Contoh: PitNewbie'"
                  className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Kategori</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value as 'aplikasi' | 'game')}
                  className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs"
                >
                  <option value="aplikasi">Aplikasi</option>
                  <option value="game">Game</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Upload Logo (Dari Galeri)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-1.5 px-3 text-xs text-gray-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#01875f] file:text-white cursor-pointer"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">File: {logoFileName}</span>
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Versi APK</label>
                <input
                  type="text"
                  value={versi}
                  onChange={(e) => setVersi(e.target.value)}
                  placeholder="Contoh: 1.0.0"
                  className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Ukuran File APK (Maks 1GB)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={sizeAngka}
                    onChange={(e) => setSizeAngka(e.target.value)}
                    placeholder="Angka"
                    className="w-2/3 bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs"
                  />
                  <select
                    value={sizeSatuan}
                    onChange={(e) => setSizeSatuan(e.target.value)}
                    className="w-1/3 bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-2 focus:border-[#01875f] outline-none text-white text-xs"
                  >
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-gray-300 block mb-1">
                  Pilih Label APK / Game ({selectedLabels.length} terpilih)
                </label>
                <div className="bg-[#121316] border border-[#2e323c] rounded-xl p-3 h-28 overflow-y-auto play-scrollbar grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rekomendasiLabels.map((lbl) => {
                    const isChecked = selectedLabels.includes(lbl);
                    return (
                      <label
                        key={lbl}
                        onClick={() => toggleLabel(lbl)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition-colors ${
                          isChecked ? 'bg-[#01875f]/20 text-[#00f076]' : 'text-gray-400 hover:bg-white/5'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 accent-[#01875f] rounded"
                        />
                        <span className="truncate text-[11px]">{lbl}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-300 block mb-1 text-xs">Deskripsi APK</label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows={3}
                placeholder="Tulis rincian deskripsi, kecocokan, beserta fitur utama aplikasi..."
                className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs resize-none"
              />
            </div>

            {/* Checkbox MediaFire Mandiri */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="check-mediafire"
                checked={uploadMediaFireMandiri}
                onChange={(e) => setUploadMediaFireMandiri(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-amber-500 cursor-pointer"
              />
              <label htmlFor="check-mediafire" className="text-xs text-amber-300 font-medium cursor-pointer">
                Upload ke MediaFire mandiri (Wajib dicentang untuk memasukkan link unduhan)
              </label>
            </div>

            {uploadMediaFireMandiri && (
              <div>
                <label className="font-semibold text-gray-300 block mb-1 text-xs">Link Download MediaFire</label>
                <input
                  type="url"
                  value={linkMediaFire}
                  onChange={(e) => setLinkMediaFire(e.target.value)}
                  placeholder="https://www.mediafire.com/file/..."
                  className="w-full bg-[#121316] border border-[#2e323c] rounded-xl py-2.5 px-3.5 focus:border-[#01875f] outline-none text-white text-xs"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleKirimWhatsApp}
              disabled={!uploadMediaFireMandiri}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                uploadMediaFireMandiri
                  ? 'bg-gradient-to-r from-emerald-600 to-[#01875f] hover:from-emerald-500 hover:to-[#009b6e] text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ajukan APK via WhatsApp Admin</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
