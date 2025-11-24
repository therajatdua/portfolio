import { Player } from './Player';
import { Level } from './Level';
import { Enemy } from './Enemy';
import { InputHandler } from './Input';
import { AssetManager } from './Assets';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.assets = new AssetManager();
    this.input = new InputHandler();
    this.level = new Level(this);
    this.player = new Player(this);
    this.enemies = [];
    
    this.lastTime = 0;
    this.score = 0;
    this.gameOver = false;
    this.isReady = false;
    this.isRunning = false;
    
    this.enemySpawnTimer = 0;
  }

  async init() {
    await this.assets.init();
    this.isReady = true;
    this.isRunning = true;
    this.loop(0);
  }

  stop() {
    this.isRunning = false;
  }

  loop(timestamp) {
    if (!this.isReady || !this.isRunning) return;
    
    const dt = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    if (this.gameOver) {
      if (this.input.isPressed('start')) {
        this.reset();
      }
      this.input.update();
      return;
    }

    this.player.update(this.input, dt);
    this.level.update(dt, this.player.vx);

    // Spawn Enemies
    this.enemySpawnTimer += dt;
    if (this.enemySpawnTimer > 2000) {
      this.enemies.push(new Enemy(this.width + 50, this.level.floorY - 48));
      this.enemySpawnTimer = 0;
    }

    // Update Enemies
    this.enemies.forEach(e => e.update(dt, this.player));
    
    // Collision Detection
    this.checkCollisions();

    // Cleanup
    this.enemies = this.enemies.filter(e => e.active);

    this.input.update();
  }

  checkCollisions() {
    // Bullets vs Enemies
    this.player.bullets.forEach(b => {
      if (!b.active) return;
      this.enemies.forEach(e => {
        if (!e.active) return;
        if (
          b.x > e.x && b.x < e.x + e.width &&
          b.y > e.y && b.y < e.y + e.height
        ) {
          e.hp--;
          b.active = false;
          if (e.hp <= 0) {
            e.active = false;
            this.score += 100;
          }
        }
      });
    });

    // Player vs Enemies
    this.enemies.forEach(e => {
      if (!e.active) return;
      if (
        this.player.x < e.x + e.width &&
        this.player.x + this.player.width > e.x &&
        this.player.y < e.y + e.height &&
        this.player.y + this.player.height > e.y
      ) {
        this.gameOver = true;
      }
    });
  }

  draw() {
    // Clear
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.level.draw(this.ctx, this.assets);
    this.player.draw(this.ctx, this.assets);
    this.enemies.forEach(e => e.draw(this.ctx, this.assets));

    // UI
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px "Press Start 2P", monospace';
    this.ctx.fillText(`SCORE: ${this.score}`, 20, 30);

    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = '#ff0000';
      this.ctx.font = '40px "Press Start 2P", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('GAME OVER', this.width/2, this.height/2);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '20px "Press Start 2P", monospace';
      this.ctx.fillText('Press ENTER to Restart', this.width/2, this.height/2 + 50);
      this.ctx.textAlign = 'left';
    }
  }

  reset() {
    this.score = 0;
    this.gameOver = false;
    this.player = new Player(this);
    this.enemies = [];
    this.enemySpawnTimer = 0;
  }
}
