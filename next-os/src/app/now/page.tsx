"use client"
import React from 'react';
import { now } from '../../lib/data';
import { Sparkles, Calendar, BookOpen, Layers, Cpu, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NowPage() {
  return (
    <div className="mx-auto px-6 md:px-12 max-w-[800px]">
      
      {/* Header */}
      <section className="py-12 md:py-20 border-b border-border-base dark:border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent-base/10 text-accent-base text-[12px] font-bold uppercase tracking-wider">
            <Calendar size={13} />
            <span>Real-time focus</span>
          </div>

          <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
            What I'm Doing Now
          </h1>

          <p className="text-[18px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
            This is a "/now" page, detailing my current objectives, study tracks, reading logs, and general focus right now. Updated regularly.
          </p>

          <div className="text-[12px] text-text-secondary dark:text-zinc-500 font-semibold uppercase tracking-wider">
            Last Updated: {now.lastUpdated}
          </div>
        </motion.div>
      </section>

      {/* Main Focus Checklist Layout */}
      <section className="py-16 mb-20 space-y-12 text-[15px] text-text-secondary dark:text-zinc-400 leading-relaxed">
        
        {/* Building */}
        <div className="space-y-4">
          <h2 className="text-[18px] font-bold text-text-primary dark:text-zinc-150 uppercase tracking-widest flex items-center gap-2">
            <Cpu size={16} className="text-accent-base" />
            <span>Currently Building</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {now.currentlyBuilding.map((item, idx) => (
              <div key={idx} className="p-5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-850 rounded-lg">
                <h4 className="text-[15px] font-bold text-text-primary dark:text-zinc-200">{item.title}</h4>
                <p className="text-[13px] text-text-secondary dark:text-zinc-500 mt-1 leading-normal">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning */}
        <div className="space-y-4 pt-4 border-t border-border-base/50 dark:border-zinc-850">
          <h2 className="text-[18px] font-bold text-text-primary dark:text-zinc-150 uppercase tracking-widest flex items-center gap-2">
            <Layers size={16} className="text-accent-base" />
            <span>Learning</span>
          </h2>
          <ul className="list-none space-y-3 pl-1">
            {now.learning.map((item, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-base mt-2 flex-shrink-0" />
                <span className="text-[14px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reading */}
        <div className="space-y-4 pt-4 border-t border-border-base/50 dark:border-zinc-850">
          <h2 className="text-[18px] font-bold text-text-primary dark:text-zinc-150 uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={16} className="text-accent-base" />
            <span>Reading</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {now.reading.map((item, idx) => (
              <div key={idx} className="p-4 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-850 rounded-lg">
                <p className="text-[14px] font-bold text-text-primary dark:text-zinc-200">{item.title}</p>
                <p className="text-[12px] text-text-secondary dark:text-zinc-550 mt-0.5">by {item.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creating */}
        <div className="space-y-4 pt-4 border-t border-border-base/50 dark:border-zinc-850">
          <h2 className="text-[18px] font-bold text-text-primary dark:text-zinc-150 uppercase tracking-widest flex items-center gap-2">
            <Compass size={16} className="text-accent-base" />
            <span>Creating</span>
          </h2>
          <ul className="list-none space-y-3 pl-1">
            {now.creating.map((item, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-base mt-2 flex-shrink-0" />
                <span className="text-[14px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

    </div>
  );
}
