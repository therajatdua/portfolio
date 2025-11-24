export const PALETTE = {
  skin: '#ffccaa',
  red: '#ff0000',
  darkRed: '#880000',
  blue: '#0066cc',
  darkBlue: '#003366',
  green: '#00aa00',
  darkGreen: '#005500',
  black: '#111111',
  white: '#ffffff',
  grey: '#888888',
  darkGrey: '#444444',
  brown: '#8b4513',
  lightBrown: '#cd853f',
  orange: '#ff8800',
  yellow: '#ffff00'
};

export class AssetManager {
  constructor() {
    this.images = {};
    this.sounds = {};
  }

  async init() {
    // Generate sprites programmatically to ensure no missing assets
    this.images.player = this.generatePlayerSprite();
    this.images.enemy = this.generateEnemySprite();
    this.images.boss = this.generateBossSprite();
    this.images.tiles = this.generateTiles();
    this.images.items = this.generateItems();
    this.images.effects = this.generateEffects();
    
    // Generate placeholder sounds (using AudioContext in a real game, but here we might just mock or use simple oscillators if requested, 
    // but for now we'll focus on visuals as requested primarily)
    return true;
  }

  createCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }

  drawPixels(ctx, pixels, w, h, scale = 1) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const color = pixels[y * w + x];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }

  generatePlayerSprite() {
    // 32x32 frames. 
    // Row 0: Idle, Run 1-6
    // Row 1: Jump, Crouch, Shoot Up, Shoot Down-Right
    const c = this.createCanvas(256, 64);
    const ctx = c.getContext('2d');
    
    // Helper to draw a generic commando
    const drawCommando = (ox, oy, pose) => {
      // Simplified pixel art logic
      ctx.fillStyle = PALETTE.skin; // Skin
      ctx.fillRect(ox + 12, oy + 4, 8, 8); // Head
      
      ctx.fillStyle = PALETTE.red; // Bandana
      ctx.fillRect(ox + 11, oy + 4, 10, 3);
      ctx.fillRect(ox + 21, oy + 5, 4, 2); // Tail

      ctx.fillStyle = PALETTE.skin; // Arms
      if (pose === 'run') {
        ctx.fillRect(ox + 8, oy + 14, 4, 8);
        ctx.fillRect(ox + 20, oy + 14, 4, 8);
      } else {
        ctx.fillRect(ox + 8, oy + 12, 4, 8);
        ctx.fillRect(ox + 20, oy + 12, 4, 8);
      }

      ctx.fillStyle = PALETTE.blue; // Pants
      ctx.fillRect(ox + 12, oy + 20, 8, 4); // Waist
      if (pose === 'run') {
        ctx.fillRect(ox + 10, oy + 24, 5, 8); // Leg L
        ctx.fillRect(ox + 17, oy + 24, 5, 8); // Leg R
      } else if (pose === 'jump') {
        ctx.fillRect(ox + 10, oy + 22, 5, 6); // Leg L tucked
        ctx.fillRect(ox + 17, oy + 24, 5, 8); // Leg R
      } else {
        ctx.fillRect(ox + 11, oy + 24, 4, 8); // Leg L
        ctx.fillRect(ox + 17, oy + 24, 4, 8); // Leg R
      }

      ctx.fillStyle = PALETTE.black; // Boots
      ctx.fillRect(ox + 10, oy + 30, 5, 2);
      ctx.fillRect(ox + 17, oy + 30, 5, 2);

      ctx.fillStyle = PALETTE.darkGrey; // Gun
      ctx.fillRect(ox + 16, oy + 16, 12, 4);
      ctx.fillStyle = PALETTE.black;
      ctx.fillRect(ox + 18, oy + 17, 8, 2);
    };

    // Idle
    drawCommando(0, 0, 'idle');
    
    // Run frames
    for(let i=0; i<6; i++) {
      drawCommando(32 + (i*32), (i%2)*2, 'run'); // Bobbing effect
    }

    // Jump
    drawCommando(0, 32, 'jump');

    return c;
  }

  generateEnemySprite() {
    const c = this.createCanvas(128, 32);
    const ctx = c.getContext('2d');
    
    // Soldier
    ctx.fillStyle = PALETTE.green;
    ctx.fillRect(10, 10, 12, 22); // Body
    ctx.fillStyle = PALETTE.darkGreen;
    ctx.fillRect(12, 12, 8, 10); // Vest
    ctx.fillStyle = PALETTE.skin;
    ctx.fillRect(12, 4, 8, 6); // Head
    ctx.fillStyle = PALETTE.darkGreen;
    ctx.fillRect(11, 3, 10, 3); // Helmet
    
    // Gun
    ctx.fillStyle = PALETTE.black;
    ctx.fillRect(8, 18, 16, 4);

    return c;
  }

  generateBossSprite() {
    const c = this.createCanvas(128, 128);
    const ctx = c.getContext('2d');
    
    // Big Alien Heart
    ctx.fillStyle = PALETTE.darkRed;
    ctx.beginPath();
    ctx.arc(64, 64, 40, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = PALETTE.red;
    ctx.beginPath();
    ctx.arc(64, 64, 30, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = PALETTE.yellow;
    ctx.fillRect(50, 50, 10, 10);
    ctx.fillRect(70, 50, 10, 10);

    return c;
  }

  generateTiles() {
    const c = this.createCanvas(128, 128);
    const ctx = c.getContext('2d');
    
    // Grass/Jungle Block (0,0)
    ctx.fillStyle = PALETTE.brown;
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = PALETTE.green;
    ctx.fillRect(0, 0, 32, 8); // Grass top
    ctx.fillStyle = PALETTE.darkGreen;
    ctx.fillRect(0, 8, 32, 4); // Shadow

    // Metal/Base Block (32, 0)
    ctx.fillStyle = PALETTE.grey;
    ctx.fillRect(32, 0, 32, 32);
    ctx.fillStyle = PALETTE.darkGrey;
    ctx.strokeRect(32, 0, 32, 32);
    ctx.beginPath();
    ctx.moveTo(32, 0); ctx.lineTo(64, 32);
    ctx.stroke();

    // Water (64, 0)
    ctx.fillStyle = PALETTE.blue;
    ctx.fillRect(64, 0, 32, 32);
    ctx.fillStyle = PALETTE.white;
    ctx.fillRect(66, 4, 8, 2); // Sparkle

    return c;
  }

  generateItems() {
    const c = this.createCanvas(128, 32);
    const ctx = c.getContext('2d');
    
    const drawBox = (x, letter, color) => {
      ctx.fillStyle = PALETTE.grey;
      ctx.fillRect(x, 0, 24, 24);
      ctx.fillStyle = PALETTE.white;
      ctx.fillRect(x+2, 2, 20, 20);
      ctx.fillStyle = color; // Letter bg
      ctx.fillRect(x+4, 4, 16, 16);
      ctx.fillStyle = PALETTE.white;
      ctx.font = '12px monospace';
      ctx.fillText(letter, x+8, 16);
    };

    drawBox(0, 'M', PALETTE.red);
    drawBox(32, 'S', PALETTE.blue);
    drawBox(64, 'L', PALETTE.yellow);
    
    return c;
  }

  generateEffects() {
    const c = this.createCanvas(128, 32);
    const ctx = c.getContext('2d');
    
    // Explosion frame 1
    ctx.fillStyle = PALETTE.yellow;
    ctx.beginPath();
    ctx.arc(16, 16, 10, 0, Math.PI*2);
    ctx.fill();
    
    // Explosion frame 2
    ctx.fillStyle = PALETTE.orange;
    ctx.beginPath();
    ctx.arc(48, 16, 14, 0, Math.PI*2);
    ctx.fill();

    return c;
  }
}
