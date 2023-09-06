class Keyboard {
  LEFT;
  UP;
  RIGHT;
  DOWN;
  SPACE;

  constructor() {
    this.LEFT = false;
    this.UP = false;
    this.RIGHT = false;
    this.DOWN = false;
    this.SPACE = false;
    this.keyPressEvents();
    this.btnPressEvents();
  }

  /**
   * controls for mobile devices
   */
  btnPressEvents() {
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");
    const btnJump = document.getElementById("btn-jump");
    const btnThrow = document.getElementById("btn-throw");

    btnLeft.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    btnRight.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    btnJump.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    btnThrow.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.UP = true;
    });

    btnLeft.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });
    btnRight.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
    btnJump.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
    btnThrow.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.UP = false;
    });
  }

  /**
   * controls for keyboard input
   */
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
