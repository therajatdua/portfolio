"use client"
import React from 'react';
import Link from 'next/link';
import { Camera, Cpu, Download, ArrowUpRight, Video, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Youtube = ({ size = 14, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function YouTubeCreatorHub() {
  const gear = [
    { name: 'Sony FX30 Cinema Camera', desc: 'Main camera for talking head shots and tech showcases.' },
    { name: 'Sony E 15mm f/1.4 Lens', desc: 'Ultrawide prime lens, creating clean depth of field blur.' },
    { name: 'Shure SM7B Microphone', desc: 'Studio vocal recording microphone. Mated to Focusrite Scarlett.' },
    { name: 'Aputure Amaran 100D LED', desc: 'Key light filtered through light dome softboxes.' }
  ];

  const apps = [
    { name: 'DaVinci Resolve Studio', desc: 'Primary color grading and video timeline cutting software.' },
    { name: 'ScreenFlow', desc: 'High frame-rate desktop video record software for tutorials.' },
    { name: 'Figma', desc: 'Designing all high contrast thumbnails and graphical layouts.' }
  ];

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1200px]">
      
      {/* Creator Hero */}
      <section className="py-12 md:py-20 border-b border-border-base dark:border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-red-600/10 text-red-600 text-[12px] font-bold uppercase tracking-wider">
            <Youtube size={14} />
            <span>Tech Creator</span>
          </div>

          <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
            YouTube Creator Hub
          </h1>

          <p className="text-[18px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
            Behind the scenes of the channel. Discover my complete video editing pipeline, recording gear setups, and recommended production softwares.
          </p>
        </motion.div>
      </section>

      {/* Editing Workflow & Pipeline */}
      <section className="py-20 border-b border-border-base dark:border-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-[24px] font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Video size={20} className="text-accent-base" />
            <span>Production Workflow</span>
          </h2>
          <p className="text-[15px] text-text-secondary dark:text-zinc-400 leading-relaxed">
            Every video goes through a rigid, automated pipeline to maximize quality and consistency. From raw concepts in Notion to multi-cam color mapping.
          </p>
          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded bg-accent-base/10 text-accent-base flex items-center justify-center text-[12px] font-bold">1</span>
              <div>
                <h4 className="text-[14px] font-bold text-text-primary dark:text-zinc-200">Scripting & Coding</h4>
                <p className="text-[12px] text-text-secondary dark:text-zinc-500 mt-0.5">Drafting code blocks in markdown and organizing talking points in Notion.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded bg-accent-base/10 text-accent-base flex items-center justify-center text-[12px] font-bold">2</span>
              <div>
                <h4 className="text-[14px] font-bold text-text-primary dark:text-zinc-200">Screen Capture & A-Roll</h4>
                <p className="text-[12px] text-text-secondary dark:text-zinc-500 mt-0.5">Recording 4K displays at 60fps and talking-head files in cinema log settings.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded bg-accent-base/10 text-accent-base flex items-center justify-center text-[12px] font-bold">3</span>
              <div>
                <h4 className="text-[14px] font-bold text-text-primary dark:text-zinc-200">Audio Sync & Grade</h4>
                <p className="text-[12px] text-text-secondary dark:text-zinc-500 mt-0.5">Syncing SM7B waveforms and applying customized LUT color-matching curves.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {/* Workflow Graph mock widget */}
          <div className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded-lg shadow-xs flex flex-col justify-between h-full min-h-[300px]">
            <div className="flex justify-between items-center border-b border-border-base/50 dark:border-zinc-850 pb-4 mb-4">
              <span className="text-[12px] font-mono text-text-secondary dark:text-zinc-500">pipeline_stage.config</span>
              <span className="text-[11px] bg-accent-base/10 text-accent-base px-2 py-0.5 rounded font-mono font-bold">VLOG_SETUP</span>
            </div>
            
            <div className="space-y-4 font-mono text-[12px] my-auto">
              <div className="flex justify-between p-3 bg-bg-base dark:bg-zinc-950 rounded-sm border border-border-base/50 dark:border-zinc-850">
                <span className="text-text-primary dark:text-zinc-300">RAW_CAPTURE.MXF</span>
                <span className="text-text-secondary dark:text-zinc-500">4K Log-C (24fps)</span>
              </div>
              <div className="flex justify-between p-3 bg-bg-base dark:bg-zinc-950 rounded-sm border border-border-base/50 dark:border-zinc-850">
                <span className="text-text-primary dark:text-zinc-300">LUT_PROFILE_APPLIED</span>
                <span className="text-green-500">ACTIVE (REC709)</span>
              </div>
              <div className="flex justify-between p-3 bg-bg-base dark:bg-zinc-950 rounded-sm border border-border-base/50 dark:border-zinc-850">
                <span className="text-text-primary dark:text-zinc-300">EXPORTS_RENDER_BITRATE</span>
                <span className="text-text-secondary dark:text-zinc-500">80 Mbps h.265</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Gear & Softwares */}
      <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Camera Gear */}
        <div className="space-y-6">
          <h2 className="text-[20px] font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Camera size={18} className="text-accent-base" />
            <span>Studio Equipment</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {gear.map((item, idx) => (
              <div key={idx} className="p-5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded-lg">
                <h4 className="text-[14px] font-bold text-text-primary dark:text-zinc-200">{item.name}</h4>
                <p className="text-[12px] text-text-secondary dark:text-zinc-500 mt-1 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editing Apps */}
        <div className="space-y-6">
          <h2 className="text-[20px] font-bold text-text-primary tracking-tight flex items-center gap-2">
            <PenTool size={18} className="text-accent-base" />
            <span>Production Softwares</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {apps.map((item, idx) => (
              <div key={idx} className="p-5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 rounded-lg">
                <h4 className="text-[14px] font-bold text-text-primary dark:text-zinc-200">{item.name}</h4>
                <p className="text-[12px] text-text-secondary dark:text-zinc-500 mt-1 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
