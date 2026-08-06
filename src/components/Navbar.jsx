import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar({ isDarkPage, setIsDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Detect coarser pointers (such as touchscreens) to bypass desktop-only hovers
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/tech') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/tech');
      setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  };

  const navLinks = [
    { label: 'Tech', path: '/tech', isExternal: false },
    { label: 'Social', path: '/social', isExternal: false },
    { label: 'Contact', path: '#contact', isExternal: true }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-themeBg/85 backdrop-blur-md border-themeBorder py-3.5'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="site-max px-6 md:px-12 flex items-center justify-between">
        {/* Monogram logo initials */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold tracking-tight text-lg transition-transform duration-300 active:scale-95 text-themeText"
        >
          <span className="w-6.5 h-6.5 rounded bg-brandAccent flex items-center justify-center text-zinc-900 text-[13px] font-bold">R</span>
          <span>Rajat Dua</span>
        </Link>

        {/* Desktop Nav Items (Magnify Dock Hover Effect) */}
        <div className="hidden md:flex items-center gap-8 group/nav">
          {navLinks.map((link, idx) => {
            const isFocusedOrHovered = hoveredIdx === idx;
            const anyFocusedOrHovered = hoveredIdx !== null;
            const isActive = location.pathname === link.path;

            const scaleVal = isTouch 
              ? 'scale(1)' 
              : isFocusedOrHovered 
              ? 'scale(1.18)' 
              : anyFocusedOrHovered 
              ? 'scale(0.92)' 
              : 'scale(1)';

            const opacityVal = isTouch 
              ? '1' 
              : isFocusedOrHovered 
              ? '1' 
              : anyFocusedOrHovered 
              ? '0.45' 
              : '1';

            const commonProps = {
              key: idx,
              style: {
                transform: scaleVal,
                opacity: opacityVal,
                transition: 'transform 180ms cubic-bezier(0.25, 1, 0.5, 1), opacity 180ms cubic-bezier(0.25, 1, 0.5, 1)'
              },
              onMouseEnter: () => !isTouch && setHoveredIdx(idx),
              onMouseLeave: () => !isTouch && setHoveredIdx(null),
              onFocus: () => !isTouch && setHoveredIdx(idx),
              onBlur: () => !isTouch && setHoveredIdx(null),
              className: `text-sm font-semibold focus:outline-none transition-colors duration-150 inline-block ${
                isActive 
                  ? 'text-brandAccent font-bold' 
                  : 'text-themeTextMuted hover:text-themeText'
              }`
            };

            if (link.isExternal) {
              return (
                <a 
                  href={link.path} 
                  onClick={handleContactClick} 
                  {...commonProps}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link 
                to={link.path} 
                {...commonProps}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Simple manual overrides switch button */}
          <button
            onClick={() => {
              const nextMode = !isDarkPage;
              setIsDark(nextMode);
              localStorage.setItem('user-theme', nextMode ? 'dark' : 'light');
            }}
            className="p-2 rounded-full hover:bg-themeBorder/40 transition-colors text-themeTextMuted hover:text-themeText focus:outline-none focus:ring-1 focus:ring-brandAccent ml-2"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Light/Dark Theme"
          >
            {isDarkPage ? <FaSun size={14} /> : <FaMoon size={14} />}
          </button>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Simple manual theme switcher on mobile */}
          <button
            onClick={() => {
              const nextMode = !isDarkPage;
              setIsDark(nextMode);
              localStorage.setItem('user-theme', nextMode ? 'dark' : 'light');
            }}
            className="p-2 rounded-full text-themeTextMuted hover:text-themeText focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isDarkPage ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-themeText transition-colors"
          >
            {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="md:hidden absolute top-[100%] left-0 right-0 border-b shadow-lg z-30 py-5 px-6 flex flex-col gap-4 bg-themeBg/95 border-themeBorder backdrop-blur-md"
        >
          {navLinks.map((link, idx) => (
            link.isExternal ? (
              <a
                key={idx}
                href={link.path}
                onClick={handleContactClick}
                className="text-base font-semibold py-2 text-themeText"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold py-2 border-b border-themeBorder/40 ${
                  location.pathname === link.path ? 'text-brandAccent' : 'text-themeText'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
}
