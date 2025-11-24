import { Bullet } from './Bullet';

export class Player {
  constructor(game) {
    this.game = game;
    this.x = 100;
    this.y = 100;
    this.width = 24; // Hitbox width
    this.height = 56; // Hitbox height
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    this.jumpForce = -10;
    this.gravity = 0.5;
    this.grounded = false;
    this.facingRight = true;
    this.state = 'idle'; // idle, run, jump, crouch
    this.weapon = 'normal'; // normal, spread, laser
    this.bullets = [];
    this.lastShot = 0;
    this.fireRate = 200; // ms
    this.hp = 3;
    this.invulnerable = 0;
    
    // Animation
    this.frame = 0;
    this.frameTimer = 0;
    this.frameInterval = 100;
  }

  update(input, dt) {
    // Movement
    if (input.keys.left) {
      this.vx = -this.speed;
      this.facingRight = false;
      this.state = 'run';
    } else if (input.keys.right) {
      this.vx = this.speed;
      this.facingRight = true;
      this.state = 'run';
    } else {
      this.vx = 0;
      this.state = 'idle';
    }

    // Jump
    if (input.isPressed('jump') && this.grounded) {
      this.vy = this.jumpForce;
      this.grounded = false;
      this.state = 'jump';
    }

    // Crouch
    if (input.keys.down && this.grounded) {
      this.vx = 0;
      this.state = 'crouch';
    }

    // Physics
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // Ground Collision (Simple floor at y=300 for now, Level class will handle real collision)
    // We'll let the Game class handle map collision, but for basic physics:
    if (this.y + this.height > this.game.level.floorY) {
      this.y = this.game.level.floorY - this.height;
      this.vy = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    // Shooting
    if (input.keys.shoot) {
      const now = Date.now();
      if (now - this.lastShot > this.fireRate) {
        this.shoot(input);
        this.lastShot = now;
      }
    }

    // Animation
    if (this.state === 'run') {
      this.frameTimer += dt;
      if (this.frameTimer > this.frameInterval) {
        this.frame = (this.frame + 1) % 6;
        this.frameTimer = 0;
      }
    } else {
      this.frame = 0;
    }

    // Update Bullets
    this.bullets.forEach(b => b.update());
    this.bullets = this.bullets.filter(b => b.active && b.x > 0 && b.x < this.game.width + 100);
  }

  shoot(input) {
    let dx = this.facingRight ? 1 : -1;
    let dy = 0;

    if (input.keys.up) {
      dy = -1;
      dx = input.keys.right || input.keys.left ? dx : 0;
    } else if (input.keys.down && !this.grounded) {
      dy = 1;
      dx = input.keys.right || input.keys.left ? dx : 0;
    }

    // Spread gun logic
    if (this.weapon === 'spread') {
      this.bullets.push(new Bullet(this.x + 12, this.y + 16, dx, dy, 'spread'));
      this.bullets.push(new Bullet(this.x + 12, this.y + 16, dx, dy - 0.2, 'spread'));
      this.bullets.push(new Bullet(this.x + 12, this.y + 16, dx, dy + 0.2, 'spread'));
    } else {
      this.bullets.push(new Bullet(this.x + 12, this.y + 16, dx, dy, 'normal'));
    }
  }

  draw(ctx, assets) {
    // Draw Bullets
    this.bullets.forEach(b => b.draw(ctx));

    // Draw Player Sprite
    const sprite = assets.images.player;
    if (!sprite) return;

    let sx = 0;
    let sy = 0;

    // Map state to sprite sheet coordinates
    // Row 0: Idle (0), Run (1-6)
    // Row 1: Jump (0), Crouch (1)
    if (this.state === 'idle') {
      sx = 0;
      sy = 0;
    } else if (this.state === 'run') {
      sx = 32 + (this.frame * 32);
      sy = 0;
    } else if (this.state === 'jump') {
      sx = 0;
      sy = 32;
    } else if (this.state === 'crouch') {
      sx = 32;
      sy = 32;
    }

    ctx.save();
    ctx.translate(Math.floor(this.x + this.width/2), Math.floor(this.y + this.height/2));
    if (!this.facingRight) ctx.scale(-1, 1);
    
    // Draw from center
    ctx.drawImage(sprite, sx, sy, 32, 32, -32, -32, 64, 64); // Scale up 2x
    
    ctx.restore();
  }
}
