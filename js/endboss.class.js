class Endboss extends Movable {
  height = 400;
  width = 250;
  x = 2100;
  y = 60;
  speedX = 1.5;
  energy = 6;
  maxEnergy = 6;
  hitted = false;

  ANIM_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  ANIM_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  ANIM_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  ANIM_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = {
    top: 120,
    right: 30,
    bottom: 40,
    left: 30,
  };

  constructor() {
    super().loadImage(this.ANIM_WALK[0]);
    this.loadImages(this.ANIM_ALERT);
    this.loadImages(this.ANIM_WALK);
    this.loadImages(this.ANIM_HURT);
    this.loadImages(this.ANIM_DEAD);
    this.active = false;
    this.animate();
  }

  startMove() {
    this.setStopInterval(() => {
      if (this.lookLeft) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
    }, 1000 / 40);
  }

  animate() {
    setInterval(() => {
      if (this.energy <= 0) {
        this.playAnimation(this.ANIM_DEAD);
        this.speedX = 0;
        this.y += 40;
      } else {
        if (this.active) {
          if (this.hitted) {
            this.playAnimation(this.ANIM_HURT);
          } else {
            this.turnEndboss();
            this.playAnimation(this.ANIM_WALK);
          }
        } else {
          this.playAnimation(this.ANIM_ALERT);
        }
      }
    }, 200);
  }

  turnEndboss() {
    if (world.character.x > this.x) {
      this.lookLeft = true;
    } else {
      this.lookLeft = false;
    }
  }

  getsHit() {
    this.hitted = true;

    setTimeout(() => {
      this.hitted = false;
    }, 800);
  }
}
