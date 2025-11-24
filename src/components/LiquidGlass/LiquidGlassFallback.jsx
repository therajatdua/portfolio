import React from 'react';

const LiquidGlassFallback = ({ color = '#6666ff' }) => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        className="w-64 h-64 rounded-full blur-3xl opacity-60 animate-pulse"
        style={{ 
          background: `radial-gradient(circle at 30% 30%, white, ${color})`,
          animationDuration: '4s'
        }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full blur-2xl opacity-40 animate-bounce"
        style={{ 
          background: color,
          animationDuration: '6s',
          top: '40%',
          left: '40%'
        }}
      />
    </div>
  );
};

export default LiquidGlassFallback;