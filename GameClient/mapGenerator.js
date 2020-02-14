// Generate maps using cellular automata and smooth them further with marching squares


const MapGenerator = function(fillPercent) {
  this.fillPercent = fillPercent;
  this.smoothingIters = 5;


  this.generateMap = function(randomType, sizeX, sizeY, tileSize) {

    let map = this.generateRandomMap(randomType, sizeX, sizeY, tileSize);

    let mapFillPercent = this.countFillPercent(map);

    while(!(mapFillPercent > this.fillPercent - .05)) { //mapFillPercent < this.fillPercent + .05 &&
      map = this.generateRandomMap(randomType, sizeX, sizeY, tileSize);
      mapFillPercent = this.countFillPercent(map);

      // TODO: check feasibility by checking height and width
    }

    return map;
  };

  this.generateRandomMap = function(randomType, sizeX, sizeY, tileSize) {
    let map = this.randomlyFilledMap(randomType, sizeX, sizeY, tileSize);

    for (let i = 0; i < this.smoothingIters; i++) {
      map = this.smoothMap(map, sizeX, sizeY);
    }

    map = this.detectRegions(map, sizeX, sizeY);

    // find largest region and delete the rest
    let regions = this.getRegionListFromMap(map);
    let maxSize = 0;
    let maxRegion = -1;
    for (let i = 0; i < regions.length; i++) {
      if (regions[i].length > maxSize) {
        maxSize = regions[i].length;
        maxRegion = i;
      }
    }
    for (let i = 0; i < map.length; i++) {
      if (!regions[maxRegion].includes(i)) {
        map[i].shape.color = "white";
      }
    }

    console.log("New Map");
    return map;
  };

  this.getRegionListFromMap = function(map) {
    let regions = [];
    for (let i = 0; i < map.length; i++) {
      if (regions[map[i].region]) {
        regions[map[i].region].push(i);
      } else {
        regions[map[i].region] = [i];
      }
    }
    return regions;
  };

  this.countFillPercent = function(map) {
    let count = 0;
    for (let i = 0; i < map.length; i++) {
      if (!(map[i].shape.color == "white")) {
        count++;
      }
    }
    return count/map.length;
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
          case 5:
            //OctavePerlin
            let value = 0;
            let amplitude = 1;
            let maxValue = 0;
            let frequency = 1;
            for (let o=0; o<5; o++) {
              value += noise.perlin2(i/100 * frequency, j/100 * frequency) * amplitude;
              maxValue += amplitude;

              amplitude *= 0.5;
              frequency *= 2;

              noise.seed(seed + ((o+1)*seed));
            }
            objectExists = Math.abs(value)/maxValue < this.fillPercent;
            noise.seed(seed);
        }
        map.push(
          new StaticObject(
            0,
            i*tileSize,
            j*tileSize,
            tileSize,
            tileSize,
            objectExists ? "black" : "white",
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

  this.detectRegions = function(map, sizeX, sizeY) {
    //let regions = [];
    let currentRegion = 0;
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        if (map[i*sizeX+j].shape.color == "black" && map[i*sizeX+j].region == undefined) {
          //regions[currentRegion] = [[i,j]];
          map[i*sizeX+j].shape.color = '#' + (Math.floor((Math.abs(currentRegion)*1000000))).toString(16).padStart(6, '0');
          map[i*sizeX+j].region = currentRegion;

          regionObjectStack = this.getDirectionalNeighbors(map, i, j, sizeX, sizeY, "black", []);
          let seen = [];

          while (regionObjectStack.length > 0) {
            coords = regionObjectStack.pop();
            seen.push(coords);
            x = coords[0]; y = coords[1];
            // if (!regions[currentRegion].includes([x,y])) {
            //   regions[currentRegion].push([[x,y]]);
            // }
            map[x*sizeX+y].shape.color = '#' + (Math.floor((Math.abs(currentRegion)*1000000))).toString(16).padStart(6, '0');
            map[x*sizeX+y].region = currentRegion;
            let newCoords = this.getDirectionalNeighbors(map, x, y, sizeX, sizeY, "black", []);
            for (let k = 0; k < newCoords.length; k++) {
              if (!seen.includes(newCoords[k])) {
                regionObjectStack.push(newCoords[k]);
              }
            }
          }
          currentRegion++;
        }
      }
    }
    // console.log(regions);
    // for (let i = 0; i < regions.length; i++) {
    //   if (regions[i].length < 40) {
    //     for (let j = 0; j < regions[i].length; j++){
    //       let coords = regions[i][j];
    //       if(map[coords[0]*sizeX+coords[1]]) {
    //         map[coords[0]*sizeX+coords[1]].shape.color = "white";
    //       }
    //     }
    //   }
    // }

    //fill in rest of regions
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        if (map[i*sizeX+j].region == undefined) {
          map[i*sizeX+j].region = -1;
        }
      }
    }

    return map;
  };

  this.getDirectionalNeighbors = function(map, x, y, sizeX, sizeY, color, list) {
    if (x-1 > 0 && map[(x-1)*sizeX+y].shape.color == color && map[(x-1)*sizeX+y].region == undefined) {
      list.push([x-1,y]);
    }
    if (x+1 < sizeX && map[(x+1)*sizeX+y].shape.color == color && map[(x+1)*sizeX+y].region == undefined) {
      list.push([x+1,y]);
    }
    if (y-1 > 0 && map[x*sizeX+(y-1)].shape.color == color && map[x*sizeX+(y-1)].region == undefined) {
      list.push([x,y-1]);
    }
    if (y+1 < sizeY && map[x*sizeX+(y+1)].shape.color == color && map[x*sizeX+(y+1)].region == undefined) {
      list.push([x,y+1]);
    }
    return list;
  };
};

MapGenerator.prototype = {
  constructor: MapGenerator
};
