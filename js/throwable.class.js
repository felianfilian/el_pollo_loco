class Throwable extends Movable {
  energy = 10;
  forceX = 10;

  ANIM_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  ANIM_BOTTLE_CRASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, direction) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.ANIM_BOTTLE);
    this.loadImages(this.ANIM_BOTTLE_CRASH);
    this.x = x;
    this.y = y;
    this.height = 90;
    this.width = 70;
    if (direction == true) {
      this.forceX = -10;
      this.x = x - 100;
    }
    this.throw(this.x, this.y);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    this.animateBottle();
    setInterval(() => {
      this.x += this.forceX;
    }, 25);
  }

  animateBottle() {
    setInterval(() => {
      this.playAnimation(this.ANIM_BOTTLE);
      if (!this.active || !this.aboveGround) {
        this.playAnimation(this.ANIM_BOTTLE_CRASH);
      }
    }, 1000 / 10);
  }
}
