export class Enemy {
  constructor(x, y, type = 'soldier') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 32;
    this.height = 48;
    this.active = true;
    this.hp = 1;
    this.vx = -1;
    this.frame = 0;
    this.frameTimer = 0;
    
    if (type === 'boss') {
      this.width = 80;
      this.height = 80;
      this.hp = 50;
      this.vx = 0;
    }
  }

  update(dt, player) {
    if (this.type === 'soldier') {
      this.x += this.vx;
      
      // Simple animation
      this.frameTimer += dt;
      if (this.frameTimer > 200) {
        this.frame = (this.frame + 1) % 2;
        this.frameTimer = 0;
      }

      // Remove if off screen
      if (this.x < -50) this.active = false;
    }
  }

  draw(ctx, assets) {
    if (this.type === 'soldier') {
      const sprite = assets.images.enemy;
      if (!sprite) return;
      
      // Simple draw
      ctx.drawImage(sprite, 0, 0, 32, 32, this.x, this.y, 48, 48);
    } else if (this.type === 'boss') {
      const sprite = assets.images.boss;
      if (!sprite) return;
      ctx.drawImage(sprite, 0, 0, 128, 128, this.x, this.y, 128, 128);
    }
  }
}
