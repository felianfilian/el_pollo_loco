class World {
  ctx;
  canvas;
  keyboard;
  camera_x = -100;

  character = new Character(100, 80);
  throwable = [new Throwable(100, 150)];
  mainui = new MainUI();
  level = level01;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setworld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.update();
    }, 100);
  }

  update() {
    this.checkCollissions();
    this.checkTrow();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addArrayToCanvas(this.level.backgrounds);
    this.addToCanvas(this.character);
    this.addArrayToCanvas(this.level.clouds);
    this.addArrayToCanvas(this.level.enemies);
    this.addArrayToCanvas(this.throwable);
    this.drawMainUI();

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawMainUI() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToCanvas(this.mainui);

    // show Energy
    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.character.energy, 120, 68);

    this.ctx.translate(this.camera_x, 0);
  }

  setworld() {
    this.character.world = this;
  }

  addArrayToCanvas(drawItems) {
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
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isHurt()) {
        this.character.getDamage(5);
        this.mainui.setPercentage(this.character.energy);
        this.txtEnergy();
      }
    });
  }

  txtEnergy() {
    this.drawMainUI();
  }

  checkTrow() {
    console.log("throw");
    if (this.keyboard.UP) {
      let bottle = new Throwable(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwable.push(bottle);
    }
  }
}
