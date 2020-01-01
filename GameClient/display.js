// Carries all the logic for drawing and rendering visuals

const Display = function(canvas) {
  this.buffer = document.createElement("canvas").getContext("2d");
  this.context = canvas.getContext("2d");

  // TODO: figure out how to do this for a general method that will allow tiles and non tiles
}

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
