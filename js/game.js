/**
 * canvas
 * canvas element used for rendering
 * @type {HTMLCanvaselement}
 *
 * keyboard
 * class to setup the keys for the input
 */

let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let gameoverScreen;
let fullScreenActive = false;

function init() {
  canvas = document.getElementById("canvas");
  gameoverScreen = document.getElementById("gameover-screen");
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 37 || e.keyCode == 65) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38 || e.keyCode == 87) {
    keyboard.UP = true;
  }
  if (e.keyCode == 39 || e.keyCode == 68) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 40 || e.keyCode == 83) {
    keyboard.DOWN = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 37 || e.keyCode == 65) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38 || e.keyCode == 87) {
    keyboard.UP = false;
  }
  if (e.keyCode == 39 || e.keyCode == 68) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 40 || e.keyCode == 83) {
    keyboard.DOWN = false;
  }
});

function fullscreen() {
  let content = document.getElementById("content");
  if (document.fullscreenElement === null) {
    content.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function startBgMusic() {
  world.sound.startBgMusic();
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  world = new World(canvas, keyboard);
}

function restartGame() {
  window.location.reload();
}

function showGameOver() {
  gameoverScreen.style.display = "flex";
}
