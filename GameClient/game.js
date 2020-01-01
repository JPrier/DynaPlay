// Contains all logic for parameters (indiviual parameter logic may be contained in seperate module)

//let gameSettings = require('./gameSettings.js');

const Game = function() {
  this.settings = 0;//gameSettings.getGameState();
  this.update = function() {
    //console.log("Game Update");
  };
};
Game.prototype = {
  constructor : Game,
  setup: function() {
    console.log("Game Setup")
  }};

// class Game {
//   constructor() {
//     this.settings = 0;
//   }
//   update() {
//     console.log("Game Update");
//   }
// }
