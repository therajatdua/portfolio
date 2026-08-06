"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { projects, now, resources } from '../lib/data';
import { ArrowRight, ExternalLink, Terminal, Shield, Compass, BookOpen, Layers, Cpu, Play, Pause, Plus, CornerDownLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github = ({ size = 24, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- INTERACTIVE MEMOVAULT WIDGET ---
function MemoVaultWidget() {
  const [nodes, setNodes] = useState<{ id: string; x: number; y: number; label: string }[]>([
    { id: '1', x: 40, y: 30, label: 'Local SQLite' },
    { id: '2', x: 180, y: 40, label: 'ONNX Embeddings' },
    { id: '3', x: 110, y: 120, label: 'Semantic Graph' },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    // Create a new node in random bounding box
    const newNode = {
      id: Date.now().toString(),
      x: Math.floor(Math.random() * 200) + 20,
      y: Math.floor(Math.random() * 80) + 80,
      label: inputVal.trim()
    };

    setNodes(prev => [...prev, newNode]);
    setInputVal('');
  };

  return (
    <div className="w-full h-48 bg-bg-base dark:bg-zinc-950/80 rounded-sm p-4 border border-border-base/55 dark:border-zinc-850 relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic Graph Visual SVG Canvas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        {/* Draw connections to center node */}
        {nodes.map((node, i) => {
          if (i === 0) return null;
          return (
            <line
              key={node.id}
              x1={nodes[0].x + 40}
              y1={nodes[0].y + 12}
              x2={node.x + 40}
              y2={node.y + 12}
              stroke="var(--accent-base)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>

      {/* Nodes container */}
      <div className="relative flex-1">
        {nodes.map((node) => (
          <motion.span
            key={node.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ left: node.x, top: node.y }}
            className="absolute px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-card-base dark:bg-zinc-900 border border-accent-base/30 text-accent-base shadow-xs"
          >
            {node.label}
          </motion.span>
        ))}
      </div>

      {/* Form Input */}
      <form onSubmit={handleAddNode} className="relative z-10 flex gap-1.5 mt-auto">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type secure keyword..."
          className="flex-1 px-2.5 py-1.5 rounded-sm bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 text-[11px] font-mono outline-hidden focus:border-accent-base placeholder-text-secondary/40"
        />
        <button type="submit" className="p-1.5 bg-accent-base text-white rounded-sm hover:bg-accent-base/90">
          <Plus size={12} />
        </button>
      </form>
    </div>
  );
}

// --- INTERACTIVE EXPENSE WIDGET ---
function ExpenseTrackerWidget() {
  const [logs, setLogs] = useState<{ label: string; amount: number; tag: string }[]>([
    { label: 'Coffee run', amount: 4.5, tag: '#food' },
    { label: 'Server bill', amount: 15.0, tag: '#hosting' },
  ]);
  const [cmd, setCmd] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmd.trim()) return;

    // Syntax: "<amount> <label> <#tag>" (e.g. "12 dinner #social")
    const parts = cmd.split(' ');
    const amountVal = parseFloat(parts[0]);
    if (isNaN(amountVal)) {
      setCmd('');
      return;
    }

    const tagIdx = parts.findIndex(p => p.startsWith('#'));
    const tag = tagIdx !== -1 ? parts[tagIdx] : '#general';
    
    // Extract label: slice amount and tag
    const labelParts = parts.slice(1, tagIdx !== -1 ? tagIdx : undefined);
    const label = labelParts.length > 0 ? labelParts.join(' ') : 'Transaction';

    setLogs(prev => [...prev, { label, amount: amountVal, tag }]);
    setCmd('');
  };

  const total = logs.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-full h-48 bg-bg-base dark:bg-zinc-950/80 rounded-sm p-3.5 border border-border-base/55 dark:border-zinc-850 flex flex-col justify-between font-mono text-[11px]">
      {/* Logs Table */}
      <div className="space-y-1.5 max-h-[90px] overflow-y-auto pr-1">
        {logs.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-text-secondary dark:text-zinc-400">
            <span className="truncate max-w-[120px]">{item.label}</span>
            <div className="flex gap-2 items-center">
              <span className="text-accent-base/70 dark:text-accent-base/80">{item.tag}</span>
              <span className="font-bold text-text-primary dark:text-zinc-200">${item.amount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Console & Total */}
      <div className="mt-2 border-t border-border-base/40 dark:border-zinc-900 pt-2 flex flex-col gap-2">
        <div className="flex justify-between text-[10px] text-text-secondary dark:text-zinc-500 font-bold uppercase tracking-wide">
          <span>Logs: {logs.length} items</span>
          <span>Sum: ${total.toFixed(2)}</span>
        </div>
        <form onSubmit={handleCommand} className="flex gap-1.5">
          <input
            type="text"
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder='Type: "12 dinner #social" & hit Enter'
            className="flex-1 px-2.5 py-1.5 rounded-sm bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 text-[11px] outline-hidden focus:border-accent-base placeholder-text-secondary/40"
          />
        </form>
      </div>
    </div>
  );
}

// --- INTERACTIVE KHABRI WIDGET ---
function KhabriWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2.5;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-48 bg-bg-base dark:bg-zinc-950/80 rounded-sm p-4 border border-border-base/55 dark:border-zinc-850 flex flex-col justify-between">
      {/* Player Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[9px] font-bold text-accent-base tracking-wider uppercase bg-accent-base/15 px-2 py-0.5 rounded">Daily Briefing</span>
          <p className="text-[12px] font-bold text-text-primary dark:text-zinc-200 mt-1.5">AI Tech Digest Podcast</p>
        </div>
        
        {/* Blinking wave equalizer dots */}
        <div className="flex items-end gap-0.6 h-4 pt-1">
          {[1, 2, 3, 4].map((dot) => (
            <motion.span
              key={dot}
              animate={isPlaying ? { height: [4, 14, 4] } : { height: 4 }}
              transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
              className="w-1 bg-accent-base rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Progress & Title details */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-accent-base text-white flex items-center justify-center hover:scale-103 active:scale-97 transition"
          >
            {isPlaying ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" className="ml-0.5" />}
          </button>
          
          <div className="flex-1 space-y-1">
            <div className="w-full h-1 bg-border-base dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-accent-base" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-text-secondary dark:text-zinc-500">
              <span>{isPlaying ? '0:14' : '0:00'}</span>
              <span>1:30</span>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] font-mono text-text-secondary dark:text-zinc-550 leading-tight">
          {isPlaying ? '⚡ Summarizing 12 RSS article newsletters...' : 'Paused — press play to listen'}
        </p>
      </div>
    </div>
  );
}

// --- MAIN HOME COMPONENT ---
export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } }
  };

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
      
      {/* Hero Section */}
      <section className="pt-8 md:pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-accent-base/10 text-accent-base text-[12px] font-semibold tracking-wide uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-base animate-pulse"></span>
            <span>Available for Select Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            className="text-[48px] md:text-[76px] lg:text-[84px] font-extrabold tracking-tight leading-[0.95] text-text-primary text-left"
          >
            Engineering ideas<br />
            <span className="text-text-secondary dark:text-zinc-550">into experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
            className="mt-6 text-[16px] md:text-[18px] text-text-secondary dark:text-zinc-400 max-w-xl leading-relaxed font-normal"
          >
            Building products that simplify people's lives using AI, automation and modern web technologies. Focus on high performance, minimal design, and intentional code.
          </motion.p>

          {/* Interactive Console Prompt Hint */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 flex items-center gap-2 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded px-3 py-1.5 text-[11px] font-mono text-text-secondary select-none"
          >
            <span className="text-accent-base font-bold">⌘K</span>
            <span>Keyboard Trigger active — try searching now</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <Link
              href="/projects"
              className="px-6 py-3 rounded-sm bg-accent-base text-white text-[14px] font-semibold hover:bg-accent-base/90 active:scale-97 transition"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-sm bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 text-text-primary dark:text-zinc-200 text-[14px] font-semibold hover:bg-bg-base dark:hover:bg-zinc-800 active:scale-97 transition"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        {/* Hero Widget Visual Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
            className="w-full max-w-[420px] aspect-[4/3] p-5 rounded-lg bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 shadow-xl dark:shadow-2xl/40 flex flex-col justify-between transition-shadow relative overflow-hidden"
          >
            {/* Glossy lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 dark:to-white/[0.02] pointer-events-none" />

            {/* Window Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <span className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <span className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="text-[11px] font-mono text-text-secondary dark:text-zinc-550 flex items-center gap-1.5 bg-bg-base dark:bg-zinc-950 px-2 py-0.5 rounded border border-border-base/50 dark:border-zinc-850">
                <Terminal size={10} className="text-accent-base" />
                <span>memovault.tsx</span>
              </div>
            </div>

            {/* Main Mock Content */}
            <div className="my-auto font-mono text-[12px] text-text-secondary dark:text-zinc-400 space-y-2">
              <p className="text-accent-base font-semibold">// Local AI Embedding Generation</p>
              <div className="p-3.5 bg-bg-base dark:bg-zinc-950 rounded-sm border border-border-base/50 dark:border-zinc-850 space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-text-secondary dark:text-zinc-500 border-b border-border-base/30 dark:border-zinc-900 pb-1">
                  <span>all-MiniLM-L6-v2.onnx</span>
                  <span className="text-green-500 font-bold">READY</span>
                </div>
                <div className="pt-1 text-[11px] font-medium text-text-primary dark:text-zinc-200">
                  <span className="text-accent-base">const</span> search = <span className="text-text-secondary dark:text-zinc-500">"semantic memory graph"</span>;
                </div>
                <div className="text-[10px] text-text-secondary dark:text-zinc-500">
                  ⚡ Inference delay: 14ms (Client-Side)
                </div>
              </div>
            </div>

            {/* Mock footer with stats */}
            <div className="flex items-center justify-between border-t border-border-base/60 dark:border-zinc-880 pt-3">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-base" />
                <span className="text-[11px] text-text-secondary dark:text-zinc-500">Node Cluster: Live</span>
              </div>
              <div className="text-[11px] font-mono text-text-primary dark:text-zinc-300">
                98.4% Efficiency
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="pt-24 border-t border-border-base dark:border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-[32px] md:text-[46px] font-extrabold tracking-tight text-text-primary leading-none">
              Featured Products
            </h2>
            <p className="text-[14px] md:text-[16px] text-text-secondary dark:text-zinc-400 mt-3 max-w-lg">
              Below are live micro-widgets demonstrating each product's functionality. Play, test, and type commands directly in the cards.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent-base group hover:underline"
          >
            <span>All Case Studies</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* MemoVault Project Card */}
          <motion.article
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="group bg-card-base dark:bg-zinc-900 rounded-lg border border-border-base dark:border-zinc-800/80 p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-none"
          >
            <div>
              {/* Interactive Widget */}
              <div className="w-full mb-6">
                <MemoVaultWidget />
              </div>

              <h3 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <Shield size={18} className="text-accent-base" />
                <span>MemoVault</span>
              </h3>
              <p className="text-[14px] text-text-secondary dark:text-zinc-450 mt-2.5 leading-relaxed font-normal">
                An end-to-end encrypted AI-powered memory repository and semantic note-taking assistant. Vectors nodes locally in-browser.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border-base/40 dark:border-zinc-850 flex items-center justify-between text-[13px] font-semibold">
              <div className="flex gap-4">
                <Link href="https://github.com/therajatdua/memovault" target="_blank" rel="noopener noreferrer" className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1">
                  <Github size={13} />
                  <span>GitHub</span>
                </Link>
                <Link href="https://memovault.example.com" className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1">
                  <ExternalLink size={13} />
                  <span>Demo</span>
                </Link>
              </div>
              <Link
                href="/projects/memovault"
                className="text-accent-base hover:underline inline-flex items-center gap-0.5"
              >
                <span>Case Study</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.article>

          {/* Expense Tracker Project Card */}
          <motion.article
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="group bg-card-base dark:bg-zinc-900 rounded-lg border border-border-base dark:border-zinc-800/80 p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-none"
          >
            <div>
              {/* Interactive Widget */}
              <div className="w-full mb-6">
                <ExpenseTrackerWidget />
              </div>

              <h3 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <Terminal size={18} className="text-accent-base" />
                <span>Expense Tracker</span>
              </h3>
              <p className="text-[14px] text-text-secondary dark:text-zinc-450 mt-2.5 leading-relaxed font-normal">
                A keyboard-first automated expense command console integrated with Siri and custom iOS Shortcuts.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border-base/40 dark:border-zinc-850 flex items-center justify-between text-[13px] font-semibold">
              <div className="flex gap-4">
                <Link href="https://github.com/therajatdua/expense-tracker" target="_blank" rel="noopener noreferrer" className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1">
                  <Github size={13} />
                  <span>GitHub</span>
                </Link>
                <Link href="/expense-tracker" className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1">
                  <ExternalLink size={13} />
                  <span>Demo</span>
                </Link>
              </div>
              <Link
                href="/projects/expense-tracker"
                className="text-accent-base hover:underline inline-flex items-center gap-0.5"
              >
                <span>Case Study</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.article>

          {/* Khabri Project Card */}
          <motion.article
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="group bg-card-base dark:bg-zinc-900 rounded-lg border border-border-base dark:border-zinc-800/80 p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-none"
          >
            <div>
              {/* Interactive Widget */}
              <div className="w-full mb-6">
                <KhabriWidget />
              </div>

              <h3 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <Compass size={18} className="text-accent-base" />
                <span>Khabri</span>
              </h3>
              <p className="text-[14px] text-text-secondary dark:text-zinc-450 mt-2.5 leading-relaxed font-normal">
                An autonomous news agent summarizing newsletter RSS feeds and tech articles into automated morning briefs.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border-base/40 dark:border-zinc-850 flex items-center justify-between text-[13px] font-semibold">
              <div className="flex gap-4">
                <Link href="https://github.com/therajatdua/khabri" target="_blank" rel="noopener noreferrer" className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1">
                  <Github size={13} />
                  <span>GitHub</span>
                </Link>
                <Link href="https://khabri.example.com" className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1">
                  <ExternalLink size={13} />
                  <span>Demo</span>
                </Link>
              </div>
              <Link
                href="/projects/khabri"
                className="text-accent-base hover:underline inline-flex items-center gap-0.5"
              >
                <span>Case Study</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.article>
        </motion.div>
      </section>

      {/* Current Focus Section */}
      <section className="pt-28">
        <h2 className="text-[32px] md:text-[46px] font-extrabold tracking-tight text-text-primary mb-10 leading-none">
          Current Focus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded bg-accent-base/10 text-accent-base flex items-center justify-center mb-4"><Cpu size={14} /></span>
              <h4 className="text-[15px] font-bold text-text-primary dark:text-zinc-200 uppercase tracking-wider">Currently Building</h4>
              <div className="mt-4 space-y-3">
                {now.currentlyBuilding.map((item, idx) => (
                  <div key={idx} className="text-[14px]">
                    <p className="font-semibold text-text-primary dark:text-zinc-300 leading-tight">{item.title}</p>
                    <p className="text-text-secondary dark:text-zinc-550 mt-1 leading-snug">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded bg-accent-base/10 text-accent-base flex items-center justify-center mb-4"><Layers size={14} /></span>
              <h4 className="text-[15px] font-bold text-text-primary dark:text-zinc-200 uppercase tracking-wider">Learning</h4>
              <ul className="mt-4 space-y-3 list-none">
                {now.learning.map((learn, idx) => (
                  <li key={idx} className="text-[14px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
                    {learn}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded bg-accent-base/10 text-accent-base flex items-center justify-center mb-4"><BookOpen size={14} /></span>
              <h4 className="text-[15px] font-bold text-text-primary dark:text-zinc-200 uppercase tracking-wider">Reading</h4>
              <div className="mt-4 space-y-3">
                {now.reading.map((book, idx) => (
                  <div key={idx} className="text-[14px]">
                    <p className="font-semibold text-text-primary dark:text-zinc-300 leading-tight">{book.title}</p>
                    <p className="text-text-secondary dark:text-zinc-550 mt-1">by {book.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded bg-accent-base/10 text-accent-base flex items-center justify-center mb-4"><Compass size={14} /></span>
              <h4 className="text-[15px] font-bold text-text-primary dark:text-zinc-200 uppercase tracking-wider">Creating</h4>
              <ul className="mt-4 space-y-3 list-none">
                {now.creating.map((item, idx) => (
                  <li key={idx} className="text-[14px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="pt-28 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-[32px] md:text-[46px] font-extrabold tracking-tight text-text-primary leading-none">
              Featured Resources
            </h2>
            <p className="text-[14px] md:text-[16px] text-text-secondary dark:text-zinc-400 mt-3 max-w-lg">
              Downloadable setup libraries, iOS shortcuts, and prompting playbooks curated for developers.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent-base group hover:underline"
          >
            <span>All Developer Resources</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res) => (
            <Link
              key={res.slug}
              href={`/resources/${res.slug}`}
              className="group p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg hover:border-text-secondary/40 dark:hover:border-zinc-700/80 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-accent-base bg-accent-base/10 px-2 py-0.5 rounded">
                    {res.category}
                  </span>
                  <span className="text-[11px] font-mono text-text-secondary dark:text-zinc-550">{res.version}</span>
                </div>
                <h3 className="text-[20px] font-bold text-text-primary dark:text-zinc-200 mt-4 tracking-tight group-hover:text-accent-base transition-colors">
                  {res.title}
                </h3>
                <p className="text-[14px] text-text-secondary dark:text-zinc-455 mt-2 leading-relaxed">
                  {res.description}
                </p>
              </div>
              <div className="mt-8 text-[13px] font-semibold text-text-primary dark:text-zinc-300 inline-flex items-center gap-1 border-t border-border-base/40 dark:border-zinc-850 pt-4 w-full">
                <span>View Documentation</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
