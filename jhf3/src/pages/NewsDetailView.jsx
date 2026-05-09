import { ArrowRight, Calendar } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { Reveal } from '../components/Reveal';
import { THEME } from '../constants/theme';
import facebookIcon from '../assets/facebook.png';
import linkedinIcon from '../assets/linkedin.png';
import telegramIcon from '../assets/telegram.png';
import waIcon from '../assets/wa.png';
import xIcon from '../assets/x.png';

const fallbackArticle = {
  image:
    'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  category: 'Sorotan',
  title: 'Pemerintah Daerah Dukung Penuh Penyelenggaraan Jogja Halal Fest #3',
  date: '12 Ags 2025',
};

const fallbackImage =
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

const getImage = (item) => item?.image_url || item?.image || fallbackImage;

export const NewsDetailView = ({ article, onBack, onSelectNews, pageUrl, relatedNews = [] }) => {
  const activeArticle = article || fallbackArticle;
  const activeImage = getImage(activeArticle);
  const metaTitle = `${activeArticle.title} | Jogja Halal Fest 2026`;
  const contentFallback = [
    'Jogja Halal Fest #3 kembali hadir membawa kolaborasi strategis lintas sektor untuk memperkuat ekosistem industri halal di Indonesia.',
    'Melalui rangkaian program business matching, showcase produk, serta forum investasi, JHF #3 membuka peluang baru bagi UMKM dan pelaku usaha.',
    'Acara ini akan berlangsung selama empat hari di Jogja Expo Center. Selain pameran, pengunjung juga dapat menikmati talkshow, workshop, dan pertunjukan modest fashion.',
    'Panitia mengundang seluruh pemangku kepentingan untuk berpartisipasi dan mengambil peran aktif sebagai mitra atau sponsor guna memperluas dampak ekonomi halal.',
  ];
  const rawContent = activeArticle.content || '';
  const hasHtmlContent = /<\/?[a-z][\s\S]*>/i.test(rawContent);
  const sanitizedHtml = hasHtmlContent ? DOMPurify.sanitize(rawContent) : '';
  const contentBlocks = rawContent
    ? rawContent.split(/\n+/).filter(Boolean)
    : contentFallback;
  const plainTextContent = rawContent
    ? rawContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : contentBlocks[0] || 'Berita terbaru Jogja Halal Fest 2026.';
  const metaDescriptionSource = plainTextContent || 'Berita terbaru Jogja Halal Fest 2026.';
  const metaDescription = metaDescriptionSource.length > 160
    ? `${metaDescriptionSource.slice(0, 157).trim()}...`
    : metaDescriptionSource;
  const metaImage = activeImage || 'https://jogjahalalfest.com/logojhf-3.png';
  const canonicalUrl = pageUrl || 'https://jogjahalalfest.com/berita';
  const disableReveal = true;
  const shareUrl =
    pageUrl || (typeof window !== 'undefined' ? window.location.href : 'https://jogjahalalfest.com/berita');
  const shareTitle = activeArticle.title || 'Berita Jogja Halal Fest 2026';
  const shareText = `${shareTitle} - Jogja Halal Fest 2026`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const shareLinks = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`, iconSrc: waIcon },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, iconSrc: facebookIcon },
    { name: 'X', href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, iconSrc: xIcon },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, iconSrc: linkedinIcon },
    { name: 'Telegram', href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, iconSrc: telegramIcon },
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Jogja Halal Fest" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
      <div className="animate-in fade-in duration-1000 bg-[#0A0A0F] pt-28 pb-24 min-h-screen">
      <section className="py-16 md:py-20 relative border-t border-white/5" style={{ backgroundColor: THEME.bgSecondary }}>
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <Reveal disable={disableReveal}>
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
              <Reveal delay={150} disable={disableReveal}>
                <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img
                    src={activeImage}
                    alt={activeArticle.title}
                    className="w-full h-[260px] sm:h-[360px] lg:h-[420px] object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={250} disable={disableReveal}>
                {hasHtmlContent ? (
                  <div
                    className="mt-10 space-y-6 text-gray-300 leading-relaxed text-base news-content"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                  />
                ) : (
                  <div className="mt-10 space-y-6 text-gray-300 leading-relaxed text-base">
                    {contentBlocks.map((paragraph, index) => (
                      <p key={`${activeArticle.title}-content-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </Reveal>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold text-gray-300 mb-4">Bagikan ini:</p>
                <div className="flex flex-wrap gap-3">
                  {shareLinks.map(({ name, href, iconSrc }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Bagikan ke ${name}`}
                      className="px-4 py-2 rounded-full text-sm font-semibold border border-white/10 bg-white/5 text-gray-200 hover:text-black hover:bg-[#D4AF37] hover:border-transparent transition-colors inline-flex items-center gap-2"
                    >
                      <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                        <img src={iconSrc} alt="" className="w-7 h-7" loading="lazy" />
                      </span>
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={200} disable={disableReveal}>
                <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 lg:sticky lg:top-28">
                  <h3 className="text-lg font-bold text-white mb-6">Berita Lainnya</h3>
                  {relatedNews.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada berita lain.</p>
                  ) : (
                    <div className="space-y-6">
                      {relatedNews.map((news) => (
                        <button
                          key={news.id ?? news.title}
                          onClick={() => onSelectNews?.(news)}
                          className="w-full text-left group"
                        >
                          <div className="flex gap-4">
                            <div className="w-20 h-20 overflow-hidden rounded-xl border border-white/5 shrink-0">
                              <img src={getImage(news)} alt={news.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              {news.category && (
                                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">{news.category}</span>
                              )}
                              <h4 className="text-white font-semibold mt-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                                {news.title}
                              </h4>
                              {news.date && (
                                <div className="text-gray-500 text-xs mt-2 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" /> {news.date}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};
