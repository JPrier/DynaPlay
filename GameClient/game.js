// Contains all logic for parameters (indiviual parameter logic may be contained in seperate module)

//let gameSettings = require('./gameSettings.js');

const Game = function() {
  this.settings = 0;//gameSettings.getGameState();
  this.update = function() {
    //console.log("Game Update");
  };
  this.map = {};
};
Game.prototype = {
  constructor : Game,
  setup: function(size, objects) {
    this.map = {
      objects: objects,
      size: size
    }
  }};

// class Game {
//   constructor() {
//     this.settings = 0;
//   }
//   update() {
//     console.log("Game Update");
//   }
// }
