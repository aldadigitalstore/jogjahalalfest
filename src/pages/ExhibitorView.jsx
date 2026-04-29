import React from 'react';
import { ChevronRight, CheckCircle2, Globe, Handshake, Megaphone, Sparkles, Users } from 'lucide-react';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { Reveal } from '../components/Reveal';

export const ExhibitorView = () => (
  <div className="animate-in fade-in duration-1000 bg-[#121212]">
    {/* HERO EKSIBITOR */}
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden border-b border-white/5">
      <BackgroundPattern />
      <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
        <Reveal delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF0B3] to-[#D4AF37] animate-gradient-x drop-shadow-2xl mx-auto max-w-5xl">
            Percepat Pertumbuhan Bisnis Anda di Pusat Ekosistem Halal Global.
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Jadilah bagian dari pameran halal terbesar di Yogyakarta. Temukan mitra strategis, capai ribuan pembeli
            langsung, dan perluas eksposur merek Anda ke kancah internasional.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <button className="px-10 py-5 rounded-sm font-bold text-black bg-[#D4AF37] transition-all duration-500 hover:bg-[#E8CA58] hover:-translate-y-2 hover:scale-105 flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] group text-lg">
            Amankan Booth Saya Sekarang
            <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </Reveal>
      </div>
    </section>

    {/* GRID MENGAPA MEMBUKA BOOTH */}
    <section className="py-32 relative z-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Keuntungan Menjadi Bagian dari Kami</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Mengapa Anda Harus Membuka Booth</h3>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              num: '01',
              title: 'Akses Pasar Langsung',
              icon: <Users />,
              desc: 'Bertatap muka langsung dengan lebih dari 50.000+ konsumen yang sangat tertarget dan para pengambil keputusan B2B.',
            },
            {
              num: '02',
              title: 'Peluang Global',
              icon: <Globe />,
              desc: 'Perluas jangkauan Anda melewati batas negara. Berinteraksi dengan perwakilan dagang dan investor dari 10+ negara.',
            },
            {
              num: '03',
              title: 'Eksposur Merek Maksimal',
              icon: <Megaphone />,
              desc: 'Tingkatkan kredibilitas merek Anda di bawah sorotan media nasional, kampanye digital masif, dan panggung utama.',
            },
            {
              num: '04',
              title: 'Business Matching',
              icon: <Handshake />,
              desc: 'Nikmati fasilitas pertemuan bisnis eksklusif yang dijadwalkan secara khusus untuk menghubungkan Anda dengan investor.',
            },
          ].map((card, idx) => (
            <Reveal key={idx} delay={idx * 150} className="group cursor-pointer">
              <div
                className="relative h-full bg-[#1E1E1E] border border-white/5 p-10 lg:p-12 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-[#D4AF37]/50 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] animate-float"
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -top-6 -right-4 text-[8rem] font-black tracking-tighter text-[#D4AF37]/5 group-hover:text-[#D4AF37]/15 transition-all duration-700 pointer-events-none group-hover:scale-110">
                  {card.num}
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-center text-[#D4AF37] mb-8 group-hover:bg-[#D4AF37] group-hover:text-black transition-all shadow-lg">
                    {React.cloneElement(card.icon, { className: 'w-8 h-8' })}
                  </div>
                  <h4 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-4 text-white group-hover:text-[#D4AF37] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-gray-400 font-light mt-auto group-hover:text-gray-300 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* PROFIL KEPESERTAAN */}
    <section className="py-32 relative border-t border-white/5 bg-[#121212]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative z-10">
            <Reveal direction="right">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Profil Kepesertaan</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                Siapa yang <br />Harus Bergabung?
              </h3>
              <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
                Jogja Halal Fest merangkul seluruh spektrum industri halal. Baik Anda merintis UMKM inovatif maupun memimpin
                merek berskala nasional.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {[
              'Makanan & Minuman Halal',
              'Modest Fashion & Tekstil',
              'Kosmetik & Perawatan',
              'Keuangan Syariah',
              'Pariwisata Halal',
              'Pendidikan Islam',
              'Logistik Halal',
              'Kesehatan & Farmasi',
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="left">
                <div className="flex items-center gap-4 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-[#D4AF37]/30 group cursor-default shadow-sm hover:shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  </div>
                  <span className="text-base font-semibold text-gray-200 group-hover:text-white">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);
