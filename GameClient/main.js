// Main will call all needed update calls to game and to display

/// FUNCTIONS

let keyPress = function(event) {
  //controller.keyPress(event.type, event.keyCode);
  console.log("keypress")
};

let resize = function(event) {
  display.resize(document.documentElement.clientWidth,
                 document.documentElement.clientHeight,
                 scale);
  display.drawObject();
  render();
};

let render = function() {

  //TODO draw game map (static objects in map array)

  //TODO draw objects (players, npcs, etc)

  display.render();
};

let update = function() {

  //TODO: if controller active change game state

  game.update();
  resize();

  // TODO: add a condition to stop the engine (an end goal parameter)
};

/// OBJECTS

//let controller = new Controller();
let game = new Game();
let display = new Display(document.querySelector("canvas"), "black");
let engine = new Engine(1000/30, update, render);

/// INIT

let scale = 1; //Scale of the game canvas (1 will fill the full view)

// START

window.addEventListener("keydown", keyPress);
window.addEventListener("resize", resize);

engine.start();
