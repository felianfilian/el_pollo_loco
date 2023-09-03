class Sound {
  bg_music;
  sfx_sounds;

  active = false;

  constructor() {
    this.bg_music = [
      new Audio("audio/music/mexico01.mp3"),
      new Audio("audio/music/boss_music_01.mp3"),
    ];
    this.sfx_sounds = [
      new Audio("audio/walk01.wav"),
      new Audio("audio/jump01.wav"),
      new Audio("audio/coin01.wav"),
      new Audio("audio/bottle_sfx.mp3"),
      new Audio("audio/hurt01.mp3"),
      new Audio("audio/glass_crash_01.mp3"),
      new Audio("audio/chicken_01.mp3"),
      new Audio("audio/jump_hit.mp3"),
      new Audio("audio/game_over_01.mp3"),
    ];
    this.startSound();
  }

  startSound() {
    if (!this.active) {
      this.active = true;
      document.getElementById("audio-trigger").src = "./icons/sound-48.png";
      this.startBgMusic(0);
    } else {
      this.active = false;
      document.getElementById("audio-trigger").src = "./icons/no-sound-48.png";
      this.stopBgMusic();
    }
  }

  startBgMusic(index) {
    this.stopBgMusic();
    this.bg_music[index].play();
    this.bg_music[index].loop = true;
  }

  stopBgMusic() {
    this.bg_music.forEach((title) => {
      title.pause();
    });
  }

  playSFX(index) {
    if (this.active) {
      this.sfx_sounds[index].play();
    }
  }

  pauseSFX(index) {
    this.sfx_sounds[index].pause();
  }
}
