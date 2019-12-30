// Holds the objects needed for carrying game settings

let _gameParams = {
  'worldType': -1, // -1: Null, 0: Grid, 1: Hex, 2: linear
  'MovementMethod': -1 //-1:Null, 0: key/button, 1: linear mouse/touch
}

exports.getGameParams = function() {
  return _gameParams;
};

exports.setGameParams = function(params) {
  //TODO: Validate params
  _gameParams[worldType] = params[worldType];
};

// --- USE WITH ---
// var gameSettings = require('./gameSettings.js');
//
// gameSettings.getGameState();
