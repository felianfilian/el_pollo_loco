class Coin extends Movable {
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 100 + Math.random() * 1800;
    this.y = 100 + Math.random() * 100;
    this.height = 48;
    this.width = 48;
  }
}
