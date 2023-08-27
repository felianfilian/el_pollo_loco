class Sound {
  bg_music;
  sfx_sounds;

  constructor() {
    this.bg_music = new Audio("audio/music/mexico01.mp3");
    this.sfx_sounds = [
      new Audio("audio/walk01.wav"),
      new Audio("audio/jump01.wav"),
      new Audio("audio/coin01.wav"),
      new Audio("audio/bottle_sfx.mp3"),
      new Audio("audio/hurt01.mp3"),
      new Audio("audio/glass_crash_01.mp3"),
    ];
  }

  startBgMusic() {
    this.bg_music.play();
    this.bg_music.loop = true;
  }

  stopBgMusic() {
    this.bg_music.pause();
  }

  playSFX(index) {
    this.sfx_sounds[index].play();
  }

  pauseSFX(index) {
    this.sfx_sounds[index].pause();
  }
}
