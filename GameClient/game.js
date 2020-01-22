// Contains all logic for parameters (indiviual parameter logic may be contained in seperate module)

let random = function(n) {
  return Math.floor(Math.random() * n)
}

let getRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Game = function(gameSettings) {
  this.settings = gameSettings;
  this.map = {};
  this.player = undefined;
  this.npcs = [];
  this.tileSize = 5;
  this.sizeX = 500;
  this.sizeY = 500;
  this.mapGenerator = new MapGenerator(this.settings["fillPercent"]);
    //.2 for perlin, .3 for simplex, .5 for random
  this.gravity = .5;
  this.velocityChange = 5;

  //TODO: Set these based off of game settings
  this.setup = function() {
    this.map = {
      objects: []
    }
    this.player = new Player(0, 30, 30, 20, 20, this.settings["playerColor"], true);
    this.npcs = [];
    for (let i=0; i<parseInt(this.settings["NPCs"]);i++) {
      this.npcs.push(new NPC(0, random(this.sizeX), random(this.sizeY), 30, 20, this.settings["NPCColor"], true, true));
    }
  }

  this.createWorld = function() {
    // TODO: implement a procedural generation that can be as modular as possible
    // https://www.gamasutra.com/view/feature/170049/how_to_make_insane_procedural_.php?page=3
    // https://www.youtube.com/watch?v=v7yyZZjF1z4
    // http://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1156&context=cscsp
    // https://www.polygon.com/2013/10/21/4862210/spelunky-randomly-generated-levels-explained

    this.map.objects = this.mapGenerator.generateMap(this.settings["randomMethod"], this.sizeX, this.sizeY, this.tileSize);
  }

  this.smoothWorld = function() {
    this.map.objects = this.mapGenerator.smoothMap(this.map.objects, this.sizeX, this.sizeY);
  }

  this.connectWorld = function() {
    this.map.objects = this.mapGenerator.connectMap(this.map.objects, this.sizeX, this.sizeY);
  }

  this.updateSize = function(x, y) {
    this.sizeX = x;
    this.sizeY = y;
  }

  this.update = function() {

    if (this.player) {
      //TODO: move collision here to avoid getting the player stuck from velocity
      this.player.shape.loc_x += this.movementAmount() * this.player.velocityX;
      this.player.shape.loc_y += this.movementAmount() * this.player.velocityY;

      this.player.velocityX -= this.player.weight * this.gravity;
      this.player.velocityY -= this.player.weight * this.gravity;

      if (this.player.velocityX < 0) {
        this.player.velocityX = 0;
      }
      if (this.player.velocityY < 0) {
        this.player.velocityY = 0;
      }
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
      this.player.velocityX = -1*this.velocityChange;
      if (this.collides(this.player, -1)) {
        this.player.shape.loc_x += this.movementAmount();
        this.player.velocityX = 0;
      }
    }
  };

  this.controllerRight = function() {
    if (this.player) {
      this.player.shape.loc_x += this.movementAmount();
      this.player.velocityX = this.velocityChange;
    }
    if (this.collides(this.player, -1)) {
      this.player.shape.loc_x -= this.movementAmount();
      this.player.velocityX = 0;
    }
  };

  this.controllerUp = function() {
    if (this.player) {
      if (this.settings["worldType"] == "3") {
        //JUMP
        this.player.shape.loc_y -= 2;
        this.player.velocityY = -2*this.velocityChange;
      } else {
        this.player.shape.loc_y -= this.movementAmount();
        this.player.velocityY = -1*this.velocityChange;
      }
      if (this.collides(this.player, -1)) {
        this.player.shape.loc_y += this.movementAmount();
        this.player.velocityY = 0;
      }
    }
  };

  this.controllerDown = function() {
    if (this.player) {
      this.player.shape.loc_y += this.movementAmount();
      this.player.velocityY = this.velocityChange;
      if (this.collides(this.player, -1)) {
        this.player.shape.loc_y -= this.movementAmount();
        this.player.velocityY = 0;
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
  };

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
  };

  this.collidesWithCanvas = function(object) {
    if (object.shape.loc_x < 0 ||
        object.shape.loc_y < 0 ||
        object.shape.loc_x > this.sizeX - object.shape.width ||
        object.shape.loc_y > this.sizeY - object.shape.height) {
          return true;
        }
  };

  this.collides = function(object, npcIndex) {
    return (this.collidesWithNPCs(object, npcIndex) ||
            this.collidesWithPlayer(object) ||
            this.collidesWithCanvas(object));
  };

};
Game.prototype = {
  constructor : Game,
  setup: function() {
    Game.setup();
  }
};
