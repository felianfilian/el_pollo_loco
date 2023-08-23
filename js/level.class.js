class Level {
  enemies;
  clouds;
  backgrounds;
  level_end_x = 2200;
  coins;
  bottles;

  constructor(enemies, clouds, backgrounds, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.coins = coins;
    this.bottles = bottles;
  }
}
