class Cloud extends Movable {
  y = 10;
  constructor(path, x) {
    super().loadImage(path);
    this.x = x + Math.random() * 100;
    this.y = this.y + Math.random() * 50;
    this.height = 250;
    this.width = 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 30);
  }
}
