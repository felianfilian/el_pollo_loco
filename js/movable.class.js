class Movable extends Drawable {
  speedX = 0.4;
  speedY = 0;
  acceleration = 2.5;
  groundLevel = 140;

  lookLeft = false;
  lastHit = 0;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  // how high should the character jump
  jump(jumpForce) {
    this.speedY = jumpForce;
  }

  playAnimation(images) {
    if (this.currentImage >= images.length) {
      this.currentImage = 0;
    }
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images) {
    if (this.deathImage < images.length - 1) {
      let path = images[this.deathImage];
      this.img = this.imageCache[path];
      this.deathImage++;
    }
  }

  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  aboveGround() {
    if (this instanceof Throwable) {
      return true;
    } else {
      return this.y < this.groundLevel;
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.x + this.offset.left <= obj.x + obj.width + obj.offset.right &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  getDamage(damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.stopAllIntervals();
      showGameOver();
    } else {
      this.world.sound.playSFX(4);
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy <= 0;
  }

  intervals = [];

  setStopInterval(func, time) {
    let id = setInterval(func, time);
    this.intervals.push(id);
  }

  stopAllIntervals() {
    this.intervals.forEach(clearInterval);
  }
}
