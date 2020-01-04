// Controller will hold all the functions needed for eventListeners on input

const Controller = function(controls) {
  this.upPressed = controls[0];
  this.downPressed = controls[1];
  this.leftPressed = controls[2];
  this.rightPressed = controls[3];

  this.keyPress = function(type, keyCode) {
    //TODO: Add more keys and look into getting multiple keys simulatenously
    switch(keyCode) {
      case 32: break; //jump
      case 65: this.leftPressed(); break;
      case 68: this.rightPressed(); break;
      case 83: this.downPressed(); break;
      case 87: this.upPressed(); break;
    }
  };

  // this.setDirectionsFalse = function() {
  //   this.upPressed = false;
  //   this.downPressed = false;
  //   this.leftPressed = false;
  //   this.rightPressed = false;
  // }
};

Controller.prototype = {
  constructor: Controller
}
