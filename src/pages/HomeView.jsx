import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  ChevronRight,
  Globe,
  Handshake,
  MapPin,
  MonitorPlay,
  Newspaper,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react';
import { THEME } from '../constants/theme';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { Reveal } from '../components/Reveal';
import { VisitorRegistrationModal } from '../components/VisitorRegistrationModal';
import fotoHero from '../assets/fotohero.jpg';
import pembicaraImage from '../assets/pembicara.png';
import beritaHijabImage from '../assets/beritahijab.png';

export const HomeView = ({ scrollY, handleNavClick, onSelectNews }) => {
  const videoSectionRef = useRef(null);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoActive(true);
        }
      },
      { threshold: 0.4 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const videoSrc = isVideoActive
    ? 'https://www.youtube.com/embed/v3cIj8TN3Uk?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1'
    : 'https://www.youtube.com/embed/v3cIj8TN3Uk?rel=0&modestbranding=1';
  const whatsappMessage = 'Halo, saya mau bergabung menjadi Mitra & Sponsor.';
  const whatsappUrl = `https://wa.me/628980797979?text=${encodeURIComponent(whatsappMessage)}`;
  const featuredArticle = {
    image:
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    badge: 'Sorotan Utama',
    title: 'Pemerintah Daerah Dukung Penuh Penyelenggaraan Jogja Halal Fest #3',
    date: '12 Agustus 2025',
    excerpt:
      'Sinergi antara pemerintah dan pelaku industri halal semakin menguat menyambut perhelatan akbar pameran industri halal terbesar di wilayah DIY dan sekitarnya.',
  };

  const articleList = [
    {
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Siaran Pers',
      title: 'Pendaftaran Eksibitor Gelombang Pertama Resmi Dibuka Mulai Hari Ini',
      date: '05 Agustus 2025',
    },
    {
      image: pembicaraImage,
      category: 'Info Acara',
      title: 'Lebih dari 20 Pembicara Internasional Akan Hadir di Forum Bisnis JHF',
      date: '28 Juli 2025',
    },
    {
      image: beritaHijabImage,
      category: 'Tren',
      title: 'Modest Fashion Diprediksi Merajai Panggung Utama Pameran Tahun Ini',
      date: '15 Juli 2025',
    },
  ];

  return (
    <div className="animate-in fade-in duration-1000">
      {/* HERO SECTION */}
      <section id="beranda" className="relative min-h-screen flex items-center pt-24 pb-20 lg:pt-32 overflow-hidden">
        <div
          className="absolute right-0 top-1/4 w-[50vw] h-[50vw] opacity-20 pointer-events-none mix-blend-screen animate-float"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <img
            src={fotoHero}
            alt="Jogja Halal Fest Hero"
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal delay={200}>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-2xl">
                  Jogja Halal
                  <span className="block">
                    Fest <span className="text-[#D4AF37] text-[0.95em]">2026</span>
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light mt-6 max-w-2xl leading-relaxed">
                  Di Mana Gaya Hidup Halal Bertemu Peluang Global. Menghubungkan bisnis, memberdayakan UMKM, dan merayakan ekosistem halal.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-7 flex w-full sm:w-auto flex-row items-center justify-between gap-4 sm:gap-6 border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md rounded-xl px-4 sm:px-5 py-3 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tanggal</p>
                      <p className="font-semibold text-sm md:text-base text-white">10–13 September 2026</p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Lokasi</p>
                      <p className="font-semibold text-sm md:text-base text-white">Jogja Expo Center</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={500}>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <a
                    className="w-full sm:w-auto px-6 py-3 rounded-sm font-bold text-sm sm:text-base text-black bg-[#D4AF37] transition-all duration-300 hover:bg-[#E8CA58] hover:-translate-y-1 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sponsorship & Collaboration <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    className="w-full sm:w-auto px-6 py-3 rounded-sm font-semibold text-sm sm:text-base text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2"
                    onClick={() => setIsVisitorModalOpen(true)}
                  >
                    Jadi Visitor <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            </div>
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* TRUST & STATISTIK */}
      <section className="relative z-20 py-20" style={{ backgroundColor: THEME.bgSecondary }}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-white/10">
            {[
              { number: '50.000+', label: 'Target Pengunjung', icon: <Users /> },
              { number: '21', label: 'Sektor Industri', icon: <Briefcase /> },
              { number: '4', label: 'Hari Acara', icon: <Calendar /> },
              { number: '10+', label: 'Perwakilan Negara', icon: <Globe /> },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 150} className="text-center px-4 group">
                <div className="text-[#D4AF37] flex justify-center mb-6 opacity-80 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500">
                  {React.cloneElement(stat.icon, {
                    className: 'w-10 h-10 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]',
                  })}
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-[#D4AF37] transition-all duration-300">
                  {stat.number}
                </h3>
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TENTANG / NILAI PROPOSISI */}
      <section id="tentang" className="py-28 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div className="relative group">
                <div className="aspect-[4/5] rounded-sm overflow-hidden relative border border-white/5 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Jaringan Bisnis Acara"
                    className="object-cover w-full h-full opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent"></div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="left" delay={200}>
              <div>
                <h2 className="text-sm font-extrabold tracking-widest uppercase text-[#D4AF37] mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#D4AF37]"></span> Tentang Acara
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Mendorong Ekonomi <br /> Halal Global ke Depan
                </h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
                  Jogja Halal Fest lebih dari sekadar pameran. Ini adalah ekosistem komprehensif yang dirancang untuk
                  mengangkat gaya hidup halal, mendorong inovasi industri, dan membuka peluang global bagi bisnis lokal
                  dan internasional.
                </p>
                <div className="space-y-8 mt-10">
                  {[
                    {
                      title: 'Keunggulan Gaya Hidup Halal',
                      desc: 'Pengalaman terkurasi di bidang mode, makanan, keuangan, dan pariwisata.',
                    },
                    {
                      title: 'Integrasi Industri',
                      desc: 'Menjembatani kesenjangan antara UMKM, merek nasional, dan investor global.',
                    },
                    {
                      title: 'Peluang Global Terbuka',
                      desc: 'Membuka jalur ekspor dan pencocokan bisnis internasional (Business Matching).',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 group cursor-default">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0 shadow-lg">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EKOSISTEM HALAL GLOBAL */}
      <section className="py-28 relative border-y border-white/5" style={{ backgroundColor: THEME.bgCard }}>
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-sm font-extrabold tracking-widest uppercase text-[#D4AF37] mb-4">Pembeda Utama</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Ekosistem Global yang Kuat</h3>
              <p className="text-gray-400 text-lg font-light">
                Kami tidak sekadar menyediakan stan; kami memfasilitasi pertumbuhan, investasi, dan kemitraan tingkat
                internasional.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Peluang Ekspor', icon: <Globe />, desc: 'Akses langsung ke pembeli internasional dan konsultasi ekspor.' },
              {
                title: 'Business Matching',
                icon: <Handshake />,
                desc: 'Pertemuan B2B terjadwal dengan pemangku kepentingan yang ditargetkan.',
              },
              { title: 'Forum Investasi', icon: <TrendingUp />, desc: 'Sesi presentasi (pitching) yang menghubungkan startup dengan investor.' },
              { title: 'Jaringan Global', icon: <Users />, desc: 'Lounge eksklusif dan acara untuk pembangunan jaringan tingkat tinggi.' },
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 150} className="group cursor-pointer">
                <div className="h-full bg-[#030305]/80 backdrop-blur-md border border-white/5 p-10 hover:border-[#D4AF37] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden rounded-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-8 relative z-10 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                    {React.cloneElement(feature.icon, { className: 'w-8 h-8' })}
                  </div>
                  <h4 className="text-xl font-bold mb-4 relative z-10">{feature.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10 font-light">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO / EXPERIENCE SECTION */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden" ref={videoSectionRef}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Keramaian Acara"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity hover:scale-105 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/70 to-[#030305]"></div>
        </div>

        <div className="relative z-10 w-full text-center px-0">
          <Reveal>
            <div className="px-6 mb-8">
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl">
                Rasakan Pengalamannya
              </h2>
            </div>
            <div className="mx-auto mb-8 w-full">
              <div className="relative aspect-[21/9] w-full overflow-hidden border-y border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                <iframe
                  className="h-full w-full"
                  src={videoSrc}
                  title="Cuplikan Jogja Halal Fest #2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030305] via-[#030305]/70 to-transparent blur-[2px]"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030305] via-[#030305]/70 to-transparent blur-[2px]"></div>
              </div>
            </div>
            <div className="px-6">
              <p className="text-xl md:text-2xl text-[#D4AF37] font-semibold tracking-widest uppercase">
                Tonton Cuplikan dari JHF #2
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOROTAN ACARA */}
      <section id="acara" className="py-28 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-8">
              <div>
                <h2 className="text-sm font-extrabold tracking-widest uppercase text-[#D4AF37] mb-4">Apa yang Diharapkan</h2>
                <h3 className="text-4xl md:text-5xl font-bold">Sorotan Acara</h3>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Pameran & Eksibisi',
                img: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                icon: <Store />,
              },
              {
                title: 'Business Matching',
                img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                icon: <Handshake />,
              },
              {
                title: 'Talkshow & Seminar',
                img: pembicaraImage,
                icon: <MonitorPlay />,
              },
              {
                title: 'Modest Fashion Show',
                img: beritaHijabImage,
                icon: <Award />,
              },
              {
                title: 'Workshop & Kelas Mini',
                img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                icon: <Briefcase />,
              },
              {
                title: 'Bursa Kerja (Job Fair)',
                img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                icon: <Users />,
              },
            ].map((item, idx) => (
              <Reveal
                key={idx}
                delay={idx * 150}
                className="group relative h-96 overflow-hidden rounded-sm cursor-pointer border border-transparent hover:border-[#D4AF37]/50 transition-all duration-500"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-transparent transition-all duration-300">
                    {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTED CTA */}
      <section className="py-24 border-t border-white/5 relative" style={{ backgroundColor: THEME.bgSecondary }}>
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid md:grid-cols-3 gap-0 border border-white/10 rounded-sm overflow-hidden shadow-2xl">
            {[
              {
                role: 'Untuk Pengunjung',
                title: 'Rencanakan Kunjungan',
                desc: 'Dapatkan tiket Anda dan temukan ratusan merek halal terbaik.',
                btn: 'Kunjungi Acara',
                bg: 'bg-[#0A0A0F]/80 backdrop-blur-xl',
              },
              {
                role: 'Untuk Eksibitor',
                title: 'Pamerkan Merek Anda',
                desc: 'Jangkau 50.000+ calon pembeli dan temukan mitra bisnis global.',
                btn: 'Pesan Booth',
                bg: 'bg-gradient-to-br from-[#D4AF37] to-[#B8962E]',
                textMain: 'text-black',
                textSub: 'text-black/80',
              },
              {
                role: 'Untuk Sponsor',
                title: 'Maksimalkan Eksposur',
                desc: 'Sejajarkan merek Anda dengan platform halal terbesar di wilayah ini.',
                btn: 'Jadi Sponsor',
                bg: 'bg-[#0A0A0F]/80 backdrop-blur-xl',
              },
            ].map((cta, idx) => (
              <div
                key={idx}
                className={`${cta.bg} p-12 relative group flex flex-col items-center text-center transition-all duration-500 hover:z-10 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:scale-[1.02]`}
              >
                <h4 className={`text-sm font-extrabold tracking-widest uppercase mb-4 ${cta.textMain || 'text-[#D4AF37]'}`}>
                  {cta.role}
                </h4>
                <h3 className={`text-3xl font-bold mb-4 ${cta.textMain || 'text-white'}`}>{cta.title}</h3>
                <p className={`mb-10 text-base leading-relaxed ${cta.textSub || 'text-gray-400 font-light'}`}>{cta.desc}</p>
                <button
                  className={`mt-auto px-8 py-4 rounded-sm font-bold w-full max-w-[200px] transition-all duration-300 ${
                    cta.bg.includes('#D4AF37')
                      ? 'bg-black text-white hover:bg-gray-900 hover:shadow-xl'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black hover:border-transparent'
                  }`}
                  onClick={() => {
                    if (cta.role === 'Untuk Pengunjung') {
                      setIsVisitorModalOpen(true);
                    }
                  }}
                >
                  {cta.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI / SOCIAL PROOF */}
      <section className="py-28 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-sm font-extrabold tracking-widest uppercase text-[#D4AF37] mb-4">Ulasan</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Dipercaya oleh Ekosistem</h3>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Sesi business matching di JHF membuka pintu ke pembeli internasional yang tidak pernah kami bayangkan sebelumnya.',
                name: 'Ahmad Fauzi',
                role: 'CEO, Halal Foods Co.',
              },
              {
                quote: 'Organisasi yang luar biasa. Estetika, keramaian, dan kualitas eksibitor menjadikannya acara tingkat premium.',
                name: 'Sarah L.',
                role: 'Investor Global',
              },
              {
                quote: 'Stan kami kebanjiran pengunjung. ROI dari acara 4 hari ini melampaui seluruh upaya pemasaran kuartal pertama kami.',
                name: 'Budi Santoso',
                role: 'Pendiri, Modest Wear ID',
              },
            ].map((testimonial, idx) => (
              <Reveal
                key={idx}
                delay={idx * 150}
                className="bg-[#0A0A0F] p-10 border border-white/5 hover:border-[#D4AF37]/50 hover:-translate-y-2 transition-all duration-500 rounded-sm relative"
              >
                <div className="absolute top-0 right-10 text-[#D4AF37]/10 transform -translate-y-1/2">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-lg mb-10 italic leading-relaxed font-light relative z-10">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide mt-1">{testimonial.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA TERKINI (HOMEPAGE LAYOUT) */}
      <section id="berita" className="py-28 relative border-t border-white/5" style={{ backgroundColor: THEME.bgSecondary }}>
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Newspaper className="w-5 h-5 text-[#D4AF37]" />
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Pusat Media</h2>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Berita & Pembaruan Terkini</h3>
              </div>
              <button
                onClick={(e) => handleNavClick(e, 'Berita')}
                className="px-6 py-3 rounded-sm font-semibold text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center gap-2 group"
              >
                Lihat Semua Berita <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7 h-full">
              <Reveal delay={100} className="h-full">
                <div
                  className="relative h-[450px] lg:h-[520px] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl border border-white/5"
                  onClick={() => onSelectNews?.(featuredArticle)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectNews?.(featuredArticle);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={featuredArticle.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={featuredArticle.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10">
                    <span className="inline-block px-4 py-1.5 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest mb-5 rounded-sm shadow-md">
                      {featuredArticle.badge}
                    </span>
                    <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-4 group-hover:text-[#D4AF37] transition-colors leading-tight tracking-tight">
                      {featuredArticle.title}
                    </h4>
                    <div className="text-gray-300 text-sm mb-4 flex items-center gap-2 font-medium">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" /> {featuredArticle.date}
                    </div>
                    <p className="text-gray-400 font-light leading-relaxed line-clamp-2 md:line-clamp-3">{featuredArticle.excerpt}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {articleList.map((article, idx) => (
                <Reveal key={idx} delay={200 + idx * 100} className="h-full">
                  <div
                    className="flex gap-5 group cursor-pointer items-center bg-[#111116] p-5 rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all duration-300 h-full"
                    onClick={() => onSelectNews?.(article)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectNews?.(article);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 border border-white/5 relative">
                      <img
                        src={article.image}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={article.title}
                      />
                    </div>
                    <div className="flex flex-col justify-center py-1">
                      <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">{article.category}</span>
                      <h4 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <span className="text-gray-500 text-xs flex items-center gap-1.5 font-medium mt-auto">
                        <Calendar className="w-3.5 h-3.5" /> {article.date}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPONSOR & MITRA (ADAPTASI REFERENSI GAMBAR) */}
      <section id="sponsor" className="py-28 relative" style={{ backgroundColor: THEME.bgCard }}>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <Reveal>
            <div className="mb-20">
              <h2 className="text-sm font-extrabold tracking-widest uppercase text-[#D4AF37] mb-4">Mendukung Ekosistem</h2>
              <h3 className="text-4xl font-bold text-white">Mitra & Kolaborator Kami</h3>
            </div>
          </Reveal>

          {/* Baris 1: Penyelenggara & Bekerja Sama */}
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 mb-16">
              <div className="flex flex-col items-center">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Diselenggarakan Oleh</h4>
                <div className="flex gap-6">
                  <div className="h-20 w-40 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer group">
                    <span className="text-white/40 font-bold group-hover:text-white transition-colors">LOGO KNEKS</span>
                  </div>
                  <div className="h-20 w-40 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer group">
                    <span className="text-white/40 font-bold group-hover:text-white transition-colors">LOGO PEMDA</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Bekerja Sama Dengan</h4>
                <div className="flex gap-6">
                  <div className="h-20 w-40 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer group">
                    <span className="text-white/40 font-bold group-hover:text-white transition-colors">LOGO BPJPH</span>
                  </div>
                  <div className="h-20 w-40 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer group">
                    <span className="text-white/40 font-bold group-hover:text-white transition-colors">LOGO MUI</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Baris 2: Pengelola & Penghargaan */}
          <Reveal delay={200}>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 mb-16">
              <div className="flex flex-col items-center">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Dikelola Oleh</h4>
                <div className="h-20 w-40 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer group">
                  <span className="text-white/40 font-bold group-hover:text-white transition-colors">LOGO ORGANIZER</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Pemenang Dari</h4>
                <div className="h-20 w-40 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer group">
                  <span className="text-white/40 font-bold group-hover:text-white transition-colors">AWARDS LOGO</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Baris 3: Dukungan */}
          <Reveal delay={300}>
            <div className="flex flex-col items-center">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Didukung Oleh</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-16 w-32 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <span className="text-white/30 text-sm font-bold group-hover:text-white transition-colors">SPONSOR {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA AKHIR (KONVERSI KUAT) */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#D4AF37]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] mix-blend-multiply opacity-30 object-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#D4AF37]/20 to-[#030305]"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl">
              Bergabunglah dengan Ekosistem Halal Terbesar
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-14 font-medium drop-shadow-md">
              Amankan tempat Anda sebelum kehabisan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                className="w-full sm:w-auto px-10 py-5 rounded-sm font-bold text-black bg-white hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] text-lg"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Bergabung Jadi Mitra & Sponsor
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <VisitorRegistrationModal open={isVisitorModalOpen} onClose={() => setIsVisitorModalOpen(false)} />
    </div>
  );
};
