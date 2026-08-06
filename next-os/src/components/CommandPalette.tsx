"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { projects, blogPosts, resources } from '../lib/data';
import { Search, Monitor, Sun, Moon, ArrowRight, CornerDownLeft, Sparkles, Folder, FileText, Bookmark } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Pages' | 'Projects' | 'Resources' | 'Blog' | 'Actions';
  action: () => void;
  icon?: React.ReactNode;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on backdrop click
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle global escape and arrow navigations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, search]);

  // Reset index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Setup items
  const items: CommandItem[] = [
    // Pages
    { id: 'nav-home', title: 'Home', subtitle: 'Go to start page', category: 'Pages', action: () => { router.push('/'); onClose(); }, icon: <Sparkles size={16} /> },
    { id: 'nav-projects', title: 'Projects', subtitle: 'View work portfolio', category: 'Pages', action: () => { router.push('/projects'); onClose(); }, icon: <Folder size={16} /> },
    { id: 'nav-resources', title: 'Resources', subtitle: 'Apple-style documentation', category: 'Pages', action: () => { router.push('/resources'); onClose(); }, icon: <Bookmark size={16} /> },
    { id: 'nav-blog', title: 'Blog', subtitle: 'Technical engineering logs', category: 'Pages', action: () => { router.push('/blog'); onClose(); }, icon: <FileText size={16} /> },
    { id: 'nav-about', title: 'About', subtitle: 'Short profile details', category: 'Pages', action: () => { router.push('/about'); onClose(); }, icon: <Sparkles size={16} /> },
    { id: 'nav-contact', title: 'Contact', subtitle: 'Get in touch', category: 'Pages', action: () => { router.push('/contact'); onClose(); }, icon: <ArrowRight size={16} /> },
    { id: 'nav-uses', title: 'Developer Workspace (/uses)', subtitle: 'What gear and setups I use', category: 'Pages', action: () => { router.push('/uses'); onClose(); }, icon: <Monitor size={16} /> },
    { id: 'nav-now', title: 'Now (/now)', subtitle: 'Real-time focus & goals', category: 'Pages', action: () => { router.push('/now'); onClose(); }, icon: <Sparkles size={16} /> },
    { id: 'nav-resume', title: 'Printable Resume (/resume)', subtitle: 'View and download CV', category: 'Pages', action: () => { router.push('/resume'); onClose(); }, icon: <FileText size={16} /> },

    // Actions
    { id: 'act-theme', title: 'Toggle Theme', subtitle: 'Switch color modes', category: 'Actions', action: () => { toggleTheme(); onClose(); }, icon: <Sun size={16} /> },
    { id: 'act-mail', title: 'Mail Rajat', subtitle: 'Open email client', category: 'Actions', action: () => { window.location.href = 'mailto:rajat@example.com'; onClose(); }, icon: <ArrowRight size={16} /> },

    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.title,
      subtitle: p.description,
      category: 'Projects' as const,
      action: () => { router.push(`/projects/${p.slug}`); onClose(); },
      icon: <Folder size={16} />
    })),

    // Resources
    ...resources.map((r) => ({
      id: `res-${r.slug}`,
      title: r.title,
      subtitle: r.category,
      category: 'Resources' as const,
      action: () => { router.push(`/resources/${r.slug}`); onClose(); },
      icon: <Bookmark size={16} />
    })),

    // Blog posts
    ...blogPosts.map((b) => ({
      id: `blog-${b.slug}`,
      title: b.title,
      subtitle: b.date,
      category: 'Blog' as const,
      action: () => { router.push(`/blog/${b.slug}`); onClose(); },
      icon: <FileText size={16} />
    }))
  ];

  // Filtering based on search
  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            ref={containerRef}
            className="relative w-full max-w-2xl bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded-[20px] shadow-2xl overflow-hidden z-10 mx-4"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border-base dark:border-zinc-800">
              <Search className="text-text-secondary dark:text-zinc-500" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, blogs, pages or actions..."
                className="flex-1 bg-transparent border-none outline-none text-[16px] text-text-primary dark:text-zinc-100 placeholder-text-secondary dark:placeholder-zinc-500"
              />
              <span className="text-[12px] bg-bg-base dark:bg-zinc-800 text-text-secondary dark:text-zinc-400 px-2 py-1 rounded border border-border-base dark:border-zinc-700">ESC</span>
            </div>

            {/* Match List */}
            <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
              {filteredItems.length > 0 ? (
                (() => {
                  let currentCategory = '';
                  return filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const showCategory = item.category !== currentCategory;
                    if (showCategory) {
                      currentCategory = item.category;
                    }

                    return (
                      <div key={item.id}>
                        {showCategory && (
                          <div className="text-[11px] font-semibold text-text-secondary dark:text-zinc-500 uppercase tracking-wider px-3 pt-3 pb-1">
                            {item.category}
                          </div>
                        )}
                        <div
                          onClick={item.action}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-[12px] cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-accent-base/10 dark:bg-accent-base/20 text-accent-base dark:text-accent-base'
                              : 'text-text-primary dark:text-zinc-300 hover:bg-bg-base dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={isSelected ? 'text-accent-base' : 'text-text-secondary dark:text-zinc-500'}>
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[14px] font-medium truncate">{item.title}</p>
                              {item.subtitle && (
                                <p className="text-[12px] text-text-secondary dark:text-zinc-500 truncate">{item.subtitle}</p>
                              )}
                            </div>
                          </div>

                          {isSelected && (
                            <div className="flex items-center gap-1 text-[11px] text-accent-base/80 dark:text-accent-base/90 bg-accent-base/5 dark:bg-accent-base/10 border border-accent-base/20 px-2 py-0.5 rounded">
                              <span>Select</span>
                              <CornerDownLeft size={10} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()
              ) : (
                <div className="text-center py-8 text-text-secondary dark:text-zinc-500 text-sm">
                  No matching results found
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex justify-between items-center px-4 py-3 bg-bg-base dark:bg-zinc-950/50 border-t border-border-base dark:border-zinc-800 text-[11px] text-text-secondary dark:text-zinc-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">↑↓ Navigation</span>
                <span className="flex items-center gap-1">↵ Go</span>
              </div>
              <div>
                <span>Press ⌘K to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
