// Main will call all needed update calls to game and to display

/// FUNCTIONS

let count = 0;

let keyPress = function(event) {
  controller.keyChanged(event.type, event.keyCode);
};

let keyRelease = function(event) {
  controller.keyChanged(event.type, event.keyCode);
};

let resize = function(event) {
  display.resize(document.documentElement.clientWidth,
                 document.documentElement.clientHeight,
                 scale);
};

let render = function() {
  // -- camera following player -- //
  display.context.save();
  display.context.translate(-(game.player.shape.loc_x - display.canvas.width / 2),
                            -(game.player.shape.loc_y - display.canvas.height / 2));

  // -- drawing objects -- //
  display.drawMap(game.map);

  if (game.player) {
    display.drawObject(game.player.shape);
  }
  for (let i = 0; i < game.npcs.length; i++) {
    display.drawObject(game.npcs[i].shape);
  }

  display.render();

  // Restore the context to avoid translations acculating
  display.context.restore();
};

let update = function() {

  game.update();
};

let createNewWorld = function(event) {
  game.createWorld();
}

// TODO: Fix this -- regions arent right
let currentRegion = function(event) {

  // Seems to have no correlation between region/color/location

  let rect = display.contextCanvas.getBoundingClientRect();
  let xRatio = display.context.canvas.width / game.sizeX;
  let yRatio = display.context.canvas.height / game.sizeY;
  // x = Math.ceil(((event.clientX-rect.left)/xRatio)/5)*5;
  // y = Math.ceil(((event.clientY-rect.top)/yRatio)/5)*5;
  x = Math.ceil((event.clientX-rect.left)/xRatio);
  y = Math.ceil((event.clientY-rect.top)/yRatio);

  console.log(x + ", " + y);
  console.log(game.map.objects[y*game.sizeX+x].region);
  console.log(game.map.objects[y*game.sizeX+x].shape.color);
}

/// OBJECTS
const mainSetup = function(gameSettings) {
  //INIT
  game = new Game(gameSettings);
  display = new Display(document.querySelector("canvas"), "blue");
  engine = new Engine(1000/30, update, render);

  let controls = [function(isPressed) {game.controllerLeft(isPressed)},
                  function(isPressed) {game.controllerRight(isPressed)},
                  function(isPressed) {game.controllerUp(isPressed)},
                  function(isPressed) {game.controllerDown(isPressed)}];
  controller = new Controller(controls);

  // START

  window.addEventListener("keydown", keyPress);
  window.addEventListener("keyup", keyRelease);
  window.addEventListener("resize", resize);
  window.addEventListener("click", createNewWorld);
  //window.addEventListener("mousemove", currentRegion);

  game.setup();
  display.setCanvasSize(game.sizeX+1, game.sizeY+1);

  resize();

  engine.start();
}

let game = undefined;
let display = undefined;
let engine = undefined;
let controller = undefined;
let scale = 1; //Scale of the game canvas (1 will fill the full view)
