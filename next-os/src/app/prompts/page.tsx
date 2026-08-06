"use client"
import React, { useState } from 'react';
import { prompts } from '../../lib/data';
import { Sparkles, Copy, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromptsLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Structured JSON Outputs', 'Summarization', 'Coding & Architecture'];

  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(title);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1000px]">
      
      {/* Header */}
      <section className="py-12 md:py-20 border-b border-border-base dark:border-zinc-900">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent-base/10 text-accent-base text-[12px] font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>AI Orchestration</span>
          </div>

          <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
            AI Prompt Library
          </h1>

          <p className="text-[18px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
            A curated library of structured system and user prompts used to engineer reliable LLM JSON completions and agent summaries.
          </p>
        </div>
      </section>

      {/* Sorting & Search */}
      <section className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Category buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[13px] font-semibold rounded-sm border transition-all ${
                activeCategory === cat
                  ? 'bg-text-primary dark:bg-zinc-100 text-bg-base dark:text-zinc-950 border-text-primary'
                  : 'bg-card-base dark:bg-zinc-900 text-text-secondary dark:text-zinc-400 border-border-base dark:border-zinc-800 hover:border-text-secondary/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-xs flex items-center">
          <Search className="absolute left-3 text-text-secondary dark:text-zinc-500" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts..."
            className="w-full pl-9 pr-4 py-2.5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-850 rounded-sm text-[13px] text-text-primary dark:text-zinc-200 placeholder-text-secondary/50 focus:outline-hidden focus:border-accent-base transition-colors"
          />
        </div>
      </section>

      {/* Prompts Cards */}
      <section className="py-6 mb-20 space-y-8">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((p) => {
            const isCopied = copiedId === p.title;
            return (
              <article
                key={p.title}
                className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-850 rounded-lg space-y-4 shadow-xs"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent-base bg-accent-base/10 px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    <h3 className="text-[18px] font-bold text-text-primary dark:text-zinc-100 mt-2.5 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-[13px] text-text-secondary dark:text-zinc-500 mt-1 leading-normal font-normal">
                      {p.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(p.prompt, p.title)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-[12px] font-semibold transition border ${
                      isCopied
                        ? 'bg-green-600/10 border-green-600/35 text-green-600 dark:text-green-405'
                        : 'bg-bg-base dark:bg-zinc-950 text-text-primary dark:text-zinc-200 border-border-base dark:border-zinc-800 hover:border-text-secondary/35 active:scale-97'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={13} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Prompt block display */}
                <div className="p-4 bg-bg-base dark:bg-zinc-950/80 rounded-sm border border-border-base/55 dark:border-zinc-850 overflow-x-auto">
                  <pre className="font-mono text-[13px] text-text-secondary dark:text-zinc-400 whitespace-pre-wrap select-all">
                    <code>{p.prompt}</code>
                  </pre>
                </div>
              </article>
            );
          })
        ) : (
          <div className="text-center py-16 text-text-secondary dark:text-zinc-500 text-sm">
            No matching prompts found
          </div>
        )}
      </section>

    </div>
  );
}
