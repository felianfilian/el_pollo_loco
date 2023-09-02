class World {
  ctx;
  canvas;
  keyboard;
  camera_x = -100;

  character = new Character(100, 80);
  throwable = [];

  showCollossions = false;

  endBossTrigger_x = 1800;

  // UI elements
  healthUI = new HealthUI(20, 20, 60, 200);
  coinUI = new CoinUI(20, 80, 40, 40);
  bottleUI = new BottleUI(18, 120, 50, 50);

  // set level
  level = level01;

  sound = new Sound();

  nextBottle = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.createCoins();
    this.createBottles();
    this.draw();
    this.setworld();
    this.run();
    this.drawClouds();
  }

  // setup update routine
  run() {
    setInterval(() => {
      this.update();
    }, 100);
  }

  update() {
    this.checkCollissions();
  }

  // draw elements on canvas
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addArrayToCanvas(this.level.backgrounds);
    this.addArrayToCanvas(this.level.clouds);
    this.addArrayToCanvas(this.level.bottles);
    this.addArrayToCanvas(this.level.coins);
    this.addArrayToCanvas(this.level.enemies);
    this.addToCanvas(this.character);
    this.addArrayToCanvas(this.throwable);

    this.drawMainUI();

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  // draw UI elements
  drawMainUI() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToCanvas(this.healthUI);
    this.addToCanvas(this.coinUI);
    this.addToCanvas(this.bottleUI);

    // show Energy
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.character.energy, 40, 62);

    // show Coins
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.character.coins, 80, 108);

    // show Bottles
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      this.character.bottles + " / " + this.character.maxBottles,
      94,
      154
    );

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

    if (this.showCollossions) {
      drawItem.drawFrame(this.ctx, drawItem);
    }

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
      if (
        this.character.isColliding(enemy) &&
        !this.character.isHurt() &&
        enemy.active
      ) {
        if (this.character.aboveGround()) {
          this.character.jump(20);
          enemy.energy--;
          enemy.active = false;
          this.sound.playSFX(6);
          this.sound.playSFX(7);
        } else {
          this.character.playerDamage(5);
          this.healthUI.setPercentage(this.character.energy);
          this.txtEnergy();
        }
      }
    });
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
        this.sound.playSFX(2);
        this.character.coins++;
      }
    });
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.bottles < this.character.maxBottles) {
          this.level.bottles.splice(i, 1);
          this.sound.playSFX(3);
          this.character.bottles++;
        }
      }
    });
    this.throwable.forEach((bottle, bottle_index) => {
      this.level.enemies.forEach((enemy, enemy_index) => {
        this.bottleHitsEnemy(enemy, bottle, enemy_index, bottle_index);
      });
      // if (bottle.y > this.canvas.height - 140) {
      //   this.destroyBottle(bottle);
      // }
    });
  }

  bottleHitsEnemy(enemy, bottle, enemy_index, bottle_index) {
    if (
      enemy.isColliding(bottle) &&
      bottle.energy > 0 &&
      bottle.aboveGround()
    ) {
      this.destroyBottle(bottle, bottle_index);
      enemy.energy--;

      enemy.active = false;
    }
  }

  destroyBottle(bottle, bottle_index) {
    bottle.speedY = 0;
    bottle.speedX = 0;
    bottle.forceX = 5;
    bottle.playAnimation(bottle.ANIM_BOTTLE_CRASH);
    bottle.energy -= 100;
    bottle.active = false;
    this.sound.playSFX(5);
    this.destroyObject(this.throwable, bottle_index, 0.5);
  }

  destroyObject(arrayObject, index, time) {
    setTimeout(() => {
      arrayObject.splice(index, 1);
    }, 1000 * time);
  }

  txtEnergy() {
    this.drawMainUI();
  }

  checkThrow() {
    if (this.nextBottle && this.character.bottles > 0) {
      this.character.bottles--;
      this.nextBottle = false;
      let bottle = new Throwable(
        this.character.x + 100,
        this.character.y + 100,
        this.character.lookLeft
      );
      this.throwable.push(bottle);
      setTimeout(() => {
        this.nextBottle = true;
      }, 1000);
    }
  }

  drawClouds() {
    setInterval(() => {
      this.level.clouds.push(
        new Cloud("img/5_background/layers/4_clouds/1.png", 719 * 4)
      );
    }, 5000);
  }

  createCoins() {
    for (let i = 0; i < 10; i++) {
      this.level.coins.push(new Coin());
    }
  }

  createBottles() {
    for (let i = 0; i < 8; i++) {
      this.level.bottles.push(new Bottle());
    }
  }
}

async function startSound() {
  await world.sound.startSound();
}

async function startBgMusic(index) {
  await world.sound.startBgMusic(index);
}
