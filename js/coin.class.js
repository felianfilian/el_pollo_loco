class Coin extends Movable {
  constructor(path) {
    super().loadImage(path);
    this.x = (50 + Math.random() * 1800).toFixed();
    this.y = (100 + Math.random() * 100).toFixed();
    this.height = 48;
    this.width = 48;
  }
}
