class HealthUI extends Drawable {
  percentage = 100;

  IMAGES_HEALTH_UI = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor(x, y, height, width) {
    super();
    this.loadImages(this.IMAGES_HEALTH_UI);
    this.setPercentage(100);
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH_UI[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 65) {
      return 4;
    } else if (this.percentage > 35) {
      return 3;
    } else if (this.percentage > 15) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
