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
  gamewinScreen = document.getElementById("gamewin-screen");
}

// get media query
let x = window.matchMedia("(max-width: 720px) and (orientation: landscape)");

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

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("audio-trigger").classList.remove("d-none");
  document.getElementById("info-trigger").classList.remove("d-none");
  document.getElementById("start-tutorial").classList.add("d-none");
  if (x.matches) {
    fullscreen();
  }
  world = new World(canvas, keyboard);
}

function restartGame() {
  window.location.reload();
}

function showGameOver() {
  gameoverScreen.style.display = "flex";
}

function showGameWin() {
  gamewinScreen.style.display = "flex";
}

function showInfo() {
  let startTutorial = document.getElementById("start-tutorial");
  if (startTutorial.classList.contains("d-none")) {
    startTutorial.classList.remove("d-none");
  } else {
    startTutorial.classList.add("d-none");
  }
}
