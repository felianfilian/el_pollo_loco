class Cloud extends Movable {
  y = 20;
  constructor(path) {
    super().loadImage(path);
    this.x = Math.random() * 400;
    this.height = 250;
    this.width = 500;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
