import React, { useEffect, useRef, useState } from 'react';

export default function ImageReveal({ src, alt, className, onError }) {
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-[600ms]"
        style={{
          clipPath: revealed 
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
            : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }}
        loading="lazy"
        onError={onError}
      />
    </div>
  );
}
