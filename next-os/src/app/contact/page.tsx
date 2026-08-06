"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    
    // Mock send logic
    setSent(true);
    setTimeout(() => {
      setEmail('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  const socials = [
    { label: 'Email', href: 'mailto:rajat@example.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/therajatdua' },
    { label: 'GitHub', href: 'https://github.com/therajatdua' },
    { label: 'YouTube', href: 'https://youtube.com/@therajatdua' }
  ];

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
      <section className="py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column: Headings and Socials */}
        <div className="lg:col-span-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
              Let's build something.
            </h1>
            <p className="text-[16px] md:text-[18px] text-text-secondary dark:text-zinc-405 mt-6 leading-relaxed font-normal max-w-md">
              Have an idea that simplifies lives using artificial intelligence, automated scripts, or premium frontends? I'd love to chat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h2 className="text-[12px] font-bold text-text-secondary dark:text-zinc-550 uppercase tracking-widest">Connect Globally</h2>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {socials.map((soc) => (
                <Link
                  key={soc.label}
                  href={soc.href}
                  target={soc.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-sm hover:border-text-secondary/40 dark:hover:border-zinc-700 hover:text-accent-base transition"
                >
                  <span className="text-[14px] font-semibold text-text-primary dark:text-zinc-200">{soc.label}</span>
                  <ArrowUpRight size={14} className="text-text-secondary dark:text-zinc-500" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="w-full bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg p-6 md:p-8 shadow-xs"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[12px] font-bold text-text-secondary dark:text-zinc-500 uppercase tracking-wide">
                  Your Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-bg-base dark:bg-zinc-950/70 border border-border-base dark:border-zinc-800 rounded-sm text-[14px] text-text-primary dark:text-zinc-200 focus:outline-hidden focus:border-accent-base placeholder-text-secondary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[12px] font-bold text-text-secondary dark:text-zinc-500 uppercase tracking-wide">
                  Brief Project Overview
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about what you are engineering..."
                  className="w-full px-4 py-3 bg-bg-base dark:bg-zinc-950/70 border border-border-base dark:border-zinc-800 rounded-sm text-[14px] text-text-primary dark:text-zinc-200 focus:outline-hidden focus:border-accent-base placeholder-text-secondary/50 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className={`w-full py-3.5 rounded-sm text-[14px] font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  sent ? 'bg-green-600' : 'bg-accent-base hover:bg-accent-base/90 active:scale-99'
                }`}
              >
                {sent ? (
                  <>
                    <Check size={16} />
                    <span>Message Sent Successfully</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
