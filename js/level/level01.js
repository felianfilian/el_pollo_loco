const level01 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [
    new Cloud("img/5_background/layers/4_clouds/1.png", -719),
    new Cloud("img/5_background/layers/4_clouds/1.png", 0),
    new Cloud("img/5_background/layers/4_clouds/1.png", 719),
    new Cloud("img/5_background/layers/4_clouds/1.png", 719 * 2),
    new Cloud("img/5_background/layers/4_clouds/1.png", 719 * 3),
  ],
  [
    new Background("img/5_background/layers/air.png", -719, 0),
    new Background("img/5_background/layers/3_third_layer/2.png", -719, -20),
    new Background("img/5_background/layers/2_second_layer/2.png", -719, -10),
    new Background("img/5_background/layers/1_first_layer/2.png", -719, 0),
    new Background("img/5_background/layers/air.png", 0, 0),
    new Background("img/5_background/layers/3_third_layer/1.png", 0, -20),
    new Background("img/5_background/layers/2_second_layer/1.png", 0, -10),
    new Background("img/5_background/layers/1_first_layer/1.png", 0, 0),
    new Background("img/5_background/layers/air.png", 719, 0),
    new Background("img/5_background/layers/3_third_layer/2.png", 719, -20),
    new Background("img/5_background/layers/2_second_layer/2.png", 719, -10),
    new Background("img/5_background/layers/1_first_layer/2.png", 719, 0),
    new Background("img/5_background/layers/air.png", 719 * 2, 0),
    new Background("img/5_background/layers/3_third_layer/1.png", 719 * 2, -20),
    new Background(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2,
      -10
    ),
    new Background("img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),
    new Background("img/5_background/layers/air.png", 719 * 3, 0),
    new Background("img/5_background/layers/3_third_layer/2.png", 719 * 3, -20),
    new Background(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3,
      -10
    ),
    new Background("img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),
  ],
  [],
  []
);
