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

// get media query
let x = window.matchMedia("(max-width: 720px) and (orientation: landscape)");

function fullscreen() {
  let elem = document.body;
  let content = document.getElementById("content");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    content.style.width = "100%";
    content.style.height = "100%";
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("audio-trigger").classList.remove("d-none");
  document.getElementById("info-trigger").classList.remove("d-none");
  document.getElementById("start-tutorial").classList.add("d-none");
  checkMobileHud();
  if (x.matches) {
    fullscreen();
  }
  world = new World(canvas, keyboard);
}

function checkMobileHud() {
  if (window.innerWidth < 720) {
    document.getElementById("hud-mobile-left").classList.remove("d-none");
    document.getElementById("hud-mobile-right").classList.remove("d-none");
  }
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
