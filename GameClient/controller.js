// Controller will hold all the functions needed for eventListeners on input

const Controller = function(controls) {
  this.left = controls[0];
  this.right = controls[1];
  this.up = controls[2];
  this.down = controls[3];

  this.keyChanged = function(type, keyCode) {

    let isPressed = type == "keydown";

    switch(keyCode) {
      case 32: break; //jump
      case 65: this.left(isPressed); break;
      case 68: this.right(isPressed); break;
      case 83: this.down(isPressed); break;
      case 87: this.up(isPressed); break;
    }
  };
};

Controller.prototype = {
  constructor: Controller
}
