// Contains all logic for parameters (indiviual parameter logic may be contained in seperate module)

//let gameSettings = require('./gameSettings.js');

const Game = function() {
  this.settings = 0;//gameSettings.getGameState();
  this.map = {};
  this.player = undefined;
  this.npcs = [];
  this.update = function() {
    //TODO: update any objects that need to update on a time_step
  };
};
Game.prototype = {
  constructor : Game,
  setup: function(size, objects, player, npcs) {
    this.map = {
      objects: objects,
      size: size
    }
    this.player = player;
    this.npcs = npcs;
  }
};
