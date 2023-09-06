class Bottle extends Movable {
  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 30,
  };

  /**
   * create salsa bottle at random position
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 100 + Math.random() * 1800;
    this.y = canvas.height - 130;
    this.height = 88;
    this.width = 88;
  }
}
