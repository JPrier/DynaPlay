
const Player = function(shapeType, loc_x, loc_y, width, height, color,
                        collidesWithNPCs) {
  this.shape = new Shape(shapeType, loc_x, loc_y, width, height, color);
  this.velocity = 0;
  this.weight = 1; //used with gravity to create primitive mass representation
  this.score = 0; // held in player to make multiplayer easier to add
  this.collidesWithPlayer = false;
  this.collidesWithNPCs = collidesWithNPCs;

  this.setVelocity = function(velocity) {
    this.velocity = velocity;
  }

  this.setScore = function(score) {
    this.score = score;
  }
};

Player.prototype = {
  constructor: Player
};
