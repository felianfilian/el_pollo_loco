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

  if (window.innerWidth < 720) {
    canvas.width = window.innerWidth;
    document.getElementById("game-title").classList.add("d-none");
    document.getElementById("btn-fullscreen").classList.add("d-none");
    document.body.style.backgroundSize = "auto";
  }
}

/**
 * toggle between fullscreen and back
 */

function fullscreen() {
  if (fullScreenActive) {
    fullScreenActive = false;
    exitFullscreen();
  } else {
    fullScreenActive = true;
    goToFullScreen();
  }
}

/**
 * set game window to fullscreen
 */

function goToFullScreen() {
  let elem = document.body;
  let content = document.getElementById("content");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  content.classList.add("fullscreen");
  document.getElementById("game-title").classList.add("d-none");
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  content.classList.remove("fullscreen");
  document.getElementById("game-title").classList.remove("d-none");
}

/**
 * Start Desktop Game
 */

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("audio-trigger").classList.remove("d-none");
  document.getElementById("info-trigger").classList.remove("d-none");
  document.getElementById("start-tutorial").classList.add("d-none");
  world = new World(canvas, keyboard);
}

/**
 * start mobile game
 */

function startMobileGame() {
  document.getElementById("mobile-start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("audio-trigger").classList.remove("d-none");
  document.getElementById("start-tutorial").classList.add("d-none");
  document.getElementById("hud-mobile-left").classList.remove("d-none");
  document.getElementById("hud-mobile-right").classList.remove("d-none");
  fullscreen();
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
