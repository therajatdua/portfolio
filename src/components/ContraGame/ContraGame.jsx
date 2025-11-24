import React, { useEffect, useRef } from 'react';
import { Game } from './engine/Game';
import { FaTimes } from 'react-icons/fa';

const ContraGame = ({ onClose }) => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      const game = new Game(canvasRef.current);
      game.init();
      gameRef.current = game;
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="relative liquid-glass p-4">
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-retroCta text-white p-2 rounded-full pixel-border hover:scale-110 transition-transform z-10"
        >
          <FaTimes />
        </button>
        
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={450} 
          className="w-full max-w-[800px] bg-[#000] pixel-border"
          style={{ imageRendering: 'pixelated' }}
        />
        
        <div className="mt-4 text-center font-press text-xs text-retroText bg-black/50 p-2 rounded">
          <p className="hidden md:block text-white">
            <span className="text-retroAccent">ARROWS</span> Move • 
            <span className="text-retroAccent"> X</span> Jump • 
            <span className="text-retroAccent"> Z</span> Shoot • 
            <span className="text-retroAccent"> C</span> Switch Weapon
          </p>
          <p className="md:hidden text-white">Keyboard required for full experience</p>
        </div>
      </div>
    </div>
  );
};

export default ContraGame;
