"use client"
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Tech from './pages/tech/Tech';
import Social from './pages/social/Social';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';

function AppContent() {
  // Detect system theme preference
  const [isDark, setIsDark] = useState(() => {
    // Check if user has explicit manual setting, else fallback to system preference
    const manualTheme = localStorage.getItem('user-theme');
    if (manualTheme === 'dark') return true;
    if (manualTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Set up OS preference listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      // Only apply system change if user has no manual override
      if (!localStorage.getItem('user-theme')) {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // Sync theme attribute and class name on document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-themeBg text-themeText transition-colors duration-300 font-sans">
      {/* Persistent navbar styled dynamically */}
      <Navbar isDarkPage={isDark} setIsDark={setIsDark} />
      
      {/* Main viewport */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/social" element={<Social />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>
      
      {/* Footer styled dynamically */}
      <Footer isDarkPage={isDark} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
