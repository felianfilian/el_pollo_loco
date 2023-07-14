class World {
  ctx;
  canvas;
  keyboard;
  camera_x = -100;

  character = new Character(100, 80);
  level = level01;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setworld();
    this.checkCollissions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.iterateDrawObjects(this.level.backgrounds);
    this.addToCanvas(this.character);
    this.iterateDrawObjects(this.level.clouds);
    this.iterateDrawObjects(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setworld() {
    this.character.world = this;
  }

  iterateDrawObjects(drawItems) {
    drawItems.forEach((drawItem) => {
      this.addToCanvas(drawItem);
    });
  }

  addToCanvas(drawItem) {
    if (drawItem.lookLeft) {
      this.flipImage(drawItem);
    }
    this.ctx.drawImage(
      drawItem.img,
      drawItem.x,
      drawItem.y,
      drawItem.width,
      drawItem.height
    );

    // draw collission frame
    drawItem.drawFrame(this.ctx);

    if (drawItem.lookLeft) {
      this.flipImageBack(drawItem);
    }
  }

  flipImage(drawItem) {
    this.ctx.save();
    this.ctx.translate(drawItem.width, 0);
    this.ctx.scale(-1, 1);
    drawItem.x = drawItem.x * -1;
  }

  flipImageBack(drawItem) {
    drawItem.x = drawItem.x * -1;
    this.ctx.restore();
  }

  checkCollissions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !this.character.isHurt()) {
          this.character.getDamage(2);
          console.log("Energy: " + this.character.energy);
        }
      });
    }, 200);
  }
}
