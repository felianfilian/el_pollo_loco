class Chicken extends Movable {
  energy = 1;

  ANIM_WALK = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  ANIM_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  ANIM_SMALL_WALK = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  ANIM_SMALL_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * set chicken to a random x position
   * @param type different types of chicken - small or big
   */
  constructor(type) {
    if (type == 1) {
      super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.ANIM_WALK = this.ANIM_SMALL_WALK;
      this.ANIM_DEAD = this.ANIM_SMALL_DEAD;
      this.width = 50;
      this.height = 50;
      this.y = 390;
    } else {
      super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    }
    this.loadImages(this.ANIM_WALK);

    this.x = 600 + Math.round(Math.random() * 800);

    this.speed = 0.2 + Math.random() * 0.8;

    this.movement();
    this.animate();
  }

  /**
   * chicken movement from right to left
   */
  movement() {
    this.setStopInterval(() => {
      this.moveLeft();
    }, 1000 / 40);
  }

  /**
   * chicken move and death animation
   */
  animate() {
    this.setStopInterval(() => {
      if (this.energy <= 0) {
        this.loadImage(this.ANIM_DEAD);
        this.speedX = 0;
        this.y += 10;
      } else {
        this.playAnimation(this.ANIM_WALK);
      }
    }, 1000 / 10);

    this.moveLeft();
  }
}
