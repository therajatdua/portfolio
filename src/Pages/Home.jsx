import React, { useState } from 'react';
import { profile } from '../data';
import { motion } from 'framer-motion';
import profileImg from '../img/profile_img.png';
import SafeLiquidGlass from '../components/LiquidGlass/SafeLiquidGlass';

export default function Home() {
  const [showEffect] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20 relative px-4">
      {showEffect && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <SafeLiquidGlass intensity={0.2} speed={0.15} color="#8B5CF6" mode="auto" />
        </div>
      )}

      <motion.section className="site-max mx-auto hero-gradient relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-40 h-40 md:w-56 md:h-56 glass-soft flex items-center justify-center overflow-hidden rounded-lg">
            <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-sm uppercase text-muted">Hey, I build thoughtful interfaces</h2>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">{profile.name}</h1>
          <p className="text-sm text-muted mt-3 max-w-xl">{profile.title} • {profile.location}</p>
          <p className="mt-4 text-base max-w-xl text-muted">{profile.bio}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/resume3.pdf" className="pill">Resume</a>
            <a href="https://github.com/therajatdua" target="_blank" rel="noreferrer" className="glass-soft px-4 py-2 rounded-md">GitHub</a>
            <a href="https://linkedin.com/in/therajatdua" target="_blank" rel="noreferrer" className="glass-soft px-4 py-2 rounded-md">LinkedIn</a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
