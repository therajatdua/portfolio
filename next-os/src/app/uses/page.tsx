"use client"
import React from 'react';
import { uses } from '../../lib/data';
import { Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Uses() {
  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1000px]">
      
      {/* Page Header */}
      <section className="py-12 md:py-20 border-b border-border-base dark:border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent-base/10 text-accent-base text-[12px] font-bold uppercase tracking-wider">
            <Monitor size={13} />
            <span>Workspace rig</span>
          </div>

          <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
            What I Use
          </h1>

          <p className="text-[18px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
            A comprehensive list of physical hardware tools, code development environments, software applications, and AI clients I use to design and code daily.
          </p>
        </motion.div>
      </section>

      {/* Grid checklist list */}
      <section className="py-16 mb-20 space-y-16">
        {uses.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-[20px] font-bold text-text-primary dark:text-zinc-100 uppercase tracking-widest border-b border-border-base/50 dark:border-zinc-900 pb-2">
              {cat.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-850 rounded-lg hover:border-text-secondary/35 dark:hover:border-zinc-800 transition shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-[15px] font-bold text-text-primary dark:text-zinc-200 leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono text-text-secondary dark:text-zinc-550 uppercase bg-bg-base dark:bg-zinc-950 px-2 py-0.5 rounded border border-border-base/50 dark:border-zinc-800 shrink-0">
                        {item.spec}
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary dark:text-zinc-450 mt-3 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
