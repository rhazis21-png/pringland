import { Product, Testimonial } from './types';
import { Sprout, Briefcase, Coins, ShieldCheck, TrendingUp, Sun, Droplets, MapPin, Home, Mountain, GraduationCap } from 'lucide-react';

export const HERO_COPY = {
  headline: "Mewujudkan Kedaulatan Pangan Melalui Integrasi Properti Produktif.",
  subHeadline: "PT. Lumbung Pangan Mataram hadir sebagai pelopor ekosistem agribisnis modern. Kami mengubah lahan tidur menjadi aset produktif bernilai tinggi bagi investor dan ketahanan pangan nasional.",
  cta: "Pelajari Visi Kami"
};

export const PROBLEM_SOLUTION = {
  headline: "Lebih Dari Sekadar Developer Properti.",
  body: "Pring Land (by PT. Lumbung Pangan Mataram) bukan hanya menjual tanah kavling. Kami membangun sebuah Ekosistem Pertanian & Peternakan Terpadu. Berangkat dari visi besar pemerintah dalam peningkatan ketahanan pangan nasional, kami menawarkan solusi investasi di mana Anda memiliki aset fisik (Tanah SHM) sekaligus menjadi bagian dari rantai pasok pangan Indonesia.",
  coreValues: [
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      title: "Legalitas & Keamanan Aset",
      desc: "Kepemilikan tanah dijamin dengan SHM dan proses transaksi transparan melalui Notaris (PPJB & SKPU)."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-brand-primary" />,
      title: "Manajemen Profesional",
      desc: "Investor tidak perlu repot. Operasional dikelola penuh oleh tenaga ahli peternakan dan pertanian."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-brand-primary" />,
      title: "Integrasi Edukasi & Wisata",
      desc: "Kawasan dirancang dengan konsep Agrowisata, meningkatkan nilai aset tanah (Capital Gain)."
    }
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: 'jogja',
    title: "Pring Land Jogja",
    subtitle: "Regional Hub (Turi & Patuk)",
    location: "Sleman & Gunungkidul",
    focus: "Villa Ternak Premium & Wisata",
    priceStart: "Mulai Rp 79 Juta",
    targetAudience: "Investor Menengah, Pensiunan",
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
    targetAudience: "Investor Jabodetabek",
    image: "https://picsum.photos/id/142/800/600",
    colorTheme: 'bogor'
  },
  {
    id: 'borneo',
    title: "Pring Land Borneo",
    subtitle: "Food Estate IKN",
    location: "Tanjung Selor, Kaltara",
    focus: "Growth & Capital Gain",
    priceStart: "Promo Rp 25 Juta",
    targetAudience: "Visioner IKN, Pemula",
    image: "https://picsum.photos/id/292/800/600",
    colorTheme: 'borneo'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bpk. Hartono",
    role: "Investor Jogja",
    quote: "Tempatnya bersih, tidak bau. Saya ambil 2 unit di Jogja karena konsep Villa-nya bagus untuk masa pensiun saya."
  },
  {
    name: "Ibu Sarah",
    role: "Investor Bogor",
    quote: "Dekat dari Jakarta, jadi saya bisa survei kapan saja. Legalitas SHM bikin tenang."
  },
  {
    name: "Aditya",
    role: "Investor Borneo",
    quote: "Investasi 25 juta di Borneo buat tabungan anak. Daripada uang habis konsumtif, mending jadi tanah di penyangga IKN."
  }
];

export const CORPORATE_ADDRESSES = {
  hq: "Jl. Paingan VII, Krodan, Maguwoharjo, Depok, Sleman, Yogyakarta.",
  branch: "Panin Tower, Jl. Jenderal Sudirman, Balikpapan."
};