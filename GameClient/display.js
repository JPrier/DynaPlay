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
    for (let i = 0; i < map.objects.length; i++) {
      this.drawObject(map.objects[i].shape);
    }
  };

  this.drawObject = function(shape) {
      // SQUARE/RECT
      if (shape.shapeType == 0) {
        this.buffer.fillStyle = shape.color;
        this.buffer.fillRect(shape.loc_x, shape.loc_y, shape.width, shape.height);
      }
      //TODO: Add other shape types
  };

  this.resize = function(width, height, height_width_ratio) {
    let marginWidth = width * .1;
    let marginHeight = height * .1;
    if (height/width > height_width_ratio) {
      this.context.canvas.height = (width * height_width_ratio) - marginHeight;
      this.context.canvas.width = width - marginWidth;
    } else {
      this.context.canvas.height = height - marginHeight;
      this.context.canvas.width = (height / height_width_ratio) - marginWidth;
    }

    this.context.imageSmoothingEnabled = false;
  };

  this.setCanvasSize = function(width, height) {
    this.buffer.canvas.width = width;
    this.buffer.canvas.height = height;
  }
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
