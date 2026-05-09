import { useEffect } from 'react';

export const StyleInjector = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      :root {
        --font-sans: 'Montserrat', sans-serif;
      }
      .font-sans { font-family: var(--font-sans); }

      /* Animasi Gradasi Teks Mengalir */
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 4s ease infinite;
      }

      /* Animasi Melayang Halus */
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes float-delayed {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      .animate-float-delayed {
        animation: float-delayed 7s ease-in-out infinite 2s;
      }

      /* Animasi Glow */
      @keyframes pulse-glow {
        0%, 100% { filter: drop-shadow(0 0 15px rgba(212,175,55,0.2)); }
        50% { filter: drop-shadow(0 0 30px rgba(212,175,55,0.6)); }
      }
      .animate-glow {
        animation: pulse-glow 4s ease-in-out infinite;
      }

      /* Kelas Kustom untuk Reveal Blur Halus */
      .reveal-transition {
        transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1),
                    transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1),
                    filter 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
      .reveal-hidden-up { opacity: 0; transform: translateY(40px); filter: blur(8px); }
      .reveal-hidden-down { opacity: 0; transform: translateY(-40px); filter: blur(8px); }
      .reveal-hidden-left { opacity: 0; transform: translateX(40px); filter: blur(8px); }
      .reveal-hidden-right { opacity: 0; transform: translateX(-40px); filter: blur(8px); }
      .reveal-visible { opacity: 1; transform: translate(0, 0); filter: blur(0px); }

      /* Rich content styling for news detail */
      .news-content h1,
      .news-content h2,
      .news-content h3,
      .news-content h4,
      .news-content h5,
      .news-content h6 {
        color: #ffffff;
        font-weight: 700;
        line-height: 1.2;
        margin: 1.6rem 0 0.9rem;
      }
      .news-content h1 { font-size: 2rem; }
      .news-content h2 { font-size: 1.6rem; }
      .news-content h3 { font-size: 1.3rem; }
      .news-content p {
        color: #cbd5e1;
        margin: 0.9rem 0;
      }
      .news-content a {
        color: #d4af37;
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .news-content ul,
      .news-content ol {
        padding-left: 1.4rem;
        margin: 1rem 0;
        color: #cbd5e1;
      }
      .news-content li { margin: 0.4rem 0; }
      .news-content blockquote {
        border-left: 3px solid rgba(212, 175, 55, 0.6);
        padding-left: 1rem;
        color: #e5e7eb;
        font-style: italic;
        margin: 1.2rem 0;
      }
      .news-content hr {
        border: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        margin: 1.6rem 0;
      }
      .news-content img {
        border-radius: 12px;
        margin: 1rem 0;
      }
    `,
      }}
    />
  );
};
