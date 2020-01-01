// Carries all the logic for drawing and rendering visuals

const Display = function(canvas, color) {
  this.buffer = document.createElement("canvas").getContext("2d");
  this.context = canvas.getContext("2d");

  //Set background color
  this.buffer.fillStyle = color;
  this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

  this.drawMap = function(map) {
    // TODO: create a generic map object that can be used to create random maps
    //for (let i = map.length - 1; i > -1; -- i) {
      //this.drawObject(map[i].shape, ...)
    //}
  }

  this.drawObject = function(shape, source_x, source_y, destination_x,
                             destination_y, width, height) {
      //TODO: add switch cases for each shape and draw each shape onto the buffer
  }

  this.resize = function(width, height, height_width_ratio) {
    if (height/width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;
    }
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
