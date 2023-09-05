class World {
  ctx;
  canvas;
  gameActive;
  keyboard;
  camera_x = -100;

  character = new Character(100, 80);
  throwable = [];

  // show the collider boxes
  showCollossions = false;

  endBossTrigger_x = 1600;

  // UI elements
  healthUI = new HealthUI(20, 20, 60, 200);
  endbossUI = new EndbossUI(220, 400, 60, 200);
  coinUI = new CoinUI(20, 80, 40, 40);
  bottleUI = new BottleUI(18, 120, 50, 50);

  // set level
  level = level01;

  sound = new Sound();

  nextBottle = true;

  constructor(canvas, keyboard) {
    this.gameActive = true;
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

  /**
   * basic game routine
   * update() loop
   */

  run() {
    setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    if (this.gameActive) {
      this.checkCollissions();
    }
  }

  /**
   * draw elements on canvas
   */

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

  /**
   * draw UI elements
   */

  drawMainUI() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToCanvas(this.healthUI);
    if (this.level.enemies[0].active) {
      this.addToCanvas(this.endbossUI);
    }
    this.addToCanvas(this.coinUI);
    this.addToCanvas(this.bottleUI);

    // show Energy, Coins and bottles
    this.showHUDtext(this.character.energy, 40, 62, "16px Arial");
    this.showHUDtext(this.character.coins, 80, 108, "20px Arial");
    this.showHUDtext(
      this.character.bottles + " / " + this.character.maxBottles,
      94,
      154,
      "20px Arial"
    );

    this.ctx.translate(this.camera_x, 0);
  }

  showHUDtext(hudText, x, y, font) {
    this.ctx.font = font;
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(hudText, x, y);
  }

  setworld() {
    this.character.world = this;
  }

  /**
   * draw items to the canvas
   * @param {*} drawItems
   */

  addArrayToCanvas(drawItems) {
    drawItems.forEach((drawItem) => {
      this.addToCanvas(drawItem);
    });
  }

  /**
   * show images on the canvas
   * @param drawItem image to draw
   */

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

  /**
   * flip image to change directioen to left or right
   * @param {*} drawItem - the imge to flip
   */

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

  /**
   * Collission check routine
   * collission elements: character, enemies, coins, bottles
   */

  checkCollissions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.isHurt() &&
        enemy.active
      ) {
        this.characterEnemyCollission(enemy);
      }
    });
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
        this.sound.playSFX(2);
        this.character.coins++;
      }
    });
    this.level.bottles.forEach((bottle, bottle_index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(bottle_index);
      }
    });
    this.throwable.forEach((bottle, bottle_index) => {
      this.level.enemies.forEach((enemy, enemy_index) => {
        this.bottleHitsEnemy(enemy, bottle, enemy_index, bottle_index);
      });
    });
  }

  /**
   * enemy and character are colliding
   * @param enemy which enemy to collide with
   */

  characterEnemyCollission(enemy) {
    if (this.character.aboveGround() && this.character.speedY < 0) {
      this.character.jump(20);
      enemy.energy--;
      enemy.active = false;
      this.sound.playSFX(6);
      this.sound.playSFX(7);
    } else {
      this.character.playerDamage(5);
      this.healthUI.setPercentage(
        Math.round((this.character.energy / this.character.maxEnergy) * 100)
      );
      this.txtEnergy();
    }
  }

  /**
   * add bottle to inventory
   * @param bottle_index index of the uncollected bottle in the level.bottles array
   */

  collectBottle(bottle_index) {
    if (this.character.bottles < this.character.maxBottles) {
      this.level.bottles.splice(bottle_index, 1);
      this.sound.playSFX(3);
      this.character.bottles++;
    }
  }

  /**
   * enemy is hitted by a bottle
   * @param enemy array of enemies
   * @param bottle array of bottles
   * @param enemy_index actual enemy index in array
   * @param bottle_index actual bottle index in array
   */

  bottleHitsEnemy(enemy, bottle, enemy_index, bottle_index) {
    if (
      enemy.isColliding(bottle) &&
      bottle.energy > 0 &&
      bottle.aboveGround()
    ) {
      this.destroyBottle(bottle, bottle_index);
      enemy.energy--;
      if (enemy_index == 0) {
        this.BottleHitsBoss(enemy);
      } else if (enemy.energy <= 0) {
        this.sound.playSFX(6);
        enemy.active = false;
      }
    }
  }

  /**
   * special function only if boss is hitted
   * @param enemy boss enemy
   */

  BottleHitsBoss(enemy) {
    if (enemy.energy <= 0) {
      this.sound.playSFX(8);
      setTimeout(() => {
        this.gameActive = false;
        showGameWin();
        this.sound.startBgMusicOnce(3);
      }, 1000);
    } else {
      this.sound.playSFX(6);
      enemy.getsHit();
      this.endbossUI.setPercentage(
        Math.round((enemy.energy / enemy.maxEnergy) * 100)
      );
      enemy.speedX *= 1.1;
    }
  }

  /**
   * destroy bottle when hitting something
   * @param bottle bottle element
   * @param bottle_index index of bottle in the bottles array
   */

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

  /**
   * remove object from an array
   * @param arrayObject whole array
   * @param index index of the element in the array
   * @param time delay time for destroy
   */

  destroyObject(arrayObject, index, time) {
    setTimeout(() => {
      arrayObject.splice(index, 1);
    }, 1000 * time);
  }

  txtEnergy() {
    this.drawMainUI();
  }

  /**
   * check if throwing is possible
   * maybe not enough bottles
   */

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

  /**
   * create clouds with an interval
   */

  drawClouds() {
    setInterval(() => {
      this.level.clouds.push(
        new Cloud("img/5_background/layers/4_clouds/1.png", 719 * 4)
      );
    }, 8000);
  }

  /**
   * create collectibles
   */

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

/**
 * start music and sound
 */

async function startSound() {
  await world.sound.startSound();
}

async function startBgMusic(index) {
  await world.sound.startBgMusic(index);
}
