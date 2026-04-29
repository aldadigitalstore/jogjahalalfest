import { ArrowRight, Calendar } from 'lucide-react';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { Reveal } from '../components/Reveal';
import { THEME } from '../constants/theme';
import pembicaraImage from '../assets/pembicara.png';
import beritaHijabImage from '../assets/beritahijab.png';

const fallbackArticle = {
  image:
    'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  category: 'Sorotan',
  title: 'Pemerintah Daerah Dukung Penuh Penyelenggaraan Jogja Halal Fest #3',
  date: '12 Ags 2025',
};

const relatedNews = [
  {
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Pendaftaran Eksibitor Gelombang Pertama Resmi Dibuka',
    date: '05 Ags 2025',
    category: 'Siaran Pers',
  },
  {
    image: pembicaraImage,
    title: '20+ Pembicara Internasional Akan Hadir di Forum Bisnis JHF',
    date: '28 Jul 2025',
    category: 'Info Acara',
  },
  {
    image: beritaHijabImage,
    title: 'Modest Fashion Diprediksi Merajai Panggung Utama',
    date: '15 Jul 2025',
    category: 'Tren',
  },
];

export const NewsDetailView = ({ article, onBack, onSelectNews }) => {
  const activeArticle = article || fallbackArticle;

  return (
    <div className="animate-in fade-in duration-1000 bg-[#0A0A0F] pt-28 pb-24 min-h-screen">
      <section className="py-16 md:py-20 relative border-t border-white/5" style={{ backgroundColor: THEME.bgSecondary }}>
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">{activeArticle.category}</span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-4">
                  {activeArticle.title}
                </h1>
                <div className="text-gray-400 text-sm mt-4 flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" /> {activeArticle.date}
                </div>
              </div>
              <button
                onClick={onBack}
                className="text-[#D4AF37] flex items-center gap-2 font-bold hover:text-white transition-colors uppercase tracking-wider text-sm group"
              >
                Kembali ke Berita <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <Reveal delay={150}>
                <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-[260px] sm:h-[360px] lg:h-[420px] object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="mt-10 space-y-6 text-gray-300 leading-relaxed text-base">
                  <p>
                    Jogja Halal Fest #3 kembali hadir membawa kolaborasi strategis lintas sektor untuk memperkuat ekosistem
                    industri halal di Indonesia. Dukungan pemerintah daerah menjadi sinyal kuat bahwa pameran ini
                    merupakan agenda prioritas untuk pertumbuhan ekonomi halal di DIY dan sekitarnya.
                  </p>
                  <p>
                    Melalui rangkaian program business matching, showcase produk, serta forum investasi, JHF #3 membuka
                    peluang baru bagi UMKM dan pelaku usaha untuk terhubung dengan mitra nasional dan internasional.
                  </p>
                  <p>
                    Acara ini akan berlangsung selama empat hari di Jogja Expo Center. Selain pameran, pengunjung juga
                    dapat menikmati talkshow, workshop, dan pertunjukan modest fashion yang menampilkan talenta terbaik.
                  </p>
                  <p>
                    Panitia mengundang seluruh pemangku kepentingan untuk berpartisipasi dan mengambil peran aktif
                    sebagai mitra atau sponsor guna memperluas dampak ekonomi halal di Indonesia.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={200}>
                <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 lg:sticky lg:top-28">
                  <h3 className="text-lg font-bold text-white mb-6">Berita Lainnya</h3>
                  <div className="space-y-6">
                    {relatedNews.map((news) => (
                      <button
                        key={news.title}
                        onClick={() => onSelectNews?.(news)}
                        className="w-full text-left group"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 overflow-hidden rounded-xl border border-white/5 shrink-0">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">{news.category}</span>
                            <h4 className="text-white font-semibold mt-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                              {news.title}
                            </h4>
                            <div className="text-gray-500 text-xs mt-2 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" /> {news.date}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
