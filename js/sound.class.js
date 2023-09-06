class Sound {
  bg_music;
  sfx_sounds;

  active = false;

  constructor() {
    this.bg_music = [
      new Audio("./audio/music/mexico01.mp3"),
      new Audio("./audio/music/boss_music_01.mp3"),
      new Audio("./audio/game_over_01.mp3"),
      new Audio("./audio/game_win_01.mp3"),
    ];
    this.sfx_sounds = [
      new Audio("./audio/walk01.wav"),
      new Audio("./audio/jump01.wav"),
      new Audio("./audio/coin01.wav"),
      new Audio("./audio/bottle_sfx.mp3"),
      new Audio("./audio/hurt01.mp3"),
      new Audio("./audio/glass_crash_01.mp3"),
      new Audio("./audio/chicken_01.mp3"),
      new Audio("./audio/jump_hit.mp3"),
      new Audio("./audio/el_pollo_death.mp3"),
    ];
    console.log(localStorage.getItem("soundOn"));
    if (localStorage.getItem("soundOn") == "false") {
      this.soundOff;
    } else {
      this.soundOn();
    }
  }

  /**
   * mute button logic
   * switches all the sound on and off on click
   */

  startSound() {
    if (!this.active) {
      this.soundOn();
    } else {
      this.soundOff();
    }
  }

  soundOn() {
    this.active = true;
    localStorage.setItem("soundOn", this.active);
    document.getElementById("audio-trigger").src = "./icons/sound-48.png";
    this.startBgMusic(0);
  }

  soundOff() {
    this.active = false;
    localStorage.setItem("soundOn", this.active);
    document.getElementById("audio-trigger").src = "./icons/no-sound-48.png";
    this.stopBgMusic();
  }

  /**
   * start and loop background Music
   * @param index index of the music clip
   */

  startBgMusic(index) {
    if (this.active) {
      this.stopBgMusic();
      this.bg_music[index].play();
      this.bg_music[index].loop = true;
    }
  }

  /**
   *  Play music just one time
   * @param index index of the music clip
   */
  startBgMusicOnce(index) {
    if (this.active) {
      this.stopBgMusic();
      this.bg_music[index].play();
    }
  }

  /**
   * stop all background music clips
   */
  stopBgMusic() {
    this.bg_music.forEach((title) => {
      title.pause();
    });
  }

  /**
   * play sound effect
   * @param index index of the music clip
   */
  playSFX(index) {
    if (this.active) {
      this.sfx_sounds[index].play();
    }
  }

  /**
   * pause sfx to handle multiple sfx sounds
   * @param index index of sfx sound in sfx_sounds array
   */
  pauseSFX(index) {
    this.sfx_sounds[index].pause();
  }
}
