import React from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { Reveal } from '../components/Reveal';

export const ContactView = () => {
  return (
    <div className="animate-in fade-in duration-1000 bg-[#0A0A0F] pt-32 pb-24 min-h-screen relative overflow-hidden">
      <BackgroundPattern />

      {/* Efek Lingkaran Blur Latar Belakang */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Halaman Kontak */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              Hubungi Kami
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Kami siap membantu Anda terhubung dengan ekosistem halal terbesar di Yogyakarta. Jangan ragu untuk meninggalkan pesan.
            </p>
          </div>
        </Reveal>

        {/* Grid Kartu Informasi (4 Kolom) - Glassmorphism */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { icon: <Phone />, title: 'No Telepon', sub: 'Layanan Pelanggan', info: '+62 898-0797-979' },
            { icon: <Mail />, title: 'Email', sub: 'Pertanyaan Umum', info: 'info@jogjahalalfest.com' },
            { icon: <MessageCircle />, title: 'WhatsApp', sub: 'Pesan Instan', info: '+62 898-0797-979' },
            { icon: <MapPin />, title: 'Alamat Lokasi', sub: 'Pusat Pameran', info: 'Jogja Expo Center (JEC)' },
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 150} className="group">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] h-full">
                <div className="w-16 h-16 rounded-full bg-[#111116] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                  {React.cloneElement(item.icon, { className: 'w-7 h-7' })}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-4">{item.sub}</p>
                <p className="text-[#D4AF37] font-semibold mt-auto">{item.info}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Layout Dua Kolom (Area Utama: Form vs Peta) */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Kolom Kiri: Formulir Kontak */}
          <Reveal delay={200}>
            <div className="bg-[#111116] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
              {/* Efek Hover Garis Atas */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-3">Kirim Pesan</h2>
                <p className="text-gray-400 font-light text-sm">Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda kembali.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Tulis Nama Anda"
                      className="w-full bg-[#030305] text-white px-5 py-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Alamat Email"
                      className="w-full bg-[#030305] text-white px-5 py-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="No. WhatsApp"
                      className="w-full bg-[#030305] text-white px-5 py-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Isi Pesan/Saran"
                      rows="5"
                      className="w-full bg-[#030305] text-white px-5 py-4 rounded-xl outline-none border border-transparent focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder-gray-600 resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#D4AF37] to-[#E8CA58] hover:to-[#FFF0B3] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 mt-4 text-lg"
                >
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </Reveal>

          {/* Kolom Kanan: Peta & Jam Operasional */}
          <Reveal delay={400}>
            <div className="flex flex-col gap-6">
              {/* Box Peta (Google Maps Embed) */}
              <div className="w-full h-[350px] md:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                {/* Overlay saat hover agar peta tidak terlalu mati warnanya */}
                <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-10"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.883736733276!2d110.40118817454984!3d-7.802161779607865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57662c161ab3%3A0xc54ffb40d58852e1!2sJogja%20Expo%20Center!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.1) brightness(0.9)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              {/* Kartu Jam Operasional */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-6 hover:border-[#D4AF37]/40 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-[#111116] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Jam Operasional Tim JHF</h4>
                  <p className="text-gray-400 text-sm">
                    Senin - Jumat: <span className="text-white font-semibold">08:00 - 16:00 WIB</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">*(Sabtu, Minggu & Hari Libur Nasional: Tutup)</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
