import { ArrowRight, Calendar } from 'lucide-react';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { Reveal } from '../components/Reveal';
import { THEME } from '../constants/theme';
import pembicaraImage from '../assets/pembicara.png';
import beritaHijabImage from '../assets/beritahijab.png';

export const NewsView = ({ onSelectNews }) => {
  const homeNews = [
    {
      image:
        'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Sorotan',
      title: 'Pemerintah Daerah Dukung Penuh Penyelenggaraan Jogja Halal Fest #3',
      date: '12 Ags 2025',
    },
    {
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Siaran Pers',
      title: 'Pendaftaran Eksibitor Gelombang Pertama Resmi Dibuka',
      date: '05 Ags 2025',
    },
    {
      image: pembicaraImage,
      category: 'Info Acara',
      title: '20+ Pembicara Internasional Akan Hadir di Forum Bisnis JHF',
      date: '28 Jul 2025',
    },
    {
      image: beritaHijabImage,
      category: 'Tren',
      title: 'Modest Fashion Diprediksi Merajai Panggung Utama',
      date: '15 Jul 2025',
    },
  ];

  return (
    <div className="animate-in fade-in duration-1000 bg-[#0A0A0F] pt-32 pb-24 min-h-screen">
      <section className="py-28 relative border-t border-white/5" style={{ backgroundColor: THEME.bgSecondary }}>
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-sm font-extrabold tracking-widest uppercase text-[#D4AF37] mb-4">Pusat Media</h2>
                <h3 className="text-4xl md:text-5xl font-bold">Berita & Pembaruan</h3>
              </div>
              <button className="text-[#D4AF37] flex items-center gap-2 font-bold hover:text-white transition-colors uppercase tracking-wider text-sm group">
                Lihat Semua Berita <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {homeNews.map((news, idx) => (
              <Reveal key={idx} delay={idx * 150} className="group cursor-pointer h-full">
                <div
                  className="bg-[#111116] border border-white/5 hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] h-full flex flex-col"
                  onClick={() => onSelectNews?.(news)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectNews?.(news);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="w-full h-56 overflow-hidden relative">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">{news.category}</span>
                    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {news.title}
                    </h4>
                    <span className="text-gray-500 text-xs flex items-center gap-1.5 font-medium mt-auto">
                      <Calendar className="w-3.5 h-3.5" /> {news.date}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
