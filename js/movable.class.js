class Movable {
  x = 120;
  y = 340;
  height = 100;
  width = 100;
  speed = 0.4;
  speedY = 0;
  acceleration = 2.5;
  groundLevel = 140;
  energy = 100;

  img;
  imageChache = [];
  currentImage = 0;
  deathImage = 0;
  lookLeft = false;
  lastHit = 0;

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
      this.imageChache[path] = img;
    });
  }

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
    this.img = this.imageChache[path];
    this.currentImage++;
  }

  playAnimationOnce(images) {
    if (this.deathImage < images.length - 1) {
      let path = images[this.deathImage];
      this.img = this.imageChache[path];
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

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
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
