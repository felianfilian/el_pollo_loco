class EndbossUI extends Drawable {
  percentage = 100;

  IMAGES_HEALTH_UI = [
    "img/7_statusbars/2_statusbar_endboss/0.png",
    "img/7_statusbars/2_statusbar_endboss/20.png",
    "img/7_statusbars/2_statusbar_endboss/40.png",
    "img/7_statusbars/2_statusbar_endboss/60.png",
    "img/7_statusbars/2_statusbar_endboss/80.png",
    "img/7_statusbars/2_statusbar_endboss/100.png",
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

  /**
   * set the value for the healthbar
   * @param percentage value in percent
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH_UI[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * set ui image filled with calculated percent
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 70) {
      return 4;
    } else if (this.percentage > 50) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
