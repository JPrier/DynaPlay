// Carries all the logic for drawing and rendering visuals

const Display = function(canvas, color) {
  this.buffer = document.createElement("canvas").getContext("2d");
  this.context = canvas.getContext("2d");

  //Set background color
  this.buffer.fillStyle = color;
  this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

  this.drawMap = function(map) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    for (let i = map.objects.length - 1; i > -1; -- i) {
      this.drawObject(map.objects[i])
    }
  }

  this.drawObject = function(shape) {
      // SQUARE/RECT
      if (shape.shapeType == 0) {
        this.buffer.fillStyle = shape.color;
        this.buffer.fillRect(shape.loc_x, shape.loc_y, shape.width, shape.height);
      }
      //TODO: Add other shape types
  }

  this.resize = function(width, height, height_width_ratio) {
    if (height/width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;
    }

    this.context.imageSmoothingEnabled = false;
  };
};

Display.prototype = {
  constructor: Display,
  render: function() {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }
}
