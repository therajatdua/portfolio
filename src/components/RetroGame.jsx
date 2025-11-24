import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const RetroGame = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Game constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = -12;
    const SPEED = 5;
    const GROUND_HEIGHT = 50;
    
    // Game state
    let player = {
      x: 50,
      y: canvas.height - GROUND_HEIGHT - 40,
      width: 30,
      height: 40,
      dy: 0,
      grounded: true,
      color: '#000080' // Navy
    };
    
    let bullets = [];
    let enemies = [];
    let particles = [];
    let frameCount = 0;
    let currentScore = 0;
    let isGameOver = false;
    let isRunning = false;
    let isGameStarted = false;

    // Input handling
    const keys = {};
    
    const handleKeyDown = (e) => {
      // Prevent default scrolling for game keys
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      keys[e.code] = true;
      
      if (!isGameStarted && (e.code === 'Space' || e.code === 'Enter')) {
        resetGame();
      } else if (isGameOver && (e.code === 'Space' || e.code === 'Enter')) {
        resetGame();
      }
      
      if (isRunning) {
        if ((e.code === 'ArrowUp' || e.code === 'KeyW') && player.grounded) {
          player.dy = JUMP_FORCE;
          player.grounded = false;
        }
        if (e.code === 'Space') {
          bullets.push({
            x: player.x + player.width,
            y: player.y + player.height / 2,
            width: 10,
            height: 4,
            speed: 10,
            color: '#FFFF00'
          });
        }
      }
    };

    const handleKeyUp = (e) => {
      keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const resetGame = () => {
      player.y = canvas.height - GROUND_HEIGHT - 40;
      player.dy = 0;
      bullets = [];
      enemies = [];
      particles = [];
      currentScore = 0;
      setScore(0);
      isGameOver = false;
      setGameOver(false);
      isRunning = true;
      isGameStarted = true;
      setGameStarted(true);
    };

    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 20,
          color
        });
      }
    };

    const update = () => {
      if (!isRunning) return;

      // Player physics
      player.dy += GRAVITY;
      player.y += player.dy;

      // Ground collision
      if (player.y + player.height > canvas.height - GROUND_HEIGHT) {
        player.y = canvas.height - GROUND_HEIGHT - player.height;
        player.dy = 0;
        player.grounded = true;
      }

      // Move bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].x += bullets[i].speed;
        if (bullets[i].x > canvas.width) {
          bullets.splice(i, 1);
        }
      }

      // Spawn enemies
      if (frameCount % 100 === 0) {
        enemies.push({
          x: canvas.width,
          y: canvas.height - GROUND_HEIGHT - 40,
          width: 30,
          height: 40,
          speed: SPEED + (currentScore * 0.1), // Get faster over time
          color: '#FF0000'
        });
      }

      // Move enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].x -= enemies[i].speed;
        
        // Collision with player
        if (
          player.x < enemies[i].x + enemies[i].width &&
          player.x + player.width > enemies[i].x &&
          player.y < enemies[i].y + enemies[i].height &&
          player.y + player.height > enemies[i].y
        ) {
          isGameOver = true;
          isRunning = false;
          setGameOver(true);
          createExplosion(player.x, player.y, player.color);
        }

        // Collision with bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          if (
            bullets[j].x < enemies[i].x + enemies[i].width &&
            bullets[j].x + bullets[j].width > enemies[i].x &&
            bullets[j].y < enemies[i].y + enemies[i].height &&
            bullets[j].y + bullets[j].height > enemies[i].y
          ) {
            createExplosion(enemies[i].x, enemies[i].y, enemies[i].color);
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            currentScore += 10;
            setScore(currentScore);
            break;
          }
        }

        if (enemies[i] && enemies[i].x + enemies[i].width < 0) {
          enemies.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].life--;
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      frameCount++;
    };

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#2A2A2A'; // Dark Grey background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Ground
      ctx.fillStyle = '#D9D2C8'; // Beige
      ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT);
      
      // Draw "Scanlines"
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for(let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 2);
      }

      if (!isGameStarted) {
        ctx.fillStyle = '#D9D2C8';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('CONTRA-LITE', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '12px "Press Start 2P"';
        ctx.fillText('Press SPACE to Start', canvas.width / 2, canvas.height / 2);
        ctx.fillText('UP to Jump | SPACE to Shoot', canvas.width / 2, canvas.height / 2 + 30);
        return;
      }

      // Draw Player
      if (!isGameOver) {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        // Headband
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(player.x, player.y + 5, player.width, 5);
      }

      // Draw Bullets
      ctx.fillStyle = '#FFFF00';
      bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

      // Draw Enemies
      enemies.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.width, e.height);
        // Enemy eye
        ctx.fillStyle = '#000';
        ctx.fillRect(e.x + 5, e.y + 10, 5, 5);
      });

      // Draw Particles
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
      });

      // Draw Score
      ctx.fillStyle = '#D9D2C8';
      ctx.font = '16px "Press Start 2P"';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${currentScore}`, 20, 40);

      if (isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FF0000';
        ctx.font = '30px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        
        ctx.fillStyle = '#D9D2C8';
        ctx.font = '12px "Press Start 2P"';
        ctx.fillText('Press SPACE to Restart', canvas.width / 2, canvas.height / 2 + 40);
      }
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="relative bg-retroBg p-2 pixel-border">
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-retroCta text-white p-2 rounded-full pixel-border hover:scale-110 transition-transform z-10"
        >
          <FaTimes />
        </button>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full max-w-[800px] bg-[#2A2A2A] pixel-border"
        />
        <div className="mt-4 text-center font-press text-xs text-retroText">
          <p className="hidden md:block">CONTROLS: [UP] Jump • [SPACE] Shoot</p>
          <p className="md:hidden">Tap top to Jump • Tap right to Shoot</p>
        </div>
      </div>
    </div>
  );
};

export default RetroGame;
