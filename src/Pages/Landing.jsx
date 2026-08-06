import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CardTilt from '../components/CardTilt';

export default function Landing() {
  const [hoveredCard, setHoveredCard] = useState(null); // 'tech', 'social', or null

  const statPills = [
    { label: 'Years Coding', value: '4+' },
    { label: 'Projects Shipped', value: '12+' },
    { label: 'Videos Published', value: '45+' }
  ];

  return (
    <div className="pt-28 pb-16 min-h-[calc(100vh-120px)] site-max px-6 md:px-12 flex flex-col justify-center w-full">
      {/* Intro Hero Section (Left-aligned, off-center) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="max-w-2xl text-left space-y-6 w-full"
      >
        <span className="text-[11px] uppercase font-bold tracking-widest text-brandAccent">
          Welcome
        </span>
        
        <h1 className="text-[clamp(2.5rem,8.5vw,4.5rem)] font-extrabold text-themeText tracking-tight leading-[1.02] font-serif italic">
          Rajat Dua
        </h1>

        <p className="text-[clamp(1rem,3.5vw,1.15rem)] font-sans text-themeTextMuted leading-relaxed max-w-lg font-normal">
          B.Tech CSE student and full-stack developer who also runs two YouTube channels — one tech, one daily vlog/behind-the-scenes.
        </p>
      </motion.div>

      {/* Stats Pills row (Tucked to the left side) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1, ease: 'easeOut' }}
        className="flex flex-wrap gap-3 mt-8 justify-start w-full"
      >
        {statPills.map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 py-2 bg-themeCardBg border border-themeBorder rounded-full shadow-xs text-themeText"
          >
            <span className="text-[13px] font-bold font-mono text-themeText">{stat.value}</span>
            <span className="text-[11px] text-themeTextMuted font-medium">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Two Large Entry Cards (Hover Dims Inactive card) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.18, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 w-full"
      >
        {/* Tech Card (Theme card) */}
        <Link 
          to="/tech" 
          className="group block w-full"
          onMouseEnter={() => setHoveredCard('tech')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardTilt className={`h-full transition-opacity duration-250 ${
            hoveredCard === 'social' ? 'opacity-60' : 'opacity-100'
          }`}>
            <div className="bg-themeCardBg border border-themeBorder hover:border-brandAccent/45 p-8 md:p-10 rounded-2xl shadow-xs transition-colors duration-250 h-full flex flex-col justify-between text-themeText">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-brandAccent uppercase">
                  Software Development
                </span>
                <h3 className="text-[clamp(1.5rem,4.5vw,2rem)] font-extrabold tracking-tight font-serif italic text-themeText">
                  Tech Portfolio
                </h3>
                <p className="text-sm md:text-base text-themeTextMuted leading-relaxed font-normal">
                  Explore full-stack products, semantic AI tools, open-source repositories, developer tools, and my professional resume.
                </p>
              </div>
              
              <div className="mt-8 text-sm font-semibold text-brandAccent inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-200">
                <span>Enter Tech Workspace</span>
                <span>→</span>
              </div>
            </div>
          </CardTilt>
        </Link>

        {/* Social Card (Theme card) */}
        <Link 
          to="/social" 
          className="group block w-full"
          onMouseEnter={() => setHoveredCard('social')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardTilt className={`h-full transition-opacity duration-250 ${
            hoveredCard === 'tech' ? 'opacity-65' : 'opacity-100'
          }`}>
            <div className="bg-themeCardBg border border-themeBorder hover:border-brandAccent/45 p-8 md:p-10 rounded-2xl shadow-xs transition-colors duration-250 h-full flex flex-col justify-between text-themeText">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-brandAccent uppercase">
                  YouTube & Creators
                </span>
                <h3 className="text-[clamp(1.5rem,4.5vw,2rem)] font-extrabold tracking-tight font-serif italic text-themeText">
                  Social Hub
                </h3>
                <p className="text-sm md:text-base text-themeTextMuted leading-relaxed font-normal">
                  Watch scripting and workflow logs, camera gear configurations, editing breakdowns, and latest video tutorials.
                </p>
              </div>
              
              <div className="mt-8 text-sm font-semibold text-brandAccent inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-200">
                <span>Enter Social Hub</span>
                <span>→</span>
              </div>
            </div>
          </CardTilt>
        </Link>
      </motion.div>
    </div>
  );
}
