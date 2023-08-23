class Bottle extends Movable {
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 100 + Math.random() * 1800;
    this.y = canvas.height - 130;
    this.height = 88;
    this.width = 88;
  }
}
