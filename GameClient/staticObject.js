
const StaticObject = function(shapeType, loc_x, loc_y, width, height, color,
                        collidesWithPlayer, collidesWithNPCs) {
  this.shape = new Shape(shapeType, loc_x, loc_y, width, height, color);
  this.collidesWithPlayer = collidesWithPlayer;
  this.collidesWithNPCs = collidesWithNPCs;

};

StaticObject.prototype = {
  constructor: StaticObject
};
