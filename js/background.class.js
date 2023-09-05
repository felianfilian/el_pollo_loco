class Background extends Movable {
  x = 0;
  y = 0;
  height = 480;
  width = 720;

  constructor(path, x, y, width = 720, height = 480) {
    super().loadImage(path);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
