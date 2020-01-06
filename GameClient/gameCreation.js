// Holds all methods used by the frontend for validating and setting game settings

let settings = {
  "worldType": [[0,1,2,3], ["Grid","Hex","Linear","Platformer"]],
  "movementMethod": [[-1,0,1], ["None","Button/Keyboard","Mouse or Drag(TouchScreen)"]],
  "playerVS": [[-1,0,1], ["None","PvP","PvE"]],
  "NPCs": [0,99],
  "NPCBehavior": [[-1,0,1,2,3], ["Do Nothing","Attack Player","Follow Player","Attack other NPCs","Collect Items"]],
  "NPCDifficulty": [[0,1,2], ["Easy","Medium","Hard"]],
  "scoring": [[0,1,2,3], ["Collect Items","Kill other players","Kill NPCs","Surive (time)"]],
  "movement": [[0,1], ["Linear","Turn Based"]],
  "playerColor": "white",
  "backgroundColor": "black",
  "NPCColor": "blue",
  "itemColor": "green",
  "endGoal": [[0,1,2], ["Hit point amount","Die","Last Alive"]]
}

//TODO: set settings off of html inputs (drop downs, text, etc)

let gameSettings = [];

//Set Body programatically using the gameParams
let bodyInner = "";
let keys = Object.keys(settings);
for (let i=0;i<keys.length;i++) {
   let values = settings[keys[i]];
   if (values.length > 1 && values[0].length > 1) {
     bodyInner += "<div><h3>" + keys[i] + "</h3><select>";
     for (let j=0;j<values[0].length;j++){
       bodyInner += "<option value=" + values[0][j] + ">" + values[1][j] + "</option>";
     }
     bodyInner += "</select></div>";
   } else {
      bodyInner += "<div><h3>" + keys[i] + "</h3><select>";
      if (keys[i] == "NPCs") {
        for (let n=values[0];n<=values[1];n++) {
          bodyInner += "<option value=" + n + ">" + n + "</option>";
        }
      }
      bodyInner += "</select></div>";
   }
}

bodyInner += "<div><button onclick=validateParams()>Start Game</button></div>" 

document.body.innerHTML = bodyInner;

let validateParams = function() {
  //TODO: go through selected options from <select> objects and check if they are valid
  startGame(gameSettings);
}

let startGame = function(gameSettings) {
  document.body.innerHTML = '<canvas></canvas>';
  mainSetup(gameSettings);
}

//startGame(gameSettings);
