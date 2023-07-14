class Endboss extends Movable {
  height = 400;
  width = 250;
  y = 60;

  ANIM_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor() {
    super().loadImage(this.ANIM_WALK[0]);
    this.loadImages(this.ANIM_WALK);
    this.x = 2200;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.ANIM_WALK);
    }, 200);
  }
}
