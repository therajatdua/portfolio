"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../lib/data';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Blog() {
  const [search, setSearch] = useState('');

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.summary.toLowerCase().includes(search.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
      
      {/* Page Header */}
      <section className="py-12 md:py-20 border-b border-border-base dark:border-zinc-900">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
              Engineering Blog
            </h1>
            <p className="text-[18px] text-text-secondary dark:text-zinc-400 mt-4 leading-relaxed font-normal">
              Technical essays exploring local-first machine learning, minimal UX architectures, and system setups.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs flex items-center">
            <Search className="absolute left-3 text-text-secondary dark:text-zinc-550" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2.5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-850 rounded-sm text-[13px] text-text-primary dark:text-zinc-200 placeholder-text-secondary/50 focus:outline-hidden focus:border-accent-base transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Blog Feed Grid */}
      <section className="py-16 mb-20">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Cover image Visual */}
                  <div className="w-full aspect-[16/10] bg-bg-base dark:bg-zinc-950 relative overflow-hidden border-b border-border-base/50 dark:border-zinc-850">
                    <div
                      className="absolute inset-0 bg-cover bg-center filter grayscale group-hover:grayscale-0 group-hover:scale-102 transition duration-500"
                      style={{ backgroundImage: `url(${post.coverUrl})` }}
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-text-secondary dark:text-zinc-400 bg-bg-base dark:bg-zinc-950 px-2 py-0.5 rounded border border-border-base/50 dark:border-zinc-850">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 tracking-tight leading-snug group-hover:text-accent-base transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-text-secondary dark:text-zinc-405 leading-relaxed font-normal line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4 border-t border-border-base/40 dark:border-zinc-850 flex items-center justify-between text-[12px] font-semibold text-text-secondary dark:text-zinc-500">
                  <div className="flex gap-4 items-center">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {post.readingTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent-base group-hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>Read Post</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary dark:text-zinc-550 text-sm">
            No matching posts found
          </div>
        )}
      </section>

    </div>
  );
}
