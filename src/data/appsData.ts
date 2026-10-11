export interface AppReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

export interface AppItem {
  id: string;
  nama: string;
  developer: string;
  kategori: 'aplikasi' | 'game';
  subKategori: string;
  icon: string;
  bannerImage?: string;
  deskripsi: string;
  ukuran: string;
  driveId: string;
  versi: string;
  labels: string[];
  rating: number;
  totalReviews: string;
  downloads: string;
  ageRating: string;
  isEditorsChoice?: boolean;
  featuredRank?: number;
  screenshots: string[];
  whatsNew?: string;
  reviews: AppReview[];
}

import heroCyberRpg from '../assets/images/hero_cyber_rpg_1791590811746.jpg';
import heroSpaceOrbit from '../assets/images/hero_space_orbit_1791590821582.jpg';
import heroAiAssistant from '../assets/images/hero_ai_assistant_1791590831418.jpg';

export const initialAppsDatabase: AppItem[] = [
  {
    id: "com.ai.neXai",
    nama: "neXai core - AI",
    developer: "PitNewbie'",
    kategori: "aplikasi",
    subKategori: "Produktivitas & AI",
    icon: "https://6abf4d6f48813dd42f7635cf.imgix.net/sandbox/logo%20neXai.jpg?w=200&auto=format&fit=crop&q=80",
    bannerImage: heroAiAssistant,
    deskripsi: "🤖 neXai core - AI Assistant Pribadi\n\nneXai core adalah asisten AI yang dirancang langsung untuk membantu kehidupan sehari-hari.\n\n✨ Fitur Utama:\n- Chat Pintar - Tanya apa aja, dari PR sampai ide konten\n- Ringan & Cepat - Dioptimalkan untuk perangkat ramah memori\n- Privasi 100% - Semua chat diproses lokal, aman & tanpa pelacakan\n- Tanpa Iklan - Fokus berinteraksi tanpa gangguan pop-up\n- Gratis - Chat sepuasnya tanpa biaya langganan tersembunyi\n\n💡 Cocok buat:\nPelajar, content creator, penulis, programmer, atau sekadar teman diskusi harian.",
    ukuran: "206 KB",
    driveId: "https://www.mediafire.com/file/ef5leipdh8wrynh/neXai.apk/file",
    versi: "1.2.5.2",
    labels: ["#webview", "#ai", "#online", "#tools", "#lightweight"],
    rating: 4.7,
    totalReviews: "14",
    downloads: "10+",
    ageRating: "Rating 3+",
    isEditorsChoice: true,
    featuredRank: 1,
    screenshots: [
      heroAiAssistant,
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
    ],
    whatsNew: "Peningkatan latensi respon model AI, perbaikan layout riwayat chat, dan efisiensi memori RAM.",
    reviews: [
      {
        id: "r1",
        userName: "Rian gold lane🥶",
        userAvatar: "R",
        rating: 4,
        date: "28 Sep 2026",
        comment: "woi dev, ini knapa kok ai nya ga bisa jawab "server error" tolong jalanin lagi ai nya plis",
        likes: 8
      },
      {
        id: "r2",
        userName: "Dina Novita",
        userAvatar: "D",
        rating: 5,
        date: "12 Agt 2026",
        comment: "UI-nya bersih, ga ada iklan yang ganggu pas ngetik skripsi. gg ni dev.",
        likes: 6
      }
    ]
  },
  {
    id: "com.game.minecraft",
    nama: "Minecraft Bedrock",
    developer: "Mojang Studio",
    kategori: "game",
    subKategori: "Petualangan & Sandbox",
    icon: "https://cloud.epand.my.id/i/e7gkwrzKUG.png?w=200&auto=format&fit=crop&q=80",
    bannerImage: heroCyberRpg,
    deskripsi: "Jelajahi dunia tanpa batas dan bangun apa pun mulai dari rumah paling sederhana hingga istana termegah. Mainkan dalam mode kreatif dengan sumber daya tak terbatas atau gali lebih dalam ke dunia dalam mode bertahan hidup, buat senjata dan baju zirah untuk menangkis monster berbahaya.\n\n✨ Fitur Game:\n- Dunia voxel tak terbatas dengan beragam bioma unik\n- Dukungan multiplayer lintas platform\n- Modifikasi & tekstur kustom\n- Patch stabilitas performa 60fps untuk berbagai perangkat.",
    ukuran: "345,2 MB",
    driveId: "https://www.mediafire.com/file/n1xjobky8vhonmf/McPatch_1.26.21_Arm64.apk/file?dkey=uvkh7j7062i&r=1587",
    versi: "1.26.21.1",
    labels: ["#rpg", "#petualangan", "#aksi", "#santai", "#sandbox"],
    rating: 4.7,
    totalReviews: "128 rb",
    downloads: "10 jt+",
    ageRating: "Rating 7+",
    isEditorsChoice: true,
    featuredRank: 2,
    screenshots: [
      heroCyberRpg,
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80"
    ],
    whatsNew: "Minecraft Patch terbaru.",
    reviews: [
      {
        id: "r3",
        userName: "Bima Pratama",
        userAvatar: "B",
        rating: 5,
        date: "04 Juni 2026",
        comment: "Bagus banget gada virusnya pula, bisa pasang shader/mod, apalagi mod jenny🗿☕.",
        likes: 85
      },
      {
        id: "r4",
        userName: "Aldo Kurnia",
        userAvatar: "A",
        rating: 4,
        date: "25 Sep 2026",
        comment: "woi min, kok ga update lagi... udh ketinggalan jaman ni mc, tolonglah.",
        likes: 27
      }
    ]
  },
  {
    id: "com.Orbitku.3d",
    nama: "Orbitku - Tata Surya 3D",
    developer: "PitNewbie",
    kategori: "game",
    subKategori: "Simulasi & Edukasi",
    icon: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=200&auto=format&fit=crop&q=80",
    bannerImage: heroSpaceOrbit,
    deskripsi: "Simulasi realistis keliling Tata Surya dan menjelajah planet luar angkasa dengan grafik 3D interaktif!\n\n✨ Fitur Menarik:\n- Orbit astronomi akurat dengan gravitasi real-time\n- Informasi ilmiah lengkap setiap planet dan satelit alami\n- Mode bebas kamera: zoom dari orbit Merkurius hingga Pluto\n- Musik ambien kosmik yang menenangkan\n- Ukuran sangat ringan hanya 5,2 MB!",
    ukuran: "5,2 MB",
    driveId: "https://www.mediafire.com/file/rfbglcixvkpnoui/Orbitku.apk/file",
    versi: "1.5.8.12",
    labels: ["#webview", "#petualangan", "#simulasi", "#santai", "#pengetahuan"],
    rating: 4.6,
    totalReviews: "8.6",
    downloads: "25+",
    ageRating: "Rating 3+",
    isEditorsChoice: false,
    featuredRank: 3,
    screenshots: [
      heroSpaceOrbit,
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
    ],
    whatsNew: "Penambahan visual ring Saturnus resolusi tinggi, orbit komet Halley, dan mode gyroscope sensor.",
    reviews: [
      {
        id: "r5",
        userName: "Fajar Nugraha",
        userAvatar: "F",
        rating: 5,
        date: "02 Sep 2026",
        comment: "walau cuma tata Surya doang bagus, buat orng gabut enak nih😹.",
        likes: 12
      }
    ]
  },
  {
    id: "com.neXai.Search",
    nama: "neXai Search",
    developer: "PitNewbie",
    kategori: "aplikasi",
    subKategori: "Alat & Penjelajah Web",
    icon: "https://6abf4d6f48813dd42f7635cf.imgix.net/sandbox/neXai.png?w=200&auto=format&fit=crop&q=80",
    bannerImage: heroAiAssistant,
    deskripsi: "Browser ultra-ringan dengan mesin pencari cerdas 'neXai search'. Temukan 1000+ website AI, alat produktivitas, berita terkurasi, dan direktori link tanpa pelacak iklan.\n\n✨ Keunggulan:\n- AdBlock terintegrasi bawaan\n- Ringkas hanya 2,4 MB menghemat kuota dan memori\n- Fitur ringkasan halaman pintar otomatis\n- Mode malam OLED hemat baterai.",
    ukuran: "2,4 MB",
    driveId: "https://www.mediafire.com/file/yz63jl2cxs5ehkh/nexai_v6.9.12.apk/file",
    versi: "6.9.12",
    labels: ["#offline", "#online", "#browser", "#penelusuran", "#tools"],
    rating: 4.7,
    totalReviews: "16.1",
    downloads: "38+",
    ageRating: "Rating 3+",
    isEditorsChoice: true,
    featuredRank: 4,
    screenshots: [
      heroAiAssistant,
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
    ],
    whatsNew: "Fix bug history browser, peningkatan kecepatan render webview Chromium, dan tab switcher yang lebih mulus.",
    reviews: [
      {
        id: "r6",
        userName: "Siti Rahma",
        userAvatar: "S",
        rating: 5,
        date: "07 Juli 2026",
        comment: "ini keren si, buat cek link mencurigakan disini aman, soalnya klo ada link phising/semacamnya ga bakal ambil data hp kita, mantap min.",
        likes: 27
      }
    ]
  },
  {
    id: "com.savings.money",
    nama: "TabunganKu Pro",
    developer: "PitNewbie",
    kategori: "aplikasi",
    subKategori: "Keuangan & Gaya Hidup",
    icon: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&auto=format&fit=crop&q=80",
    bannerImage: heroSpaceOrbit,
    deskripsi: "TabunganKu Pro adalah aplikasi manajemen tabungan dan celengan digital impian Anda 🙌\n\nCatat dan rencanakan target belanja gadget, liburan, atau dana darurat dengan visual persentase hari, grafik progres, dan pengingat harian otomatis.\n\n✨ Fitur Unggulan:\n- Multi-target impian tanpa batas\n- Kalkulator otomatis estimasi target tercapai\n- Mode offline penuh, data tersimpan aman di perangkat\n- Ekspor ringkasan laporan ke PDF / Excel.",
    ukuran: "1,2 MB",
    driveId: "https://www.mediafire.com/file/i18rlmbqlxbc8tx/base.apk/file",
    versi: "2.4.34",
    labels: ["#offline", "#online", "#tabungan", "#usaha", "celengan", "#finance"],
    rating: 4.9,
    totalReviews: "19.8",
    downloads: "40+",
    ageRating: "Rating 3+",
    isEditorsChoice: true,
    featuredRank: 5,
    screenshots: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80"
    ],
    whatsNew: "Penambahan notifikasi keluar/masuknya tabungan, tema warna pastel yang estetik.",
    reviews: [
      {
        id: "r7",
        userName: "Hendra Wijaya",
        userAvatar: "H",
        rating: 5,
        date: "05 Agt 2026",
        comment: "Sangat membantu buat nabung beli laptop baru. Tampilannya simpel tapi fungsional banget!",
        likes: 37
      }
    ]
  }
];

export const rekomendasiLabels: string[] = [
  "#webview", "#ai", "#online", "#offline", "#tools", "#utility", "#premium", "#mod", "#pro", "#games",
  "#action", "#rpg", "#simulation", "#strategy", "#casual", "#adventure", "#puzzle", "#arcade", "#anime", "#pixelart",
  "#openworld", "#multiplayer", "#fps", "#racing", "#sports", "#horror", "#survival", "#sandbox", "#education", "#productivity",
  "#social", "#entertainment", "#photography", "#videoeditor", "#music", "#downloader", "#automation", "#finance", "#lifestyle", "#customization",
  "#launcher", "#widget", "#iconpack", "#root", "#noboot", "#lightweight", "#fast", "#secure", "#adfree", "#free"
];
