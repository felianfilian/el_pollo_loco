class Endboss extends Movable {
  height = 400;
  width = 250;
  x = 2200;
  y = 60;
  endbossTriggerX = 2100;
  active = false;

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
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  ANIM_DEAD = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
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
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.active) {
        this.playAnimation(this.ANIM_WALK);
      } else {
        this.playAnimation(this.ANIM_ALERT);
      }
    }, 200);
  }
}
