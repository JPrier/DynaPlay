
const Player = function(shapeType, loc_x, loc_y, width, height, color,
                        collidesWithNPCs) {
  this.shape = new Shape(shapeType, loc_x, loc_y, width, height, color);
  this.velocityX = 0;
  this.velocityY = 0;
  this.weight = 1; //used with gravity to create primitive mass representation
  this.score = 0; // held in player to make multiplayer easier to add
  this.collidesWithPlayer = false;
  this.collidesWithNPCs = collidesWithNPCs;

  this.setVelocity = function(x, y) {
    this.velocityX = x;
    this.velocityY = y;
  }

  this.setScore = function(score) {
    this.score = score;
  }
};

Player.prototype = {
  constructor: Player
};
