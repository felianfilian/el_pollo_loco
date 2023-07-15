class Throwable extends Movable {
  forceX = 10;

  constructor(x, y, direction) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 90;
    this.width = 70;
    if (direction == true) {
      this.forceX = -10;
    }
    console.log(this.direction);
    this.throw(this.x, this.y);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += this.forceX;
    }, 25);
  }
}
