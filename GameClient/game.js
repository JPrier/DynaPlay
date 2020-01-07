// Contains all logic for parameters (indiviual parameter logic may be contained in seperate module)

let random = function(n) {
  return Math.floor(Math.random() * n)
}

const Game = function(gameSettings) {
  this.settings = gameSettings;
  this.map = {};
  this.player = undefined;
  this.npcs = [];
  this.tileSize = 10;

  //TODO: Set these based off of game settings
  this.setup = function(size) {
    this.map = {
      objects: [],
      size: size
    }
    this.player = new Shape(0, 30, 30, 30, 20, this.settings["playerColor"]);
    this.npcs = [];
    console.log(this.settings["NPCs"]);
    for (let i=0; i<=parseInt(this.settings["NPCs"]);i++) {
      this.npcs.push(new Shape(0, random(this.map.size), random(this.map.size), 30, 20, this.settings["NPCColor"]));
    }
  }

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
      this.npcs[i].loc_x = this.npcs[i].loc_x + ((Math.floor(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1)) * this.movementAmount());
      this.npcs[i].loc_y = this.npcs[i].loc_y + ((Math.floor(Math.random() * 2)* (Math.random() < 0.5 ? -1 : 1)) * this.movementAmount());
    }
  };

  this.controllerLeft = function() {
    if (this.player) {
      this.player.loc_x -= this.movementAmount();
    }
  };

  this.controllerRight = function() {
    if (this.player) {
      this.player.loc_x += this.movementAmount();
    }
  };

  this.controllerUp = function() {
    if (this.player) {
      this.player.loc_y -= this.movementAmount();
    }
  };

  this.controllerDown = function() {
    if (this.player) {
      this.player.loc_y += this.movementAmount();
    }
  };

  this.movementAmount = function() {
    switch(this.settings["worldType"]) {
      case "0": return this.tileSize; break;
      case "2": return 1; break;
      case "3": return 1; break;
    }
  };

};
Game.prototype = {
  constructor : Game,
  setup: function(size) {
    Game.setup(size);
  }
};
