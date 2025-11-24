export class InputHandler {
  constructor() {
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      jump: false, // X
      shoot: false, // Z
      switch: false, // C
      start: false // Enter
    };
    this.lastKeys = { ...this.keys };

    window.addEventListener('keydown', (e) => this.handleKey(e, true));
    window.addEventListener('keyup', (e) => this.handleKey(e, false));
  }

  handleKey(e, isDown) {
    // Prevent default scrolling
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }

    switch(e.code) {
      case 'ArrowUp': this.keys.up = isDown; break;
      case 'ArrowDown': this.keys.down = isDown; break;
      case 'ArrowLeft': this.keys.left = isDown; break;
      case 'ArrowRight': this.keys.right = isDown; break;
      case 'KeyX': this.keys.jump = isDown; break;
      case 'KeyZ': this.keys.shoot = isDown; break;
      case 'KeyC': this.keys.switch = isDown; break;
      case 'Enter': this.keys.start = isDown; break;
    }
  }

  update() {
    this.lastKeys = { ...this.keys };
  }

  isPressed(key) {
    return this.keys[key] && !this.lastKeys[key];
  }
}
