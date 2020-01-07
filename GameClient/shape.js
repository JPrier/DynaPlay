// Shape Object that carries data on what type of shape a drawn object is along
// with size and color parameters

// ---- Shapes ----
// 0 - Rect
// 1 - Circle
// 2 - Hexagon

const Shape = function(shapeType, loc_x, loc_y, width, height, color,
                       collidesWithPlayer, collidesWithNPCs) {
  this.shapeType = shapeType;
  this.loc_x = loc_x;
  this.loc_y = loc_y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.collidesWithPlayer = collidesWithPlayer;
  this.collidesWithNPCs = collidesWithNPCs;

  this.setColor = function(color) {
    this.color = color;
  };
};

Shape.prototype = {
  constructor: Shape
};
