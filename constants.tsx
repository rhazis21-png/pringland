import { Product, Testimonial } from './types';
import { Sprout, Briefcase, Coins, ShieldCheck, TrendingUp, Sun, Droplets, MapPin, Home, Mountain, GraduationCap } from 'lucide-react';

export const HERO_COPY = {
  headline: "Persiapkan Masa Pensiun Tenang dengan Aset Produktif.",
  subHeadline: "Miliki aset tanah SHM dan peternakan yang dikelola profesional. Nikmati bagi hasil rutin bulanan tanpa repot mengurus operasional, sebagai warisan terbaik untuk keluarga.",
  cta: "Lihat Program Pensiun"
};

export const PROBLEM_SOLUTION = {
  headline: "Investasi Aman & Nyata Untuk Masa Depan.",
  body: "Pring Land (by PT. Lumbung Pangan Mataram) bukan sekadar menjual tanah. Kami membangun ekosistem di mana Anda memiliki aset fisik (Tanah Sertifikat Hak Milik) yang terus menghasilkan. Ini adalah solusi bagi Anda yang ingin dana pensiun aman dari inflasi, tanpa harus capek bekerja di hari tua.",
  coreValues: [
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      title: "Legalitas SHM Aman",
      desc: "Aset tanah 100% atas nama Anda (Sertifikat Hak Milik). Transaksi transparan di hadapan Notaris (PPJB & SKPU)."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-brand-primary" />,
      title: "Manajemen Profesional",
      desc: "Anda terima beres. Seluruh operasional kandang dan kebun dikelola ahli. Laporan dikirim rutin ke WhatsApp Anda."
    },
    {
      icon: <Coins className="w-8 h-8 text-brand-primary" />,
      title: "Warisan Produktif",
      desc: "Aset properti yang nilainya naik terus, ditambah hasil panen rutin yang bisa diwariskan ke anak cucu."
    }
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: 'jogja',
    title: "Pring Land Jogja",
    subtitle: "Regional Hub (Turi & Patuk)",
    location: "Sleman & Gunungkidul",
    focus: "Villa Ternak & Wisata",
    priceStart: "Mulai Rp 79 Juta",
    targetAudience: "Persiapan Pensiun",
    image: "https://picsum.photos/id/124/800/600",
    colorTheme: 'jogja'
  },
  {
    id: 'bogor',
    title: "Pring Land Bogor",
    subtitle: "Sentra Ternak Terpadu",
    location: "Leuwiliang, Bogor",
    focus: "Supply Jabodetabek",
    priceStart: "Hubungi Marketing",
    targetAudience: "Investasi Jarak Dekat",
    image: "https://picsum.photos/id/142/800/600",
    colorTheme: 'bogor'
  },
  {
    id: 'borneo',
    title: "Pring Land Borneo",
    subtitle: "Food Estate IKN",
    location: "Tanjung Selor, Kaltara",
    focus: "Aset Jangka Panjang",
    priceStart: "Promo Rp 25 Juta",
    targetAudience: "Tabungan Masa Depan",
    image: "https://picsum.photos/id/292/800/600",
    colorTheme: 'borneo'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bpk. Hartono (58 Th)",
    role: "Pensiunan BUMN",
    quote: "Saya cari kesibukan positif tapi tidak mau capek fisik. Pring Land solusinya, legalitas SHM sudah saya cek di Notaris aman."
  },
  {
    name: "Ibu Sarah (52 Th)",
    role: "Wiraswasta",
    quote: "Lokasi Bogor dekat dari rumah. Saya bisa ajak cucu lihat peternakan. Passive income-nya lumayan buat tambah belanja dapur."
  },
  {
    name: "Bpk. Wijaya (60 Th)",
    role: "Pensiunan Guru",
    quote: "Daripada uang pensiun habis tidak jelas, saya belikan tanah di Borneo untuk warisan anak bungsu saya nanti."
  }
];

export const CORPORATE_ADDRESSES = {
  hq: "Jl. Paingan VII, Krodan, Maguwoharjo, Depok, Sleman, Yogyakarta.",
  branch: "Panin Tower, Jl. Jenderal Sudirman, Balikpapan."
};