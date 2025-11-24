import React from 'react';
import LiquidGlass from './LiquidGlass';

const ExampleHero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-retroBg flex items-center justify-center">
      {/* Background Liquid Effect */}
      <div className="absolute inset-0 z-0 opacity-80">
        <LiquidGlass 
          intensity={0.4} 
          speed={0.5} 
          color="#6666ff" 
          mode="auto" 
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
        <div className="liquid-glass p-8 md:p-12 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-press text-retroText mb-6 drop-shadow-lg">
            Liquid <span className="text-retroAccent">Glass</span>
          </h1>
          <p className="text-lg md:text-xl font-sans text-retroText mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the next generation of web aesthetics. 
            Real-time WebGL fluid morphing with Apple-style glassmorphism.
          </p>
          <button className="pixel-button bg-retroCta text-white hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-retroText">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
};

export default ExampleHero;
