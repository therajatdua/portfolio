export class Bullet {
  constructor(x, y, dx, dy, type = 'normal') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.type = type;
    this.width = 6;
    this.height = 6;
    this.active = true;
    this.speed = 8;
    
    if (type === 'spread') {
      this.width = 8;
      this.height = 8;
      this.speed = 6;
    } else if (type === 'laser') {
      this.width = 16;
      this.height = 4;
      this.speed = 12;
    }
  }

  update() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.type === 'spread' ? '#ff0000' : '#ffff00';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width/2, 0, Math.PI*2);
    ctx.fill();
  }
}
