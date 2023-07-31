class Movable extends Drawable {
  speed = 0.4;
  speedY = 0;
  acceleration = 2.5;
  groundLevel = 140;
  energy = 100;

  lookLeft = false;
  lastHit = 0;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
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
      if (!this.isGrounded() || this.speedY > 0) {
        this.y -= this.speedY;
        if (this.y > this.groundLevel) {
          this.y = this.groundLevel;
        }
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  isGrounded() {
    return this.y >= this.groundLevel;
  }

  draw(ctx) {}

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width + obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  getDamage(damage) {
    this.energy -= damage;

    if (this.energy <= 0) {
      this.energy = 0;
    } else {
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
}
