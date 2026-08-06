"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Download, Check, Shield, Terminal, Star, HelpCircle, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Pocket = ({ size = 16, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
    <polyline points="8 10 12 14 16 10" />
  </svg>
);

export default function ExpenseTrackerProduct() {
  const [downloaded, setDownloaded] = useState(false);

  const features = [
    { title: 'Keyboard-First Speed', desc: 'Type simple single-string codes to parse expenses instantly. Zero clicking required.' },
    { title: 'iOS Shortcut Widget', desc: 'Log expenses directly from Siri or your home screen widget. Perfect for on-the-go entries.' },
    { title: '100% Privacy Focused', desc: 'Local database storage. Your financial transactions never upload to third-party databases.' },
    { title: 'Export Anywhere', desc: 'Export expense logs to standard CSV sheets or JSON formats in one click.' }
  ];

  const faqs = [
    { q: 'Is there a monthly fee?', a: 'No. The codebase is fully open-source and free to self-host or run locally.' },
    { q: 'How does the iOS Shortcut work?', a: 'It utilizes Apple Shortcuts to prompt your input, formats the string, and makes an HTTP POST request directly to your private API endpoint.' },
    { q: 'Can I import historical bank data?', a: 'Yes, the console supports importing formatted CSV files to import past transactions.' }
  ];

  const triggerDownload = () => {
    setDownloaded(true);
    // Mock download trigger
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1200px]">
      
      {/* Product Hero */}
      <section className="py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent-base/10 text-accent-base text-[12px] font-bold uppercase tracking-wider">
            <Star size={12} />
            <span>Featured Utility</span>
          </div>

          <h1 className="text-[42px] md:text-[62px] font-extrabold tracking-tight text-text-primary leading-[0.95]">
            Expense Command Console
          </h1>

          <p className="text-[18px] text-text-secondary dark:text-zinc-400 font-normal leading-relaxed max-w-xl">
            A keyboard-driven automated financial logging console integrated directly with iOS Shortcuts. Input and categorize expenses in under 2 seconds.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href="https://icloud.com/shortcuts/example-expense"
              target="_blank"
              onClick={triggerDownload}
              className="px-6 py-3 rounded-sm bg-accent-base text-white text-[14px] font-semibold hover:bg-accent-base/90 active:scale-97 transition inline-flex items-center gap-2"
            >
              <Download size={15} />
              <span>{downloaded ? 'Shortcut Added!' : 'Download iOS Shortcut'}</span>
            </Link>
            <Link
              href="https://github.com/therajatdua/expense-tracker"
              target="_blank"
              className="px-6 py-3 rounded-sm bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 text-text-primary dark:text-zinc-200 text-[14px] font-semibold hover:bg-bg-base transition"
            >
              Clone GitHub Repository
            </Link>
          </div>
        </div>

        {/* Console CSS Graphic */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[380px] p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded-lg shadow-xl relative overflow-hidden">
            <div className="flex gap-1.5 border-b border-border-base/50 dark:border-zinc-850 pb-4 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            
            <div className="font-mono text-[12px] space-y-4">
              <div className="text-text-secondary dark:text-zinc-550">
                $ expense-tracker --listen
              </div>
              <div className="text-green-500 font-semibold">
                Listening on port 3000...
              </div>
              
              <div className="p-3 bg-bg-base dark:bg-zinc-950 rounded-sm border border-border-base/50 dark:border-zinc-850 space-y-1">
                <p className="text-[10px] text-text-secondary dark:text-zinc-550">// Incoming log from Siri</p>
                <p className="text-text-primary dark:text-zinc-300">"14 lunch with clients #food"</p>
                <div className="text-accent-base pt-1 font-bold">
                  ✓ Recorded: $14.00 (Food)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-border-base dark:border-zinc-850">
        <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-primary tracking-tight mb-12">
          System Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded-lg space-y-4">
              <div className="w-8 h-8 rounded bg-accent-base/10 text-accent-base flex items-center justify-center">
                {i === 0 && <Terminal size={16} />}
                {i === 1 && <Pocket size={16} />}
                {i === 2 && <Shield size={16} />}
                {i === 3 && <Layers size={16} />}
              </div>
              <h3 className="text-[16px] font-bold text-text-primary dark:text-zinc-200">{f.title}</h3>
              <p className="text-[13px] text-text-secondary dark:text-zinc-455 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Tutorial Placeholder & Instructions */}
      <section className="py-20 border-t border-border-base dark:border-zinc-850 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-primary tracking-tight">
            How to Set Up
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-[15px] text-text-secondary dark:text-zinc-400 font-normal leading-relaxed">
            <li>
              <span className="font-semibold text-text-primary dark:text-zinc-200">Clone and deploy:</span> Clone the repository and deploy to Vercel or run locally using Node.
            </li>
            <li>
              <span className="font-semibold text-text-primary dark:text-zinc-200">Download iOS shortcut:</span> Import the helper shortcut onto your iPhone.
            </li>
            <li>
              <span className="font-semibold text-text-primary dark:text-zinc-200">Sync webhooks:</span> Input your deployment URL inside the shortcut setup prompt.
            </li>
            <li>
              <span className="font-semibold text-text-primary dark:text-zinc-200">Log instantly:</span> Say "Hey Siri, log expense" or tap the shortcut widget.
            </li>
          </ol>
        </div>

        <div className="lg:col-span-6">
          {/* Mock Video Container */}
          <div className="w-full aspect-[16/9] bg-bg-base dark:bg-zinc-950 rounded-lg border border-border-base dark:border-zinc-850 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <span className="w-12 h-12 rounded-full bg-accent-base/10 text-accent-base flex items-center justify-center"><Star size={20} /></span>
            <div>
              <p className="text-[14px] font-bold text-text-primary dark:text-zinc-200">Video Walkthrough Tutorial</p>
              <p className="text-[12px] text-text-secondary dark:text-zinc-500 mt-1">A 2-minute overview guide demonstrating the Siri integration workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & FAQs */}
      <section className="py-20 border-t border-border-base dark:border-zinc-850">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Privacy Policy */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-[20px] font-bold text-text-primary tracking-tight">Privacy Commitment</h2>
            <p className="text-[14px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
              Your financial records contain private information. This project is engineered with an "Offline-First" framework. It does not load external analytic packages, bank parsing APIs, or cloud database storage trackers. You host the server, you own the keys.
            </p>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-[20px] font-bold text-text-primary tracking-tight flex items-center gap-2">
              <HelpCircle size={18} className="text-accent-base" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-[15px] font-bold text-text-primary dark:text-zinc-200">{faq.q}</h3>
                  <p className="text-[14px] text-text-secondary dark:text-zinc-450 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
