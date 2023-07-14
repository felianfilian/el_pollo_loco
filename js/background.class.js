class Background extends Movable {
  x = 0;
  y = 0;
  height = 480;
  width = 720;

  constructor(path, x, y) {
    super().loadImage(path);
    this.x = x;
    this.y = y;
  }
}
