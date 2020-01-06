// Holds the objects needed for carrying game settings

// Valid parameters used in validation for game Creation
let gameValidParams = {
  'worldType': [-1,0,1,2,3],
    // -1: Null, 0: Grid, 1: Hex, 2: linear, 3: Platformer
  'movementMethod': [-1,0,1],
    // -1:Null, 0: key/button, 1: linear mouse/touch
  'playerVS': [-1,0,1],
    // -1:Null, 0:PvP, 1:PvE
  'NPCs': [0,99], //This is a range of values for npcs
    // 0: None, 1: One, 2: Two, ..., 99: 99
  'NPCBehavior': [0,1,2,3], // Can have multiple
    // 0: Attack Player, 1: Follow Player, 2: Attack other NPCs, 3: Collect items
  'NPCDifficulty': [-1,0,1,2],
    // -1: Null, 0:Easy, 1:Medium, 2:Hard
  'scoring': [0,1,2,3], // Can have multiple
    // 0: Collect Items, 1:Kill other players, 2:Kill NPCs, 3:Survive(time)
  'movement': [-1,0],
    // -1:Null (assume linear), 0: Turn Based
  'playerColor': undefined,
  'backgroundColor': undefined, //cannot be same as others
  'NPCColor': undefined,
  'itemColor': undefined,
  'endGoal': [-1,0,1,2]
    // -1:Null, 0:Hit point amount, 1:Die, 2:Last Alive
}

let gameParamNames = {
  'worldType': ["Grid","Hex","Linear","Platformer"],
    // -1: Null, 0: Grid, 1: Hex, 2: linear, 3: Platformer
  'movementMethod': ["None","Button/Keyboard","Mouse or Drag(TouchScreen)"],
    // -1:Null, 0: key/button, 1: linear mouse/touch
  'playerVS': ["None","PvP","PvE"],
    // -1:Null, 0:PvP, 1:PvE
  'NPCs': [0,99], //This is a range of values for npcs
    // 0: None, 1: One, 2: Two, ..., 99: 99
  'NPCBehavior': ["Attack Player","Follow Player","Attack other NPCs","Collect Items"], // Can have multiple
    // 0: Attack Player, 1: Follow Player, 2: Attack other NPCs, 3: Collect items
  'NPCDifficulty': ["Easy","Medium","Hard"],
    // -1: Null, 0:Easy, 1:Medium, 2:Hard
  'scoring': ["Collect Items","Kill other players","Kill NPCs","Surive (time)"], // Can have multiple
    // 0: Collect Items, 1:Kill other players, 2:Kill NPCs, 3:Survive(time)
  'movement': ["Linear","Turn Based"],
    // -1:Null (assume linear), 0: Turn Based
  'playerColor': undefined,
  'backgroundColor': undefined, //cannot be same as others
  'NPCColor': undefined,
  'itemColor': undefined,
  'endGoal': ["Hit point amount","Die","Last Alive"] // Can have multiple
    // -1:Null, 0:Hit point amount, 1:Die, 2:Last Alive
}
