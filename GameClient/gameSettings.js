// Holds the objects needed for carrying game settings

let _gameParams = {
  'worldType': -1, // -1: Null, 0: Grid, 1: Hex, 2: linear, 3: Platformer
  'movementMethod': -1, // -1:Null, 0: key/button, 1: linear mouse/touch
  'playerVS': -1, // -1:Null, 0:PvP, 1:PvE
  'NPCs': 0, // 0: None, 1: One, 2: Two, ..., 99: 99
  'NPCBehavior': [], // 0: Attack Player, 1: Follow Player, 2: Attack other NPCs, 3: Collect items
  'NPCDifficulty': -1, // -1: Null, 0:Easy, 1:Medium, 2:Hard
  'scoring': [], // 0: Collect Items, 1:Kill other players, 2:Kill NPCs, 3:Survive(time)
  'movement': -1, // -1:Null (assume linear), 0: Turn Based
  'playerColor': undefined,
  'backgroundColor': undefined, //cannot be same as others
  'NPCColor': undefined,
  'itemColor': undefined,
  'endGoal': -1 // -1:Null, 0:Hit point amount, 1:Die, 2:Last Alive
}

exports.getGameParams = function() {
  return _gameParams;
};

exports.setGameParams = function(params) {
  //TODO: Validate params
  _gameParams[worldType] = params[worldType];
};

// TODO: NEED TO MOVE TO NODE.JS SO THIS IS EASIER

// --- USE WITH ---
// var gameSettings = require('./gameSettings.js');
//
// gameSettings.getGameState();
