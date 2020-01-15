// Generate maps using cellular automata and smooth them further with marching squares


const MapGenerator = function(fillPercent) {
  this.fillPercent = fillPercent;


  this.generateMap = function(usePerlin, sizeX, sizeY, tileSize) {
    let map = this.randomlyFilledMap(usePerlin, sizeX, sizeY, tileSize);

    for (let i = 0; i < 5; i++) {
      map = this.smoothMap(map, sizeX, sizeY);
    }
    return map;
  };

  this.randomlyFilledMap = function(usePerlin, sizeX, sizeY, tileSize) {
    let map = [];
    for (let i = 0; i <= sizeX; i++) {
      for (let j = 0; j <= sizeY; j++) {
        let objectExists = false;
        if (usePerlin) {
          noise.seed(Math.random());
          objectExists = Math.abs(noise.simplex2(i/100, j/100)) < this.fillPercent;

        } else{
          objectExists = (Math.abs(Math.random()) < this.fillPercent);
        }
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

  this.smoothMap = function(map, sizeX, sizeY) {
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        if (map[i*sizeX+j].shape.color == "white") {
          let neighbourObjects = this.getSurroundingObjectCount(map, i, j, sizeX, sizeY, "white");
          if (neighbourObjects > 4) {
            // TODO add object Exists param for staticObject and move this logic there
            map[i*sizeX+j].shape.color = "white";
            map[i*sizeX+j].collidesWithPlayer = true;
            map[i*sizeX+j].collidesWithNPCs = true;
          }
          if (neighbourObjects < 4) {
            map[i*sizeX+j].shape.color = "black";
            map[i*sizeX+j].collidesWithPlayer = false;
            map[i*sizeX+j].collidesWithNPCs = false;
          }
        } else {
          let neighbourObjects = this.getSurroundingObjectCount(map, i, j, sizeX, sizeY, "black");
          if (neighbourObjects > 4) {
            map[i*sizeX+j].shape.color = "black";
            map[i*sizeX+j].collidesWithPlayer = false;
            map[i*sizeX+j].collidesWithNPCs = false;
          }
          if (neighbourObjects < 4) {
            map[i*sizeX+j].shape.color = "white";
            map[i*sizeX+j].collidesWithPlayer = true;
            map[i*sizeX+j].collidesWithNPCs = true;
          }
        }
      }
    }
    return map;
  };

  this.getSurroundingObjectCount = function(map, x, y, sizeX, sizeY, color) {
    let objectCount = 0;
    for (let i = x - 1; i <= x+1; i++) {
      for (let j = y - 1; j <= y+1; j++) {
        if (i >= 0 && i < sizeX && j >= 0 && j < sizeY) {
          if (i != x || j != y) {
            objectCount += map[i*sizeX+j].shape.color == color ? 1 : 0;
          }
        } else {
          objectCount++;
        }
      }
    }
    return objectCount;
  };
};

MapGenerator.prototype = {
  constructor: MapGenerator
};
