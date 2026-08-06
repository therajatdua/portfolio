import React, { useRef, useState, useEffect } from 'react';

export default function CardTilt({ children, className }) {
  const cardRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Scan for focusable parent or child anchors to trigger focus zoom (Mac/Windows dock accessibility)
    const parent = card.parentElement;
    const focusTarget = (parent && (parent.tagName === 'A' || parent.getAttribute('href'))) ? parent : null;

    if (focusTarget) {
      const handleFocus = () => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        card.style.zIndex = '15';
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.08, 1.08, 1.08)`;
      };

      const handleBlur = () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.zIndex = '1';
      };

      focusTarget.addEventListener('focus', handleFocus);
      focusTarget.addEventListener('blur', handleBlur);

      return () => {
        focusTarget.removeEventListener('focus', handleFocus);
        focusTarget.removeEventListener('blur', handleBlur);
      };
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt calculations (max 4 degrees)
    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;

    const scale = 1.08;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    card.style.zIndex = '15';
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    const card = cardRef.current;
    if (card) {
      card.style.zIndex = '15';
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.08, 1.08, 1.08)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.zIndex = '1';
  };

  const handleFocus = (e) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (card) {
      card.style.zIndex = '15';
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.08, 1.08, 1.08)`;
    }
  };

  const handleBlur = (e) => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.zIndex = '1';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      style={{ 
        transition: 'transform 180ms cubic-bezier(0.25, 1, 0.5, 1), z-index 180ms cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}
    >
      {children}
    </div>
  );
}
