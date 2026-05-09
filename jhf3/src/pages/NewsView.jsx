import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { BackgroundPattern } from "../components/BackgroundPattern";
import { Reveal } from "../components/Reveal";
import { THEME } from "../constants/theme";

const fallbackImage =
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getImage = (item) => item?.image_url || item?.image || fallbackImage;
const stripHtml = (value) =>
  value
    ? value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : '';
const buildExcerpt = (value, maxLength = 160) => {
  const text = stripHtml(value);
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trim()}...`;
};
const parseNewsDate = (value) => {
  if (!value) return 0;
  const raw = String(value).trim();

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const [year, month, day] = raw.split('T')[0].split('-').map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  const monthMap = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    mei: 4,
    jun: 5,
    jul: 6,
    ags: 7,
    agu: 7,
    sep: 8,
    okt: 9,
    nov: 10,
    des: 11,
  };
  const parts = raw.toLowerCase().split(/\s+/);
  if (parts.length >= 3 && monthMap[parts[1]] !== undefined) {
    const day = Number(parts[0]);
    const year = Number(parts[2]);
    const month = monthMap[parts[1]];
    return new Date(year, month, day).getTime();
  }

  const parsed = Date.parse(raw);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function NewsView({ onSelectNews }) {
  const [homeNews, setHomeNews] = useState([]);
  const metaTitle = "Berita | Jogja Halal Fest 2026";
  const metaDescription =
    "Berita dan pembaruan terbaru Jogja Halal Fest 2026, termasuk agenda, kolaborasi, dan sorotan acara.";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/news")
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.value || res.data?.data || [];
        const normalized = Array.isArray(list) ? list : [];
        const sorted = [...normalized].sort((a, b) => parseNewsDate(b?.date) - parseNewsDate(a?.date));
        setHomeNews(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  const featuredNews = useMemo(() => homeNews[0] || null, [homeNews]);
  const listNews = useMemo(() => homeNews.slice(1), [homeNews]);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://jogjahalalfest.com/berita" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jogja Halal Fest" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content="https://jogjahalalfest.com/berita" />
        <meta property="og:image" content="https://jogjahalalfest.com/logojhf-3.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://jogjahalalfest.com/logojhf-3.png" />
      </Helmet>
      <div className="animate-in fade-in duration-1000 bg-[#0A0A0F] pt-28 pb-24 min-h-screen">
      <section className="py-16 md:py-20 relative border-t border-white/5" style={{ backgroundColor: THEME.bgSecondary }}>
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-6 py-3 rounded-sm font-semibold text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center gap-2 group"
              >
                Kembali ke Atas <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          {homeNews.length === 0 ? (
            <div className="text-gray-400 text-center py-16">Belum ada berita.</div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-7 h-full">
                {featuredNews && (
                  <Reveal delay={100} className="h-full">
                    <div
                      className="relative h-[450px] lg:h-[520px] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl border border-white/5"
                      onClick={() => onSelectNews?.(featuredNews)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectNews?.(featuredNews);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src={getImage(featuredNews)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt={featuredNews.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10">
                        {featuredNews.category && (
                          <span className="inline-block px-4 py-1.5 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest mb-5 rounded-sm shadow-md">
                            {featuredNews.category}
                          </span>
                        )}
                        <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-4 group-hover:text-[#D4AF37] transition-colors leading-tight tracking-tight">
                          {featuredNews.title}
                        </h4>
                        <div className="text-gray-300 text-sm mb-4 flex items-center gap-2 font-medium">
                          <Calendar className="w-4 h-4 text-[#D4AF37]" /> {formatDate(featuredNews.date)}
                        </div>
                        {featuredNews.content && (
                          <p className="text-gray-400 font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                            {buildExcerpt(featuredNews.content, 180)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                {listNews.map((item, idx) => (
                  <Reveal key={item.id ?? idx} delay={200 + idx * 100} className="h-full">
                    <div
                      className="flex gap-5 group cursor-pointer items-center bg-[#111116] p-5 rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all duration-300 h-full"
                      onClick={() => onSelectNews?.(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectNews?.(item);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 border border-white/5 relative">
                        <img
                          src={getImage(item)}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={item.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col justify-center py-1">
                        {item.category && (
                          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                        )}
                        <h4 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-gray-500 text-xs flex items-center gap-1.5 font-medium mt-auto">
                          <Calendar className="w-3.5 h-3.5" /> {formatDate(item.date)}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}