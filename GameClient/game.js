// Contains all logic for parameters (indiviual parameter logic may be contained in seperate module)

//let gameSettings = require('./gameSettings.js');

const Game = function() {
  this.settings = 0;//gameSettings.getGameState();
  this.map = {};
  this.player = undefined;
  this.npcs = [];

  this.update = function() {
    //TODO: update any objects that need to update on a time_step
    for (let i = 0; i < this.map.objects.length; i++) {
      this.map.objects[i].loc_x = this.map.objects[i].loc_x + 1;
      this.map.objects[i].loc_y = this.map.objects[i].loc_y + 1;
    }

    if (this.player) {
      //this.player update
    }

    for (let i = 0; i < this.npcs.length; i++) {
      this.npcs[i].loc_x = this.npcs[i].loc_x + (Math.floor(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1));
      this.npcs[i].loc_y = this.npcs[i].loc_y + (Math.floor(Math.random() * 2)* (Math.random() < 0.5 ? -1 : 1));
    }
  };

  this.controllerLeft = function() {
    if (this.player) {
      // Linear
      this.player.loc_x -= 1;
      // Tiles/grid
      // this.player.loc_x += tile_size
    }
  };

  this.controllerRight = function() {
    if (this.player) {
      this.player.loc_x += 1;
    }
  };

  this.controllerUp = function() {
    if (this.player) {
      this.player.loc_y -= 1;
    }
  };

  this.controllerDown = function() {
    if (this.player) {
      this.player.loc_y += 1;
    }
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
