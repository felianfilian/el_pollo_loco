class Drawable {
  x = 120;
  y = 340;
  height = 100;
  width = 100;

  img;
  imageCache = [];
  currentImage = 0;
  deathImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param (Array) arr = ['img/img01.jpg','img/img01.jpg', ...]
   */

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Coin ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "8";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - (this.offset.left + this.offset.right),
        this.height - (this.offset.top + this.offset.bottom)
      );
      ctx.stroke();
    }
  }
}
