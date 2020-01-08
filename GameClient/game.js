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
  this.sizeX = 300;
  this.sizeY = 300;

  //TODO: Set these based off of game settings
  this.setup = function() {
    this.map = {
      objects: [new Shape(0, this.sizeX, this.sizeY, 30, 15, "yellow", false, false)]
    }
    this.player = new Player(0, 30, 30, 30, 20, this.settings["playerColor"], true);
    this.npcs = [];
    for (let i=0; i<parseInt(this.settings["NPCs"]);i++) {
      this.npcs.push(new NPC(0, random(this.sizeX), random(this.sizeY), 30, 20, this.settings["NPCColor"], true, true));
    }
  }

  this.updateSize = function(x, y) {
    this.sizeX = x;
    this.sizeY = y;
  }

  this.update = function() {

    console.log(this.sizeX + ", " + this.sizeY);
    console.log(this.player.shape.loc_x + ", " + this.player.shape.loc_y);

    //TODO: update any objects that need to update on a time_step
    for (let i = 0; i < this.map.objects.length; i++) {
      // this.map.objects[i].loc_x = this.map.objects[i].loc_x + 1;
      // this.map.objects[i].loc_y = this.map.objects[i].loc_y + 1;
      // if (this.collides(this.map.objects[i])) {
      //   this.map.objects[i].loc_x = this.map.objects[i].loc_x - 1;
      //   this.map.objects[i].loc_y = this.map.objects[i].loc_y - 1;
      // }
    }

    if (this.player) {
      //TODO: add updates with velocity and gravity
    }

    for (let i = 0; i < this.npcs.length; i++) {
      let prevX = this.npcs[i].shape.loc_x;
      let prevY = this.npcs[i].shape.loc_y;
      this.npcs[i].shape.loc_x = this.npcs[i].shape.loc_x + ((Math.floor(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1)) * this.movementAmount());
      this.npcs[i].shape.loc_y = this.npcs[i].shape.loc_y + ((Math.floor(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1)) * this.movementAmount());
      if (this.collides(this.npcs[i], i)) {
        this.npcs[i].shape.loc_x = prevX;
        this.npcs[i].shape.loc_y = prevY;
      }
    }
  };

  this.controllerLeft = function() {
    if (this.player) {
      this.player.shape.loc_x -= this.movementAmount();
      if (this.collides(this.player, -1)) {
        this.player.shape.loc_x += this.movementAmount();
      }
    }
  };

  this.controllerRight = function() {
    if (this.player) {
      this.player.shape.loc_x += this.movementAmount();
    }
    if (this.collides(this.player, -1)) {
      this.player.shape.loc_x -= this.movementAmount();
    }
  };

  this.controllerUp = function() {
    if (this.player) {
      if (this.settings["worldType"] == "3") {
        //JUMP
        this.player.shape.loc_y -= 2;
        //TODO: add a velocity that should be updated on each frame
      } else {
        this.player.shape.loc_y -= this.movementAmount();
        if (this.collides(this.player, -1)) {
          this.player.shape.loc_y += this.movementAmount();
        }
      }
    }
  };

  this.controllerDown = function() {
    if (this.player) {
      this.player.shape.loc_y += this.movementAmount();
      if (this.collides(this.player, -1)) {
        this.player.shape.loc_y -= this.movementAmount();
      }
    }
  };

  this.movementAmount = function() {
    switch(this.settings["worldType"]) {
      case "0": return this.tileSize; break;
      case "2": return 1; break;
      case "3": return 1; break;
    }
  };

  this.collidesWithPlayer =  function(object) {
    if (object.shape.collidesWithPlayer) {
      let xDiff = Math.abs(object.shape.loc_x - this.player.shape.loc_x);
      let yDiff = Math.abs(object.shape.loc_y - this.player.shape.loc_y);
      if ((xDiff <= object.shape.width || xDiff <= this.player.shape.width) &&
         (yDiff <= object.shape.height || yDiff <= this.player.shape.height)) {
        return true;
      }
    }
  }

  this.collidesWithNPCs = function(object, j) {
    if (object.shape.collidesWithNPCs) {
      for (let i=0; i < this.npcs.length; i++) {
        if (i != j) {
          let xDiff = Math.abs(object.shape.loc_x - this.npcs[i].shape.loc_x);
          let yDiff = Math.abs(object.shape.loc_y - this.npcs[i].shape.loc_y);
          if ((xDiff <= object.shape.width || xDiff <= this.npcs[i].shape.width) &&
             (yDiff <= object.shape.height || yDiff <= this.npcs[i].shape.height)) {
            return true;
          }
        }
      }
    }
  }

  this.collidesWithCanvas = function(object) {
    if (object.shape.loc_x < 0 ||
        object.shape.loc_y < 0 ||
        object.shape.loc_x > this.sizeX ||
        object.shape.loc_y > this.sizeY) {
          return true;
        }
  }

  this.collides = function(object, npcIndex) {
    return (this.collidesWithNPCs(object, npcIndex) ||
            this.collidesWithPlayer(object) ||
            this.collidesWithCanvas(object));
  }

};
Game.prototype = {
  constructor : Game,
  setup: function(size) {
    Game.setup(size);
  }
};
