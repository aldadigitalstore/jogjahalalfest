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
    `,
      }}
    />
  );
};
