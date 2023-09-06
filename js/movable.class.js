class Movable extends Drawable {
  speedX = 0.4;
  speedY = 0;
  acceleration = 2.5;
  groundLevel = 140;

  lookLeft = false;
  lastHit = 0;

  active = true;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * move object right by speedX
   */
  moveRight() {
    this.x += this.speedX;
  }

  /**
   * move object right by speedY
   */
  moveLeft() {
    this.x -= this.speedX;
  }

  // how high should the character jump
  jump(jumpForce) {
    this.speedY = jumpForce;
  }

  /**
   * play animation loop
   * @param images array
   */
  playAnimation(images) {
    if (this.currentImage >= images.length) {
      this.currentImage = 0;
    }
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * play animation just once
   * @param images array
   */
  playAnimationOnce(images) {
    if (this.deathImage < images.length - 1) {
      let path = images[this.deathImage];
      this.img = this.imageCache[path];
      this.deathImage++;
    }
  }

  /**
   * add gravity over time
   */
  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * check if above ground
   * @returns true or false
   */
  aboveGround() {
    if (this instanceof Throwable) {
      return true;
    } else {
      return this.y < this.groundLevel;
    }
  }

  /**
   * check if colliding with other object
   * @param obj other object
   * @returns true or false
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.x + this.offset.left <= obj.x + obj.width + obj.offset.right &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * player gets damage
   * @param damage number
   */
  playerDamage(damage) {
    this.energy -= damage;
    if (this.energy <= 0 && this.active) {
      this.world.gameActive = false;
      this.energy = 0;
      this.active = false;
      this.stopAllIntervals();
      this.world.sound.startBgMusicOnce(2);
      showGameOver();
    } else if (this.energy > 0) {
      this.world.sound.playSFX(4);
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * character is hitted quite before
   * @returns true or false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy <= 0;
  }

  /**
   * interval handling
   * @param func interval function
   * @param time interval time
   * @param id id of the created interval
   */
  intervals = [];

  setStopInterval(func, time) {
    let id = setInterval(func, time);
    this.intervals.push(id);
  }

  stopAllIntervals() {
    this.intervals.forEach((id) => {
      clearInterval(id);
    });
    this.intervals = [];
  }
}
