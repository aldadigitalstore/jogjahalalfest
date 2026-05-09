import { useEffect, useRef, useState } from 'react';

export const Reveal = ({ children, className = '', delay = 0, direction = 'up', disable = false }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(disable);

  useEffect(() => {
    if (disable) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [disable]);

  const hiddenClass = `reveal-hidden-${direction}`;

  return (
    <div
      ref={ref}
      className={`reveal-transition ${isVisible ? 'reveal-visible' : hiddenClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
