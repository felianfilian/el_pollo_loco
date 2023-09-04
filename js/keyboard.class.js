class Keyboard {
  LEFT = false;
  UP = false;
  RIGHT = false;
  DOWN = false;
  SPACE = false;

  constructor() {
    this.keyPressEvents();
    // this.btnPressEvents();
  }

  // btnPressEvents() {
  //   document.getElementById("btn-left").addEventListener("touchstart", (e) => {
  //     e.preventDefault();
  //     console.log("left pressed");
  //     this.LEFT = true;
  //   });
  // }

  keyPressEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        this.SPACE = true;
      }
      if (e.keyCode == 37 || e.keyCode == 65) {
        this.LEFT = true;
      }
      if (e.keyCode == 38 || e.keyCode == 87) {
        this.UP = true;
      }
      if (e.keyCode == 39 || e.keyCode == 68) {
        this.RIGHT = true;
      }
      if (e.keyCode == 40 || e.keyCode == 83) {
        this.DOWN = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 32) {
        this.SPACE = false;
      }
      if (e.keyCode == 37 || e.keyCode == 65) {
        this.LEFT = false;
      }
      if (e.keyCode == 38 || e.keyCode == 87) {
        this.UP = false;
      }
      if (e.keyCode == 39 || e.keyCode == 68) {
        this.RIGHT = false;
      }
      if (e.keyCode == 40 || e.keyCode == 83) {
        this.DOWN = false;
      }
    });
  }
}

// window.addEventListener("tochstart", (e) => {
//   if (e.keyCode == 32) {
//     SPACE = true;
//   }
//   if (e.keyCode == 37 || e.keyCode == 65) {
//     LEFT = true;
//   }
//   if (e.keyCode == 38 || e.keyCode == 87) {
//     UP = true;
//   }
//   if (e.keyCode == 39 || e.keyCode == 68) {
//     RIGHT = true;
//   }
//   if (e.keyCode == 40 || e.keyCode == 83) {
//     DOWN = true;
//   }
// });
