let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
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
  if (e.keyCode == 70) {
    keyboard.KEY_F = true;
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
  if (e.keyCode == 70) {
    keyboard.KEY_F = false;
  }
});
