class MainUI extends Drawable {
  percentage = 100;

  IMAGES_UI = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    this.loadImages(this.IMAGES_UI);
  }

  setPercentage(percentage) {}

  resolveImageIndex() {
    if (this.percentage == 10) {
      return 5;
    }
  }
}
