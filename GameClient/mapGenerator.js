// Generate maps using cellular automata and smooth them further with marching squares

const MapGenerator = function(fillPercent) {
  this.fillPercent = fillPercent;

  this.generateMap = function(sizeX, sizeY, tileSize) {
    let map = this.randomlyFilledMap(sizeX, sizeY, tileSize);
    return map;
  };

  this.randomlyFilledMap = function(sizeX, sizeY, tileSize) {
    let map = [];
    for (let i = 0; i <= sizeX; i++) {
      for (let j = 0; j <= sizeY; j++) {
        let objectExists = (Math.abs(Math.random()) < this.fillPercent) ? true : false;
        map.push(
          new StaticObject(
            0,
            i*tileSize,
            j*tileSize,
            tileSize,
            tileSize,
            objectExists ? "white" : "black",
            objectExists,
            objectExists
          )
        );
      }
    }
    return map
  };
};

MapGenerator.prototype = {
  constructor: MapGenerator
};
