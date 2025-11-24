export class Level {
  constructor(game) {
    this.game = game;
    this.floorY = 350;
    this.platforms = [];
    this.backgroundX = 0;
  }

  update(dt, playerSpeed) {
    // Parallax background scroll
    this.backgroundX -= playerSpeed * 0.5;
    if (this.backgroundX <= -800) this.backgroundX = 0;
  }

  draw(ctx, assets) {
    // Draw Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.game.width, this.game.height);
    
    // Draw distant mountains/jungle (procedural for now)
    ctx.fillStyle = '#004400';
    for(let i=0; i<10; i++) {
      ctx.beginPath();
      ctx.moveTo(this.backgroundX + i*200, 400);
      ctx.lineTo(this.backgroundX + i*200 + 100, 200);
      ctx.lineTo(this.backgroundX + i*200 + 200, 400);
      ctx.fill();
    }

    // Draw Floor
    const tile = assets.images.tiles;
    if (tile) {
      for (let x = 0; x < this.game.width; x += 32) {
        // Draw grass tile
        ctx.drawImage(tile, 0, 0, 32, 32, x, this.floorY, 32, 32);
        // Draw dirt below
        ctx.fillStyle = '#5c3a1e';
        ctx.fillRect(x, this.floorY + 32, 32, 200);
      }
    }
  }
}
