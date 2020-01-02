// Shape Object that carries data on what type of shape a drawn object is along
// with size and color parameters

// ---- Shapes ----
// 0 - Rect
// 1 - Circle
// 2 - Hexagon


const Shape = function(shapeType, width, height, color) {
  this.shapeType = shapeType;
  this.width = width;
  this.height = height;
  this.color = color;

  this.setColor = function(color) {
    this.color = color;
  };
};

Shape.prototype = {
  constructor: Shape
};
