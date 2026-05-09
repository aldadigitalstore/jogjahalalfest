import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import { StyleInjector } from './components/StyleInjector';
import { THEME } from './constants/theme';
import { ContactView } from './pages/ContactView';
import { ExhibitorView } from './pages/ExhibitorView';
import { HomeView } from './pages/HomeView';
import { NewsDetailView } from './pages/NewsDetailView';
import NewsView from './pages/NewsView';
import logoJhf from './assets/logoprofil.png';
import emailIcon from './assets/email.png';
import instagramIcon from './assets/instagram.png';
import youtubeIcon from './assets/youtube.png';
import waIcon from './assets/wa.png';

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

const normalizeNewsList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.value)) return payload.value;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const registrationUrl = 'https://jhf3registration.netlify.app/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Beranda', 'Tentang', 'Acara', 'Eksibitor', 'Sponsor', 'Berita', 'Kontak'];

  const isHome = location.pathname === '/';
  const routeMap = {
    Eksibitor: '/eksibitor',
    Berita: '/berita',
    Kontak: '/kontak',
  };

  const slugifyTitle = (value) =>
    value
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const getNewsPath = (news) => {
    if (news?.id !== undefined && news?.id !== null) {
      return `/berita/${news.id}`;
    }
    if (news?.slug) {
      return `/berita/${news.slug}`;
    }
    const titleSlug = slugifyTitle(news?.title || 'detail');
    return `/berita/${titleSlug}`;
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (event, link) => {
    event?.preventDefault();
    const targetRoute = routeMap[link];

    if (targetRoute) {
      navigate(targetRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (!isHome) {
        navigate('/');
        setTimeout(() => scrollToSection(link.toLowerCase()), 150);
      } else {
        scrollToSection(link.toLowerCase());
      }
    }

    setIsMobileMenuOpen(false);
  };

  const handleNewsSelect = (news) => {
    navigate(getNewsPath(news), { state: { article: news } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActiveLink = (link) => {
    if (link === 'Eksibitor') return location.pathname.startsWith('/eksibitor');
    if (link === 'Berita') return location.pathname.startsWith('/berita');
    if (link === 'Kontak') return location.pathname.startsWith('/kontak');
    return isHome && link === 'Beranda';
  };

  const NewsDetailRoute = () => {
    const { newsId } = useParams();
    const routeLocation = useLocation();
    const routeNavigate = useNavigate();
    const [article, setArticle] = useState(routeLocation.state?.article || null);
    const [newsList, setNewsList] = useState(() => {
      try {
        const cached = sessionStorage.getItem('newsList');
        return cached ? JSON.parse(cached) : [];
      } catch {
        return [];
      }
    });
    const [isLoading, setIsLoading] = useState(!article && newsList.length === 0);

    useEffect(() => {
      let isActive = true;

      if (!article && newsList.length > 0 && newsId) {
        const found = newsList.find(
          (item) => String(item.id) === String(newsId) || item.slug === newsId
        );
        if (found) {
          setArticle(found);
          setIsLoading(false);
        }
      }

      const shouldShowLoading = !article && newsList.length === 0;
      if (shouldShowLoading) {
        setIsLoading(true);
      }

      axios
        .get('http://127.0.0.1:8000/api/news')
        .then((res) => {
          if (!isActive) return;
          const list = normalizeNewsList(res.data);
          setNewsList(list);
          try {
            sessionStorage.setItem('newsList', JSON.stringify(list));
          } catch {
            // ignore cache write errors
          }

          if (!article && newsId) {
            const found = list.find(
              (item) => String(item.id) === String(newsId) || item.slug === newsId
            );
            setArticle(found || null);
          }
        })
        .catch(() => {
          if (isActive) {
            if (!article) setArticle(null);
          }
        })
        .finally(() => {
          if (isActive) setIsLoading(false);
        });

      return () => {
        isActive = false;
      };
    }, [article, newsId]);

    const handleBack = () => {
      routeNavigate('/berita');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pageUrl = newsId
      ? `https://jogjahalalfest.com/berita/${newsId}`
      : 'https://jogjahalalfest.com/berita';

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-gray-300">
          Memuat berita...
        </div>
      );
    }

    if (!article) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0F] text-gray-300 px-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Berita tidak ditemukan</h1>
          <p className="text-sm mb-6">Coba kembali ke daftar berita dan pilih artikel lain.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-sm font-semibold text-black bg-[#D4AF37] hover:bg-[#E8CA58] transition-colors"
          >
            Kembali ke Berita
          </button>
        </div>
      );
    }

    const relatedNews = newsList
      .filter((item) => {
        if (!article) return true;
        if (article.id !== undefined && item.id !== undefined) {
          return String(item.id) !== String(article.id);
        }
        return item.title !== article.title;
      })
      .sort((a, b) => parseNewsDate(b?.date) - parseNewsDate(a?.date))
      .slice(0, 3);

    return (
      <NewsDetailView
        article={article}
        onBack={handleBack}
        onSelectNews={handleNewsSelect}
        pageUrl={pageUrl}
        relatedNews={relatedNews}
      />
    );
  };

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden"
      style={{ backgroundColor: THEME.bg }}
    >
      <StyleInjector />

      {/* Latar Belakang Lingkaran Emas yang mengikuti scroll (Hanya terlihat di beranda) */}
      {isHome && (
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-[0.12] blur-[150px] transition-transform duration-1000 z-0"
          style={{ backgroundColor: THEME.gold, transform: `translate(-50%, ${scrollY * 0.2}px)` }}
        ></div>
      )}

      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-3 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-6'
        } ${isMobileMenuOpen ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : ''}`}
        style={{ backgroundColor: isScrolled ? 'rgba(3,3,5,0.85)' : 'transparent' }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={(e) => handleNavClick(e, 'Beranda')}>
              <img
                src={logoJhf}
                alt="Logo"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden flex-col ml-1">
                <span className="font-bold text-lg leading-none tracking-wide text-white">JOGJA HALAL</span>
                <span className="text-xs tracking-[0.2em] font-medium" style={{ color: THEME.gold }}>
                  FEST #3
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-8 text-sm font-medium">
                {navLinks.map((link) => {
                  const isActive = isActiveLink(link);
                  const linkHref = routeMap[link] || `#${link.toLowerCase()}`;
                  return (
                    <li key={link}>
                      <a
                        href={linkHref}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`relative group transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-white'}`}
                      >
                        {link}
                        <span
                          className={`absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300 ${
                            isActive ? 'w-full bg-[#D4AF37]' : 'w-0 bg-[#D4AF37] group-hover:w-full'
                          }`}
                        ></span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                className="px-6 py-2.5 rounded-sm font-bold text-sm bg-[#D4AF37] text-black hover:-translate-y-1 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pesan Booth <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <button className="lg:hidden text-white relative z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-8 h-8 text-[#D4AF37]" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030305]/95 backdrop-blur-xl lg:hidden overflow-y-auto">
          <div className="min-h-full px-6 pt-16 pb-10 flex flex-col">
            <div className="flex items-center gap-3">
              <img src={logoJhf} alt="Logo" className="h-9 w-auto object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400 tracking-wide hidden sm:block">
                  Halal Lifestyle • Halal Industry • Global Opportunity
                </p>
              </div>
              <button
                className="text-[#D4AF37] p-2 -mr-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Tutup menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8 rounded-2xl border border-white/5 bg-white/5 divide-y divide-white/5 overflow-hidden">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link);
                const linkHref = routeMap[link] || `#${link.toLowerCase()}`;
                return (
                  <a
                    key={link}
                    href={linkHref}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`flex items-center justify-between px-5 py-4 text-base font-semibold transition-colors ${
                      isActive ? 'text-[#D4AF37] bg-white/5' : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    <span>{link}</span>
                    <ChevronRight className={`h-4 w-4 ${isActive ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
                  </a>
                );
              })}
            </div>

            <a
              className="mt-8 w-full px-6 py-4 rounded-xl font-bold text-black bg-[#D4AF37] flex items-center justify-center gap-2 hover:bg-[#E8CA58] transition-colors"
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pesan Booth <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}

      {/* RENDER KONTEN BERDASARKAN STATE */}
      <Routes>
        <Route
          path="/"
          element={<HomeView scrollY={scrollY} handleNavClick={handleNavClick} onSelectNews={handleNewsSelect} />}
        />
        <Route path="/eksibitor" element={<ExhibitorView />} />
        <Route path="/berita" element={<NewsView onSelectNews={handleNewsSelect} />} />
        <Route path="/berita/:newsId" element={<NewsDetailRoute />} />
        <Route path="/kontak" element={<ContactView />} />
      </Routes>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-24 pb-12 relative" style={{ backgroundColor: THEME.bg }}>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <img
                  src={logoJhf}
                  alt="Logo Jogja Halal Fest #3"
                  className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center gap-2">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-[#D4AF37]">
                    <span className="text-black font-bold tracking-tighter text-xl">JHF</span>
                  </div>
                  <span className="font-bold text-xl tracking-wider">JOGJA HALAL FEST</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-8">
                Di Mana Gaya Hidup Halal Bertemu Peluang Global. Destinasi utama bagi para pemimpin industri, UMKM, dan komunitas halal.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    name: 'Instagram',
                    iconSrc: instagramIcon,
                    href: 'https://www.instagram.com/jogjahalalfest.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
                  },
                  { name: 'Email', iconSrc: emailIcon, href: 'mailto:pelatihindonesia@gmail.com' },
                  { name: 'YouTube', iconSrc: youtubeIcon, href: 'https://youtube.com/@jogjahalalfest.official?si=woo1otsIS7nM-eSz' },
                  { name: 'Telepon', iconSrc: waIcon, href: 'tel:+628980797979' },
                ].map(({ name, iconSrc, href }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    target={name === 'Telepon' || name === 'Email' ? undefined : '_blank'}
                    rel={name === 'Telepon' || name === 'Email' ? undefined : 'noopener noreferrer'}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                  >
                    <img src={iconSrc} alt="" className="w-7 h-7" loading="lazy" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-sm border-l-2 border-[#D4AF37] pl-3">Tautan Cepat</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Tentang JHF #3
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Direktori Eksibitor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Jadwal Acara
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Denah Lokasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Pusat Media
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-sm border-l-2 border-[#D4AF37] pl-3">Hubungi Kami</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>
                    Jogja Expo Center (JEC)
                    <br />Yogyakarta, Indonesia
                  </span>
                </li>
                <li className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href="mailto:info@jogjahalalfest.com" className="hover:text-[#D4AF37] transition-colors">
                    info@jogjahalalfest.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+62 898-0797-979</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-gray-500 font-medium">
            <p>&copy; {new Date().getFullYear()} Jogja Halal Fest. Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
