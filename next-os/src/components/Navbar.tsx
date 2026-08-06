"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import CommandPalette from './CommandPalette';
import { Sun, Moon, Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Listen to CMD+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
          scrolled
            ? 'bg-bg-base/70 dark:bg-bg-base/75 backdrop-blur-md border-b border-border-base/70 dark:border-zinc-800/80 py-3 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group font-semibold text-text-primary text-[17px] tracking-tight">
              <span className="w-5.5 h-5.5 rounded-xs bg-accent-base flex items-center justify-center text-white text-[12px] font-bold transition-transform duration-300 group-hover:scale-105">R</span>
              <div className="flex flex-col">
                <span className="leading-tight">Rajat Dua</span>
                <span className="hidden md:flex items-center gap-1 text-[9px] text-text-secondary dark:text-zinc-500 font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span>currently building: MemoVault Graph</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-[14px] font-medium transition-colors hover:text-text-primary ${
                      isActive ? 'text-text-primary' : 'text-text-secondary dark:text-zinc-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 text-text-secondary dark:text-zinc-400 text-[12px] hover:border-text-secondary/30 dark:hover:border-zinc-700 transition"
              >
                <Search size={14} />
                <span>Search</span>
                <span className="text-[10px] opacity-70 font-mono border border-border-base dark:border-zinc-850 px-1.5 py-0.2 rounded">⌘K</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-sm bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 text-text-secondary dark:text-zinc-400 hover:text-text-primary transition"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Let's Talk CTA */}
              <Link
                href="/contact"
                className="flex items-center gap-1 text-[13px] font-semibold text-white bg-accent-base px-4 py-2 rounded-sm hover:bg-accent-base/90 active:scale-97 transition"
              >
                <span>Let's Talk</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setPaletteOpen(true)}
                className="p-2 text-text-secondary dark:text-zinc-400 hover:text-text-primary"
              >
                <Search size={18} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 text-text-secondary dark:text-zinc-400 hover:text-text-primary"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-text-secondary dark:text-zinc-400 hover:text-text-primary"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] bg-bg-base/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b border-border-base dark:border-zinc-850 z-30 py-6 px-6 flex flex-col gap-4 md:hidden shadow-lg no-print"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[16px] font-medium py-1.5 border-b border-border-base/30 dark:border-zinc-900 ${
                  pathname === link.href ? 'text-accent-base' : 'text-text-primary dark:text-zinc-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-[16px] font-semibold text-white bg-accent-base px-4 py-2.5 rounded-sm text-center mt-2"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Palette */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
