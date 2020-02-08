// Main will call all needed update calls to game and to display

/// FUNCTIONS

let count = 0;

let keyPress = function(event) {
  controller.keyPress(event.type, event.keyCode);
  //game.map.objects[0].color == "white" ?  game.map.objects[0].color = "blue" : game.map.objects[0].color = "white";
};

let resize = function(event) {
  display.resize(document.documentElement.clientWidth,
                 document.documentElement.clientHeight,
                 scale);
  //game.updateSize(display.buffer.canvas.width, display.buffer.canvas.height);
};

let render = function() {

  // game.mapGenerator.smoothMap(game.map.objects, game.sizeX, game.sizeY);
  // if (count % 10 == 0 && count <= 50) {
  //   game.smoothWorld();
  // }
  // if (count == 60) {
  //   game.connectWorld();
  //   console.log("done");
  // }
  // count++;

  //TODO draw game map (static objects in map array)
  display.drawMap(game.map);
  //TODO draw objects (players, npcs, etc)
  if (game.player) {
    display.drawObject(game.player.shape);
  }
  for (let i = 0; i < game.npcs.length; i++) {
    display.drawObject(game.npcs[i].shape);
  }

  display.render();
};

let update = function() {

  //TODO: if controller active change game state

  game.update();

  // TODO: add a condition to stop the engine (an end goal parameter)
};

let createNewWorld = function(event) {
  game.createWorld();
}

// TODO: Fix this -- regions arent right
let currentRegion = function(event) {
  let rect = display.contextCanvas.getBoundingClientRect();
  let xRatio = display.context.canvas.width / game.sizeX;
  let yRatio = display.context.canvas.height / game.sizeY;
  x = Math.ceil(((event.clientX-rect.left)/xRatio)/5)*5;
  y = Math.ceil(((event.clientY-rect.top)/yRatio)/5)*5;
  // console.log(x + ", " + y);
  // console.log(game.map.objects[x*game.sizeX+y].region);
}

/// OBJECTS
const mainSetup = function(gameSettings) {
  //INIT
  game = new Game(gameSettings);
  display = new Display(document.querySelector("canvas"), "blue");
  engine = new Engine(1000/30, update, render);

  let controls = [function() {game.controllerUp()},
                  function() {game.controllerDown()},
                  function() {game.controllerLeft()},
                  function() {game.controllerRight()}];
  controller = new Controller(controls);

  // START

  window.addEventListener("keydown", keyPress);
  window.addEventListener("resize", resize);
  window.addEventListener("click", createNewWorld);
  window.addEventListener("mousemove", currentRegion);

  game.setup();
  display.setCanvasSize(game.sizeX, game.sizeY);

  resize();

  game.createWorld();

  engine.start();
}

let game = undefined;
let display = undefined;
let engine = undefined;
let controller = undefined;
let scale = 1; //Scale of the game canvas (1 will fill the full view)
