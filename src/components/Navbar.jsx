import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../img/logosvg.svg';

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      if (location.pathname === '/') {
        // Simple scroll spy
        const sections = ['home', 'about', 'projects', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (current) setActiveSection(current);
      } else {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        // Clear state to prevent scroll on refresh/back
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const NavItem = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`text-xs md:text-sm font-press uppercase tracking-wider transition-colors duration-300 ${
        activeSection === id
          ? "text-retroAccent underline decoration-2 underline-offset-4"
          : "text-retroText hover:text-retroAccent"
      }`}
    >
      {label}
    </button>
  );

  const MobileNavItem = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`block w-full text-left px-4 py-3 text-sm font-press uppercase border-b-2 border-retroText transition-colors duration-300 ${
        activeSection === id
          ? "text-retroAccent bg-white dark:bg-retroSecondary/20"
          : "text-retroText hover:bg-white/50 dark:hover:bg-retroSecondary/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "liquid-glass py-3 border-x-0 border-t-0" // Use liquid glass but remove side/top borders for full-width bar
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button onClick={() => scrollToSection('home')} className="hover:opacity-80 transition-opacity flex items-center gap-3">
          <img src={logo} alt="Rajat Dua" className="h-5 w-auto md:h-6" />
          <span className="font-press text-sm md:text-base text-retroText">Rajat Dua</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem id="home" label="Home" />
          <NavItem id="about" label="About" />
          <NavItem id="projects" label="Projects" />
          <NavItem id="contact" label="Contact" />
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-retroText/10 transition-colors text-retroText"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-retroText/10 transition-colors text-retroText"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-retroText p-1 border-2 border-transparent hover:border-retroText"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-retroBg border-b-[3px] border-retroText overflow-hidden"
          >
            <div className="border-t-[3px] border-retroText">
              <MobileNavItem id="home" label="Home" />
              <MobileNavItem id="about" label="About" />
              <MobileNavItem id="projects" label="Projects" />
              <MobileNavItem id="contact" label="Contact" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
