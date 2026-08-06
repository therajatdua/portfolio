"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    { title: 'Extreme Minimalism', desc: 'Interfaces should hide complexity and present only what is immediately useful.' },
    { title: 'Local-First & Secure', desc: 'User data should belong to the user. Local vectors and SQLite encryption over centralized storage.' },
    { title: 'Deterministic UX', desc: 'Predictable hotkeys, sub-16ms latency response, and absolute visual clarity.' }
  ];

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
      <section className="py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column: Text */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
              About Rajat Dua
            </h1>
            <p className="text-[18px] text-text-secondary dark:text-zinc-400 mt-4 leading-relaxed font-normal">
              Software Engineer, Product Developer, and AI Builder. Focus on building systems that bridge the gap between AI capabilities and friction-free user workflows.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
            className="space-y-6 text-[15px] text-text-secondary dark:text-zinc-405 leading-relaxed font-normal"
          >
            <p>
              I believe modern software has become bloated, slow, and overly intrusive. My mission is to design elegant, minimal digital interfaces that perform compute task efficiently, prioritizing on-device AI integration and security above all else.
            </p>
            <p>
              Through founding startups and leading product architectures, I have scaled next-generation systems to thousands of active users, reduced bundle latencies, and automated personal intelligence pipelines.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18, ease: 'easeOut' }}
            className="pt-8 border-t border-border-base dark:border-zinc-850 space-y-6"
          >
            <h2 className="text-[22px] font-bold text-text-primary dark:text-zinc-150 tracking-tight">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-[15px] font-bold text-text-primary dark:text-zinc-200">{v.title}</h3>
                  <p className="text-[13px] text-text-secondary dark:text-zinc-500 leading-normal">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25, ease: 'easeOut' }}
            className="pt-6"
          >
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-base hover:underline"
            >
              <span>View Printable Resume</span>
              <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Right column: Image */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="w-full max-w-[380px] aspect-square bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded-lg overflow-hidden shadow-md relative"
          >
            <Image
              src="/rajat_avatar.png"
              alt="Rajat Dua portrait"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              priority
              className="object-cover filter grayscale hover:grayscale-0 transition duration-500"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
