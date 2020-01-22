// Generate maps using cellular automata and smooth them further with marching squares


const MapGenerator = function(fillPercent) {
  this.fillPercent = fillPercent;
  this.smoothingIters = 1;


  this.generateMap = function(randomType, sizeX, sizeY, tileSize) {
    let map = this.randomlyFilledMap(randomType, sizeX, sizeY, tileSize);

    for (let i = 0; i < this.smoothingIters; i++) {
      map = this.smoothMap(map, sizeX, sizeY);
    }
    return map;
  };

  this.randomlyFilledMap = function(randomType, sizeX, sizeY, tileSize) {
    let map = [];
    let seed = Math.random() * Math.random() * 100;
    noise.seed(seed);
    bufferedCubicNoise = new BufferedCubicNoise(sizeX, sizeY);
    for (let i = 0; i <= sizeX; i++) {
      for (let j = 0; j <= sizeY; j++) {
        let objectExists = false;
        switch (parseInt(randomType)) {
          case 0:
            //perlin
            objectExists = Math.abs(noise.perlin2(i/100, j/100)) < this.fillPercent;
            break;
          case 1:
            //simplex
            objectExists = Math.abs(noise.simplex2(i/100, j/100)) < this.fillPercent;
            break;
          case 2:
            //random
            objectExists = (Math.abs(Math.random()) < this.fillPercent);
            break;
          case 3:
            //cubic
            objectExists = cubicNoiseSample2(cubicNoiseConfig(seed), i, j) < this.fillPercent;
            break;
          case 4:
            //BufferedCubic
            objectExists = bufferedCubicNoise.sample(i, j) < this.fillPercent;
            break;
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

  this.connectMap = function(map, sizeX, sizeY) {
    let regions = [];
    let currentRegion = 0;
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        if (map[i*sizeX+j].color == "black" && map[i*sizeX+j].region == undefined) {
          console.log(i + ", " + j);
          regions[currentRegion] = [[i,j]];
          //map[i*sizeX+j].color = '#' + (Math.floor((Math.abs(currentRegion)*1000000))).toString(16).padStart(6, '0');
          map[i*sizeX+j].region = currentRegion;

          regionObjectStack = this.getDirectionalNeighbors(map, i, j, sizeX, sizeY, color, []);

          while (regionObjectStack.length > 0) {
            coords = regionObjectStack.pop();
            x = coords[0]; y = coords[1];
            regions[currentRegion] = [[x,y]];
            //map[x*sizeX+y].color = '#' + (Math.floor((Math.abs(currentRegion)*1000000))).toString(16).padStart(6, '0');
            map[x*sizeX+y].region = currentRegion;
            regionObjectStack = this.getDirectionalNeighbors(map, x, y, sizeX, sizeY, color, regionObjectStack);
          }
          currentRegion++;
        }
      }
    }
    return map;
  };

  this.getDirectionalNeighbors = function(map, x, y, sizeX, sizeY, color, list) {
    if (x-1 > sizeX && map[(x-1)*sizeX+y].color == "black") {
      list.push([x-1,y]);
    }
    if (x+1 < sizeX && map[(x+1)*sizeX+y].color == "black") {
      list.push([x+1,y]);
    }
    if (y-1 > sizeY && map[x*sizeX+(y-1)].color == "black") {
      list.push([x,y-1]);
    }
    if (y+1 < sizeY && map[x*sizeX+(y+1)].color == "black") {
      list.push([x,y+1]);
    }
    return list;
  };
};

MapGenerator.prototype = {
  constructor: MapGenerator
};
