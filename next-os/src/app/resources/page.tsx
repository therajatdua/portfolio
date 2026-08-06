"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { resources } from '../../lib/data';
import { Search, ArrowRight, Bookmark, Cpu, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Pocket = ({ size = 15, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
    <polyline points="8 10 12 14 16 10" />
  </svg>
);

export default function Resources() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'iOS Shortcuts', 'AI Engineering', 'Productivity'];

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase()) ||
      res.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || res.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
      
      {/* Page Header */}
      <section className="py-12 md:py-20 border-b border-border-base dark:border-zinc-900">
        <div className="max-w-2xl">
          <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
            Developer Documentation
          </h1>
          <p className="text-[18px] text-text-secondary dark:text-zinc-400 mt-4 leading-relaxed font-normal">
            Downloadable iOS Shortcuts, prompt blueprints, and productivity assets designed to optimize development and creative workflow speeds.
          </p>
        </div>
      </section>

      {/* Categories & Search Panel */}
      <section className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[13px] font-semibold rounded-sm border transition-all ${
                activeCategory === cat
                  ? 'bg-text-primary dark:bg-zinc-100 text-bg-base dark:text-zinc-950 border-text-primary dark:border-zinc-150'
                  : 'bg-card-base dark:bg-zinc-900 text-text-secondary dark:text-zinc-400 border-border-base dark:border-zinc-800 hover:border-text-secondary/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:max-w-xs flex items-center">
          <Search className="absolute left-3 text-text-secondary dark:text-zinc-500" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-9 pr-4 py-2.5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-850 rounded-sm text-[13px] text-text-primary dark:text-zinc-200 placeholder-text-secondary/50 focus:outline-hidden focus:border-accent-base transition-colors"
          />
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-8 mb-20">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <motion.div
                key={res.slug}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent-base bg-accent-base/10 px-2 py-0.5 rounded">
                      {res.category}
                    </span>
                    <span className="text-[12px] font-mono text-text-secondary dark:text-zinc-550">{res.version}</span>
                  </div>

                  <h3 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 mt-4 tracking-tight group-hover:text-accent-base transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-[14px] text-text-secondary dark:text-zinc-400 mt-2.5 leading-relaxed font-normal">
                    {res.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border-base/40 dark:border-zinc-850 flex items-center justify-between text-[13px] font-semibold">
                  <div className="flex gap-2">
                    {res.category === 'iOS Shortcuts' && <Pocket size={15} className="text-text-secondary" />}
                    {res.category === 'AI Engineering' && <Cpu size={15} className="text-text-secondary" />}
                    {res.category === 'Productivity' && <Compass size={15} className="text-text-secondary" />}
                  </div>
                  <Link
                    href={`/resources/${res.slug}`}
                    className="text-text-primary dark:text-zinc-200 group-hover:text-accent-base hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>Read Docs</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary dark:text-zinc-500 text-sm">
            No matching resources or documents found
          </div>
        )}
      </section>

    </div>
  );
}
