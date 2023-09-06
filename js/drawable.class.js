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

  /**
   * draw collission frame for debugging
   * @param ctx canvas object
   * @param drawItem image to draw
   */
  drawFrame(ctx, drawItem) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Coin ||
      this instanceof Bottle ||
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
        this.x + drawItem.offset.left,
        this.y + drawItem.offset.top,
        this.width - (drawItem.offset.left + drawItem.offset.right),
        this.height - (drawItem.offset.top + drawItem.offset.bottom)
      );
      ctx.stroke();
    }
  }
}
